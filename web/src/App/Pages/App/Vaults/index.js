import React from 'react'
import {Route, Switch} from 'react-router-dom'
import List from './List'
import Create from './Create'
import Update from './Update'
import Storage from './Storage'
import Heritages from './Heritages'

export default class Vaults extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Switch>
        <Route path="/vaults" exact component={List} />
        <Route path="/vaults/create" component={Create} />
        <Route path="/vaults/storage-update/:vaultId" component={Update} />
        <Route path="/vaults/heritages/:vaultId" component={Heritages} />
        <Route path="/vaults/storage/:vaultId" component={Storage} />
      </Switch>
    )
  }
}
