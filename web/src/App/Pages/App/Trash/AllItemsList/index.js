import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import EmptyTrash from 'App/components/Parts/EmptyTrash'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import forceLogin from 'App/helpers/auth/forceLogin'
import Text from 'App/components/fields/Text'
import autobind from 'autobind-decorator'
import gql from 'graphql-tag'
import Main from './Main'

@forceLogin
@withGraphQL(gql`
  query me {
    me {
      _id
      email
    }
  }
`)
@withMessage
export default class AllItemsList extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    showMessage: PropTypes.func
  }

  state = {}

  @autobind
  onDeleteSuccess() {
    this.props.showMessage('Se han eliminado los archivos correctamente')
  }

  onFilterChange(searchValue) {
    this.setState({searchValue})
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

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs
          right={<EmptyTrash onDeleteSuccess={this.onDeleteSuccess} userId={this.props.me._id} />}>
          <div className={styles.title}>
            <div className={styles.subTitle}>Archivos en eliminación</div>
            <div className={styles.searchBar}>{this.renderSearch()}</div>
          </div>
        </Breadcrumbs>
        <Main filter={this.state.searchValue} />
      </div>
    )
  }
}
