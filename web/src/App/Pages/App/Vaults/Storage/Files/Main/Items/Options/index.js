import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withRouter} from 'react-router'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import DownloadButton from 'App/components/Parts/DownloadButton'
import DeleteFile from 'App/components/Parts/DeleteFile'
import FileView from './FileView'
import translate from 'App/i18n/translate'

@withRouter
@withMessage
export default class Options extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    file: PropTypes.object,
    vaultId: PropTypes.string,
    onDeleteFile: PropTypes.func
  }

  onDeleteSuccess(deletedTime) {
    this.props.showMessage(translate('files.fileDeletedSuccesfully'))
    this.props.onDeleteFile(deletedTime)
  }

  renderOptions() {
    const {vaultId, file, history} = this.props

    return (
      <div className={styles.setting}>
        <FileView history={history} vaultId={vaultId} fileId={file._id} />
        <DownloadButton file={file} />
        <DeleteFile
          fileId={file._id}
          vaultId={vaultId}
          onDeleteSuccess={() => this.onDeleteSuccess(new Date())}
        />
      </div>
    )
  }

  render() {
    if (!this.props.file) return <span />
    return <div className={styles.container}>{this.renderOptions()}</div>
  }
}
