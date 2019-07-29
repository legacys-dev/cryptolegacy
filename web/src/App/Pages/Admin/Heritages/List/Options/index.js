import React from 'react'
import styles from './styles.module.css'
import Button from 'App/components/Parts/Button'
import translate from 'App/i18n/translate'

const heritagesTypes = [
  {
    name: translate('admin.pendings'),
    type: 'waiting'
  },
  {
    name: translate('admin.inProcess'),
    type: 'available'
  },
  {
    name: translate('admin.claimed'),
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
