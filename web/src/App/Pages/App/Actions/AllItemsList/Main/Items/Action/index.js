import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import LengthName from 'App/components/User/LengthName'

export default class Action extends React.Component {
  static propTypes = {
    action: PropTypes.object
  }

  renderLargeMessage(firstText, firstName, secondText, secondName) {
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

  renderShortMessage(text, name) {
    return (
      <div className={styles.message}>
        <div>{text}</div>
        <div className={styles.name}>
          <LengthName name={name} length={30} subString={25} />
        </div>
      </div>
    )
  }

  render() {
    const {action, vaultName, fileName, newVaultName} = this.props.action.data
    if (action.includes('uploadFile')) {
      return this.renderLargeMessage('Subiste el archivo', fileName, 'a la bóveda', vaultName)
    }
    if (action.includes('downloadFile')) {
      return this.renderLargeMessage(
        'Descargaste el archivo',
        fileName,
        'desde la bóveda',
        vaultName
      )
    }
    if (action.includes('deleteFile')) {
      return this.renderLargeMessage('Elimiaste el archivo', fileName, 'desde la bóveda', vaultName)
    }
    if (action.includes('restoreFile')) {
      return this.renderLargeMessage('Restauraste el archivo', fileName, 'a la bóveda', vaultName)
    }
    if (action.includes('createVault')) {
      return this.renderShortMessage('Creaste la bóveda', vaultName)
    }
    if (action.includes('updateVault')) {
      return this.renderLargeMessage(
        'Actualizaste el nombre de la bóveda',
        vaultName,
        'a',
        newVaultName
      )
    }
    if (action.includes('deleteVault')) {
      return this.renderShortMessage('Eliminaste la bóveda', vaultName)
    }
  }
}
