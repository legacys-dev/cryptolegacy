import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Section from 'App/components/Section'
import Button from 'App/components/Parts/Button'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import translate from 'App/i18n/translate'
import gql from 'graphql-tag'
import {Field} from 'simple-react-form'
import Text from 'App/components/fields/Text'
import {withApollo} from 'react-apollo'
import autobind from 'autobind-decorator'
import getEmergencyKit from './getEmergencyKit'

const fragment = gql`
  fragment setUserProfileFragment on User {
    _id
    profile {
      name
      firstName
      lastName
    }
  }
`

@withGraphQL(gql`
  query getMyProfile {
    me {
      ...setUserProfileFragment
    }
    getEmergencyKit
  }
  ${fragment}
`)
@withMessage
export default class Profile extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    getEmergencyKit: PropTypes.string,
    showMessage: PropTypes.func
  }

  state = {}

  render() {
    console.log(this.props.getEmergencyKit)
    if (!this.props.me) return
    return (
      <div className={styles.container}>
        <Section
          top
          title={translate('settings.profile')}
          description={translate('settings.profileDescription')}>
          <AutoForm
            mutation="setUserProfile"
            doc={{userId: this.props.me._id, profile: this.props.me.profile}}
            onSuccess={() => this.props.showMessage(translate('settings.yourProfileWasSaved'))}
            fragment={fragment}
            ref="form">
            <Field
              label={translate('settings.firstName')}
              fieldName="firstName"
              type={Text}
              fieldType="firstName"
            />
            <Field
              label={translate('settings.lastName')}
              fieldName="lastName"
              type={Text}
              fieldType="lastName"
            />
          </AutoForm>
          <br />
          <Button onClick={() => this.refs.form.submit()} primary>
            {translate('global.save')}
          </Button>
        </Section>

        <Section title={'Master Key'} description={'Aqui puedes obtener tu llave maestra.'}>
          <div>
            <span>Llave maestra: </span>
            <span>{this.props.getEmergencyKit.data}</span>
          </div>
          <Button onClick={() => this.getPdf()} primary>
            Descargar llave
          </Button>
        </Section>
      </div>
    )
  }
}
