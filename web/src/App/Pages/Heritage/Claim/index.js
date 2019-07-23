import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Container from 'App/components/Parts/Container/'
import withValidHeir from 'App/helpers/vaultPolicy/withValidHeir'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import {getEncryptedPassword} from 'App/helpers/user'
import {Alert} from 'App/components/Parts/Icons'
import Button from 'App/components/Parts/Button'
import AutoForm from 'App/components/AutoForm'
import autobind from 'autobind-decorator'
import {withRouter} from 'react-router'
import translate from 'App/i18n/translate'

@withValidHeir
@withRouter
@withMessage
export default class Claim extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    match: PropTypes.object,
    vaultName: PropTypes.String
  }

  @autobind
  onSuccess() {
    const {showMessage, history} = this.props
    showMessage(translate('heritages.heritageValidated'))
    history.push('/')
  }

  render() {
    return (
      <Container>
        <div className={styles.container}>
          <div className={styles.icon}>
            <Alert size={60} />
          </div>
          <div className={styles.title}>
            {translate('heritages.enterCodeToInheritVault')} <strong>#{this.props.vaultName}</strong>.
          </div>
          <AutoForm
            mutation="claimHeritage"
            omit={['accessToken', 'credentials']}
            ref="form"
            doc={{
              accessToken: this.props.match.params.accessToken,
              credentials: getEncryptedPassword()
            }}
            onSuccess={this.onSuccess}
          />
          <div className={styles.button}>
            <Button primary onClick={() => this.refs.form.submit()} fullWidth>
              {translate('heritages.heritageButton')}
            </Button>
          </div>
        </div>
      </Container>
    )
  }
}
