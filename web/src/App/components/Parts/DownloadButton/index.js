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
import messages from './messages'
import gql from 'graphql-tag'
import translate from 'App/i18n/translate'

@withMutation(gql`
  mutation createDownload($fileId: ID) {
    createDownload(fileId: $fileId)
  }
`)
@withMutation(gql`
  mutation finishDownload($activityId: String, $status: Boolean) {
    finishDownload(activityId: $activityId, status: $status)
  }
`)
@withMessage
export default class DownloadButton extends React.Component {
  static propTypes = {
    file: PropTypes.object,
    createDownload: PropTypes.func,
    finishDownload: PropTypes.func,
    button: PropTypes.bool,
    showMessage: PropTypes.func
  }

  state = {open: false, loading: false}

  @autobind
  async downloadProgress(event) {
    const {loaded, total} = event
    this.setState({loaded, total})
    if (loaded === total) {
      this.props.showMessage(translate('parts.completeDownloadMessage'))
      await sleep(1250)
      this.setState({open: false, loading: false, loaded: 0})
    }
  }

  downloadStatusHandler(status, minutesToWait) {
    this.setState({open: false, loading: false, loaded: 0})
    const event = messages[status]
    const message = event.minutes ? event.message + minutesToWait : event.message
    this.props.showMessage(message, event.error && {level: 'error'})
  }

  @autobind
  async download() {
    this.setState({loading: true})
    const {file, createDownload, finishDownload, showMessage} = this.props
    try {
      const response = await createDownload({fileId: file._id})
      const {status, fileName, downloadUrl, minutesToWait, activityId} = response.createDownload
      if (status !== 'available') {
        await finishDownload({activityId, status: false})
        return this.downloadStatusHandler(status, minutesToWait)
      }
      this.setState({open: true})
      await saveAs(downloadUrl, fileName, this.downloadProgress)
      await finishDownload({activityId, status: true})
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
        {translate('parts.downloadArchiveOption')}
      </Button>
    )
  }

  renderLoading() {
    return (
      <div className={styles.loading}>
        <Loading size={22} thickness={2} color="#0053b3" />
      </div>
    )
  }

  renderIcon() {
    if (this.state.loading) return this.renderLoading()
    return (
      <Tooltip content={translate('parts.download')}>
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
