import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'
import PaginatedList from 'App/components/Crud/List'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Container from 'orionsoft-parts/lib/components/Container'
import {withRouter} from 'react-router'
import fields from './fields'

@withRouter
export default class List extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs
          right={
            <Button primary to={`/admin/vaults/create`}>
              Crear bóveda de glacier
            </Button>
          }
        />
        <br />
        <Container>
          <PaginatedList
            title="Bóvedas de Glacier"
            name="vaults"
            canUpdate
            fields={fields}
            allowSearch
            basePath="/admin/vaults"
          />
        </Container>
      </div>
    )
  }
}
