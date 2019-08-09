import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {VaultConsumer} from 'App/helpers/contexts/vaultContext'
import LengthName from 'App/components/User/LengthName'
import FileIcon, {defaultStyles} from 'react-file-icon'
import getSize from 'App/helpers/files/getSize'
import moment from 'moment'
import mime from 'mime-types'
import Options from './Options'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import translate from 'App/i18n/translate'
import privateDecrypt from 'App/helpers/crypto/privateDecrypt'

const storage = {
  b2: translate('fileManager.simpleType'),
  glacier: translate('fileManager.highType')
}

export default class Items extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    items: PropTypes.array
  }

  state = {}

  getStorageDescription(type) {
    if (type === 'SS' || type === 'AS') {
      return translate('fileManager.simpleTypeDescription')
    } else {
      return translate('fileManager.highTypeDescription')
    }
  }

  renderTable() {
    const files = this.props.items || []
    return files.map((file, index) => {
      console.log(file.data)
      const messages = JSON.parse(window.localStorage.getItem('messages'))
      const decryptFile = privateDecrypt({toDecrypt: file.data, privateKey: messages.privateKey})
      console.log(decryptFile)
      const type = mime.extension(decryptFile.type)
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <div className={styles.iconType}>
              <FileIcon extension={type} size={25} {...defaultStyles[type]} />
            </div>
          </td>
          <td style={{textAlign: 'left', fontWeigth: 'bold'}}>
            <LengthName name={decryptFile.name} />
          </td>
          <td>{type}</td>
          <td>{getSize(decryptFile.size)}</td>
          <td>
            <Tooltip content={this.getStorageDescription(storage[decryptFile.storageType])}>
              {storage[decryptFile.storageType]}
            </Tooltip>
          </td>
          <td>{moment(decryptFile.createdAt).format('LL')}</td>
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
              <td>{translate('vaults.storage')}</td>
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
