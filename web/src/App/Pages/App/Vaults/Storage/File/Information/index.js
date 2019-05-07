import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Section from 'App/components/Section'
import getSize from 'App/helpers/files/getSize'
import moment from 'moment'

const storage = {
  b2: 'simple storage',
  glacier: 'high security storage'
}

export default class Information extends React.Component {
  static propTypes = {
    file: PropTypes.object
  }

  renderInformation(title, info) {
    return (
      <div className={styles.content}>
        <div className="row">
          <div className="col-xs-12 col-sm-3 end-sm" style={{color: '#999999'}}>
            {title}
          </div>
          <div className="col-xs-12 col-sm-9 start-sm">{info}</div>
        </div>
      </div>
    )
  }

  render() {
    const {file} = this.props
    if (!file) return <span />
    return (
      <div className={styles.container}>
        <Section title="Archivo" description="description">
          <div className={styles.file}>
            {this.renderInformation('Nombre:', file.data.name)}
            {this.renderInformation('Tipo:', file.data.type)}
            {this.renderInformation('Peso:', getSize(file.data.size))}
            {this.renderInformation('Bóveda:', file.vaultName)}
            {this.renderInformation('Tipo de almacenamiento:', storage[file.data.storageType])}
            {this.renderInformation('Creado:', moment(file.createdAt).format('LL'))}
          </div>
        </Section>
      </div>
    )
  }
}
