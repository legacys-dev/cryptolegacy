import React from 'react'
import { Route, Switch } from 'react-router-dom'
import List from './List'
import Create from './Create'
import Update from './Update'

const Heritages = () => {
  return (
    <Switch>
      <Route path="/vaults/invitations/:vaultId" exact component={List} />
      <Route path="/vaults/invitations/:vaultId/create" component={Create} />
      <Route path="/vaults/invitations/:vaultId/:vaultPolicyId/update" component={Update} />
    </Switch>
  )
}

export default Heritages
