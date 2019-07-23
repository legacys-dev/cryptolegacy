import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
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
        <Breadcrumbs>
          <div className={styles.title}>{translate('app.actions')}</div>
        </Breadcrumbs>
        <Main />
      </div>
    )
  }
}
