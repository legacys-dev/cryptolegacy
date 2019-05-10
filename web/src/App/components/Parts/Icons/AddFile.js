import React from 'react'
import PropTypes from 'prop-types'

export default class AddFile extends React.Component {
  static propTypes = {
    size: PropTypes.number
  }

  renderNormal(style) {
    return (
      <img
        style={style}
        src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGc+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDExLjU2NCwxMTEuMzNMMzAyLjYyOCwyLjM5M0MzMDEuMDk2LDAuODYxLDI5OS4wMTgsMCwyOTYuODUxLDBINTQuNDk3Yy00LjA5NiwwLTUuNDc2LDAtNy42NTUsMS42MzQgICAgYy0yLjA1OCwxLjU0NC0zLjI2OCwzLjk2NC0zLjI2OCw2LjUzNnY0NDEuMTkxYzAsNC41MTIsMy42NTgsOC4xNyw4LjE3LDguMTdoMTY4Ljg1OGM0LjUxMiwwLDguMTctMy42NTgsOC4xNy04LjE3ICAgIHMtMy42NTgtOC4xNy04LjE3LTguMTdINTkuOTE1VjE2LjM0YzM3LjMyLDAsMTkxLjQyMiwwLDIyOC43NjYsMHYxMDAuNzY2YzAsNC41MTIsMy42NTgsOC4xNyw4LjE3LDguMTdoMTAwLjc2NnYxMzguOSAgICBjMCw0LjUxMiwzLjY1OCw4LjE3LDguMTcsOC4xN3M4LjE3LTMuNjU4LDguMTctOC4xN3YtMTQ3LjA3QzQxMy45NTcsMTE0Ljk0LDQxMy4wOTcsMTEyLjg2MSw0MTEuNTY0LDExMS4zM3ogTTMwNS4wMjEsMTA4LjkzNiAgICBWMjcuODk1bDgxLjA0MSw4MS4wNDFIMzA1LjAyMXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzkxQTJCMCIgZGF0YS1vbGRfY29sb3I9IiM5MWEyYjAiPjwvcGF0aD4KCTwvZz4KPC9nPjxnPgoJPGc+CgkJPHBhdGggZD0iTTMzNy43MDIsMTc3LjAyMUgxMTkuODNjLTQuNTEyLDAtOC4xNywzLjY1OC04LjE3LDguMTdjMCw0LjUxMiwzLjY1OCw4LjE3LDguMTcsOC4xN2gyMTcuODcyICAgIGM0LjUxMiwwLDguMTctMy42NTgsOC4xNy04LjE3QzM0NS44NzIsMTgwLjY3OSwzNDIuMjE0LDE3Ny4wMjEsMzM3LjcwMiwxNzcuMDIxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojOTFBMkIwIiBkYXRhLW9sZF9jb2xvcj0iIzkxYTJiMCI+PC9wYXRoPgoJPC9nPgo8L2c+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzM3LjcwMiwyMjAuNTk2SDExOS44M2MtNC41MTIsMC04LjE3LDMuNjU4LTguMTcsOC4xN2MwLDQuNTEyLDMuNjU4LDguMTcsOC4xNyw4LjE3aDIxNy44NzIgICAgYzQuNTEyLDAsOC4xNy0zLjY1OCw4LjE3LTguMTdDMzQ1Ljg3MiwyMjQuMjU0LDM0Mi4yMTQsMjIwLjU5NiwzMzcuNzAyLDIyMC41OTZ6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiM5MUEyQjAiIGRhdGEtb2xkX2NvbG9yPSIjOTFhMmIwIj48L3BhdGg+Cgk8L2c+CjwvZz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yMjguNzY2LDI2NC4xN0gxMTkuODNjLTQuNTEyLDAtOC4xNywzLjY1OC04LjE3LDguMTdjMCw0LjUxMiwzLjY1OCw4LjE3LDguMTcsOC4xN2gxMDguOTM2ICAgIGM0LjUxMiwwLDguMTctMy42NTgsOC4xNy04LjE3QzIzNi45MzYsMjY3LjgyOCwyMzMuMjc4LDI2NC4xNywyMjguNzY2LDI2NC4xN3oiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzkxQTJCMCIgZGF0YS1vbGRfY29sb3I9IiM5MWEyYjAiPjwvcGF0aD4KCTwvZz4KPC9nPjxnPgoJPGc+CgkJPHBhdGggZD0iTTM1MS4zMTksMjc3Ljc4N2MtNjQuNTczLDAtMTE3LjEwNiw1Mi41MzMtMTE3LjEwNiwxMTcuMTA2UzI4Ni43NDYsNTEyLDM1MS4zMTksNTEyczExNy4xMDYtNTIuNTMzLDExNy4xMDYtMTE3LjEwNiAgICBTNDE1Ljg5MiwyNzcuNzg3LDM1MS4zMTksMjc3Ljc4N3ogTTM1MS4zMTksNDk1LjY2Yy01NS41NjMsMC0xMDAuNzY2LTQ1LjIwMy0xMDAuNzY2LTEwMC43NjYgICAgYzAtNTUuNTYzLDQ1LjIwMy0xMDAuNzY2LDEwMC43NjYtMTAwLjc2NnMxMDAuNzY2LDQ1LjIwMywxMDAuNzY2LDEwMC43NjZDNDUyLjA4NSw0NTAuNDU3LDQwNi44ODIsNDk1LjY2LDM1MS4zMTksNDk1LjY2eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojOTFBMkIwIiBkYXRhLW9sZF9jb2xvcj0iIzkxYTJiMCI+PC9wYXRoPgoJPC9nPgo8L2c+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDA1Ljc4NywzNzAuMzgzSDM3NS44M3YtMjkuOTU3YzAtMTMuNTE1LTEwLjk5NS0yNC41MTEtMjQuNTExLTI0LjUxMXMtMjQuNTExLDEwLjk5Ni0yNC41MTEsMjQuNTExdjI5Ljk1N2gtMjkuOTU3ICAgIGMtMTMuNTE2LDAtMjQuNTExLDEwLjk5Ni0yNC41MTEsMjQuNTExczEwLjk5NSwyNC41MTEsMjQuNTExLDI0LjUxMWgyOS45NTd2MjkuOTU3YzAsMTMuNTE1LDEwLjk5NSwyNC41MTEsMjQuNTExLDI0LjUxMSAgICBzMjQuNTExLTEwLjk5NiwyNC41MTEtMjQuNTExdi0yOS45NTdoMjkuOTU3YzEzLjUxNiwwLDI0LjUxMS0xMC45OTYsMjQuNTExLTI0LjUxMVM0MTkuMzAzLDM3MC4zODMsNDA1Ljc4NywzNzAuMzgzeiAgICAgTTQwNS43ODcsNDAzLjA2NEgzNjcuNjZjLTQuNTEyLDAtOC4xNywzLjY1OC04LjE3LDguMTd2MzguMTI4YzAsNC41MDUtMy42NjUsOC4xNy04LjE3LDguMTdzLTguMTctMy42NjYtOC4xNy04LjE3di0zOC4xMjggICAgYzAtNC41MTItMy42NTgtOC4xNy04LjE3LTguMTdoLTM4LjEyOGMtNC41MDYsMC04LjE3LTMuNjY2LTguMTctOC4xN3MzLjY2NS04LjE3LDguMTctOC4xN2gzOC4xMjhjNC41MTIsMCw4LjE3LTMuNjU4LDguMTctOC4xNyAgICB2LTM4LjEyOGMwLTQuNTA1LDMuNjY1LTguMTcsOC4xNy04LjE3czguMTcsMy42NjYsOC4xNyw4LjE3djM4LjEyOGMwLDQuNTEyLDMuNjU4LDguMTcsOC4xNyw4LjE3aDM4LjEyOCAgICBjNC41MDYsMCw4LjE3LDMuNjY2LDguMTcsOC4xN1M0MTAuMjkzLDQwMy4wNjQsNDA1Ljc4Nyw0MDMuMDY0eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojOTFBMkIwIiBkYXRhLW9sZF9jb2xvcj0iIzkxYTJiMCI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4="
      />
    )
  }

  render() {
    const {size} = this.props
    const logoStyle = {
      height: size || 20,
      width: 'auto',
      display: 'flex'
    }

    return this.renderNormal(logoStyle)
  }
}
