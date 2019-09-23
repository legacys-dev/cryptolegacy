import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { Contract } from 'App/components/Parts/Icons'
import DeletePolicy from 'App/components/Parts/DeletePolicy'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import privateDecrypt from 'App/helpers/crypto/privateDecrypt'
import translate from 'App/i18n/translate'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router'
import statusType from './status'
import moment from 'moment'

@withMessage
@withRouter
export default class Items extends React.Component {
  static propTypes = {
    router: PropTypes.object,
    showMessage: PropTypes.func,
    history: PropTypes.object,
    items: PropTypes.array,
    onDeleteItem: PropTypes.func
  }

  state = {}

  @autobind
  onDeleteSuccess() {
    this.props.onDeleteItem(new Date())
    this.props.showMessage(translate('vaults.deleteHeritageMessage'))
  }

  renderUpdateButton(data) {
    const { vaultId, vaultPolicyId } = data
    return (
      <div className={styles.update}>
        <div
          className={styles.updateButton}
          onClick={() =>
            this.props.history.push(`/vaults/invitations/${vaultId}/${vaultPolicyId}/update`)
          }>
          Update
        </div>
      </div>
    )
  }

  renderTable() {
    const invitations = this.props.items || []
    return invitations.map((invitation, index) => {
      const messages = JSON.parse(window.localStorage.getItem('messages'))
      const decryptInvitation = privateDecrypt({
        toDecrypt: invitation.data,
        privateKey: messages.privateKey
      })
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <Contract size={25} />
          </td>
          <td>{decryptInvitation.userEmail}</td>
          <td>{statusType[decryptInvitation.status]}</td>
          <td>{moment(decryptInvitation.createdAt).format('LL')}</td>
          <td>
            <div className={styles.buttons}>
              {this.renderUpdateButton(decryptInvitation)}
              <DeletePolicy
                vaultPolicyId={decryptInvitation.vaultPolicyId}
                userId={decryptInvitation.userId}
                onDeleteSuccess={this.onDeleteSuccess}
              />
            </div>
          </td>
        </tr>
      )
    })
  }

  renderHeritages() {
    return (
      <div className={styles.vaults}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td style={{ width: '1%' }} />
              <td>{translate('invitations.invitedEmail')}</td>
              <td>{translate('vaults.status')}</td>
              <td>{translate('vaults.creationDate')}</td>
              <td style={{ width: '5%' }} />
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    )
  }

  render() {
    return <div className={styles.container}>{this.renderHeritages()}</div>
  }
}
