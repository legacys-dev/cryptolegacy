import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import { Line } from 'App/components/Parts/LoadProgress'
import getSize from 'App/helpers/files/getSize'
import { MdCloudUpload } from 'react-icons/md'
import translate from 'App/i18n/translate'
import awsCredentials from './awsCredentials'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import { privateDecrypt, archiveEncryptWithPassword } from 'App/helpers/crypto'
import EncryptLoading from 'App/components/Parts/EncryptLoading'
import { generateArchiveIv } from 'App/helpers/keys'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import Warning from './Warning'
import gql from 'graphql-tag'
import mime from 'mime-types'
import AWS from 'aws-sdk'

@withMutation(gql`
  mutation createS3Upload(
    $name: String
    $size: Float
    $type: String
    $storage: String
    $vaultId: ID
  ) {
    result: createS3Upload(
      name: $name
      size: $size
      type: $type
      storage: $storage
      vaultId: $vaultId
    ) {
      fileId
      key
      url
      fields
    }
  }
`)
@withMutation(gql`
  mutation completeS3Upload($fileId: ID) {
    completeS3Upload(fileId: $fileId)
  }
`)
@withGraphQL(awsCredentials)
@withMessage
export default class Upload extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    createS3Upload: PropTypes.func,
    completeS3Upload: PropTypes.func,
    getUploadCredentials: PropTypes.string,
    onUploadProgressChange: PropTypes.func,
    vaultType: PropTypes.string,
    vaultId: PropTypes.string,
    progress: PropTypes.number,
    loaded: PropTypes.number,
    total: PropTypes.number,
    close: PropTypes.func
  }

  state = { upload: 0, encrypting: false }

  @autobind
  async onChange(event) {
    const fileMetadata = this.refs.input.files[0]
    const file = await new Promise((resolve, reject) => {
      let reader = new FileReader()

      reader.onload = () => {
        const data = reader.result
        const buffer = new Int8Array(data)
        resolve(Buffer.from(buffer, 'base64'))
      }

      reader.readAsArrayBuffer(fileMetadata)
    })

    this.setState({ loading: true })

    try {
      const { fileId, key } = await this.createUpload(fileMetadata)
      await this.uploadFile({ key, file, fileId })
      await this.complete({ fileId })
      this.setState({ loading: false })
    } catch (error) {
      this.props.showMessage(error)
      this.setState({ loading: false })
    }
  }

  @autobind
  async createUpload(file) {
    const { vaultId } = this.props
    if (!vaultId) return

    const { result } = await this.props.createS3Upload({
      name: file.name,
      size: file.size,
      type: mime.lookup(file.name) || 'application/octet-stream',
      storage: this.props.vaultType,
      vaultId
    })

    return result
  }

  @autobind
  onUploadProgress(progress) {
    if (!progress || !progress.isTrusted) return
    const result = Number(((progress.loaded * 100) / progress.total).toFixed(3))
    const loaded = progress.loaded
    const total = progress.total
    this.props.onUploadProgressChange({ progress: result, loaded, total })
  }

  async uploadFile({ key, file, fileId }) {
    const messages = JSON.parse(localStorage.getItem('messages'))
    const privateKey = messages['privateKey']
    const credentials = privateDecrypt({
      toDecrypt: this.props.getUploadCredentials,
      privateKey: privateKey
    })
    const { accessKeyId, secretAccessKey, region, bucket } = credentials

    AWS.config.update({ accessKeyId, secretAccessKey, region })

    const url = window.location.pathname.split('/').slice(-1)[0]
    const vault = JSON.parse(localStorage.getItem('vault'))
    const cipherPassword = vault[url]
    const id = fileId.slice(0, 16)
    const iv = await generateArchiveIv(id)

    this.setState({ encrypting: true })
    await sleep(100)

    const encrypted = archiveEncryptWithPassword({
      itemToEncrypt: file,
      cipherPassword: cipherPassword,
      archiveIv: iv
    })

    this.setState({ encrypting: false })
    const uploadToS3 = new AWS.S3.ManagedUpload({
      params: { Key: key, Bucket: bucket, Body: encrypted }
    })

    uploadToS3.send() // Start upload

    if (uploadToS3.failed) return

    let totalProgress = 0
    let loaded
    let total
    while (totalProgress < 100) {
      const result = await new Promise((resolve, reject) => {
        uploadToS3.on('httpUploadProgress', function(progress) {
          totalProgress = Number(((progress.loaded * 100) / progress.total).toFixed(3))
          loaded = progress.loaded
          total = progress.total
          resolve(totalProgress)
        })
      })
      this.props.onUploadProgressChange({ progress: result, loaded, total })
    }
  }

  @autobind
  async complete({ fileId }) {
    await this.props.completeS3Upload({ fileId }, { refetchQueries: ['getFiles'] })
    this.props.close()
    this.props.showMessage(translate('fileManager.loadFileMessage'))
  }

  renderWarning() {
    return <Warning />
  }

  renderEncrypting() {
    if (!this.state.encrypting) return
    return (
      <div className={styles.encrypting}>
        <EncryptLoading />
        <p>{translate('fileManager.encrypting')}...</p>
      </div>
    )
  }

  renderInput() {
    if (this.state.loading || !this.props.vaultType) return
    return (
      <div className={styles.inputContainer}>
        <label htmlFor="file-upload" className={styles.label}>
          <div>{translate('fileManager.clickUploadFile')}</div>
          <MdCloudUpload size={25} />
        </label>
        <input
          ref="input"
          id="file-upload"
          type="file"
          className={styles.input}
          onChange={this.onChange}
        />
      </div>
    )
  }

  renderLoading() {
    if (!this.state.loading) return
    const { progress, loaded, total } = this.props
    return (
      <div>
        <div className={styles.loading}>
          {`${translate('fileManager.uploadingFile')} (${progress.toFixed(2)}%)`}
          <br />
          {getSize(loaded)} {translate('fileManager.of')} {getSize(total)}
        </div>
        <div className={styles.progressLine}>
          <Line percent={this.props.progress} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderLoading()}
        {this.renderInput()}
        {this.renderWarning()}
        {this.renderEncrypting()}
      </div>
    )
  }
}
