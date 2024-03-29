import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {VaultConsumer} from 'App/helpers/contexts/vaultContext'
import LengthName from 'App/components/User/LengthName'
import FileIcon, {defaultStyles} from 'react-file-icon'
import getSize from 'App/helpers/files/getSize'
import translate from 'App/i18n/translate'
import Options from './Options'
import mime from 'mime-types'
import moment from 'moment'

export default class Items extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    items: PropTypes.array
  }

  state = {}

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
          <td>{moment(file.createdAt).format('LL')}</td>
          <td>
            <VaultConsumer>
              {providerProps => (
                <Options
                  file={file}
                  vaultId={providerProps.vaultId}
                  onDeleteFile={providerProps.onDeleteFile}
                />
              )}
            </VaultConsumer>
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
              <td style={{textAlign: 'left'}}>{translate('vaults.name')}</td>
              <td>{translate('vaults.type')}</td>
              <td>{translate('vaults.size')}</td>
              <td>{translate('vaults.creationDate')}</td>
              <td>{translate('vaults.actions')}</td>
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
