import React from 'react'
import {Route, Switch} from 'react-router-dom'
import AllItemsList from './AllItemsList'

const Vaults = () => {
  return (
    <Switch>
      <Route path="/trash" exact component={AllItemsList} />
    </Switch>
  )
}
export default Vaults
