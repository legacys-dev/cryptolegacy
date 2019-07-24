import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import LengthName from 'App/components/User/LengthName'
import getSize from 'App/helpers/files/getSize'
import FileIcon, {defaultStyles} from 'react-file-icon'
import RestoreFile from 'App/components/Parts/RestoreFile'
import mime from 'mime-types'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import translate from 'App/i18/translate'

const storage = {
  b2: 'simple storage',
  glacier: 'high security storage'
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
    this.props.showMessage(translate('app.restoreFileMessage'))
    this.props.onUpdateArchive(updateDate)
  }

  renderTable() {
    const files = this.props.items || []
    return files.map((file, index) => {
      const {data, vaultName} = file
      const type = mime.extension(data.type)
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <div className={styles.iconType}>
              <FileIcon extension={type} size={25} {...defaultStyles[type]} />
            </div>
          </td>
          <td style={{textAlign: 'left', fontWeigth: 'bold'}}>
            <LengthName name={data.name} />
          </td>
          <td>{type}</td>
          <td>{getSize(data.size)}</td>
          <td>{storage[data.storageType]}</td>
          <td>
            <LengthName name={vaultName} />{' '}
          </td>
          <td>
            <RestoreFile
              fileId={file._id}
              vaultId={data.vaultId}
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
              <td style={{textAlign: 'left'}}>Nombre</td>
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
