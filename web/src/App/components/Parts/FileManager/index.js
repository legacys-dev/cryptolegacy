import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Manager from './Manager'
import {MdFileUpload} from 'react-icons/md/'
import Button from 'App/components/Parts/Button'

export default class FileManager extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
    label: PropTypes.string,
    errorMessage: PropTypes.node
  }

  state = {open: false}

  renderValue() {
    return (
      <div className={styles.upload}>
        <Button
          primary
          icon={MdFileUpload}
          onClick={() => this.setState({open: true})}
          loading={this.state.loading}>
          Start upload
        </Button>
      </div>
    )
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
