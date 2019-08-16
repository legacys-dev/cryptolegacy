import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Header from 'App/components/Parts/Header'
import Information from './Information'
import Loading from 'App/components/Parts/Loading'
import privateDecrypt from 'App/helpers/crypto/privateDecrypt'
import gql from 'graphql-tag'

@withGraphQL(
  gql`
    query file($fileId: ID) {
      file(fileId: $fileId) {
        _id
        data
      }
    }
  `,
  {loading: <Loading />}
)
export default class File extends React.Component {
  static propTypes = {
    file: PropTypes.object
  }

  render() {
    const {file} = this.props
    //AQUI DESENCRIPTAR
    console.log(file)
    const messages = JSON.parse(window.localStorage.getItem('messages'))
    const decryptFile = privateDecrypt({toDecrypt: file.data, privateKey: messages.privateKey})
    if (!file) return <span />
    return (
      <div className={styles.container}>
        <Header past={{[`/vaults/storage/${decryptFile.vaultId}`]: `Bóveda - ${decryptFile.vaultName}`}}
          title={`Archivo - ${decryptFile.name}`}
        />
        <Information file={decryptFile} />
      </div>
    )
  }
}
