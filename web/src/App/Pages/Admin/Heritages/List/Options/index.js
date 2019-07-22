import React from 'react'
import styles from './styles.module.css'
import Button from 'App/components/Parts/Button'

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
    type: 'active'
  }
]

const Options = ({setStatus, status}) => {
  const options = () => {
    return heritagesTypes.map((heritageType, index) => {
      const {name, type} = heritageType
      return (
        <div key={index}>
          <Button
            style={{marginLeft: '5px'}}
            disabled={status === type}
            onClick={() => setStatus(type)}>
            {name}
          </Button>
        </div>
      )
    })
  }

  return <div className={styles.container}>{options}</div>
}

export default Options
