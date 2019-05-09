import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import isEmpty from 'lodash/isEmpty'
import NoItemsFound from 'App/components/Parts/NoItemsFound'
import Loading from 'App/components/Parts/Loading'
import LargeName from 'App/components/User/LargeName'
import {Vault} from 'App/components/Parts/Icons'
import getSize from 'App/helpers/files/getSize'
import Options from './Options'
import moment from 'moment'

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
          <td style={{textAlign: 'left', fontWeigth: 'bold'}}>
            <LargeName name={vault.name} />
          </td>
          <td>{vault.fileCount || '0'}</td>
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
              <td>Acciones</td>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    )
  }

  render() {
    if (!this.props.items) return <Loading />
    if (isEmpty(this.props.items)) return <NoItemsFound message="vaults.notFound" />
    return <div className={styles.container}>{this.renderVaults()}</div>
  }
}
