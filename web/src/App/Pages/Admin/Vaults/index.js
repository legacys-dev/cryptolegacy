import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import List from './List'
import Create from './Create'
import Vault from './Vault'

export default class Companies extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/admin/vaults" exact component={List} />
          <Route path="/admin/vaults/create" component={Create} />
          <Route path="/admin/vaults/:vaultId" component={Vault} />
        </Switch>
      </div>
    )
  }
}
