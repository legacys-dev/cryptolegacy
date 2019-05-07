import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Files from './Files'
import File from './File'

export default class Storage extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Switch>
        <Route path="/vaults/storage/:personalVaultId" exact component={Files} />
        <Route path="/vaults/storage/:personalVaultId/file/:fileId" exact component={File} />
      </Switch>
    )
  }
}
