import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Text from 'App/components/fields/Text'
import {withRouter} from 'react-router'
import Select from 'App/components/fields/Select'

const vaultoptions = [
  {
    label: 'Own',
    value: 'owner'
  },
  {
    label: 'Heritages',
    value: 'heritage'
  }
]

@withRouter
export default class VaultType extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    onVaultTypeChange: PropTypes.func,
    onFilterChange: PropTypes.func,
    vaultTypeValue: PropTypes.string,
    filterValue: PropTypes.string
  }

  render() {
    const {onVaultTypeChange, onFilterChange, filterValue, vaultTypeValue} = this.props
    return (
      <div className={styles.container}>
        <div className={styles.select}>
          <Select
            onChange={vaultType => onVaultTypeChange(vaultType)}
            options={vaultoptions}
            value={vaultTypeValue}
          />
        </div>
        <div className={styles.search}>
          <Text
            placeholder="Search"
            value={filterValue}
            onChange={searchValue => onFilterChange(searchValue)}
          />
        </div>
      </div>
    )
  }
}
