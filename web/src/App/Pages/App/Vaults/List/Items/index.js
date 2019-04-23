import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import isEmpty from 'lodash/isEmpty'
import NoItemsFound from './NoItemsFound'
import Loading from 'orionsoft-parts/lib/components/Loading'
import {Vault} from 'App/components/Parts/Icons'
import moment from 'moment'
import Options from './Options'
import getSize from 'App/helpers/files/getSize'

export default class Items extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    items: PropTypes.array
  }

  state = {}

  renderTable() {
    const vaults = this.props.items || []
    return vaults.map((vault, index) => {
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <Vault size={25} />
          </td>
          <td style={{textAlign: 'left'}}>
            <strong>{vault.name}</strong>
          </td>
          <td>{vault.fileCount || 0}</td>
          <td>{getSize(vault.storageUsed)}</td>
          <td>{moment(vault.createdAt).format('LL')}</td>
          <td>
            <Options vaultId={vault._id} />
          </td>
        </tr>
      )
    })
  }

  renderVaults() {
    return (
      <div className={styles.vaults}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td style={{width: '1%'}} />
              <td style={{textAlign: 'left'}}>Nombre</td>
              <td>Archivos</td>
              <td>Almacenamiento</td>
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
    const {items} = this.props
    if (!items) return <Loading />
    if (isEmpty(items)) return <NoItemsFound />
    return <div className={styles.container}>{this.renderVaults()}</div>
  }
}
