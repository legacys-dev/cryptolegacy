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
    fileName: PropTypes.string,
    button: PropTypes.bool
  }

  state = {open: false, loading: false}

  @autobind
  async downloadProgress(event) {
    const {loaded, total} = event
    if (loaded === total) {
      this.props.showMessage('Descarga completa')
      await sleep(1000)
      this.setState({loading: false, open: false, loaded: 0})
    } else {
      this.setState({loaded, total})
    }
  }

  @autobind
  async onClick() {
    this.setState({open: true, loading: true})
    const {downloadUrl, fileName} = this.props
    await sleep(1000)
    try {
      await saveAs(
        'http://localhost:3000/asd/AScsSDsDfHTt55783G4f2fklr78bA345hk87WF4g456',
        'foto.jpg',
        this.downloadProgress
      )
    } catch (error) {
      this.setState({loading: false})
      console.log(error)
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
