import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {MdArrowDropDown} from 'react-icons/md'
import {UserIcon} from 'App/components/Parts/Icons'

export default class MenuButton extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    toggleMenu: PropTypes.func
  }

  renderUserPic(user) {
    return (
      <div className={styles.pic}>
        <UserIcon size={30} color={'#91a2b0'} />
      </div>
    )
  }

  render() {
    const {user, toggleMenu} = this.props
    if (!user) return <span />
    return (
      <div className={styles.container} onClick={toggleMenu}>
        {this.renderUserPic()}
        <div className={styles.name}> {user.name || 'Cuenta'} </div>
        <div className={styles.arrow}>
          <MdArrowDropDown size={20} />
        </div>
      </div>
    )
  }
}
