import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import {Line} from 'App/components/Parts/LoadProgress'
import awsCredentials from './awsCredentials'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import AWS from 'aws-sdk'
import gql from 'graphql-tag'
import mime from 'mime-types'

@withMutation(gql`
  mutation createS3Upload($name: String, $size: Float, $type: String) {
    result: createS3Upload(name: $name, size: $size, type: $type) {
      fileId
      key
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
    getUploadCredentials: PropTypes.object,
    onUploadProgressChange: PropTypes.func,
    progress: PropTypes.number,
    close: PropTypes.func
  }

  state = {upload: 0}

  @autobind
  async onChange(event) {
    const file = this.refs.input.files[0]
    this.setState({loading: true})
    try {
      const {fileId, key} = await this.createUpload(file)
      await this.uploadFile({key, file})
      await this.complete({fileId})
      this.setState({loading: false})
    } catch (error) {
      this.props.showMessage(error)
      this.setState({loading: false})
    }
  }

  @autobind
  async createUpload(file) {
    const {result} = await this.props.createS3Upload({
      name: file.name,
      size: file.size,
      type: file.type || mime.lookup(file.name) || 'application/octet-stream'
    })

    return result
  }

  async uploadFile({key, file}) {
    const {accessKeyId, secretAccessKey, region, bucket} = this.props.getUploadCredentials
    AWS.config.update({accessKeyId, secretAccessKey, region})

    const uploadToS3 = new AWS.S3.ManagedUpload({params: {Key: key, Bucket: bucket, Body: file}})
    uploadToS3.send() // Start upload
    if (uploadToS3.failed) return

    let totalProgress = 0
    while (totalProgress < 100) {
      const result = await new Promise((resolve, reject) => {
        uploadToS3.on('httpUploadProgress', function(progress) {
          totalProgress = Number(((progress.loaded * 100) / progress.total).toFixed(0))
          resolve(totalProgress)
        })
      })
      this.props.onUploadProgressChange(result)
    }
  }

  @autobind
  async complete({fileId}) {
    await this.props.completeS3Upload({fileId}, {refetchQueries: ['getFiles']})
    this.props.showMessage('El archivo se cargó correctamente')
    await sleep(1000)
    this.props.close()
  }

  renderInput() {
    if (this.state.loading) return
    return (
      <div>
        <label htmlFor="file-upload" className={styles.label}>
          Subir un archivo...
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
    return (
      <div>
        <div className={styles.loading}>Subiendo archivo... ({this.props.progress}%)</div>
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
      </div>
    )
  }
}
