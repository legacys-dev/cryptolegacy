import React from 'react'
import PropTypes from 'prop-types'

export default class Layout extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.node
    }
  }

  render() {
    return (
      <div className="email">
        <div className="header">
          <img
            className="logo"
            src="https://f002.backblazeb2.com/file/Crytolegacy/twoColorsBT.png"
            alt="Logo"
          />
        </div>
        <div className="content">
          <div className="content-inner">{this.props.children}</div>
        </div>
        <div className="footer">
          <p>
            Si tienes alguna duda, chatea con nosotros en{' '}
            <a href="https://google.cl">
              <strong>CryptoLegacy</strong>
            </a>
          </p>
        </div>
      </div>
    )
  }
}
