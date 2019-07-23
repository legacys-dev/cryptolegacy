import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {Contract} from 'App/components/Parts/Icons'
import EnableHeritage from 'App/components/Parts/EnableHeritage'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import autobind from 'autobind-decorator'
import moment from 'moment'
import translate from 'App/i18n'

@withMessage
export default class Items extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    onHeritageEnabled: PropTypes.func,
    items: PropTypes.array,
    status: PropTypes.string
  }

  state = {}

  @autobind
  onEnableSuccess() {
    this.props.showMessage('The heritage was enabled')
    this.props.onHeritageEnabled(new Date())
  }

  renderEnableHeritageButton(vaultPolicyId) {
    if (this.props.status !== 'waiting') return
    return <EnableHeritage vaultPolicyId={vaultPolicyId} onEnableSuccess={this.onEnableSuccess} />
  }

  renderTable() {
    const heritages = this.props.items || []
    return heritages.map((heritage, index) => {
      const {data, creatorEmail} = heritage
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <Contract size={25} />
          </td>
          <td>{creatorEmail}</td>
          <td>{data.userEmail}</td>
          <td>{moment(heritage.createdAt).format('LL')}</td>
          <td>{this.renderEnableHeritageButton(data.vaultPolicyId)}</td>
        </tr>
      )
    })
  }

  renderHeritages() {
    return (
      <div className={styles.vaults}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td style={{width: '1%'}} />
              <td>{translate('admin.heritageCreator')}</td>
              <td>{translate('admin.inheritor')}</td>
              <td>{translate('admin.creationDate')}</td>
              <td style={{width: '5%'}} />
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    )
  }

  render() {
    return <div className={styles.container}>{this.renderHeritages()}</div>
  }
}
