import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Container from 'orionsoft-parts/lib/components/Container'
import withValidHeir from 'App/helpers/heritage/withValidHeir'
import forceLogin from 'App/helpers/auth/forceLogin'
import Button from 'App/components/Parts/Button'
import {Alert} from 'App/components/Parts/Icons'
import AutoForm from 'App/components/AutoForm'
import {withRouter} from 'react-router'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'

@forceLogin
@withValidHeir
@withRouter
@withMessage
export default class Reclaim extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    match: PropTypes.object,
    heritageCode: PropTypes.String
  }

  @autobind
  onSuccess() {
    const {showMessage, history} = this.props
    showMessage('Se ha validado tu herencia')
    history.push('/')
  }

  render() {
    return (
      <Container>
        <div className={styles.container}>
          <div className={styles.icon}>
            <Alert size={60} />
          </div>
          <div className={styles.title}>
            Ingresa el código para heredar la bóveda <strong>#{this.props.heritageCode}</strong>.
          </div>
          <AutoForm
            mutation="reclaimHeritage"
            omit="accessToken"
            ref="form"
            doc={{accessToken: this.props.match.params.accessToken}}
            onSuccess={this.onSuccess}
          />
          <div className={styles.button}>
            <Button primary onClick={() => this.refs.form.submit()} fullWidth>
              Heredar
            </Button>
          </div>
        </div>
      </Container>
    )
  }
}
