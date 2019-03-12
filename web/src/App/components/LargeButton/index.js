import React from 'react'
import PropTypes from 'prop-types'
import Button from 'orionsoft-parts/lib/components/Button'

export default class LargeButton extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    to: PropTypes.string,
    primary: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.any
  }

  render() {
    const {label, to, primary, loading, onClick, disabled} = this.props
    return (
      <Button
        style={{width: '100%'}}
        onClick={onClick}
        to={to || null}
        primary={primary}
        loading={loading}
        disabled={disabled}>
        {label}
      </Button>
    )
  }
}
