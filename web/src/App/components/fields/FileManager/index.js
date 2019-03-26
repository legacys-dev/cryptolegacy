import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Manager from './Manager'
import Value from './Value'

export default class FileManager extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
    label: PropTypes.string,
    errorMessage: PropTypes.node
  }

  state = {open: false}

  renderValue() {
    return <Value {...this.props} openManager={() => this.setState({open: true})} />
  }

  renderManager() {
    if (!this.state.open) return
    return <Manager {...this.props} close={() => this.setState({open: false})} />
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="label">{this.props.label}</div>
        {this.renderManager()}
        {this.renderValue()}
        <div className={styles.error}>{this.props.errorMessage}</div>
      </div>
    )
  }
}
