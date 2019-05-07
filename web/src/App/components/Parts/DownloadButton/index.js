import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Loading from 'orionsoft-parts/lib/components/Loading'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import {MdCloudDownload} from 'react-icons/md'
import autobind from 'autobind-decorator'
import {saveAs} from './downloadFile'
import Progress from './Progress'
import gql from 'graphql-tag'

@withMutation(gql`
  mutation createDownload($fileId: ID) {
    createDownload(fileId: $fileId)
  }
`)
@withMessage
export default class DownloadButton extends React.Component {
  static propTypes = {
    file: PropTypes.object,
    createDownload: PropTypes.func,
    button: PropTypes.bool,
    showMessage: PropTypes.func
  }

  state = {open: false, loading: false}

  errorOnDownload() {
    this.props.showMessage('File is not available for download', {level: 'error'})
  }

  notAvailable() {
    this.props.showMessage('File is not available for download', {level: 'error'})
  }

  glacierCreateMessage(minutesToWait) {
    this.props.showMessage(`Your glacier download was created, please wait ${minutesToWait}`)
  }

  glacierWaitMessage() {
    this.props.showMessage('Your glacier download is not ready')
  }

  @autobind
  async downloadProgress(event) {
    const {loaded, total} = event
    this.setState({loaded, total})
    if (loaded === total) {
      this.props.showMessage('Descarga completa')
      await sleep(1250)
      this.setState({open: false, loading: false, loaded: 0})
    }
  }

  downloadStatusHandler(status, minutesToWait) {
    console.log({status})
    this.setState({open: false, loading: false, loaded: 0})
    if (status === 'notAvailable') this.notAvailable()
    if (status === 'error') this.errorOnDownload()
    if (status === 'glacierJobCreated') this.glacierCreateMessage(minutesToWait)
    console.log('no hay nada')
  }

  @autobind
  async download() {
    this.setState({loading: true})
    const {file, createDownload, showMessage} = this.props
    try {
      const response = await createDownload({fileId: file._id})
      const {status, fileName, downloadUrl, minutesToWait} = response.createDownload
      if (status !== 'available') return this.downloadStatusHandler(status, minutesToWait)
      this.setState({open: true})
      await saveAs(downloadUrl, fileName, this.downloadProgress)
    } catch (error) {
      showMessage(error, {level: 'error'})
    }
  }

  renderDownloading() {
    if (!this.state.open) return
    const {total, loaded} = this.state
    return <Progress total={total} loaded={loaded} close={() => this.setState({open: false})} />
  }

  renderButton() {
    return (
      <Button primary onClick={this.download} loading={this.state.loading}>
        Download archive
      </Button>
    )
  }

  renderIcon() {
    if (this.state.loading) {
      return (
        <div className={styles.loading}>
          <Loading size={22} thickness={2} color="#0053b3" />
        </div>
      )
    }
    return (
      <Tooltip content="Descargar">
        <MdCloudDownload className={styles.icon} size={25} onClick={this.download} />
      </Tooltip>
    )
  }

  renderDownload() {
    if (this.props.button) return this.renderButton()
    return this.renderIcon()
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderDownloading()}
        {this.renderDownload()}
      </div>
    )
  }
}
