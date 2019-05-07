import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import withValidKitHorary from 'App/helpers/emergencyKitTime/withValidKitHorary'
import Container from 'orionsoft-parts/lib/components/Container'
import KeyPdfGenerator from 'App/functions/KeyPdfGenerator'
import forceLogin from 'App/helpers/auth/forceLogin'
import gql from 'graphql-tag'

@forceLogin
@withValidKitHorary
@withGraphQL(gql`
  query emergencyKit($emergencyKitId: String, $emergencyKey: String) {
    emergencyKit(emergencyKitId: $emergencyKitId, emergencyKey: $emergencyKey)
  }
`)
export default class Kit extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    emergencyKit: PropTypes.object
  }

  render() {
    return (
      <Container>
        <div className={styles.container}>
          <div className={styles.title}>titulo</div>
          <div className={styles.pdf}>
            <KeyPdfGenerator />
          </div>
          <div className={styles.options}>Botones</div>
        </div>
      </Container>
    )
  }
}
