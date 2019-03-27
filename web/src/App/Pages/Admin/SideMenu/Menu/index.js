import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {MdKeyboardBackspace} from 'react-icons/md'
import logout from 'App/helpers/auth/logout'
import {withRouter} from 'react-router'

@withRouter
export default class Menu extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    environment: PropTypes.object,
    links: PropTypes.array,
    title: PropTypes.node,
    rootPath: PropTypes.string,
    backPath: PropTypes.string
  }

  renderLink({title, path}, useFullToCheck) {
    const active = useFullToCheck
      ? this.props.location.pathname === path
      : this.props.location.pathname.startsWith(path)
    return (
      <Link key={path} to={path} className={active ? styles.itemActive : styles.menuItem}>
        {title}
      </Link>
    )
  }

  renderLinks() {
    return this.props.links.map(link => {
      return this.renderLink(link, true)
    })
  }

  renderBack() {
    if (!this.props.backPath) return
    return (
      <div className={styles.logout} onClick={() => this.props.history.push(this.props.backPath)}>
        <MdKeyboardBackspace />
        <span style={{marginLeft: 5}}>Volver</span>
      </div>
    )
  }

  renderLogout() {
    if (this.props.backPath) return
    return (
      <div className={styles.logout} onClick={logout}>
        <MdKeyboardBackspace />
        <span style={{marginLeft: 5}}>Salir</span>
      </div>
    )
  }

  renderSettings() {
    if (this.props.backPath) return
    return this.renderLink({title: 'Mi cuenta', path: '/settings'})
  }

  render() {
    return (
      <div className={styles.container}>
        <Link to={this.props.rootPath} className={styles.title}>
          {this.props.title}
        </Link>
        <div className={styles.divider} />
        {this.renderLinks()}
        <div className={styles.divider} />
        {this.renderSettings()}
        {this.renderBack()}
        {this.renderLogout()}
      </div>
    )
  }
}
