import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {MdLock} from 'react-icons/md'
import Button from 'App/components/Parts/Button'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Translate from 'App/i18n'

@withMutation(gql`
  mutation disableTwoFactor {
    disableTwoFactor {
      _id
      hasTwoFactor
    }
  }
`)
@withMessage
export default class Disable extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    disableTwoFactor: PropTypes.func
  }

  @autobind
  async disableTwoFactor() {
    try {
      await this.props.disableTwoFactor()
      this.props.showMessage(<Translate tr="settings.twoFactorDisabled" />)
    } catch (error) {
      this.props.showMessage(error)
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <MdLock size={28} className={styles.twoFactorActivatedIcon} />
        <span className={styles.twoFactorActivatedText}>
          <Translate tr="settings.twoFactorActivated" />
        </span>
        <div className={styles.yourAccountIsSecure}>
          <Translate tr="settings.twoFactorYourAccountIsSafer" />
        </div>
        <br />
        <Button danger onClick={this.disableTwoFactor}>
          <Translate tr="global.disable" />
        </Button>
      </div>
    )
  }
}
