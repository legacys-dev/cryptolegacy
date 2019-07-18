import React from 'react'
import styles from './styles.module.css'
import {MdArrowDropDown} from 'react-icons/md'
import {UserIcon} from 'App/components/Parts/Icons'
import AppTypeMesssage from 'App/components/AppTypeMesssage'

const MenuButton = ({user, toggleMenu}) => {
  const renderUserPic = () => {
    return (
      <div className={styles.pic}>
        <UserIcon size={30} color={'#91a2b0'} />
      </div>
    )
  }
  if (!user) return <span />
  return (
    <div className={styles.container} onClick={toggleMenu}>
      <div className={styles.user}>
        {renderUserPic()}
        <div className={styles.name}> {user.name || 'Cuenta'} </div>
        <div className={styles.arrow}>
          <MdArrowDropDown size={20} />
        </div>
      </div>
      <AppTypeMesssage />
    </div>
  )
}

export default MenuButton
