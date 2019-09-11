import React from 'react'
import styles from './styles.module.css'
import Sidebar from './Sidebar'
import Container from 'App/components/Parts/Container/'

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Container>{children}</Container>
      </div>
    </div>
  )
}

export default Layout
