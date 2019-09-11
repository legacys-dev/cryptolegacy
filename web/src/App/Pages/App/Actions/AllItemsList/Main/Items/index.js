import React from 'react'
import styles from './styles.module.css'
import actionIcons from './actionIcons'
import Action from './Action'
import moment from 'moment'
import translate from 'App/i18n/translate'

const Items = ({ items }) => {
  const renderTable = () => {
    const actions = items || []
    return actions.map((action, index) => {
      const Icon = actionIcons[action.data.action]
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <div className={styles.iconType}>
              <Icon size={20} />
            </div>
          </td>
          <td style={{ textAlign: 'left' }}>
            <Action actions={action} />
          </td>
          <td>{moment(action.createdAt).format('LLLL')}</td>
        </tr>
      )
    })
  }

  const renderFiles = () => {
    return (
      <div className={styles.files}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td style={{ width: '1%' }} />
              <td style={{ textAlign: 'left' }}>{translate('actions.action')}</td>
              <td style={{ width: '10%' }}>{translate('actions.date')}</td>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    )
  }
  return <div className={styles.container}>{renderFiles()}</div>
}

export default Items
