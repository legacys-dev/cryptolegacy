import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { withRouter } from 'react-router'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Header from 'App/components/Parts/Header'
import Text from 'App/components/fields/Text'
import autobind from 'autobind-decorator'
import Options from './Options'
import Main from './Main'
import translate from 'App/i18n/translate'

@withRouter
@withMessage
export default class List extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  state = { status: 'waiting' }

  onFilterChange(searchValue) {
    this.setState({ searchValue })
  }

  @autobind
  setStatus(status) {
    this.setState({ status })
  }

  renderSearch() {
    return (
      <Text
        placeholder={translate('admin.search')}
        value={this.state.searchValue}
        onChange={searchValue => this.onFilterChange(searchValue)}
      />
    )
  }

  renderRight() {
    return (
      <div>
        <div>{this.renderOptions()}</div>
        <div className={styles.searchBar}>{this.renderSearch()}</div>
      </div>
    )
  }

  renderOptions() {
    return <Options setStatus={this.setStatus} status={this.state.status} />
  }

  render() {
    return (
      <div className={styles.container}>
        <Header title={translate('admin.heritages')} />
        <Main filter={this.state.searchValue} status={this.state.status} />
      </div>
    )
  }
}
