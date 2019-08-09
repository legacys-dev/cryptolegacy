import React from 'react'
import styles from './styles.module.css'
import LengthName from 'App/components/User/LengthName'
import {Vault} from 'App/components/Parts/Icons'
import getSize from 'App/helpers/files/getSize'
import Options from './Options'
import moment from 'moment'
import translate from 'App/i18n/translate'
import privateDecrypt from 'App/helpers/crypto/privateDecrypt'

const Items = ({history, items, credentialType}) => {
  const renderTable = () => {
    const vaults = items || []
    return vaults.map((vault, index) => {
      const messages = JSON.parse(window.localStorage.getItem('messages'))
      const decryptVault = privateDecrypt({toDecrypt: vault.data, privateKey: messages.privateKey})
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <Vault size={25} />
          </td>
          <td style={{textAlign: 'left', fontWeigth: 'bold'}}>
            <LengthName name={decryptVault.name} />
          </td>
          <td>{decryptVault.fileCount || '0'}</td>
          <td>{getSize(decryptVault.storageUsed)}</td>
          <td>{moment(decryptVault.createdAt).format('LL')}</td>
          <td>
            <Options vaultId={vault._id} credentialType={credentialType} />
          </td>
        </tr>
      )
    })
  }

  const renderVaults = () => {
    return (
      <div className={styles.vaults}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td style={{width: '1%'}} />
              <td style={{textAlign: 'left'}}>{translate('vaults.name')}</td>
              <td>{translate('vaults.files')}</td>
              <td>{translate('vaults.size')}</td>
              <td>{translate('vaults.creationDate')}</td>
              <td>{translate('vaults.actions')}</td>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    )
  }

  return <div className={styles.container}>{renderVaults()}</div>
}

export default Items
