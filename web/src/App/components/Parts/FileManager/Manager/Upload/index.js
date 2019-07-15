import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import {Line} from 'App/components/Parts/LoadProgress'
import SelectStorage from './SelectStorage'
import {MdCloudUpload} from 'react-icons/md'
import getSize from 'App/helpers/files/getSize'
import gql from 'graphql-tag'
import mime from 'mime-types'

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
@withMessage
export default class Upload extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    createS3Upload: PropTypes.func,
    completeS3Upload: PropTypes.func,
    getUploadCredentials: PropTypes.object,
    onUploadProgressChange: PropTypes.func,
    vaultId: PropTypes.string,
    progress: PropTypes.number,
    loaded: PropTypes.number,
    total: PropTypes.number,
    close: PropTypes.func
  }

  state = {upload: 0, storage: null}

  selectStorage = value => {
    if (!value) return
    this.setState({storage: value})
  }

  @autobind
  async onChange(event) {
    const file = this.refs.input.files[0]
    this.setState({loading: true})
    try {
      const {fileId, key, url, fields} = await this.createUpload(file)
      await this.uploadFile({key, file, url, fields})
      await this.complete({fileId})
      this.setState({loading: false})
    } catch (error) {
      this.props.showMessage(error)
      this.setState({loading: false})
    }
  }

  @autobind
  async createUpload(file, storage) {
    const {vaultId} = this.props
    if (!vaultId) return
    const {result} = await this.props.createS3Upload({
      name: file.name,
      size: file.size,
      type: mime.lookup(file.name) || 'application/octet-stream',
      storage: this.state.storage,
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
    this.props.onUploadProgressChange({progress: result, loaded, total})
  }

  async uploadFile({key, file, url, fields}) {
    var formData = new FormData()

    const data = {
      ...fields,
      key,
      file
    }

    for (const name in data) {
      formData.append(name, data[name])
    }

    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', this.onUploadProgress)
      xhr.open('POST', url)
      xhr.onload = () => {
        resolve('upload complete')
      }
      xhr.onerror = error => {
        reject(error)
      }
      xhr.send(formData)
    })
  }

  @autobind
  async complete({fileId}) {
    await this.props.completeS3Upload({fileId}, {refetchQueries: ['getFiles']})
    this.props.showMessage('The file was successfully loaded')
    this.props.close()
  }

  renderSelectStorage() {
    return (
      <div className={styles.select}>
        <SelectStorage onChange={this.selectStorage} value={this.state.storage} />
      </div>
    )
  }

  renderInput() {
    if (this.state.loading || !this.state.storage) return
    return (
      <div className={styles.inputContainer}>
        <label htmlFor="file-upload" className={styles.label}>
          <div>click here to upload the file</div>
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
    const {progress, loaded, total} = this.props
    return (
      <div>
        <div className={styles.loading}>
          Uploading file ({progress.toFixed(2)}%)
          <br />
          {getSize(loaded)} of {getSize(total)}
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
        {this.renderSelectStorage()}
        {this.renderLoading()}
        {this.renderInput()}
      </div>
    )
  }
}
