import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Header from 'App/components/Parts/Header'
import {getEncryptedPassword} from 'App/helpers/user'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Button from 'App/components/Parts/Button'
import AutoForm from 'App/components/AutoForm'
import Section from 'App/components/Section'
import autobind from 'autobind-decorator'
import {withRouter} from 'react-router'
import {Field} from 'simple-react-form'
import Text from 'App/components/fields/Text'
import translate from 'App/i18n/translate'

@withRouter
@withMessage
export default class Create extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object
  }

  @autobind
  onSuccess() {
    const {showMessage, history} = this.props
    showMessage(translate('vaults.vaultCreatedSuccessfully'))
    history.push('/vaults')
  }

  renderButtons() {
    return (
      <div className={styles.buttons}>
        <Button onClick={() => this.props.history.push('/vaults')}>{translate('vaults.back')}</Button>
        <Button primary onClick={() => this.refs.form.submit()}>
          {translate('vaults.createVault')}
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <Header past={{[`/vaults`]: translate('vaults.vaults')}}
        title={translate('vaults.createVault')} 
        description={translate('vaults.description')}
        />
        <div className={styles.content}>
          <Section top >
            <AutoForm
              mutation="createVault"
              ref="form"
              doc={{credentials: getEncryptedPassword()}}
              onSuccess={this.onSuccess}
            >
              <Field
                label = {translate('vaults.vaultName')}
                fieldName="name"
                type={Text}
              />
            </AutoForm>
            {this.renderButtons()}
          </Section>
        </div>
      </div>
    )
  }
}
