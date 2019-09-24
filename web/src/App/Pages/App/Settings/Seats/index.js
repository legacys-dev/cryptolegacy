import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'App/components/Parts/Loading'
import gql from 'graphql-tag'
import Main from './Main'
import List from './List'

@withGraphQL(
  gql`
    query getSubscription {
      getSubscription
    }
  `,
  { loading: <Loading /> }
)
export default class Seats extends React.Component {
  static propTypes = {
    getSubscription: PropTypes.object
  }

  state = {}

  @autobind
  onGettingNewSeat(seatId) {
    this.setState({ seatId })
  }

  renderWithoutPlan() {
    return <div className={styles.container}>You dont have a plan</div>
  }

  render() {
    if (!this.props.getSubscription) return this.renderWithoutPlan()
    return (
      <div className={styles.container}>
        <Main onGettingNewSeat={this.onGettingNewSeat} />
        <List newSeatId={this.state.seatId} />
      </div>
    )
  }
}
