import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Section from 'App/components/Section'
import MutationButton from 'App/components/MutationButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'App/components/Parts/Loading'
import gql from 'graphql-tag'

@withGraphQL(
  gql`
    query getSeats {
      getSeatsNumber
    }
  `,
  { loading: <Loading /> }
)
export default class Main extends React.Component {
  static propTypes = {
    getSeatsNumber: PropTypes.object,
    onGettingNewSeat: PropTypes.string
  }

  state = {}

  onGetSeatSuccess(newSeat) {
    this.setState({ newSeat })
    this.props.onGettingNewSeat(newSeat)
  }

  renderSeats(name, number, color) {
    return (
      <div className={styles.seat} style={{ backgroundColor: color }}>
        {name} : {number}
      </div>
    )
  }

  render() {
    const { allSeats, availableSeats, usedSeats } = this.props.getSeatsNumber
    return (
      <div className={styles.container}>
        <Section top title={'Asientos'} description={'Aqui puedes contratar asientos'}>
          <div className={styles.seats}>
            {this.renderSeats('Total seats', allSeats, '#045efc')}
            {this.renderSeats('Used seats', usedSeats, '#918887')}
            {this.renderSeats('Available seats', availableSeats, '#1fb817')}
          </div>
          <div className={styles.button}>
            <MutationButton
              title={'Contratar asiento'}
              message={'Está seguro de contratar un asiento? '}
              confirmText={'Contratar asiento'}
              mutation="getSeat"
              params={{ data: Math.random() }}
              onSuccess={newSeat => this.onGetSeatSuccess(newSeat)}
              label="Contratar asiento"
              primary
              fullWidth
            />
          </div>
        </Section>
      </div>
    )
  }
}
