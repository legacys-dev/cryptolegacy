import React from 'react'
import Create from './Create'
import Update from './Update'
import List from './List'
import {Route, Switch} from 'react-router-dom'
import Delete from './Delete'

const CrudComponent = ({
  path,
  singular,
  plural,
  listQuery,
  listFields,
  itemQuery,
  updateMutation,
  deleteMutation,
  createMutation,
  omit,
  allowSearch
}) => {
  const renderList = () => {
    if (omit.includes('list')) return <span />
    return (
      <List
        title={plural}
        singular={singular}
        name={listQuery || plural.toLowerCase()}
        basePath={path}
        fields={listFields}
        allowSearch={allowSearch}
        canCreate={!omit.includes('create')}
        canUpdate={!omit.includes('update')}
      />
    )
  }

  const renderUpdate = ({match}) => {
    if (omit.includes('update')) return <span />
    return (
      <Update
        title={`Update ${singular}`}
        name={itemQuery || singular.toLowerCase()}
        basePath={path}
        itemId={match.params.itemId}
        singular={singular}
        updateMutation={updateMutation || `update${singular}`}
      />
    )
  }

  const renderCreate = () => {
    if (omit.includes('create')) return <span />
    return (
      <Create
        title={`Create ${singular}`}
        basePath={path}
        singular={singular}
        createMutation={createMutation || `create${singular}`}
      />
    )
  }

  const renderDelete = ({match}) => {
    if (omit.includes('delete')) return <span />
    return (
      <Delete
        title={`Delete ${singular}`}
        basePath={path}
        itemId={match.params.itemId}
        singular={singular}
        name={deleteMutation || `delete${singular}`}
      />
    )
  }

  return (
    <div>
      <Switch>
        <Route path={path} exact component={params => renderList(params)} />
        <Route path={path + '/create'} component={params => renderCreate(params)} />
        <Route path={path + '/:itemId'} exact component={params => renderUpdate(params)} />
        <Route path={path + '/:itemId/delete'} exact component={params => renderDelete(params)} />
      </Switch>
    </div>
  )
}

CrudComponent.defaultProps = {
  omit: []
}

export default CrudComponent
