import React from 'react'
import {Route, Switch} from 'react-router-dom'
import AllItemsList from './AllItemsList'

export default class Vaults extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Switch>
        <Route path="/actions" exact component={AllItemsList} />
      </Switch>
    )
  }
}
