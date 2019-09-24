import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'App/components/Parts/Loading'
import gql from 'graphql-tag'
import Main from './Main'

@withGraphQL(
  gql`
    query getMyProfile {
      me {
        _id
        profile {
          name
          firstName
          lastName
        }
      }
    }
  `,
  { loading: <Loading /> }
)
export default class Profile extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    getEmergencyKit: PropTypes.object
  }

  render() {
    return (
      <div className={styles.container}>
        <Main me={this.props.me} />
      </div>
    )
  }
}
