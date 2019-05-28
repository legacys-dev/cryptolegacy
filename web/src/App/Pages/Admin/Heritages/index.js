import React from 'react'
import {Route, Switch} from 'react-router-dom'
import List from './List'

export default class Heritages extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Switch>
        <Route path="/admin/heritages" exact component={List} />
      </Switch>
    )
  }
}
