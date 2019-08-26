import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import getSize from 'App/helpers/files/getSize'
import LengthName from 'App/components/User/LengthName'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import RestoreFile from 'App/components/Parts/RestoreFile'
import FileIcon, {defaultStyles} from 'react-file-icon'
import translate from 'App/i18n/translate'
import autobind from 'autobind-decorator'
import mime from 'mime-types'

const storage = {
  b2: translate('fileManager.simpleType'),
  glacier: translate('fileManager.highType'),
  drive: translate('fileManager.drive')
}

@withMessage
export default class Items extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    items: PropTypes.array,
    onUpdateArchive: PropTypes.func
  }

  state = {}

  @autobind
  onRestoreSuccess(updateDate) {
    this.props.onUpdateArchive(updateDate)
    this.props.showMessage(translate('app.restoreFileMessage'))
  }

  getStorageDescription(type) {
    if (type === 'SS' || type === 'AS') {
      return translate('fileManager.simpleTypeDescription')
    } else if (type === 'HSS' || type === 'AAS') {
      return translate('fileManager.highTypeDescription')
    } else {
      return translate('fileManager.driveTypeDescription')
    }
  }

  renderTable() {
    const files = this.props.items || []
    return files.map((file, index) => {
      const type = mime.extension(file.type)
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <div className={styles.iconType}>
              <FileIcon extension={type} size={25} {...defaultStyles[type]} />
            </div>
          </td>
          <td style={{textAlign: 'left', fontWeigth: 'bold'}}>
            <LengthName name={file.name} />
          </td>
          <td>{type}</td>
          <td>{getSize(file.size)}</td>
          <td>
            <Tooltip content={this.getStorageDescription(storage[file.storageType])}>
              {storage[file.storageType]}
            </Tooltip>
          </td>
          <td>
            <LengthName name={file.vaultName} />{' '}
          </td>
          <td>
            <RestoreFile
              fileId={file._id}
              vaultId={file.vaultId}
              onRestoreSuccess={this.onRestoreSuccess}
            />
          </td>
        </tr>
      )
    })
  }

  renderFiles() {
    return (
      <div className={styles.files}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td style={{width: '5%'}} />
              <td style={{textAlign: 'left'}}>{translate('app.name')}</td>
              <td>{translate('app.type')}</td>
              <td>{translate('app.weight')}</td>
              <td>{translate('app.storage')}</td>
              <td>{translate('app.vault')}</td>
              <td style={{width: '5%'}} />
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    )
  }

  render() {
    return <div className={styles.container}>{this.renderFiles()}</div>
  }
}
