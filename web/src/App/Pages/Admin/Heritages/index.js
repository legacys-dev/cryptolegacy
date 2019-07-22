import React from 'react'
import {Route, Switch} from 'react-router-dom'
import List from './List'

const Heritages = () => {
  return (
    <Switch>
      <Route path="/admin/heritages" exact component={List} />
    </Switch>
  )
}
export default Heritages
