import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import MutationButton from 'App/components/MutationButton'

export default class Seats extends React.Component {
  state = {}

  render() {
    return (
      <div className={styles.container}>
        <Section top title={'Asientos'} description={'Aqui puedes contratar asientos'}>
          <MutationButton
            title={'Contratar asiento'}
            message={'Está seguro de contratar un asiento? '}
            confirmText={'Contratar asiento'}
            mutation="getSeat"
            params={{data:'asd'}}
            onSuccess={() => console.log('He contratado el asiento')}
            label="Contratar asiento"/>
        </Section>
      </div>
    )
  }
}
