import React from 'react'
import styles from './styles.module.css'
import LengthName from 'App/components/User/LengthName'
import {Vault} from 'App/components/Parts/Icons'
import getSize from 'App/helpers/files/getSize'
import Options from './Options'
import moment from 'moment'
import translate from 'App/i18n/translate'

const Items = ({history, items, credentialType}) => {
  const renderTable = () => {
    const vaults = items || []
    return vaults.map((vault, index) => {
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <Vault size={25} />
          </td>
          <td style={{textAlign: 'left', fontWeigth: 'bold'}}>
            <LengthName name={vault.name} />
          </td>
          <td>{vault.fileCount || '0'}</td>
          <td>{getSize(vault.storageUsed)}</td>
          <td>{moment(vault.createdAt).format('LL')}</td>
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
              <td style={{textAlign: 'left'}}>Nombre</td>
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
