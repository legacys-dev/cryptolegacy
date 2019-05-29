import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Files from './Files'
import File from './File'

export default class Storage extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Switch>
        <Route path="/vaults/storage/:vaultId" exact component={Files} />
        <Route path="/vaults/storage/:vaultId/file/:fileId" exact component={File} />
      </Switch>
    )
  }
}
