import React from 'react'
import styles from './styles.module.css'
import LengthName from 'App/components/User/LengthName'
import translate from 'App/i18n/translate'

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
    return renderLargeMessage(
      translate('app.uploadFile'),
      fileName,
      translate('app.toVault'),
      vaultName
    )
  }
  if (action.includes('downloadFile')) {
    return renderLargeMessage(
      translate('app.downloadFile'),
      fileName,
      translate('app.fromVault'),
      vaultName
    )
  }
  if (action.includes('deleteFile')) {
    return renderLargeMessage(
      translate('app.deleteFile'),
      fileName,
      translate('app.fromVault'),
      vaultName
    )
  }
  if (action.includes('restoreFile')) {
    return renderLargeMessage(
      translate('app.restoreFile'),
      fileName,
      translate('app.toVault'),
      vaultName
    )
  }
  if (action.includes('createVault')) {
    return renderShortMessage(translate('app.createVault'), vaultName)
  }
  if (action.includes('updateVault')) {
    return renderLargeMessage(
      translate('app.updateVault'),
      vaultName,
      translate('app.to'),
      newVaultName
    )
  }
  if (action.includes('deleteVault')) {
    return renderShortMessage(translate('app.deleteVault'), vaultName)
  }
}

export default Action
