import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {Contract} from 'App/components/Parts/Icons'
import DeleteHeritage from 'App/components/Parts/DeleteHeritage'
import translate from 'App/i18n/translate'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import autobind from 'autobind-decorator'
import moment from 'moment'

@withMessage
export default class Items extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    items: PropTypes.array,
    onDeleteItem: PropTypes.func
  }

  state = {}

  @autobind
  onDeleteSuccess() {
    this.props.showMessage(translate('vaults.deleteHeritageMessage'))
    this.props.onDeleteItem(new Date())
  }

  renderTable() {
    const heritages = this.props.items || []
    return heritages.map((heritage, index) => {
      const {data} = heritage
      return (
        <tr className={styles.cell} key={index}>
          <td>
            <Contract size={25} />
          </td>
          <td>{data.userEmail}</td>
          <td>{moment(heritage.createdAt).format('LL')}</td>
          <td>
            <DeleteHeritage
              vaultPolicyId={data.vaultPolicyId}
              vaultId={data.vaultId}
              onDeleteSuccess={this.onDeleteSuccess}
            />
          </td>
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
              <td>{translate('vaults.inheritor')}</td>
              <td>{translate('vaults.creationDate')}</td>
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
