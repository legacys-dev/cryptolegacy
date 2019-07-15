import React from 'react'
import styles from './styles.module.css'
import {Alert} from 'App/components/Parts/Icons'

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Alert size={60} />
      </div>
      <div className={styles.title}>Gracias por crearte una cuenta en CryptoLegacy!</div>
      <div className={styles.danger}>
        A continuación se encuentra tu <strong>kit de emergencia</strong>. Este documento es de
        vital importancia ya que contiene tu <strong>llave maestra</strong>.
        <br /> Debes imprimir y guardar en un lugar seguro este documento ya que esta información es
        de vital importancia para que puedas entrar en la plataforma y recuperar tus archivos.
      </div>
      <div className={styles.downloadTip}>
        Puedes descargar el pdf haciendo click derecho sobre el documento y seleccionando guardar
        como, o puedes pasa el mouse por encima de la parte superior del pdf y a la derecha
        aparecerá la opción de descarga.
      </div>
    </div>
  )
}

export default Header
