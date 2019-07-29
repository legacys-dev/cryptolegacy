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
  }
  ${fragment}
`)
@withMessage
export default class Profile extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    showMessage: PropTypes.func
  }

  state = {}

  render() {
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
            ref="form"
          >
          <Field
            fieldName="firstName"
            type={Text}
            fieldType="firstName"
          />
          <Field
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
      </div>
    )
  }
}
