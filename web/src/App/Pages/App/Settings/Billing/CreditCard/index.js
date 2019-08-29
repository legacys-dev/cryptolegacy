import React from 'react'
import styles from './styles.css'


export default function Card({data, firstName,lastName}) {
  console.log(data)
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Asd</div>
      <div className={styles.code}>**** **** **** {data.last4Digits}</div>
      <div className={styles.nameAndDate}>
        <div className={styles.name}>
          <div>
            Propietario
          </div>
          <div>
          {`${firstName} ${lastName}`}
          </div>
        </div>
        <div className={styles.date}>
          <div>
            Expiración
          </div>
          <div>
           - / - 
          </div>
        </div>
      </div>
    </div>
  )
}
