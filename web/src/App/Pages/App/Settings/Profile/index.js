import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Section from 'App/components/Section'
import Button from 'App/components/Parts/Button'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import translate from 'App/i18n/translate'
import Translate from 'App/i18n'
import gql from 'graphql-tag'

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
            omit={['userId']}
            ref="form"
          />
          <br />
          <Button onClick={() => this.refs.form.submit()} primary>
            <Translate tr="global.save" />
          </Button>
        </Section>
      </div>
    )
  }
}
