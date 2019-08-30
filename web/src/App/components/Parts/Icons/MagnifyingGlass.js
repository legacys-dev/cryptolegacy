import React from 'react'
import PropTypes from 'prop-types'

export default class MagnifyingGlass extends React.Component {
  static propTypes = {
    size: PropTypes.number
  }

  renderNormal(style) {
    return (
      <img
        style={style}
        src="data:image/svg+xml;base64,
      PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBjbGFzcz0iIj48Zz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00NTQuNTM1LDU3LjQ2NmMtNzYuNjIzLTc2LjYyMS0yMDEuMjkzLTc2LjYyMS0yNzcuOTE1LDBjLTcwLjIyNCw3MC4yMjUtNzYuMDc0LDE4MC44MDYtMTcuNTc1LDI1Ny43NzFsLTExLjYyNCwxMS42MjUgICAgYy0xMi44NjYtNy45NDktMjkuOTk2LTYuMzYtNDEuMTQzLDQuNzg2bC05Ni41MDEsOTYuNWMtNi4zMDUsNi4zMDQtOS43NzYsMTQuNjg2LTkuNzc2LDIzLjYwMmMwLDguOTE1LDMuNDczLDE3LjI5Nyw5Ljc3NiwyMy42MDEgICAgbDI2LjQyLDI2LjQyMWM2LjI1Niw2LjI1NiwxNC42NDUsMTAuMDc4LDIzLjQ5MSwxMC4yMjJjOS4xMjQsMC4xNDksMTcuNzI3LTMuMzM2LDI0LjE2My05Ljc3MWwzMi41ODYtMzIuNTg2ICAgIGMyLjk5NS0yLjk5NSwyLjk5NS03Ljg1LDAtMTAuODQ0bC0wLjAwMS0wLjAwMWMtMi45OTUtMi45OTUtNy44NS0yLjk5NS0xMC44NDUsMGwtMzIuMjk2LDMyLjI5NiAgICBjLTMuMTk4LDMuMTk4LTcuNDE3LDUuMjcxLTExLjkzMSw1LjU0MWMtNS4yMzEsMC4zMTMtMTAuMjAyLTEuNTgyLTEzLjg3MS01LjI1MWwtMjYuNTgyLTI2LjU4NCAgICBjLTMuMTk4LTMuMTk4LTUuMjcxLTcuNDItNS41NC0xMS45MzVjLTAuMzExLTUuMjI5LDEuNTg0LTEwLjE5Nyw1LjI1MS0xMy44NjVsOTYuNTAxLTk2LjUwMSAgICBjNy4wMzMtNy4wMzMsMTguNDc0LTcuMDM0LDI1LjUwOS0wLjAwMmMwLjAwMSwwLjAwMSwwLjAwMSwwLjAwMSwwLjAwMiwwLjAwMmwyNi41ODIsMjYuNTgyYzMuMTk3LDMuMTk4LDUuMjcxLDcuNDE3LDUuNTQxLDExLjkzMSAgICBjMC4zMTMsNS4yMzEtMS41ODIsMTAuMjAxLTUuMjUxLDEzLjg3MWwtMzcuNzMzLDM3LjczM2MtMi45OTUsMi45OTUtMi45OTUsNy44NSwwLDEwLjg0NGwwLjAwMSwwLjAwMSAgICBjMi45OTUsMi45OTUsNy44NSwyLjk5NSwxMC44NDUsMGwzNy43MzItMzcuNzMzYzYuMzA1LTYuMzA0LDkuNzc2LTE0LjY4Niw5Ljc3Ni0yMy42MDFjMC02LjMtMS43NC0xMi4zMjktNC45ODItMTcuNTUxICAgIGwxMS42MTYtMTEuNjE2YzM0Ljk3NywyNi41ODYsNzYuODkzLDM5Ljg5MiwxMTguODE0LDM5Ljg5MmM1MC4zMjMsMCwxMDAuNjQ2LTE5LjE1NSwxMzguOTU4LTU3LjQ2NiAgICBDNTMxLjE1NCwyNTguNzU5LDUzMS4xNTQsMTM0LjA4Niw0NTQuNTM1LDU3LjQ2NnogTTE3NC45MywzNTMuMDk3bC0xNi4wMjctMTYuMDI3bDkuOTQtOS45NGMyLjUwMSwyLjgwNSw1LjA4Nyw1LjU2MSw3Ljc3Nyw4LjI1MSAgICBzNS40NDUsNS4yNzUsOC4yNSw3Ljc3NUwxNzQuOTMsMzUzLjA5N3ogTTQ0My42ODgsMzI0LjUzNGMtNzAuNjM5LDcwLjY0MS0xODUuNTgxLDcwLjY0MS0yNTYuMjIyLDAgICAgYy03MC42NC03MC42NDEtNzAuNjQtMTg1LjU4MSwwLTI1Ni4yMjJjMzUuMzI1LTM1LjMyNiw4MS43MS01Mi45ODEsMTI4LjExMi01Mi45ODFjNDYuMzg5LDAsOTIuNzk1LDE3LjY2NCwxMjguMTExLDUyLjk4MSAgICBDNTE0LjMyOSwxMzguOTUzLDUxNC4zMjksMjUzLjg5Myw0NDMuNjg4LDMyNC41MzR6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiM2MjYyNjIiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+Cgk8L2c+CjwvZz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00NzAuNSwxNjguNTQ1Yy0wLjc3OS00LjMyNi01LjAxNC03LjEyNi05LjI5NS02LjEzYy0zLjk3MywwLjkyMy02LjUzMSw0Ljc5Ny01LjgwNiw4LjgwOSAgICBjOC4yOTMsNDUuOTIxLTYuMTUyLDkyLjQyNi0zOS4zNzQsMTI1LjY0N2MtMjcuNjk2LDI3LjY5OC02NC4wNjYsNDEuNTQ1LTEwMC40NDgsNDEuNTQyICAgIGMtMzYuMzkzLTAuMDA0LTcyLjgtMTMuODY3LTEwMC40OTUtNDEuNTg4Yy0yNi41OTMtMjYuNjE3LTQxLjU2MS02Mi43NzgtNDEuNTYxLTEwMC40MDNjMC0zNy45NDQsMTQuNzc3LTczLjYxNyw0MS42MDctMTAwLjQ0NiAgICBjNTUuMzg4LTU1LjM4OSwxNDUuNTEtNTUuMzg5LDIwMC44OTcsMGMxMS43MTgsMTEuNzE4LDIxLjE1MywyNS4xMiwyOC4xMTIsMzkuOTE3YzEuNzMyLDMuNjg0LDYuMDU4LDUuMzUxLDkuODI2LDMuODA4ICAgIGM0LjA3My0xLjY2OCw1LjkwMi02LjQxLDQuMDI4LTEwLjM5MmMtNy43MS0xNi4zODEtMTguMTUzLTMxLjIxMy0zMS4xMTktNDQuMTc5Yy02MS4zNjktNjEuMzY3LTE2MS4yMi02MS4zNjctMjIyLjU4OSwwICAgIGMtMjkuNzI3LDI5LjcyNy00Ni4wOTksNjkuMjUzLTQ2LjA5OSwxMTEuMjk0YzAsNDIuMDQyLDE2LjM3Miw4MS41NjcsNDYuMDk5LDExMS4yOTVjMzAuNjg0LDMwLjY4Myw3MC45ODksNDYuMDI1LDExMS4yOTQsNDYuMDI1ICAgIHM4MC42MTEtMTUuMzQyLDExMS4yOTUtNDYuMDI1QzQ2My42NzIsMjcwLjkxNyw0NzkuNjc2LDIxOS40MDcsNDcwLjUsMTY4LjU0NXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzYyNjI2MiIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCTwvZz4KPC9nPjwvZz4gPC9zdmc+"
      />
    )
  }

  render() {
    const { size } = this.props
    const logoStyle = {
      height: size || 20,
      width: 'auto',
      display: 'flex'
    }

    return this.renderNormal(logoStyle)
  }
}
