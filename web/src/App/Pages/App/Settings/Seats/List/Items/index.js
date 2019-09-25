import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import translate from 'App/i18n/translate'
import { Seat } from 'App/components/Parts/Icons'
import DeleteSeat from 'App/components/Parts/DeleteSeat'
import moment from 'moment'
import autobind from 'autobind-decorator'

export default class Items extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    items: PropTypes.array,
    cancelSeat: PropTypes.func
  }

  state = {}

  @autobind
  onCancelSeat(response) {
    this.props.cancelSeat(response)
  }

  renderTable() {
    const seats = this.props.items || []
    return seats.map((seat, index) => {
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <Seat size={25} />
          </td>
          <td>{seat.available ? 'Available' : 'Not available'}</td>
          <td>{seat.vault || '-'}</td>
          <td>{seat.userEmail || '-'}</td>
          <td>{seat.updatedAt ? moment(seat.updatedAt).format('LL') : 'No updates yet'}</td>
          <td>
            {seat.available && <DeleteSeat seatId={seat._id} onCancelSuccess={this.onCancelSeat} />}
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
              <td style={{ width: '5%' }} />
              <td>{translate('invitations.status')}</td>
              <td>{translate('vaults.name')}</td>
              <td>{translate('invitations.invitedEmail')}</td>
              <td>{translate('global.updatedAt')}</td>
              <td />
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
