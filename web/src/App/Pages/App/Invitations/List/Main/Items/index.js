import React from 'react'
import styles from './styles.module.css'
import translate from 'App/i18n/translate'
import { Contract } from 'App/components/Parts/Icons'
import AcceptInvitation from 'App/components/Parts/AcceptInvitation'
import DeclineInvitation from 'App/components/Parts/DeclineInvitation'
import moment from 'moment'

const Items = ({ items, onUpdate }) => {
  const onDeclineSuccess = () => {
    const updateDate = new Date()
    onUpdate(updateDate)
  }

  const onAcceptSuccess = response => {
    onUpdate(response)
  }

  const renderButtons = (vaultPolicyId, token) => {
    return (
      <div className={styles.actions}>
        <AcceptInvitation
          vaultPolicyId={vaultPolicyId}
          accessToken={token}
          onAcceptSuccess={onAcceptSuccess}
        />
        <DeclineInvitation
          vaultPolicyId={vaultPolicyId}
          accessToken={token}
          onDeclineSuccess={onDeclineSuccess}
        />
      </div>
    )
  }

  const renderTable = () => {
    const invitations = items || []
    return invitations.map((invitation, index) => {
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <Contract size={20} />
          </td>
          <td>{invitation.userEmail}</td>
          <td>{invitation.role}</td>
          <td>{invitation.creatorEmail}</td>
          <td>{moment(invitation.createdAt).format('L')}</td>
          <td>{renderButtons(invitation.vaultPolicyId, invitation.token)}</td>
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
              <td>{translate('invitations.invitedEmail')}</td>
              <td>{translate('invitations.invitedRole')}</td>
              <td>{translate('invitations.creatorEmail')}</td>
              <td style={{ width: '10%' }}>{translate('invitations.createdAt')}</td>
              <td />
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
