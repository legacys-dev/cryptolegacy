import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Header from 'App/components/Parts/Header'
import { getEncryptedPassword } from 'App/helpers/user'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Select from 'App/components/fields/Select'
import Button from 'App/components/Parts/Button'
import AutoForm from 'App/components/AutoForm'
import Text from 'App/components/fields/Text'
import translate from 'App/i18n/translate'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router'
import { Field } from 'simple-react-form'
import vaultTypes from './vaultTypes'

@withRouter
@withMessage
export default class Create extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object
  }

  state = {}

  @autobind
  onSuccess() {
    const { showMessage, history } = this.props
    showMessage(translate('vaults.vaultCreatedSuccessfully'))
    history.push('/vaults')
  }

  onChange(event) {
    this.setState({ vaultType: event.type })
  }

  showEmailField() {
    if (this.state.vaultType !== 'drive') return
    return <Field fieldName="driveEmail" label={translate('vaults.driveEmail')} type={Text} />
  }

  renderButtons() {
    return (
      <div className={styles.buttons}>
        <Button onClick={() => this.props.history.push('/vaults')}>
          {translate('vaults.back')}
        </Button>
        <Button primary onClick={() => this.refs.form.submit()}>
          {translate('vaults.createVault')}
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <Header
          past={{ [`/vaults`]: translate('vaults.vaults') }}
          title={translate('vaults.createVault')}
          description={translate('vaults.description')}
        />
        <div className={styles.content}>
          <AutoForm
            mutation="createVault"
            ref="form"
            doc={{ credentials: getEncryptedPassword() }}
            onChange={event => this.onChange(event)}
            onSuccess={this.onSuccess}>
            <Field fieldName="name" label={translate('vaults.vaultName')} type={Text} />
            <Field
              fieldName="type"
              label={translate('vaults.vaultType')}
              options={vaultTypes}
              type={Select}
            />
            <ReactCSSTransitionGroup
              transitionName="user-menu"
              transitionEnterTimeout={200}
              transitionLeaveTimeout={200}>
              {this.showEmailField()}
            </ReactCSSTransitionGroup>
          </AutoForm>
          {this.renderButtons()}
        </div>
      </div>
    )
  }
}
