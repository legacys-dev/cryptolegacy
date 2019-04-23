import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import isEmpty from 'lodash/isEmpty'
import NoItemsFound from './NoItemsFound'
import Loading from 'orionsoft-parts/lib/components/Loading'
import {VaultConsumer} from 'App/helpers/contexts/personalVaultContext'
import {Vault} from 'App/components/Parts/Icons'
import getSize from 'App/helpers/files/getSize'
import moment from 'moment'
import mime from 'mime-types'
import Options from './Options'

const storage = {
  b2: 'simple storage',
  glacier: 'high security storage'
}

export default class Items extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    items: PropTypes.array
  }

  state = {}

  renderTable() {
    const files = this.props.items || []
    return files.map((file, index) => {
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <Vault size={25} />
          </td>
          <td style={{textAlign: 'left'}}>
            <strong>{file.s3Data.name}</strong>
          </td>
          <td>{mime.extension(file.s3Data.type)}</td>
          <td>{getSize(file.s3Data.size)}</td>
          <td>{storage[file.storage]}</td>
          <td>{moment(file.createdAt).format('LL')}</td>
          <td>
            <VaultConsumer>
              {providerProps => <Options file={file} userVaultId={providerProps.userVaultId} />}
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
              <td style={{width: '1%'}} />
              <td style={{textAlign: 'left'}}>Nombre</td>
              <td>Tipo</td>
              <td>Peso</td>
              <td>Storage</td>
              <td>Fecha de creación</td>
              <td>Opciones</td>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    )
  }

  render() {
    if (!this.props.items) return <Loading />
    if (isEmpty(this.props.items)) return <NoItemsFound />
    return <div className={styles.container}>{this.renderFiles()}</div>
  }
}
