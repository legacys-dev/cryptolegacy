import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {MdVpnKey, MdExitToApp, MdWork} from 'react-icons/md'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import withUserId from 'App/helpers/auth/withUserId'
import {withRouter, Link} from 'react-router-dom'
import logout from 'App/helpers/auth/logout'
import {Configuration} from 'App/components/Parts/Icons'
import autobind from 'autobind-decorator'
import MenuButton from './MenuButton'
import gql from 'graphql-tag'

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

  @autobind
  login() {
    this.props.history.push('/login')
  }

  renderAdmin() {
    const {me} = this.props
    if (!me || !me.roles || !me.roles.includes('admin')) return
    return (
      <Link to="/admin">
        {this.renderOption(styles.options, <MdWork size={20} />, 'Admin panel')}
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
          <div className={styles.name}>{this.props.me.name || 'Cuenta'}</div>
          <div className={styles.email}>{this.props.me.email}</div>
        </Link>
        <Link to="/settings">
          {this.renderOption(styles.options, <Configuration size={20} />, 'Mi cuenta')}
        </Link>
        {this.renderAdmin()}
        <div className={styles.logoutIcons}>
          <a onClick={this.logout} className={styles.menuLink}>
            <MdExitToApp size={25} />
            <div>Salir</div>
          </a>
        </div>
      </div>
    )
  }

  renderIcon() {
    const {me} = this.props
    if (me) {
      return <MenuButton user={me} toggleMenu={this.toggleMenu} />
    } else if (!this.props.userId) {
      return <MdVpnKey className={styles.icon} size={25} onClick={this.login} />
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
