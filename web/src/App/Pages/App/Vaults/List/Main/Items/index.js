import React from 'react'
import styles from './styles.module.css'
import LengthName from 'App/components/User/LengthName'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import { Vault } from 'App/components/Parts/Icons'
import getSize from 'App/helpers/files/getSize'
import translate from 'App/i18n/translate'
import Options from './Options'
import VaultCard from 'src/App/components/Parts/VaultCard'


const Items = ({ history, items, credentialType }) => {
  const getStorageDescription = type => {
    if (type === 'SS' || type === 'AS') {
      return translate('fileManager.simpleTypeDescription')
    } else if (type === 'HSS' || type === 'AAS') {
      return translate('fileManager.highTypeDescription')
    } else {
      return translate('fileManager.driveTypeDescription')
    }
  }

  const renderTable = () => {
    const vaults = items || []
    return vaults.map((vault, index) => {
      const vaultType = translate(vault.storageType)
      /* return (
        <tr className={styles.cell} key={index}>
          <td>
            <Vault size={25} />
          </td>
          <td style={{ textAlign: 'left', fontWeigth: 'bold' }}>
            <LengthName name={vault.name} />
          </td>
          <td>{vault.fileCount || '0'}</td>
          <td>{getSize(vault.storageUsed)}</td>
          <td>
            <Tooltip content={getStorageDescription(vaultType)}>
              <strong>{vaultType}</strong>
            </Tooltip>
          </td>
          <td>
            <Options vaultId={vault._id} credentialType={credentialType} />
          </td>
        </tr>
      )*/ 
      return(
        <VaultCard 
        vaultId={vault['_id']}
        heirsData = {vault.heritages}
        key={'vaultCard'+index}
        numberFiles = {vault.fileCount}
        size={vault.storageUsed}
        vaultName={vault.name}
        owner 
        
        />
      )
    })
  }

  const renderVaults = () => {
    return (
      <div className={styles.vaults}>
        {renderTable()}
      </div>
    )
  }

  return <div className={styles.container}>{renderVaults()}</div>
}

export default Items
