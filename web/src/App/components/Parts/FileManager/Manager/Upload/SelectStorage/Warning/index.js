import React from 'react'
import getEnv from 'App/Root/getEnv'
import styles from './styles.css'

export default class Warning extends React.Component {
  static propTypes = {}

  renderInBetaMode() {
    return (
      <div className={styles.message}>
        <strong style={{color: 'red'}}>Advertencia</strong>: La aplicación se está ejecutando en
        modo <strong>beta</strong>. Te recomendamos que mientras la pruebes, no subas archivos que
        tienen una importancia real para ti, ya que las actualizaciones que sufra la aplicación
        harán que tus archivos sean irrecuperables.
      </div>
    )
  }

  renderInDevMode() {
    return (
      <div className={styles.message}>
        <strong>Advertencia</strong>: Apliación corriendose en modo DEV
      </div>
    )
  }

  render() {
    if (getEnv() === 'beta') return this.renderInBetaMode()
    if (getEnv() === 'dev') return this.renderInDevMode()
    return <span />
  }
}
