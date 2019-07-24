import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Button from 'App/components/Parts/Button'
import {Line} from 'App/components/Parts/LoadProgress'
import forceLogin from 'App/helpers/auth/forceLogin'
import {Cloud} from 'App/components/Parts/Icons'
import gql from 'graphql-tag'
import numeral from 'numeral'
import translate from 'App/i18n/translate'

@forceLogin
@withGraphQL(gql`
  query totalStorageUsed {
    totalStorageUsed
  }
`)
export default class Storage extends React.Component {
  static propTypes = {
    totalStorageUsed: PropTypes.object
  }

  renderUpgradeButton() {
    return (
      <div className={styles.button}>
        <Button>{translate('storage.upgrade')}</Button>
      </div>
    )
  }

  renderLine(percent) {
    return <Line percent={percent.toFixed(2)} />
  }

  render() {
    const {percentageUsed} = this.props.totalStorageUsed
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.icon}>
              <Cloud size={25} />
            </div>
            <div className={styles.storage}>{translate('storage.storage')}</div>
          </div>
          <div className={styles.right}>
            <div className={styles.percentage}>{numeral(percentageUsed).format('0.0')}%</div>
          </div>
        </div>
        {this.renderLine(percentageUsed)}
        {this.renderUpgradeButton()}
      </div>
    )
  }
}
