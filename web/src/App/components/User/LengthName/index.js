import React from 'react'
import styles from './styles.module.css'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import classnames from 'classnames'

const Length = ({name, length, subString}) => {
  const lengthAccepted = length || 22
  const stringCut = subString || 22
  const acceptedName = name.length > lengthAccepted ? name.substring(0, stringCut) + '... ' : name
  const biggerName = name.length > lengthAccepted

  const style = biggerName ? classnames(styles.container, styles.length) : styles.container

  return (
    <div className={style}>
      <Tooltip content={biggerName && name} place="top">
        {acceptedName}
      </Tooltip>
    </div>
  )
}

export default Length
