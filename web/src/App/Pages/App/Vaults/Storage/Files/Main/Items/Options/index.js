import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withRouter} from 'react-router'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import {MdInsertDriveFile} from 'react-icons/md'

@withRouter
export default class Options extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    file: PropTypes.object,
    userVaultId: PropTypes.string
  }

  renderOptions() {
    const {userVaultId, file} = this.props
    return (
      <div className={styles.setting}>
        <Tooltip content="información del archivo" place="top">
          <MdInsertDriveFile
            className={styles.item}
            size={25}
            onClick={() =>
              this.props.history.push(`/vaults/storage/${userVaultId}/file/${file._id}`)
            }
          />
        </Tooltip>
      </div>
    )
  }

  render() {
    if (!this.props.file) return <span />
    return <div className={styles.container}>{this.renderOptions()}</div>
  }
}
