import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withRouter} from 'react-router'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import optionItems from './optionItems'

@withRouter
export default class Options extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    vaultId: PropTypes.string
  }

  renderItem(Component, route, message, index) {
    return (
      <div key={index} className={styles.setting}>
        <Tooltip content={message} place="top">
          <Component
            className={styles.item}
            top={5}
            size={25}
            onClick={() => this.props.history.push(route)}
          />
        </Tooltip>
      </div>
    )
  }

  renderOptions(vaultId) {
    return optionItems.map((item, index) => {
      return this.renderItem(item.icon, item.route + vaultId, item.message, index)
    })
  }

  render() {
    const {vaultId} = this.props
    if (!vaultId) return <span />
    return <div className={styles.container}>{this.renderOptions(vaultId)}</div>
  }
}
