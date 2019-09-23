import React, { useState } from 'react'
import styles from './styles.css'
import Main from './Main'
import List from './List'

const Seats = () => {
  const [newSeat, setNewSeat] = useState('')

  const onGettingNewSeat = seatId => {
    setNewSeat(seatId)
  }

  return (
    <div className={styles.container}>
      <Main onGettingNewSeat={onGettingNewSeat} />
      <List newSeatId={newSeat} />
    </div>
  )
}

export default Seats
