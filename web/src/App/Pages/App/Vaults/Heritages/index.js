import React from 'react'
import { Route, Switch } from 'react-router-dom'
import List from './List'
import Create from './Create'

const Heritages = () => {
  return (
    <Switch>
      <Route path="/vaults/heritages/:vaultId" exact component={List} />
      <Route path="/vaults/heritages/:vaultId/create" component={Create} />
    </Switch>
  )
}

export default Heritages
