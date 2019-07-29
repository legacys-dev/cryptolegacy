import React from 'react'
import styles from './styles.module.css'
import Menu from './Menu'
import Container from 'App/components/Parts/Container/'

const SideMenu = ({children, links, title, rootPath, backPath}) => {
  return (
    <div className={styles.container}>
      <Menu backPath={backPath} links={links} title={title} rootPath={rootPath} />
      <div className={styles.content}>
        <Container>{children}</Container>
      </div>
    </div>
  )
}

SideMenu.defaultProps = {
  links: [],
  title: 'Admin',
  rootPath: '/'
}

export default SideMenu
