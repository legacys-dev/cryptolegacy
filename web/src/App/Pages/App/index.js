import React from 'react'
// import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Settings from './Settings'
import Layout from './Layout'
import UploadFile from './UploadFile'

export default class MainHome extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/upload-file" component={UploadFile} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    )
  }
}
