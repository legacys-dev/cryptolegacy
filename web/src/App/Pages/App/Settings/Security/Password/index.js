import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import Button from 'App/components/Parts/Button'
import { Field } from 'simple-react-form'
import AutoForm from 'App/components/AutoForm'
import Text from 'App/components/fields/Text'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import PropTypes from 'prop-types'
import { MdLockOutline } from 'react-icons/md'
import translate from 'App/i18n/translate'

@withMessage
export default class ChangePassword extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    showMessage: PropTypes.func
  }

  state = {}

  schema = {
    oldPassword: {
      type: String,
      label: translate('settings.currentPassword')
    },
    newPassword: {
      type: String,
      min: 8,
      label: translate('settings.newPassword')
    },
    confirm: {
      type: String,
      custom(
        confirm,
        {
          doc: { newPassword }
        }
      ) {
        if (confirm !== newPassword) {
          return 'passwordsDontMatch'
        }
      },
      label: translate('settings.confirmTheNewPassword')
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Section
          title={translate('settings.changePassword')}
          description={translate('settings.changePasswordDescription')}>
          <AutoForm
            mutation="changePassword"
            ref="form"
            onSuccess={() => this.props.showMessage(translate('settings.changePasswordMessage'))}
            schema={this.schema}>
            <div className="label">{translate('settings.currentPassword')}</div>
            <Field fieldName="oldPassword" fieldType="password" type={Text} />
            <div className={styles.divider} />
            <div className="label">{translate('settings.newPassword')}</div>
            <Field fieldName="newPassword" fieldType="password" type={Text} />
            <div className="description">{translate('auth.passwordRequirements')}</div>
            <div className="label">{translate('settings.confirmYourPassword')}</div>
            <Field fieldName="confirm" fieldType="password" type={Text} />
          </AutoForm>
          <div className={styles.button}>
            <Button icon={MdLockOutline} onClick={() => this.refs.form.submit()} primary>
              {translate('settings.changePassword')}
            </Button>
          </div>
        </Section>
      </div>
    )
  }
}
