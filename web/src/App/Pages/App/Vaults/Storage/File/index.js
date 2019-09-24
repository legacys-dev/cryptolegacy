import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import { privateDecrypt } from 'App/helpers/crypto'
import Loading from 'App/components/Parts/Loading'
import Header from 'App/components/Parts/Header'
import translate from 'App/i18n/translate'
import Information from './Information'
import gql from 'graphql-tag'

@withGraphQL(
  gql`
    query file($fileId: ID) {
      file(fileId: $fileId)
    }
  `,
  { loading: <Loading /> }
)
export default class File extends React.Component {
  static propTypes = {
    file: PropTypes.object
  }

  render() {
    const { file } = this.props
    const messages = JSON.parse(window.localStorage.getItem('messages'))
    const decryptFile = privateDecrypt({ toDecrypt: file.data, privateKey: messages.privateKey })
    if (!file) return <span />
    return (
      <div className={styles.container}>
        <Header
          past={{
            [`/vaults/storage/${decryptFile.vaultId}`]: `${translate('vaults.vault')} - ${
              decryptFile.vaultName
            }`
          }}
          title={`${translate('fileManager.file')} - ${decryptFile.name}`}
        />
        <Information file={decryptFile} />
      </div>
    )
  }
}
