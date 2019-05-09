import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import withValidKitHorary from 'App/helpers/emergencyKitTime/withValidKitHorary'
import Container from 'orionsoft-parts/lib/components/Container'
import KeyPdfGenerator from 'App/functions/KeyPdfGenerator'
import Loading from 'App/components/Parts/Loading'
import forceLogin from 'App/helpers/auth/forceLogin'
import gql from 'graphql-tag'
import Footer from './Footer'
import Header from './Header'

@forceLogin
@withValidKitHorary
@withGraphQL(
  gql`
    query getUserData($emergencyKitId: String, $emergencyKey: String) {
      me {
        _id
        name
        lastName
      }
      emergencyKit(emergencyKitId: $emergencyKitId, emergencyKey: $emergencyKey)
    }
  `,
  {loading: <Loading />}
)
export default class Kit extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    me: PropTypes.object,
    emergencyKit: PropTypes.object
  }

  render() {
    const {me, emergencyKit} = this.props
    const userData = {
      userName: me.name,
      userLastName: me.lastName,
      createdAt: emergencyKit.createdAt,
      userMasterKey: emergencyKit.userMasterKey
    }

    return (
      <Container>
        <div className={styles.container}>
          <div className={styles.title}>
            <Header />
          </div>
          <div className={styles.pdf}>
            <KeyPdfGenerator userData={userData} />
          </div>
          <div className={styles.options}>
            <Footer />
          </div>
        </div>
      </Container>
    )
  }
}
