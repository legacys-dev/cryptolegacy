import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Container from 'orionsoft-parts/lib/components/Container'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import {privateDecrypt as decryptMessage} from 'App/helpers/crypto'
import withValidKitHorary from 'App/helpers/emergencyKitTime/withValidKitHorary'
import {setUserCipherPassword, generateUserCipherKeys} from 'App/helpers/keys'
import KeyPdfGenerator from 'App/functions/KeyPdfGenerator'
import {getMessagePrivateKey} from 'App/helpers/user'
import forceLogin from 'App/helpers/auth/forceLogin'
import Loading from 'App/components/Parts/Loading'
import gql from 'graphql-tag'
import Footer from './Footer'
import Header from './Header'

@forceLogin
@withValidKitHorary
@withGraphQL(
  gql`
    query getData($emergencyKitId: String) {
      me {
        _id
        name
        lastName
      }
      emergencyKit(emergencyKitId: $emergencyKitId)
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

  state = {decryptContent: null}

  async componentDidMount() {
    const decryptParams = {
      privateKey: getMessagePrivateKey(),
      toDecrypt: this.props.emergencyKit.encrypted
    }
    const decryptContent = decryptMessage(decryptParams)
    const {secret, iv, userV} = await generateUserCipherKeys(decryptContent.userMasterKey.original)
    await setUserCipherPassword(secret, iv, userV)
    this.setState({decryptContent})
  }

  render() {
    if (!this.state.decryptContent) return <Loading />
    const {me, emergencyKit} = this.props
    const userData = {
      userName: me.name,
      userLastName: me.lastName,
      createdAt: emergencyKit.createdAt,
      userMasterKey: this.state.decryptContent.userMasterKey.original
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
