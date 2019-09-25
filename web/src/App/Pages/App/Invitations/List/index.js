import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Header from 'App/components/Parts/Header'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import translate from 'App/i18n/translate'
import Main from './Main'

@withMessage
export default class AllItemsList extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    showMessage: PropTypes.func
  }

  render() {
    return (
      <div className={styles.container}>
        <Header title={translate('app.invitations')} />
        <Main />
      </div>
    )
  }
}
