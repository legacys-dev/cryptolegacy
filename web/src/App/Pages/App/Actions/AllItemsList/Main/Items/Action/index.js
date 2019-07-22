import React from 'react'
import styles from './styles.module.css'
import LengthName from 'App/components/User/LengthName'

const Action = ({actions}) => {
  const renderLargeMessage = (firstText, firstName, secondText, secondName) => {
    return (
      <div className={styles.message}>
        <div>{firstText}</div>
        <div className={styles.name}>
          <LengthName name={firstName} length={30} subString={25} />
        </div>
        <div>{secondText}</div>
        <div className={styles.name}>
          <LengthName name={secondName} length={30} subString={25} />
        </div>
      </div>
    )
  }

  const renderShortMessage = (text, name) => {
    return (
      <div className={styles.message}>
        <div>{text}</div>
        <div className={styles.name}>
          <LengthName name={name} length={30} subString={25} />
        </div>
      </div>
    )
  }

  const {action, vaultName, fileName, newVaultName} = actions.data
  if (action.includes('uploadFile')) {
    return renderLargeMessage('Subiste el archivo', fileName, 'a la bóveda', vaultName)
  }
  if (action.includes('downloadFile')) {
    return renderLargeMessage('Descargaste el archivo', fileName, 'desde la bóveda', vaultName)
  }
  if (action.includes('deleteFile')) {
    return renderLargeMessage('Elimiaste el archivo', fileName, 'desde la bóveda', vaultName)
  }
  if (action.includes('restoreFile')) {
    return renderLargeMessage('Restauraste el archivo', fileName, 'a la bóveda', vaultName)
  }
  if (action.includes('createVault')) {
    return renderShortMessage('Creaste la bóveda', vaultName)
  }
  if (action.includes('updateVault')) {
    return renderLargeMessage('Actualizaste el nombre de la bóveda', vaultName, 'a', newVaultName)
  }
  if (action.includes('deleteVault')) {
    return renderShortMessage('Eliminaste la bóveda', vaultName)
  }
}

export default Action
