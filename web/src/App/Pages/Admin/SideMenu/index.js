import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Menu from './Menu'

export default class SideMenu extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    links: PropTypes.array,
    title: PropTypes.node,
    rootPath: PropTypes.string,
    backPath: PropTypes.string
  }

  static defaultProps = {
    links: [],
    title: 'Admin',
    rootPath: '/'
  }

  render() {
    return (
      <div className={styles.container}>
        <Menu
          backPath={this.props.backPath}
          links={this.props.links}
          title={this.props.title}
          rootPath={this.props.rootPath}
        />
        <div className={styles.content}>{this.props.children}</div>
      </div>
    )
  }
}
