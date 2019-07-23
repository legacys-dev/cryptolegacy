import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'
import {withRouter} from 'react-router'
import translate from 'App/i18n/translate'


@withRouter
export default class Footer extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  render() {
    return (
      <div className={styles.container}>
        <Button primary onClick={() => this.props.history.push('/')}>
          {translate('emergency.emergencyMessage')}
        </Button>
      </div>
    )
  }
}
