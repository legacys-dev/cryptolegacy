import React from 'react'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'

const getStatus = function(props, status) {
  return props.status === status
}

const heritagesTypes = [
  {
    name: 'Pendientes',
    type: 'waiting'
  },
  {
    name: 'En proceso',
    type: 'available'
  },
  {
    name: 'Reclamadas',
    type: 'claimed'
  }
]

export default function Options(props) {
  const options = heritagesTypes.map((heritageType, index) => {
    const {name, type} = heritageType
    return (
      <div key={index}>
        <Button
          style={{marginLeft: '5px'}}
          disabled={getStatus(props, type)}
          onClick={() => props.setStatus(type)}>
          {name}
        </Button>
      </div>
    )
  })
  return <div className={styles.container}>{options}</div>
}
