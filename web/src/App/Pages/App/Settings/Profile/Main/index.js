import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { Field } from 'simple-react-form'
import Text from 'App/components/fields/Text'
import AutoForm from 'App/components/AutoForm'
import Button from 'App/components/Parts/Button'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Section from 'App/components/Section'
import translate from 'App/i18n/translate'

@withMessage
export default class Main extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    me: PropTypes.object
  }

  render() {
    if (!this.props.me) return
    const profile = {
      userId: this.props.me._id,
      firstName: this.props.me.profile.firstName,
      lastName: this.props.me.profile.lastName
    }

    return (
      <div className={styles.container}>
        <Section
          top
          title={translate('settings.profile')}
          description={translate('settings.profileDescription')}>
          <AutoForm
            mutation="setUserProfile"
            doc={profile}
            onSuccess={() => this.props.showMessage(translate('settings.yourProfileWasSaved'))}
            ref="form">
            <Field
              label={translate('settings.firstName')}
              fieldName="firstName"
              type={Text}
              fieldtype="firstName"
            />
            <Field
              label={translate('settings.lastName')}
              fieldName="lastName"
              type={Text}
              fieldtype="lastName"
            />
          </AutoForm>
          <div className={styles.button}>
            <Button onClick={() => this.refs.form.submit()} primary>
              {translate('global.save')}
            </Button>
          </div>
        </Section>
      </div>
    )
  }
}
