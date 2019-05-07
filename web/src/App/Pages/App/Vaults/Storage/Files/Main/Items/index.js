import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {VaultConsumer} from 'App/helpers/contexts/personalVaultContext'
import LargeName from 'App/components/User/LargeName'
import getSize from 'App/helpers/files/getSize'
import FileIcon, {defaultStyles} from 'react-file-icon'
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
      const {data, createdAt} = file
      const type = mime.extension(data.type)
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <div className={styles.iconType}>
              <FileIcon extension={type} size={25} {...defaultStyles[type]} />
            </div>
          </td>
          <td style={{textAlign: 'left', fontWeigth: 'bold'}}>
            <LargeName name={data.name} />
          </td>
          <td>{type}</td>
          <td>{getSize(data.size)}</td>
          <td>{storage[data.storageType]}</td>
          <td>{moment(createdAt).format('LL')}</td>
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
              <td style={{width: '5%'}} />
              <td style={{textAlign: 'left'}}>Nombre</td>
              <td>Tipo</td>
              <td>Peso</td>
              <td>Storage</td>
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
    return <div className={styles.container}>{this.renderFiles()}</div>
  }
}
