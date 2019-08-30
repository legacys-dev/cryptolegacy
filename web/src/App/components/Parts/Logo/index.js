import React from 'react'
import PropTypes from 'prop-types'
// import styles from './styles.css'
import { withRouter } from 'react-router'

@withRouter
export default class Logo extends React.Component {
  static propTypes = {
    imgName: PropTypes.string,
    history: PropTypes.object,
    size: PropTypes.string
  }

  render() {
    const { history, imgName, size } = this.props
    const logoStyle = {
      height: size,
      width: 'auto'
    }

    return (
      <a style={logoStyle} onClick={() => history.push('/')}>
        <img style={logoStyle} src={`/logos/${imgName}`} />
      </a>
    )
  }
}
