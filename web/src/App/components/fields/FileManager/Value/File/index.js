import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import {MdClose} from 'react-icons/md'

@withGraphQL(
  gql`
    query getFileInfo($fileId: ID) {
      file: fileManagerFile(fileId: $fileId) {
        name
        genericType
      }
    }
  `,
  {loading: null}
)
export default class File extends React.Component {
  static propTypes = {
    file: PropTypes.object,
    clear: PropTypes.func,
    loading: PropTypes.bool
  }

  renderLoading() {
    return <div className={styles.loading}>Cargando...</div>
  }

  render() {
    const {file} = this.props
    if (this.props.loading) return this.renderLoading()
    if (!file) {
      this.props.clear()
      return null
    }
    return (
      <div className={styles.container}>
        <div className={styles.name}>{file.name}</div>
        <div className={styles.delete} onClick={this.props.clear}>
          <MdClose />
        </div>
      </div>
    )
  }
}
