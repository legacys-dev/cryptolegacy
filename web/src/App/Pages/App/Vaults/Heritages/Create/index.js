import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withRouter} from 'react-router'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import {getEncryptedPassword} from 'App/helpers/user'
import Header from 'App/components/Parts/Header'
import Loading from 'App/components/Parts/Loading'
import Button from 'App/components/Parts/Button'
import Section from 'App/components/Section'
import autobind from 'autobind-decorator'
import translate from 'App/i18n/translate'
import {Field} from 'simple-react-form'
import Text from 'App/components/fields/Text'
import gql from 'graphql-tag'

@withGraphQL(
  gql`
    query getVault($vaultId: ID) {
      vault(vaultId: $vaultId) {
        _id
        name
      }
    }
  `,
  {loading: <Loading />}
)
@withRouter
@withMessage
export default class Create extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    vault: PropTypes.object
  }

  @autobind
  onSuccess() {
    const {showMessage, vault, history} = this.props
    showMessage(translate('vaults.createHeritage'))
    history.push(`/vaults/heritages/${vault._id}`)
  }

  getEncrypted

  renderButtons() {
    const {vault, history} = this.props
    return (
      <div className={styles.buttons}>
        <Button onClick={() => history.push(`/vaults/heritages/${vault._id}`)}>{translate('vaults.back')}</Button>
        <Button primary onClick={() => this.refs.form.submit()}>
          {translate('vaults.inheritVault')}
        </Button>
      </div>
    )
  }

  render() {
    const {vault} = this.props
    return (
      <div className={styles.container}>
        <Header past={{[`/vaults/heritages/${vault._id}`]: `${translate('vaults.vault')} (${vault.name})`}} title={translate('vaults.inherit')}/>
        <div className={styles.content}>
          <Section top title={translate('vaults.inheritVault')} description={translate('vaults.description')}>
            <AutoForm
              mutation="createHeritage"
              ref="form"
              doc={{vaultId: vault._id, credentials: getEncryptedPassword()}}
              onSuccess={this.onSuccess}
            >
              <Field
                label={translate('heritages.inheritorMail')}
                fieldName = "email"
                type = {Text}
              />
            </AutoForm>
            {this.renderButtons()}
          </Section>
        </div>
      </div>
    )
  }
}
