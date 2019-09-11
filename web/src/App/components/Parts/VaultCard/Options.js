import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import optionItems from './optionItems'
import { withRouter } from 'react-router'


@withRouter
class Options extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    vaultId: PropTypes.string,
    credentialType: PropTypes.string,
    showOptions: PropTypes.bool
  }

  render() {
    if (this.props.showOptions) {
      return (
        <div className={styles.dropdownContent}>
          {optionItems.map((option, index) => {
            return (
              <a key={`opt-${index}`} onClick={() => this.props.history.push(option.route + this.props.vaultId)}>
                {option.name}
              </a>
            )
          })}
        </div>
      )
    }
    return <div></div>
  }
}

export default Options
