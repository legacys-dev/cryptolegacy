import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Header from 'App/components/Parts/Header'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Main from './Main'
import translate from 'App/i18n/translate'

@withGraphQL(gql`
  query me {
    me {
      _id
      email
    }
  }
`)
@withMessage
export default class AllItemsList extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    showMessage: PropTypes.func
  }

  render() {
    return (
      <div className={styles.container}>
        <Header title={translate('app.actions')} />
        <Main />
      </div>
    )
  }
}
