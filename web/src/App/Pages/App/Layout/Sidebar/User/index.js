import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {MdExitToApp, MdWork} from 'react-icons/md'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import withUserId from 'App/helpers/auth/withUserId'
import {withRouter, Link} from 'react-router-dom'
import logout from 'App/helpers/auth/logout'
import {Configuration} from 'App/components/Parts/Icons'
import autobind from 'autobind-decorator'
import MenuButton from './MenuButton'
import gql from 'graphql-tag'
import translate from 'App/i18n/translate'

@withGraphQL(
  gql`
    query getMe {
      me {
        _id
        name
        email
        roles
      }
    }
  `,
  {
    loading: null
  }
)
@withUserId
@withRouter
export default class User extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    me: PropTypes.object,
    userId: PropTypes.string
  }

  state = {open: false}

  componentDidMount() {
    window.addEventListener('mouseup', this.closeMenu, false)
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.closeMenu)
  }

  @autobind
  async closeMenu(event) {
    if (!this.state.open) return true
    await sleep(100)
    this.setState({open: false})
  }

  toggleMenu = () => {
    this.setState({open: !this.state.open})
  }

  @autobind
  async logout() {
    await logout()
  }

  renderAdmin() {
    const {me} = this.props
    if (!me || !me.roles || !me.roles.includes('admin')) return
    return (
      <Link to="/admin">
        {this.renderOption(styles.options, <MdWork size={20} />, translate('sidebar.adminPanel'))}
      </Link>
    )
  }

  renderOption(style, icon, title) {
    return (
      <div className={style}>
        <div>{icon}</div>
        <div style={{width: '150px', marginLeft: '60px'}}>{title}</div>
      </div>
    )
  }

  renderMenu() {
    if (!this.props.me) return
    if (!this.state.open) return
    return (
      <div className={styles.menu} key="menu">
        <Link to="/settings" className={styles.account}>
          <div className={styles.name}>{this.props.me.name || translate('sidebar.accountOut')}</div>
          <div className={styles.email}>{this.props.me.email}</div>
        </Link>
        <Link to="/settings">
          {this.renderOption(styles.options, <Configuration size={20} />, translate('sidebar.account'))}
        </Link>
        {this.renderAdmin()}
        <div className={styles.logoutIcons}>
          <a onClick={this.logout} className={styles.menuLink}>
            <MdExitToApp size={25} />
            <div>{translate('sidebar.exit')}</div>
          </a>
        </div>
      </div>
    )
  }

  renderIcon() {
    if (this.props.me) {
      return <MenuButton user={this.props.me} toggleMenu={this.toggleMenu} />
    }
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderIcon()}
        <ReactCSSTransitionGroup
          transitionName="user-menu"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.renderMenu()}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
