import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import mime from 'mime-types'
import fetch from 'unfetch'

@withMutation(gql`
  mutation createS3Upload($name: String, $size: Float, $type: String) {
    result: createS3Upload(name: $name, size: $size, type: $type) {
      fileId
      url
      fields
      key
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
    completeS3Upload: PropTypes.func
  }

  state = {}

  @autobind
  async onChange(event) {
    const file = this.refs.input.files[0]
    this.setState({loading: true})
    try {
      const credentials = await this.requestCredentials(file)
      await this.uploadFile(credentials, file)
      await this.complete(credentials.fileId)
      this.setState({loading: false})
    } catch (error) {
      this.props.showMessage(error)
      this.setState({loading: false})
    }
  }

  @autobind
  async requestCredentials(file) {
    const {result} = await this.props.createS3Upload({
      name: file.name,
      size: file.size,
      type: file.type || mime.lookup(file.name) || 'application/octet-stream'
    })
    return result
  }

  async uploadFile({fields, key, url}, file) {
    var formData = new FormData()
    const data = {
      ...fields,
      key: key,
      file: file
    }

    for (const name in data) {
      formData.append(name, data[name])
    }

    await fetch(url, {
      mode: 'no-cors',
      method: 'POST',
      body: formData
    })
  }

  @autobind
  async complete(fileId) {
    await this.props.completeS3Upload({fileId}, {refetchQueries: ['getFiles']})
    this.props.showMessage('El archivo se cargó correctamente')
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
    return <div className={styles.loading}>Subiendo archivo...</div>
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
