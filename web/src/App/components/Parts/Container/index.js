import React from 'react'
import styles from './styles.module.css'
import sizes from './styleTypes'

Container.defaultProps = {
  size: 'big' // {fullWith, big, medium, small}
}

export default function Container({ className, size, children }) {
  const getClassName = () => {
    return `${styles.os_container} ${sizes[size]}`
  }

  return <div className={getClassName()}>{children}</div>
}
