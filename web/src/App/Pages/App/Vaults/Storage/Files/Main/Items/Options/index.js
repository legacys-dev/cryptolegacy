import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withRouter} from 'react-router'
import FileView from './FileView'
import DeleteFile from 'App/components/Parts/DeleteFile'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import DownloadButton from 'App/components/Parts/DownloadButton'

@withRouter
@withMessage
export default class Options extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    file: PropTypes.object,
    userVaultId: PropTypes.string
  }

  @autobind
  onDeleteSuccess() {
    this.props.showMessage('Archivo eliminado correctamente')
  }

  renderOptions() {
    const {userVaultId, file, history} = this.props
    return (
      <div className={styles.setting}>
        <FileView history={history} userVaultId={userVaultId} fileId={file._id} />
        <DownloadButton file={file} />
        <DeleteFile
          fileId={file._id}
          personalVaultId={userVaultId}
          onDeleteSuccess={this.onDeleteSuccess}
        />
      </div>
    )
  }

  render() {
    if (!this.props.file) return <span />
    return <div className={styles.container}>{this.renderOptions()}</div>
  }
}
