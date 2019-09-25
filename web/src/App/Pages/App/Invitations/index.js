import React from 'react'
import { Route, Switch } from 'react-router-dom'
import List from './List'

const Vaults = () => {
  return (
    <Switch>
      <Route path="/invitations" exact component={List} />
    </Switch>
  )
}
export default Vaults
