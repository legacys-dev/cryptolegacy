import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'
import {withRouter} from 'react-router'

@withRouter
export default class Footer extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  render() {
    return (
      <div className={styles.container}>
        <Button primary onClick={() => this.props.history.push('/')}>
          He guardado mi kit de emergencia y estoy listo para continuar
        </Button>
      </div>
    )
  }
}
