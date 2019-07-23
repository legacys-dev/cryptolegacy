import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withRouter} from 'react-router'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Loading from 'App/components/Parts/Loading'
import Button from 'App/components/Parts/Button'
import Section from 'App/components/Section'
import translate from 'App/i18n/translate'
import gql from 'graphql-tag'
import Main from './Main'

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
export default class List extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    vault: PropTypes.object
  }

  @autobind
  onSuccess() {
    const {showMessage, vault, history} = this.props
    showMessage(translate('vaults.createHeritage'))
    history.push(`/vaults/storage-update/${vault._id}`)
  }

  renderButtons() {
    const {vault, history} = this.props
    return (
      <div className={styles.buttons}>
        <Button primary onClick={() => history.push(`/vaults/heritages/${vault._id}/create`)}>
          {translate('vaults.create')}
        </Button>
      </div>
    )
  }

  render() {
    const {vault} = this.props
    return (
      <div className={styles.container}>
        <Breadcrumbs
          past={{[`/vaults/storage-update/${vault._id}`]: 'Herencias'}}
          right={this.renderButtons()}>
          {translate('vaults.vault')} ({vault.name})
        </Breadcrumbs>
        <div className={styles.content}>
          <Section top title={translate('vaults.heritages')}description={translate('vaults.description')}>
            <Main vaultId={vault._id} />
          </Section>
        </div>
      </div>
    )
  }
}
