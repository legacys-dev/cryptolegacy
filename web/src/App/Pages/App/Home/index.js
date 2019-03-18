import React from 'react'
import styles from './styles.css'
import Container from 'orionsoft-parts/lib/components/Container'
import FileManager from 'App/components/fields/FileManager'
import {Field} from 'simple-react-form'

export default class Home extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <h1>Hello world</h1>
          <Field fieldName="asdasd" type={FileManager} />
        </Container>
      </div>
    )
  }
}
