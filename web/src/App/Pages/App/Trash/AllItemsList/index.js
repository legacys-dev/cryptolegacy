import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import EmptyTrash from 'App/components/Parts/EmptyTrash'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'App/components/Parts/Loading'
import forceLogin from 'App/helpers/auth/forceLogin'
import Text from 'App/components/fields/Text'
import autobind from 'autobind-decorator'
import gql from 'graphql-tag'
import Main from './Main'
import translate from 'App/i18n/translate'
import Header from 'App/components/Parts/Header'

@forceLogin
@withGraphQL(
  gql`
    query me {
      me {
        _id
        email
      }
    }
  `,
  {loading: <Loading />}
)
@withMessage
export default class AllItemsList extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    showMessage: PropTypes.func
  }

  state = {}

  @autobind
  onQueryItems(filesCount) {
    this.setState({filesCount})
  }

  @autobind
  onDeleteSuccess() {
    this.setState({emptyTrashDate: new Date()})
    this.props.showMessage(translate('app.deleteFileMessage'))
  }

  onFilterChange(searchValue) {
    this.setState({searchValue})
  }

  renderSearch() {
    return (
      <Text
        placeholder={translate('app.search')}
        value={this.state.searchValue}
        onChange={searchValue => this.onFilterChange(searchValue)}
      />
    )
  }

  renderRight(id, onDeleteSuccess, filesCount) {
    return (
      <div className={styles.topContainer}>
        <div className={styles.searchBar}>{this.renderSearch()}</div>
        <EmptyTrash onDeleteSuccess={onDeleteSuccess} userId={id} filesCount={filesCount} />
      </div>
    )
  }

  render() {
    const {searchValue, emptyTrashDate, filesCount} = this.state
    return (
      <div className={styles.container}>
        <Header
          right={this.renderRight(
            this.props.me._id,
            this.onDeleteSuccess,
            filesCount
          )}
          title={translate('app.fileOnDelete')}
          />
        <Main
          filter={searchValue}
          emptyTrashDate={emptyTrashDate}
          onQueryItems={this.onQueryItems}
        />
      </div>
    )
  }
}
