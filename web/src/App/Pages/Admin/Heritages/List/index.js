import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withRouter} from 'react-router'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Text from 'App/components/fields/Text'
import autobind from 'autobind-decorator'
import Options from './Options'
import Main from './Main'

@withRouter
@withMessage
export default class List extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  state = {status: 'waiting'}

  onFilterChange(searchValue) {
    this.setState({searchValue})
  }

  @autobind
  setStatus(status) {
    this.setState({status})
  }

  renderSearch() {
    return (
      <Text
        placeholder="Search"
        value={this.state.searchValue}
        onChange={searchValue => this.onFilterChange(searchValue)}
      />
    )
  }

  renderOptions() {
    return <Options setStatus={this.setStatus} status={this.state.status} />
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs right={this.renderOptions()}>
          <div className={styles.title}>
            <div className={styles.subTitle}>Herencias</div>
            <div className={styles.searchBar}>{this.renderSearch()}</div>
          </div>
        </Breadcrumbs>
        <div className={styles.content}>
          <Main filter={this.state.searchValue} status={this.state.status} />
        </div>
      </div>
    )
  }
}
