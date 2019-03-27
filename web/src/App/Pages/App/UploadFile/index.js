import React from 'react'
import styles from './styles.css'
import forceLogin from 'App/helpers/auth/forceLogin'
import FileManager from 'App/components/fields/FileManager'
import Container from 'orionsoft-parts/lib/components/Container'

@forceLogin
export default class UploadFile extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <FileManager />
        </Container>
      </div>
    )
  }
}
