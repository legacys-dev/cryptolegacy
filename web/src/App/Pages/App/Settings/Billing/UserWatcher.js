import React from 'react'
import withSubscription from 'react-apollo-decorators/lib/withSubscription'
import gql from 'graphql-tag'

@withSubscription(
  gql`
    subscription onEnvironmentUpdated($userId: ID) {
      userDataUpdate(userId: $userId) {
        _id
        qvo {
          customerId
          cardId
          subscriptionId
        }
        cardData
        name
      }
    }
  `
)
export default class UserWatcher extends React.Component {
  render() {
    return <span />
  }
}
