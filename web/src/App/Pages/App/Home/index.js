import React from 'react'
import styles from './styles.css'
import Container from 'orionsoft-parts/lib/components/Container'
import Button from 'orionsoft-parts/lib/components/Button'
import fetch from 'unfetch'
import autobind from 'autobind-decorator'
import toBlob from 'stream-to-blob'

export default class Home extends React.Component {
  static propTypes = {}

  @autobind
  async download() {
    const result = await fetch(
      'http://localhost:3000/asd/AScsSDsDfHTt55783G4f2fklr78bA345hk87WF4g456',
      {
        method: 'GET'
      }
    ).then(response => response.json())

    console.log({result})
  }

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <Button onClick={this.download}>descarga</Button>
        </Container>
      </div>
    )
  }
}
