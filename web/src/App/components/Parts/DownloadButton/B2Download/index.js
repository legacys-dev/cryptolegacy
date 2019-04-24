import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'
import Progress from '../Progress'
import autobind from 'autobind-decorator'
import {saveAs} from '../downloadFile'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import {MdCloudDownload} from 'react-icons/md'

@withMessage
export default class B2Download extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    downloadUrl: PropTypes.string,
    downloadExtension: PropTypes.string,
    fileId: PropTypes.string,
    fileName: PropTypes.string,
    button: PropTypes.bool
  }

  static defaultProps = {
    downloadExtension: '/b2api/v2/b2_download_file_by_id?fileId='
  }

  state = {open: false, loading: false}

  downloadProgress = event => {
    const {loaded, total} = event
    if (loaded === total) {
      this.props.showMessage('Descarga completa')
      this.setState({loading: false, open: false})
    }
    this.setState({loaded, total})
  }

  @autobind
  async onClick() {
    this.setState({open: true, loading: true})
    const {downloadUrl, downloadExtension, fileId, fileName} = this.props
    await sleep(1000)
    try {
      await saveAs(`${downloadUrl}${downloadExtension}${fileId}`, fileName, this.downloadProgress)
    } catch (error) {
      this.setState({loading: false})
      console.log('Error:', error)
    }
  }

  renderDownloading() {
    if (!this.state.open) return
    const {total, loaded} = this.state
    return <Progress total={total} loaded={loaded} close={() => this.setState({open: false})} />
  }

  renderDownload() {
    if (this.props.button) {
      return (
        <Button primary onClick={this.onClick} loading={this.state.loading}>
          Download archive
        </Button>
      )
    }
    return (
      <Tooltip content="Descargar">
        <MdCloudDownload className={styles.icon} size={25} onClick={this.onClick} />
      </Tooltip>
    )
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
