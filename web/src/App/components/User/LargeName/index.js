import React from 'react'
import styles from './styles.css'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'

export default function LargeName(props) {
  const {name, large, subString} = props
  const largeAccepted = large || 22
  const stringCut = subString || 22
  const acceptedName = name.length > largeAccepted ? name.substring(0, stringCut) + '... ' : name
  const largeName = name.length > largeAccepted
  return (
    <div className={largeName ? styles.large : styles.container}>
      <Tooltip content={largeName && name} place="top">
        {acceptedName}
      </Tooltip>
    </div>
  )
}
