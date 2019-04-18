import React from 'react'
import styles from './styles.css'
import options from './options'
import {Link} from 'react-router-dom'
import getRoutePath from 'App/helpers/routes/getRoutePath'
import classNames from 'classnames'

export default class MenuOptions extends React.Component {
  static propTypes = {}

  isRouteActive(path) {
    const actualPath = getRoutePath()
    return `/${actualPath}` === path
  }

  isItemActive(path) {
    const isActive = this.isRouteActive(path)
    const style = isActive ? classNames(styles.item, styles.itemActive) : styles.item
    return style
  }

  renderIcon(icon, path) {
    const Icon = icon
    const isActive = this.isRouteActive(path)
    return <Icon active={isActive} />
  }

  renderLink(name, path, icon, index) {
    return (
      <div key={index} className={this.isItemActive(path)}>
        <Link to={path}>
          <div className={styles.link}>
            <div className={styles.icon}>{this.renderIcon(icon, path)}</div>
            <div className={styles.linkName}>{name}</div>
          </div>
        </Link>
      </div>
    )
  }

  renderLinks() {
    return options.map((link, index) => {
      return this.renderLink(link.name, link.path, link.icon, index)
    })
  }

  render() {
    return <div className={styles.container}>{this.renderLinks()}</div>
  }
}
