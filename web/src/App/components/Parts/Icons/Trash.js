import React from 'react'
import PropTypes from 'prop-types'

export default class Trash extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    active: PropTypes.bool
  }

  renderNormal(style) {
    return (
      <img
        style={style}
        src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSItNDAgMCA0MjcgNDI3LjAwMTMxIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMjMyLjM5ODQzOCAxNTQuNzAzMTI1Yy01LjUyMzQzOCAwLTEwIDQuNDc2NTYzLTEwIDEwdjE4OWMwIDUuNTE5NTMxIDQuNDc2NTYyIDEwIDEwIDEwIDUuNTIzNDM3IDAgMTAtNC40ODA0NjkgMTAtMTB2LTE4OWMwLTUuNTIzNDM3LTQuNDc2NTYzLTEwLTEwLTEwem0wIDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzkxQTJCMCIgZGF0YS1vbGRfY29sb3I9IiM5MWEyYjAiPjwvcGF0aD48cGF0aCBkPSJtMTE0LjM5ODQzOCAxNTQuNzAzMTI1Yy01LjUyMzQzOCAwLTEwIDQuNDc2NTYzLTEwIDEwdjE4OWMwIDUuNTE5NTMxIDQuNDc2NTYyIDEwIDEwIDEwIDUuNTIzNDM3IDAgMTAtNC40ODA0NjkgMTAtMTB2LTE4OWMwLTUuNTIzNDM3LTQuNDc2NTYzLTEwLTEwLTEwem0wIDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzkxQTJCMCIgZGF0YS1vbGRfY29sb3I9IiM5MWEyYjAiPjwvcGF0aD48cGF0aCBkPSJtMjguMzk4NDM4IDEyNy4xMjEwOTR2MjQ2LjM3ODkwNmMwIDE0LjU2MjUgNS4zMzk4NDMgMjguMjM4MjgxIDE0LjY2Nzk2OCAzOC4wNTA3ODEgOS4yODUxNTYgOS44Mzk4NDQgMjIuMjA3MDMyIDE1LjQyNTc4MSAzNS43MzA0NjkgMTUuNDQ5MjE5aDE4OS4yMDMxMjVjMTMuNTI3MzQ0LS4wMjM0MzggMjYuNDQ5MjE5LTUuNjA5Mzc1IDM1LjczMDQ2OS0xNS40NDkyMTkgOS4zMjgxMjUtOS44MTI1IDE0LjY2Nzk2OS0yMy40ODgyODEgMTQuNjY3OTY5LTM4LjA1MDc4MXYtMjQ2LjM3ODkwNmMxOC41NDI5NjgtNC45MjE4NzUgMzAuNTU4NTkzLTIyLjgzNTkzOCAyOC4wNzgxMjQtNDEuODYzMjgyLTIuNDg0Mzc0LTE5LjAyMzQzNy0xOC42OTE0MDYtMzMuMjUzOTA2LTM3Ljg3ODkwNi0zMy4yNTc4MTJoLTUxLjE5OTIxOHYtMTIuNWMuMDU4NTkzLTEwLjUxMTcxOS00LjA5NzY1Ny0yMC42MDU0NjktMTEuNTM5MDYzLTI4LjAzMTI1LTcuNDQxNDA2LTcuNDIxODc1LTE3LjU1MDc4MS0xMS41NTQ2ODc1LTI4LjA2MjUtMTEuNDY4NzVoLTg4Ljc5Njg3NWMtMTAuNTExNzE5LS4wODU5Mzc1LTIwLjYyMTA5NCA0LjA0Njg3NS0yOC4wNjI1IDExLjQ2ODc1LTcuNDQxNDA2IDcuNDI1NzgxLTExLjU5NzY1NiAxNy41MTk1MzEtMTEuNTM5MDYyIDI4LjAzMTI1djEyLjVoLTUxLjE5OTIxOWMtMTkuMTg3NS4wMDM5MDYtMzUuMzk0NTMxIDE0LjIzNDM3NS0zNy44Nzg5MDcgMzMuMjU3ODEyLTIuNDgwNDY4IDE5LjAyNzM0NCA5LjUzNTE1NyAzNi45NDE0MDcgMjguMDc4MTI2IDQxLjg2MzI4MnptMjM5LjYwMTU2MiAyNzkuODc4OTA2aC0xODkuMjAzMTI1Yy0xNy4wOTc2NTYgMC0zMC4zOTg0MzctMTQuNjg3NS0zMC4zOTg0MzctMzMuNXYtMjQ1LjVoMjUwdjI0NS41YzAgMTguODEyNS0xMy4zMDA3ODIgMzMuNS0zMC4zOTg0MzggMzMuNXptLTE1OC42MDE1NjItMzY3LjVjLS4wNjY0MDctNS4yMDcwMzEgMS45ODA0NjgtMTAuMjE4NzUgNS42NzU3ODEtMTMuODk0NTMxIDMuNjkxNDA2LTMuNjc1NzgxIDguNzE0ODQzLTUuNjk1MzEzIDEzLjkyNTc4MS01LjYwNTQ2OWg4OC43OTY4NzVjNS4yMTA5MzctLjA4OTg0NCAxMC4yMzQzNzUgMS45Mjk2ODggMTMuOTI1NzgxIDUuNjA1NDY5IDMuNjk1MzEzIDMuNjcxODc1IDUuNzQyMTg4IDguNjg3NSA1LjY3NTc4MiAxMy44OTQ1MzF2MTIuNWgtMTI4em0tNzEuMTk5MjE5IDMyLjVoMjcwLjM5ODQzN2M5Ljk0MTQwNiAwIDE4IDguMDU4NTk0IDE4IDE4cy04LjA1ODU5NCAxOC0xOCAxOGgtMjcwLjM5ODQzN2MtOS45NDE0MDcgMC0xOC04LjA1ODU5NC0xOC0xOHM4LjA1ODU5My0xOCAxOC0xOHptMCAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiM5MUEyQjAiIGRhdGEtb2xkX2NvbG9yPSIjOTFhMmIwIj48L3BhdGg+PHBhdGggZD0ibTE3My4zOTg0MzggMTU0LjcwMzEyNWMtNS41MjM0MzggMC0xMCA0LjQ3NjU2My0xMCAxMHYxODljMCA1LjUxOTUzMSA0LjQ3NjU2MiAxMCAxMCAxMCA1LjUyMzQzNyAwIDEwLTQuNDgwNDY5IDEwLTEwdi0xODljMC01LjUyMzQzNy00LjQ3NjU2My0xMC0xMC0xMHptMCAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiM5MUEyQjAiIGRhdGEtb2xkX2NvbG9yPSIjOTFhMmIwIj48L3BhdGg+PC9nPiA8L3N2Zz4="
      />
    )
  }

  renderActive(style) {
    return (
      <img
        style={style}
        src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSItNDAgMCA0MjcgNDI3LjAwMTMxIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMjMyLjM5ODQzOCAxNTQuNzAzMTI1Yy01LjUyMzQzOCAwLTEwIDQuNDc2NTYzLTEwIDEwdjE4OWMwIDUuNTE5NTMxIDQuNDc2NTYyIDEwIDEwIDEwIDUuNTIzNDM3IDAgMTAtNC40ODA0NjkgMTAtMTB2LTE4OWMwLTUuNTIzNDM3LTQuNDc2NTYzLTEwLTEwLTEwem0wIDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzAwNzdGRiIgZGF0YS1vbGRfY29sb3I9IiM5MUEyQjAiPjwvcGF0aD48cGF0aCBkPSJtMTE0LjM5ODQzOCAxNTQuNzAzMTI1Yy01LjUyMzQzOCAwLTEwIDQuNDc2NTYzLTEwIDEwdjE4OWMwIDUuNTE5NTMxIDQuNDc2NTYyIDEwIDEwIDEwIDUuNTIzNDM3IDAgMTAtNC40ODA0NjkgMTAtMTB2LTE4OWMwLTUuNTIzNDM3LTQuNDc2NTYzLTEwLTEwLTEwem0wIDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzAwNzdGRiIgZGF0YS1vbGRfY29sb3I9IiM5MUEyQjAiPjwvcGF0aD48cGF0aCBkPSJtMjguMzk4NDM4IDEyNy4xMjEwOTR2MjQ2LjM3ODkwNmMwIDE0LjU2MjUgNS4zMzk4NDMgMjguMjM4MjgxIDE0LjY2Nzk2OCAzOC4wNTA3ODEgOS4yODUxNTYgOS44Mzk4NDQgMjIuMjA3MDMyIDE1LjQyNTc4MSAzNS43MzA0NjkgMTUuNDQ5MjE5aDE4OS4yMDMxMjVjMTMuNTI3MzQ0LS4wMjM0MzggMjYuNDQ5MjE5LTUuNjA5Mzc1IDM1LjczMDQ2OS0xNS40NDkyMTkgOS4zMjgxMjUtOS44MTI1IDE0LjY2Nzk2OS0yMy40ODgyODEgMTQuNjY3OTY5LTM4LjA1MDc4MXYtMjQ2LjM3ODkwNmMxOC41NDI5NjgtNC45MjE4NzUgMzAuNTU4NTkzLTIyLjgzNTkzOCAyOC4wNzgxMjQtNDEuODYzMjgyLTIuNDg0Mzc0LTE5LjAyMzQzNy0xOC42OTE0MDYtMzMuMjUzOTA2LTM3Ljg3ODkwNi0zMy4yNTc4MTJoLTUxLjE5OTIxOHYtMTIuNWMuMDU4NTkzLTEwLjUxMTcxOS00LjA5NzY1Ny0yMC42MDU0NjktMTEuNTM5MDYzLTI4LjAzMTI1LTcuNDQxNDA2LTcuNDIxODc1LTE3LjU1MDc4MS0xMS41NTQ2ODc1LTI4LjA2MjUtMTEuNDY4NzVoLTg4Ljc5Njg3NWMtMTAuNTExNzE5LS4wODU5Mzc1LTIwLjYyMTA5NCA0LjA0Njg3NS0yOC4wNjI1IDExLjQ2ODc1LTcuNDQxNDA2IDcuNDI1NzgxLTExLjU5NzY1NiAxNy41MTk1MzEtMTEuNTM5MDYyIDI4LjAzMTI1djEyLjVoLTUxLjE5OTIxOWMtMTkuMTg3NS4wMDM5MDYtMzUuMzk0NTMxIDE0LjIzNDM3NS0zNy44Nzg5MDcgMzMuMjU3ODEyLTIuNDgwNDY4IDE5LjAyNzM0NCA5LjUzNTE1NyAzNi45NDE0MDcgMjguMDc4MTI2IDQxLjg2MzI4MnptMjM5LjYwMTU2MiAyNzkuODc4OTA2aC0xODkuMjAzMTI1Yy0xNy4wOTc2NTYgMC0zMC4zOTg0MzctMTQuNjg3NS0zMC4zOTg0MzctMzMuNXYtMjQ1LjVoMjUwdjI0NS41YzAgMTguODEyNS0xMy4zMDA3ODIgMzMuNS0zMC4zOTg0MzggMzMuNXptLTE1OC42MDE1NjItMzY3LjVjLS4wNjY0MDctNS4yMDcwMzEgMS45ODA0NjgtMTAuMjE4NzUgNS42NzU3ODEtMTMuODk0NTMxIDMuNjkxNDA2LTMuNjc1NzgxIDguNzE0ODQzLTUuNjk1MzEzIDEzLjkyNTc4MS01LjYwNTQ2OWg4OC43OTY4NzVjNS4yMTA5MzctLjA4OTg0NCAxMC4yMzQzNzUgMS45Mjk2ODggMTMuOTI1NzgxIDUuNjA1NDY5IDMuNjk1MzEzIDMuNjcxODc1IDUuNzQyMTg4IDguNjg3NSA1LjY3NTc4MiAxMy44OTQ1MzF2MTIuNWgtMTI4em0tNzEuMTk5MjE5IDMyLjVoMjcwLjM5ODQzN2M5Ljk0MTQwNiAwIDE4IDguMDU4NTk0IDE4IDE4cy04LjA1ODU5NCAxOC0xOCAxOGgtMjcwLjM5ODQzN2MtOS45NDE0MDcgMC0xOC04LjA1ODU5NC0xOC0xOHM4LjA1ODU5My0xOCAxOC0xOHptMCAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiMwMDc3RkYiIGRhdGEtb2xkX2NvbG9yPSIjOTFBMkIwIj48L3BhdGg+PHBhdGggZD0ibTE3My4zOTg0MzggMTU0LjcwMzEyNWMtNS41MjM0MzggMC0xMCA0LjQ3NjU2My0xMCAxMHYxODljMCA1LjUxOTUzMSA0LjQ3NjU2MiAxMCAxMCAxMCA1LjUyMzQzNyAwIDEwLTQuNDgwNDY5IDEwLTEwdi0xODljMC01LjUyMzQzNy00LjQ3NjU2My0xMC0xMC0xMHptMCAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiMwMDc3RkYiIGRhdGEtb2xkX2NvbG9yPSIjOTFBMkIwIj48L3BhdGg+PC9nPiA8L3N2Zz4="
      />
    )
  }

  render() {
    const {size, active} = this.props
    const logoStyle = {
      height: size || 20,
      width: 'auto',
      display: 'flex'
    }

    if (active) return this.renderActive(logoStyle)
    return this.renderNormal(logoStyle)
  }
}
