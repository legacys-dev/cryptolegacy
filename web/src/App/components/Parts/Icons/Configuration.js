import React from 'react'
import PropTypes from 'prop-types'

export default class Configuration extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    active: PropTypes.bool
  }

  renderNormal(style) {
    return (
      <img
        style={style}
        src="data:image/svg+xml;base64,
      PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDc4LjcwMyA0NzguNzAzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzguNzAzIDQ3OC43MDM7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGc+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDU0LjIsMTg5LjEwMWwtMzMuNi01LjdjLTMuNS0xMS4zLTgtMjIuMi0xMy41LTMyLjZsMTkuOC0yNy43YzguNC0xMS44LDcuMS0yNy45LTMuMi0zOC4xbC0yOS44LTI5LjggICAgYy01LjYtNS42LTEzLTguNy0yMC45LTguN2MtNi4yLDAtMTIuMSwxLjktMTcuMSw1LjVsLTI3LjgsMTkuOGMtMTAuOC01LjctMjIuMS0xMC40LTMzLjgtMTMuOWwtNS42LTMzLjIgICAgYy0yLjQtMTQuMy0xNC43LTI0LjctMjkuMi0yNC43aC00Mi4xYy0xNC41LDAtMjYuOCwxMC40LTI5LjIsMjQuN2wtNS44LDM0Yy0xMS4yLDMuNS0yMi4xLDguMS0zMi41LDEzLjdsLTI3LjUtMTkuOCAgICBjLTUtMy42LTExLTUuNS0xNy4yLTUuNWMtNy45LDAtMTUuNCwzLjEtMjAuOSw4LjdsLTI5LjksMjkuOGMtMTAuMiwxMC4yLTExLjYsMjYuMy0zLjIsMzguMWwyMCwyOC4xICAgIGMtNS41LDEwLjUtOS45LDIxLjQtMTMuMywzMi43bC0zMy4yLDUuNmMtMTQuMywyLjQtMjQuNywxNC43LTI0LjcsMjkuMnY0Mi4xYzAsMTQuNSwxMC40LDI2LjgsMjQuNywyOS4ybDM0LDUuOCAgICBjMy41LDExLjIsOC4xLDIyLjEsMTMuNywzMi41bC0xOS43LDI3LjRjLTguNCwxMS44LTcuMSwyNy45LDMuMiwzOC4xbDI5LjgsMjkuOGM1LjYsNS42LDEzLDguNywyMC45LDguN2M2LjIsMCwxMi4xLTEuOSwxNy4xLTUuNSAgICBsMjguMS0yMGMxMC4xLDUuMywyMC43LDkuNiwzMS42LDEzbDUuNiwzMy42YzIuNCwxNC4zLDE0LjcsMjQuNywyOS4yLDI0LjdoNDIuMmMxNC41LDAsMjYuOC0xMC40LDI5LjItMjQuN2w1LjctMzMuNiAgICBjMTEuMy0zLjUsMjIuMi04LDMyLjYtMTMuNWwyNy43LDE5LjhjNSwzLjYsMTEsNS41LDE3LjIsNS41bDAsMGM3LjksMCwxNS4zLTMuMSwyMC45LTguN2wyOS44LTI5LjhjMTAuMi0xMC4yLDExLjYtMjYuMywzLjItMzguMSAgICBsLTE5LjgtMjcuOGM1LjUtMTAuNSwxMC4xLTIxLjQsMTMuNS0zMi42bDMzLjYtNS42YzE0LjMtMi40LDI0LjctMTQuNywyNC43LTI5LjJ2LTQyLjEgICAgQzQ3OC45LDIwMy44MDEsNDY4LjUsMTkxLjUwMSw0NTQuMiwxODkuMTAxeiBNNDUxLjksMjYwLjQwMWMwLDEuMy0wLjksMi40LTIuMiwyLjZsLTQyLDdjLTUuMywwLjktOS41LDQuOC0xMC44LDkuOSAgICBjLTMuOCwxNC43LTkuNiwyOC44LTE3LjQsNDEuOWMtMi43LDQuNi0yLjUsMTAuMywwLjYsMTQuN2wyNC43LDM0LjhjMC43LDEsMC42LDIuNS0wLjMsMy40bC0yOS44LDI5LjhjLTAuNywwLjctMS40LDAuOC0xLjksMC44ICAgIGMtMC42LDAtMS4xLTAuMi0xLjUtMC41bC0zNC43LTI0LjdjLTQuMy0zLjEtMTAuMS0zLjMtMTQuNy0wLjZjLTEzLjEsNy44LTI3LjIsMTMuNi00MS45LDE3LjRjLTUuMiwxLjMtOS4xLDUuNi05LjksMTAuOGwtNy4xLDQyICAgIGMtMC4yLDEuMy0xLjMsMi4yLTIuNiwyLjJoLTQyLjFjLTEuMywwLTIuNC0wLjktMi42LTIuMmwtNy00MmMtMC45LTUuMy00LjgtOS41LTkuOS0xMC44Yy0xNC4zLTMuNy0yOC4xLTkuNC00MS0xNi44ICAgIGMtMi4xLTEuMi00LjUtMS44LTYuOC0xLjhjLTIuNywwLTUuNSwwLjgtNy44LDIuNWwtMzUsMjQuOWMtMC41LDAuMy0xLDAuNS0xLjUsMC41Yy0wLjQsMC0xLjItMC4xLTEuOS0wLjhsLTI5LjgtMjkuOCAgICBjLTAuOS0wLjktMS0yLjMtMC4zLTMuNGwyNC42LTM0LjVjMy4xLTQuNCwzLjMtMTAuMiwwLjYtMTQuOGMtNy44LTEzLTEzLjgtMjcuMS0xNy42LTQxLjhjLTEuNC01LjEtNS42LTktMTAuOC05LjlsLTQyLjMtNy4yICAgIGMtMS4zLTAuMi0yLjItMS4zLTIuMi0yLjZ2LTQyLjFjMC0xLjMsMC45LTIuNCwyLjItMi42bDQxLjctN2M1LjMtMC45LDkuNi00LjgsMTAuOS0xMGMzLjctMTQuNyw5LjQtMjguOSwxNy4xLTQyICAgIGMyLjctNC42LDIuNC0xMC4zLTAuNy0xNC42bC0yNC45LTM1Yy0wLjctMS0wLjYtMi41LDAuMy0zLjRsMjkuOC0yOS44YzAuNy0wLjcsMS40LTAuOCwxLjktMC44YzAuNiwwLDEuMSwwLjIsMS41LDAuNWwzNC41LDI0LjYgICAgYzQuNCwzLjEsMTAuMiwzLjMsMTQuOCwwLjZjMTMtNy44LDI3LjEtMTMuOCw0MS44LTE3LjZjNS4xLTEuNCw5LTUuNiw5LjktMTAuOGw3LjItNDIuM2MwLjItMS4zLDEuMy0yLjIsMi42LTIuMmg0Mi4xICAgIGMxLjMsMCwyLjQsMC45LDIuNiwyLjJsNyw0MS43YzAuOSw1LjMsNC44LDkuNiwxMCwxMC45YzE1LjEsMy44LDI5LjUsOS43LDQyLjksMTcuNmM0LjYsMi43LDEwLjMsMi41LDE0LjctMC42bDM0LjUtMjQuOCAgICBjMC41LTAuMywxLTAuNSwxLjUtMC41YzAuNCwwLDEuMiwwLjEsMS45LDAuOGwyOS44LDI5LjhjMC45LDAuOSwxLDIuMywwLjMsMy40bC0yNC43LDM0LjdjLTMuMSw0LjMtMy4zLDEwLjEtMC42LDE0LjcgICAgYzcuOCwxMy4xLDEzLjYsMjcuMiwxNy40LDQxLjljMS4zLDUuMiw1LjYsOS4xLDEwLjgsOS45bDQyLDcuMWMxLjMsMC4yLDIuMiwxLjMsMi4yLDIuNnY0Mi4xSDQ1MS45eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojOTFBMkIwIiBkYXRhLW9sZF9jb2xvcj0iIzkxYTJiMCI+PC9wYXRoPgoJCTxwYXRoIGQ9Ik0yMzkuNCwxMzYuMDAxYy01NywwLTEwMy4zLDQ2LjMtMTAzLjMsMTAzLjNzNDYuMywxMDMuMywxMDMuMywxMDMuM3MxMDMuMy00Ni4zLDEwMy4zLTEwMy4zUzI5Ni40LDEzNi4wMDEsMjM5LjQsMTM2LjAwMSAgICB6IE0yMzkuNCwzMTUuNjAxYy00Mi4xLDAtNzYuMy0zNC4yLTc2LjMtNzYuM3MzNC4yLTc2LjMsNzYuMy03Ni4zczc2LjMsMzQuMiw3Ni4zLDc2LjNTMjgxLjUsMzE1LjYwMSwyMzkuNCwzMTUuNjAxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojOTFBMkIwIiBkYXRhLW9sZF9jb2xvcj0iIzkxYTJiMCI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4="
      />
    )
  }

  renderActive(style) {
    return (
      <img
        style={style}
        src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDc4LjcwMyA0NzguNzAzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzguNzAzIDQ3OC43MDM7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgY2xhc3M9IiI+PGc+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDU0LjIsMTg5LjEwMWwtMzMuNi01LjdjLTMuNS0xMS4zLTgtMjIuMi0xMy41LTMyLjZsMTkuOC0yNy43YzguNC0xMS44LDcuMS0yNy45LTMuMi0zOC4xbC0yOS44LTI5LjggICAgYy01LjYtNS42LTEzLTguNy0yMC45LTguN2MtNi4yLDAtMTIuMSwxLjktMTcuMSw1LjVsLTI3LjgsMTkuOGMtMTAuOC01LjctMjIuMS0xMC40LTMzLjgtMTMuOWwtNS42LTMzLjIgICAgYy0yLjQtMTQuMy0xNC43LTI0LjctMjkuMi0yNC43aC00Mi4xYy0xNC41LDAtMjYuOCwxMC40LTI5LjIsMjQuN2wtNS44LDM0Yy0xMS4yLDMuNS0yMi4xLDguMS0zMi41LDEzLjdsLTI3LjUtMTkuOCAgICBjLTUtMy42LTExLTUuNS0xNy4yLTUuNWMtNy45LDAtMTUuNCwzLjEtMjAuOSw4LjdsLTI5LjksMjkuOGMtMTAuMiwxMC4yLTExLjYsMjYuMy0zLjIsMzguMWwyMCwyOC4xICAgIGMtNS41LDEwLjUtOS45LDIxLjQtMTMuMywzMi43bC0zMy4yLDUuNmMtMTQuMywyLjQtMjQuNywxNC43LTI0LjcsMjkuMnY0Mi4xYzAsMTQuNSwxMC40LDI2LjgsMjQuNywyOS4ybDM0LDUuOCAgICBjMy41LDExLjIsOC4xLDIyLjEsMTMuNywzMi41bC0xOS43LDI3LjRjLTguNCwxMS44LTcuMSwyNy45LDMuMiwzOC4xbDI5LjgsMjkuOGM1LjYsNS42LDEzLDguNywyMC45LDguN2M2LjIsMCwxMi4xLTEuOSwxNy4xLTUuNSAgICBsMjguMS0yMGMxMC4xLDUuMywyMC43LDkuNiwzMS42LDEzbDUuNiwzMy42YzIuNCwxNC4zLDE0LjcsMjQuNywyOS4yLDI0LjdoNDIuMmMxNC41LDAsMjYuOC0xMC40LDI5LjItMjQuN2w1LjctMzMuNiAgICBjMTEuMy0zLjUsMjIuMi04LDMyLjYtMTMuNWwyNy43LDE5LjhjNSwzLjYsMTEsNS41LDE3LjIsNS41bDAsMGM3LjksMCwxNS4zLTMuMSwyMC45LTguN2wyOS44LTI5LjhjMTAuMi0xMC4yLDExLjYtMjYuMywzLjItMzguMSAgICBsLTE5LjgtMjcuOGM1LjUtMTAuNSwxMC4xLTIxLjQsMTMuNS0zMi42bDMzLjYtNS42YzE0LjMtMi40LDI0LjctMTQuNywyNC43LTI5LjJ2LTQyLjEgICAgQzQ3OC45LDIwMy44MDEsNDY4LjUsMTkxLjUwMSw0NTQuMiwxODkuMTAxeiBNNDUxLjksMjYwLjQwMWMwLDEuMy0wLjksMi40LTIuMiwyLjZsLTQyLDdjLTUuMywwLjktOS41LDQuOC0xMC44LDkuOSAgICBjLTMuOCwxNC43LTkuNiwyOC44LTE3LjQsNDEuOWMtMi43LDQuNi0yLjUsMTAuMywwLjYsMTQuN2wyNC43LDM0LjhjMC43LDEsMC42LDIuNS0wLjMsMy40bC0yOS44LDI5LjhjLTAuNywwLjctMS40LDAuOC0xLjksMC44ICAgIGMtMC42LDAtMS4xLTAuMi0xLjUtMC41bC0zNC43LTI0LjdjLTQuMy0zLjEtMTAuMS0zLjMtMTQuNy0wLjZjLTEzLjEsNy44LTI3LjIsMTMuNi00MS45LDE3LjRjLTUuMiwxLjMtOS4xLDUuNi05LjksMTAuOGwtNy4xLDQyICAgIGMtMC4yLDEuMy0xLjMsMi4yLTIuNiwyLjJoLTQyLjFjLTEuMywwLTIuNC0wLjktMi42LTIuMmwtNy00MmMtMC45LTUuMy00LjgtOS41LTkuOS0xMC44Yy0xNC4zLTMuNy0yOC4xLTkuNC00MS0xNi44ICAgIGMtMi4xLTEuMi00LjUtMS44LTYuOC0xLjhjLTIuNywwLTUuNSwwLjgtNy44LDIuNWwtMzUsMjQuOWMtMC41LDAuMy0xLDAuNS0xLjUsMC41Yy0wLjQsMC0xLjItMC4xLTEuOS0wLjhsLTI5LjgtMjkuOCAgICBjLTAuOS0wLjktMS0yLjMtMC4zLTMuNGwyNC42LTM0LjVjMy4xLTQuNCwzLjMtMTAuMiwwLjYtMTQuOGMtNy44LTEzLTEzLjgtMjcuMS0xNy42LTQxLjhjLTEuNC01LjEtNS42LTktMTAuOC05LjlsLTQyLjMtNy4yICAgIGMtMS4zLTAuMi0yLjItMS4zLTIuMi0yLjZ2LTQyLjFjMC0xLjMsMC45LTIuNCwyLjItMi42bDQxLjctN2M1LjMtMC45LDkuNi00LjgsMTAuOS0xMGMzLjctMTQuNyw5LjQtMjguOSwxNy4xLTQyICAgIGMyLjctNC42LDIuNC0xMC4zLTAuNy0xNC42bC0yNC45LTM1Yy0wLjctMS0wLjYtMi41LDAuMy0zLjRsMjkuOC0yOS44YzAuNy0wLjcsMS40LTAuOCwxLjktMC44YzAuNiwwLDEuMSwwLjIsMS41LDAuNWwzNC41LDI0LjYgICAgYzQuNCwzLjEsMTAuMiwzLjMsMTQuOCwwLjZjMTMtNy44LDI3LjEtMTMuOCw0MS44LTE3LjZjNS4xLTEuNCw5LTUuNiw5LjktMTAuOGw3LjItNDIuM2MwLjItMS4zLDEuMy0yLjIsMi42LTIuMmg0Mi4xICAgIGMxLjMsMCwyLjQsMC45LDIuNiwyLjJsNyw0MS43YzAuOSw1LjMsNC44LDkuNiwxMCwxMC45YzE1LjEsMy44LDI5LjUsOS43LDQyLjksMTcuNmM0LjYsMi43LDEwLjMsMi41LDE0LjctMC42bDM0LjUtMjQuOCAgICBjMC41LTAuMywxLTAuNSwxLjUtMC41YzAuNCwwLDEuMiwwLjEsMS45LDAuOGwyOS44LDI5LjhjMC45LDAuOSwxLDIuMywwLjMsMy40bC0yNC43LDM0LjdjLTMuMSw0LjMtMy4zLDEwLjEtMC42LDE0LjcgICAgYzcuOCwxMy4xLDEzLjYsMjcuMiwxNy40LDQxLjljMS4zLDUuMiw1LjYsOS4xLDEwLjgsOS45bDQyLDcuMWMxLjMsMC4yLDIuMiwxLjMsMi4yLDIuNnY0Mi4xSDQ1MS45eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojMEYyRkYxIiBkYXRhLW9sZF9jb2xvcj0iIzBmMmZmMSI+PC9wYXRoPgoJCTxwYXRoIGQ9Ik0yMzkuNCwxMzYuMDAxYy01NywwLTEwMy4zLDQ2LjMtMTAzLjMsMTAzLjNzNDYuMywxMDMuMywxMDMuMywxMDMuM3MxMDMuMy00Ni4zLDEwMy4zLTEwMy4zUzI5Ni40LDEzNi4wMDEsMjM5LjQsMTM2LjAwMSAgICB6IE0yMzkuNCwzMTUuNjAxYy00Mi4xLDAtNzYuMy0zNC4yLTc2LjMtNzYuM3MzNC4yLTc2LjMsNzYuMy03Ni4zczc2LjMsMzQuMiw3Ni4zLDc2LjNTMjgxLjUsMzE1LjYwMSwyMzkuNCwzMTUuNjAxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojMEYyRkYxIiBkYXRhLW9sZF9jb2xvcj0iIzBmMmZmMSI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4="
      />
    )
  }

  render() {
    const { size, active } = this.props
    const logoStyle = {
      height: size || 20,
      width: 'auto',
      display: 'flex'
    }

    if (active) return this.renderActive(logoStyle)
    return this.renderNormal(logoStyle)
  }
}
