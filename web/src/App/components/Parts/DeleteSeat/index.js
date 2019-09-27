import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import translate from 'App/i18n/translate'

const DeleteSeat = ({ seatId, onCancelSuccess }) => {
  return (
    <div className={styles.container}>
      <MutationButton
        title={translate('seats.delete')}
        message={translate('seats.deleteMessage')}
        confirmText={translate('seats.delete')}
        mutation="cancelSeat"
        danger
        params={{ seatId }}
        onSuccess={response => onCancelSuccess(response)}>
        <div className={styles.delete}>{translate('seats.delete')}</div>
      </MutationButton>
    </div>
  )
}

export default DeleteSeat
