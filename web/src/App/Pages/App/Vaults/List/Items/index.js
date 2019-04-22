import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withRouter} from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import NoItemsFound from './NoItemsFound'
import Loading from 'orionsoft-parts/lib/components/Loading'
import {MdSettingsApplications} from 'react-icons/md'
import {Vault} from 'App/components/Parts/Icons'
import moment from 'moment'

@withRouter
export default class Items extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    items: PropTypes.array
  }

  state = {}

  renderOptions(vault) {
    const {history} = this.props
    return (
      <div className={styles.options}>
        <div className={styles.settings}>
          <MdSettingsApplications
            size={25}
            onClick={() => history.push(`/vaults/storage-update/${vault._id}`)}
          />
        </div>
      </div>
    )
  }

  renderTable() {
    const vaults = this.props.items || []
    return vaults.map((vault, index) => {
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <Vault />
          </td>
          <td style={{textAlign: 'left'}}>
            <strong>{vault.name}</strong>
          </td>
          <td>{vault.fileCount || 0}</td>
          <td>{vault.storageUsed || 0} Bytes</td>
          <td>{moment(vault.createdAt).format('LL')}</td>
          <td>{this.renderOptions(vault)}</td>
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
