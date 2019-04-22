import React from 'react'
import {Route, Switch} from 'react-router-dom'
import List from './List'
import Create from './Create'
import Update from './Update'
import Storage from './Storage'

export default class Vaults extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Switch>
        <Route path="/vaults" exact component={List} />
        <Route path="/vaults/create" component={Create} />
        <Route path="/vaults/storage-update/:personalVaultId" component={Update} />
        <Route path="/vaults/storage/:personalVaultId" component={Storage} />
      </Switch>
    )
  }
}
