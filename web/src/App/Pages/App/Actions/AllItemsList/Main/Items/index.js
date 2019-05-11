import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import actionIcons from './actionIcons'
import Action from './Action'
import moment from 'moment'

export default class Items extends React.Component {
  static propTypes = {
    items: PropTypes.array
  }

  renderTable() {
    const actions = this.props.items || []
    return actions.map((action, index) => {
      const Icon = actionIcons[action.data.action]
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <div className={styles.iconType}>
              <Icon size={25} />
            </div>
          </td>
          <td style={{textAlign: 'left'}}>
            <Action action={action} />
          </td>
          <td>{moment(action.createdAt).format('LLLL')}</td>
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
              <td style={{textAlign: 'left'}}>Acción</td>
              <td style={{width: '10%'}}>Fecha</td>
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
