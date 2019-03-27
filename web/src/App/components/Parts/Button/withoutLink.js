import React from 'react'
import Loading from 'orionsoft-parts/lib/components/Loading'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import keys from 'lodash/keys'
import omit from 'lodash/omit'

export default class Button extends React.Component {
  static propTypes = {
    tooltip: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    linkButton: PropTypes.bool,
    label: PropTypes.any,
    children: PropTypes.any,
    primary: PropTypes.bool,
    danger: PropTypes.bool,
    big: PropTypes.bool,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    fullWidth: PropTypes.bool,
    icon: PropTypes.any,
    onClick: PropTypes.func
  }

  static defaultProps = {
    linkButton: false,
    primary: false,
    danger: false,
    big: false,
    style: {},
    disabled: false,
    fullWidth: false
  }

  state = {}

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getChildProps() {
    const omitKeys = keys(Button.propTypes)
    return omit(this.props, ...omitKeys)
  }

  @autobind
  async onClick() {
    if (this.props.disabled || this.props.loading || this.state.loading || !this.props.onClick) {
      return
    }

    this.setState({loading: true})
    await this.props.onClick()
    if (this.mounted) {
      this.setState({loading: false})
    }
  }

  getClassName() {
    const classes = ['orion_button']
    if (this.props.disabled) {
      classes.push('orion_disabled')
    } else if (this.props.loading || this.state.loading) {
      classes.push('orion_loading')
    } else if (this.props.danger) {
      console.log('danger')
      classes.push('orion_danger')
    } else if (this.props.primary) {
      classes.push('orion_primary')
    }
    if (this.props.big) {
      classes.push('orion_big')
    }
    if (this.props.fullWidth) {
      classes.push('orion_fullWidth')
    }
    return classes.join(' ')
  }

  renderInner() {
    if (this.props.loading || this.state.loading) {
      return <Loading size={25} />
    }

    if (this.props.icon) {
      const {fullWidth} = this.props
      const iconStyle = fullWidth ? null : {display: 'flex', alignItems: 'center'}
      return (
        <span style={iconStyle}>
          {this.renderIcon()}
          {this.props.children}
        </span>
      )
    } else {
      return this.props.label || this.props.children
    }
  }

  renderIcon() {
    const Icon = this.props.icon
    if (!Icon) return
    return <Icon style={{marginRight: 10}} size={20} />
  }

  renderButton() {
    return (
      <span className={this.getClassName()} style={this.props.style}>
        {this.renderInner()}
      </span>
    )
  }

  renderLinkButton() {
    return <a {...this.getChildProps()}>{this.renderButton()}</a>
  }

  renderMain() {
    if (this.props.linkButton || this.props.href || this.props.to) {
      return this.renderLinkButton()
    } else {
      return (
        <span className="os_button_container" {...this.getChildProps()} onClick={this.onClick}>
          {this.renderButton()}
        </span>
      )
    }
  }

  render() {
    if (this.props.tooltip) {
      return <Tooltip content={this.props.tooltip}>{this.renderMain()}</Tooltip>
    } else {
      return this.renderMain()
    }
  }
}
