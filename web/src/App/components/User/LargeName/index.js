import React from 'react'
import styles from './styles.css'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'

export default function LargeName(props) {
  const {name} = props
  const acceptedName = name.length > 20 ? name.substring(0, 17) + '...' : name
  const largeName = name.length > 20
  return (
    <div className={largeName ? styles.large : styles.container}>
      <Tooltip content={acceptedName && name} place="top">
        {acceptedName}
      </Tooltip>
    </div>
  )
}
