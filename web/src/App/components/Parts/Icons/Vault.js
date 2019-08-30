import React from 'react'
import PropTypes from 'prop-types'

export default class Cloud extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    active: PropTypes.bool
  }

  renderNormal(style) {
    return (
      <img
        style={style}
        src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi4wMDEgNTEyLjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwMSA1MTIuMDAxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnPjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ5NC41ODcsMGgtMzUxLjcxYy00Ljk3OCwwLTkuMDE1LDQuMDM2LTkuMDE1LDkuMDE1YzAsNC45NzgsNC4wMzYsOS4wMTUsOS4wMTUsOS4wMTVoMzQyLjY5NXY0NDEuNjY1SDQzLjkwOXYtNzUuNzIzICAgIGgyMi4yOTd2NDQuNDEyYzAsNC45NzgsNC4wMzYsOS4wMTUsOS4wMTUsOS4wMTVoNTEuOTQzYzQuOTc4LDAsOS4wMTUtNC4wMzYsOS4wMTUtOS4wMTVjMC00Ljk3OC00LjAzNi05LjAxNS05LjAxNS05LjAxNUg4NC4yMzUgICAgdi0zNS4zOTdoNy43OGM0Ljk3OCwwLDkuMDE1LTQuMDM2LDkuMDE1LTkuMDE1di05MC43MjljMC00Ljk3OC00LjAzNi05LjAxNS05LjAxNS05LjAxNWgtNy43OHYtNzIuN2g3Ljc4ICAgIGM0Ljk3OCwwLDkuMDE1LTQuMDM2LDkuMDE1LTkuMDE1di05MC43MzFjMC00Ljk3OC00LjAzNi05LjAxNS05LjAxNS05LjAxNWgtNy43OFY1OC4zNTVoMzYxLjAxMXY0OC42OTkgICAgYzAsNC45NzgsNC4wMzYsOS4wMTUsOS4wMTUsOS4wMTVjNC45NzgsMCw5LjAxNS00LjAzNiw5LjAxNS05LjAxNVY0OS4zNDFjMC00Ljk3OC00LjAzNi05LjAxNS05LjAxNS05LjAxNUg3NS4yMiAgICBjLTQuOTc4LDAtOS4wMTUsNC4wMzYtOS4wMTUsOS4wMTV2NDQuNDFINDMuOTA5VjE4LjAyOWg2Ny41NDRjNC45NzgsMCw5LjAxNS00LjAzNiw5LjAxNS05LjAxNWMwLTQuOTc4LTQuMDM2LTkuMDE1LTkuMDE1LTkuMDE1ICAgIEgzNC44OTRjLTQuOTc4LDAtOS4wMTUsNC4wMzYtOS4wMTUsOS4wMTV2ODQuNzM4aC04LjQ2NWMtNC45NzgsMC05LjAxNSw0LjAzNi05LjAxNSw5LjAxNXY5MC43MzEgICAgYzAsNC45NzgsNC4wMzYsOS4wMTUsOS4wMTUsOS4wMTVoOC40NjV2NzIuN2gtOC40NjVjLTQuOTc4LDAtOS4wMTUsNC4wMzYtOS4wMTUsOS4wMTV2OTAuNzI5YzAsNC45NzgsNC4wMzYsOS4wMTUsOS4wMTUsOS4wMTUgICAgaDguNDY1djg0LjczOGMwLDQuOTc4LDQuMDM2LDkuMDE1LDkuMDE1LDkuMDE1aDM2LjM0OHYyNS4yNjRjMCw0Ljk3OCw0LjAzNiw5LjAxNSw5LjAxNSw5LjAxNWg5NC43NjIgICAgYzQuOTc4LDAsOS4wMTUtNC4wMzYsOS4wMTUtOS4wMTV2LTI1LjI2NGgxNjEuNDE0djI1LjI2NGMwLDQuOTc4LDQuMDM2LDkuMDE1LDkuMDE1LDkuMDE1aDk0Ljc2MiAgICBjNC45NzgsMCw5LjAxNS00LjAzNiw5LjAxNS05LjAxNXYtMjUuMjY0aDM2LjM0OWM0Ljk3OCwwLDkuMDE1LTQuMDM2LDkuMDE1LTkuMDE1VjkuMDE1QzUwMy42MDEsNC4wMzYsNDk5LjU2NywwLDQ5NC41ODcsMHogICAgIE0yNi40MjksMTg0LjQ4MnYtNzIuN2g1Ni41N3Y3Mi43MDJoLTU2LjU3VjE4NC40ODJ6IE02Ni4yMDYsMjAyLjUxMXY3Mi43SDQzLjkwOXYtNzIuN0g2Ni4yMDZ6IE0yNi40MjksMzY1Ljk0MnYtNzIuN2g1Ni41NyAgICB2NzIuN0gyNi40Mjl6IE04OS4yNzEsNDkzLjk3MXYtMTYuMjQ5aDc2LjczM3YxNi4yNDlIODkuMjcxeiBNNDQwLjIxLDQ5My45NzFoLTc2LjczM3YtMTYuMjQ5aDc2LjczM1Y0OTMuOTcxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojOTFBMkIwIiBkYXRhLW9sZF9jb2xvcj0iIzkxYTJiMCI+PC9wYXRoPgoJPC9nPgo8L2c+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDU0LjI2MSwxMjkuNDY0Yy00Ljk3OCwwLTkuMDE1LDQuMDM2LTkuMDE1LDkuMDE1djI4MC44ODlIMTU4LjU4OGMtNC45NzgsMC05LjAxNSw0LjAzNi05LjAxNSw5LjAxNSAgICBjMCw0Ljk3OCw0LjAzNiw5LjAxNSw5LjAxNSw5LjAxNWgyOTUuNjczYzQuOTc4LDAsOS4wMTUtNC4wMzYsOS4wMTUtOS4wMTVWMTM4LjQ3OSAgICBDNDYzLjI3NSwxMzMuNSw0NTkuMjM5LDEyOS40NjQsNDU0LjI2MSwxMjkuNDY0eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojOTFBMkIwIiBkYXRhLW9sZF9jb2xvcj0iIzkxYTJiMCI+PC9wYXRoPgoJPC9nPgo8L2c+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjY4LjYwNywxNDAuMDA1Yy01NC40NjYsMC05OC43NzgsNDQuMzEyLTk4Ljc3OCw5OC43NzhjMCw1NC40NjYsNDQuMzEyLDk4Ljc3OCw5OC43NzgsOTguNzc4ICAgIGM1NC40NjctMC4wMDEsOTguNzc4LTQ0LjMxMyw5OC43NzgtOTguNzc4QzM2Ny4zODUsMTg0LjMxNywzMjMuMDczLDE0MC4wMDUsMjY4LjYwNywxNDAuMDA1eiBNMzQ4Ljg0LDIyOS43NjhoLTMzLjc3NiAgICBjLTEuMjMyLTYuMzYxLTMuNzMyLTEyLjI3My03LjI0LTE3LjQ1M2wyMy44NjEtMjMuODYxQzM0MC45NiwyMDAuMDU0LDM0Ny4xMDgsMjE0LjI1LDM0OC44NCwyMjkuNzY4eiBNMjc3LjYyMywxNTguNTUgICAgYzE1LjUxOCwxLjczMiwyOS43MTQsNy44ODEsNDEuMzE0LDE3LjE1NWwtMjMuODYxLDIzLjg2MWMtNS4xODItMy41MDgtMTEuMDk0LTYuMDA4LTE3LjQ1My03LjI0VjE1OC41NXogTTI1OS41OTQsMTU4LjU1MXYzMy43NzQgICAgaC0wLjAwMWMtNi4zNTksMS4yMzItMTIuMjczLDMuNzMyLTE3LjQ1Myw3LjI0bC0yMy44Ni0yMy44NkMyMjkuODc5LDE2Ni40MzEsMjQ0LjA3NiwxNjAuMjgzLDI1OS41OTQsMTU4LjU1MXogTTIwNS41MzEsMTg4LjQ1NCAgICBsMjMuODYxLDIzLjg2Yy0zLjUwOCw1LjE4Mi02LjAwOCwxMS4wOTQtNy4yNCwxNy40NTVoLTMzLjc3NkMxOTAuMTA3LDIxNC4yNSwxOTYuMjU3LDIwMC4wNTQsMjA1LjUzMSwxODguNDU0eiBNMTg4LjM3NywyNDcuNzk2ICAgIGgzMy43NzR2MC4wMDFjMS4yMzIsNi4zNTksMy43MzIsMTIuMjczLDcuMjQsMTcuNDUzbC0yMy44NiwyMy44NkMxOTYuMjU3LDI3Ny41MSwxOTAuMTA5LDI2My4zMTQsMTg4LjM3NywyNDcuNzk2eiAgICAgTTI1OS41OTMsMzE5LjAxNWMtMTUuNTE4LTEuNzMyLTI5LjcxMy03Ljg4MS00MS4zMTQtMTcuMTU1bDIzLjg2MS0yMy44NjFjNS4xODIsMy41MDgsMTEuMDk0LDYuMDA4LDE3LjQ1Myw3LjI0VjMxOS4wMTV6ICAgICBNMjM5LjMwOSwyMzguNzgzYzAtMTYuMTU1LDEzLjE0My0yOS4zLDI5LjI5OC0yOS4zczI5LjMsMTMuMTQ0LDI5LjMsMjkuM3MtMTMuMTQ0LDI5LjI5OC0yOS4zLDI5LjI5OCAgICBTMjM5LjMwOSwyNTQuOTM4LDIzOS4zMDksMjM4Ljc4M3ogTTI3Ny42MjMsMzE5LjAxM3YtMzMuNzc0aC0wLjAwMWM2LjM1OS0xLjIzMiwxMi4yNzMtMy43MzIsMTcuNDU1LTcuMjRsMjMuODYxLDIzLjg2ICAgIEMzMDcuMzM3LDMxMS4xMzMsMjkzLjE0MSwzMTcuMjgxLDI3Ny42MjMsMzE5LjAxM3ogTTMzMS42ODUsMjg5LjExMmwtMjMuODYxLTIzLjg2MWMzLjUwOC01LjE4Miw2LjAwOC0xMS4wOTQsNy4yNC0xNy40NTNoMzMuNzc2ICAgIEMzNDcuMTA4LDI2My4zMTYsMzQwLjk1OSwyNzcuNTEsMzMxLjY4NSwyODkuMTEyeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojOTFBMkIwIiBkYXRhLW9sZF9jb2xvcj0iIzkxYTJiMCI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4="
      />
    )
  }

  renderActive(style) {
    return (
      <img
        style={style}
        src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi4wMDEgNTEyLjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwMSA1MTIuMDAxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnPjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ5NC41ODcsMGgtMzUxLjcxYy00Ljk3OCwwLTkuMDE1LDQuMDM2LTkuMDE1LDkuMDE1YzAsNC45NzgsNC4wMzYsOS4wMTUsOS4wMTUsOS4wMTVoMzQyLjY5NXY0NDEuNjY1SDQzLjkwOXYtNzUuNzIzICAgIGgyMi4yOTd2NDQuNDEyYzAsNC45NzgsNC4wMzYsOS4wMTUsOS4wMTUsOS4wMTVoNTEuOTQzYzQuOTc4LDAsOS4wMTUtNC4wMzYsOS4wMTUtOS4wMTVjMC00Ljk3OC00LjAzNi05LjAxNS05LjAxNS05LjAxNUg4NC4yMzUgICAgdi0zNS4zOTdoNy43OGM0Ljk3OCwwLDkuMDE1LTQuMDM2LDkuMDE1LTkuMDE1di05MC43MjljMC00Ljk3OC00LjAzNi05LjAxNS05LjAxNS05LjAxNWgtNy43OHYtNzIuN2g3Ljc4ICAgIGM0Ljk3OCwwLDkuMDE1LTQuMDM2LDkuMDE1LTkuMDE1di05MC43MzFjMC00Ljk3OC00LjAzNi05LjAxNS05LjAxNS05LjAxNWgtNy43OFY1OC4zNTVoMzYxLjAxMXY0OC42OTkgICAgYzAsNC45NzgsNC4wMzYsOS4wMTUsOS4wMTUsOS4wMTVjNC45NzgsMCw5LjAxNS00LjAzNiw5LjAxNS05LjAxNVY0OS4zNDFjMC00Ljk3OC00LjAzNi05LjAxNS05LjAxNS05LjAxNUg3NS4yMiAgICBjLTQuOTc4LDAtOS4wMTUsNC4wMzYtOS4wMTUsOS4wMTV2NDQuNDFINDMuOTA5VjE4LjAyOWg2Ny41NDRjNC45NzgsMCw5LjAxNS00LjAzNiw5LjAxNS05LjAxNWMwLTQuOTc4LTQuMDM2LTkuMDE1LTkuMDE1LTkuMDE1ICAgIEgzNC44OTRjLTQuOTc4LDAtOS4wMTUsNC4wMzYtOS4wMTUsOS4wMTV2ODQuNzM4aC04LjQ2NWMtNC45NzgsMC05LjAxNSw0LjAzNi05LjAxNSw5LjAxNXY5MC43MzEgICAgYzAsNC45NzgsNC4wMzYsOS4wMTUsOS4wMTUsOS4wMTVoOC40NjV2NzIuN2gtOC40NjVjLTQuOTc4LDAtOS4wMTUsNC4wMzYtOS4wMTUsOS4wMTV2OTAuNzI5YzAsNC45NzgsNC4wMzYsOS4wMTUsOS4wMTUsOS4wMTUgICAgaDguNDY1djg0LjczOGMwLDQuOTc4LDQuMDM2LDkuMDE1LDkuMDE1LDkuMDE1aDM2LjM0OHYyNS4yNjRjMCw0Ljk3OCw0LjAzNiw5LjAxNSw5LjAxNSw5LjAxNWg5NC43NjIgICAgYzQuOTc4LDAsOS4wMTUtNC4wMzYsOS4wMTUtOS4wMTV2LTI1LjI2NGgxNjEuNDE0djI1LjI2NGMwLDQuOTc4LDQuMDM2LDkuMDE1LDkuMDE1LDkuMDE1aDk0Ljc2MiAgICBjNC45NzgsMCw5LjAxNS00LjAzNiw5LjAxNS05LjAxNXYtMjUuMjY0aDM2LjM0OWM0Ljk3OCwwLDkuMDE1LTQuMDM2LDkuMDE1LTkuMDE1VjkuMDE1QzUwMy42MDEsNC4wMzYsNDk5LjU2NywwLDQ5NC41ODcsMHogICAgIE0yNi40MjksMTg0LjQ4MnYtNzIuN2g1Ni41N3Y3Mi43MDJoLTU2LjU3VjE4NC40ODJ6IE02Ni4yMDYsMjAyLjUxMXY3Mi43SDQzLjkwOXYtNzIuN0g2Ni4yMDZ6IE0yNi40MjksMzY1Ljk0MnYtNzIuN2g1Ni41NyAgICB2NzIuN0gyNi40Mjl6IE04OS4yNzEsNDkzLjk3MXYtMTYuMjQ5aDc2LjczM3YxNi4yNDlIODkuMjcxeiBNNDQwLjIxLDQ5My45NzFoLTc2LjczM3YtMTYuMjQ5aDc2LjczM1Y0OTMuOTcxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojMDA3N0ZGIiBkYXRhLW9sZF9jb2xvcj0iIyMwMDc3RiI+PC9wYXRoPgoJPC9nPgo8L2c+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDU0LjI2MSwxMjkuNDY0Yy00Ljk3OCwwLTkuMDE1LDQuMDM2LTkuMDE1LDkuMDE1djI4MC44ODlIMTU4LjU4OGMtNC45NzgsMC05LjAxNSw0LjAzNi05LjAxNSw5LjAxNSAgICBjMCw0Ljk3OCw0LjAzNiw5LjAxNSw5LjAxNSw5LjAxNWgyOTUuNjczYzQuOTc4LDAsOS4wMTUtNC4wMzYsOS4wMTUtOS4wMTVWMTM4LjQ3OSAgICBDNDYzLjI3NSwxMzMuNSw0NTkuMjM5LDEyOS40NjQsNDU0LjI2MSwxMjkuNDY0eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojMDA3N0ZGIiBkYXRhLW9sZF9jb2xvcj0iIyMwMDc3RiI+PC9wYXRoPgoJPC9nPgo8L2c+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjY4LjYwNywxNDAuMDA1Yy01NC40NjYsMC05OC43NzgsNDQuMzEyLTk4Ljc3OCw5OC43NzhjMCw1NC40NjYsNDQuMzEyLDk4Ljc3OCw5OC43NzgsOTguNzc4ICAgIGM1NC40NjctMC4wMDEsOTguNzc4LTQ0LjMxMyw5OC43NzgtOTguNzc4QzM2Ny4zODUsMTg0LjMxNywzMjMuMDczLDE0MC4wMDUsMjY4LjYwNywxNDAuMDA1eiBNMzQ4Ljg0LDIyOS43NjhoLTMzLjc3NiAgICBjLTEuMjMyLTYuMzYxLTMuNzMyLTEyLjI3My03LjI0LTE3LjQ1M2wyMy44NjEtMjMuODYxQzM0MC45NiwyMDAuMDU0LDM0Ny4xMDgsMjE0LjI1LDM0OC44NCwyMjkuNzY4eiBNMjc3LjYyMywxNTguNTUgICAgYzE1LjUxOCwxLjczMiwyOS43MTQsNy44ODEsNDEuMzE0LDE3LjE1NWwtMjMuODYxLDIzLjg2MWMtNS4xODItMy41MDgtMTEuMDk0LTYuMDA4LTE3LjQ1My03LjI0VjE1OC41NXogTTI1OS41OTQsMTU4LjU1MXYzMy43NzQgICAgaC0wLjAwMWMtNi4zNTksMS4yMzItMTIuMjczLDMuNzMyLTE3LjQ1Myw3LjI0bC0yMy44Ni0yMy44NkMyMjkuODc5LDE2Ni40MzEsMjQ0LjA3NiwxNjAuMjgzLDI1OS41OTQsMTU4LjU1MXogTTIwNS41MzEsMTg4LjQ1NCAgICBsMjMuODYxLDIzLjg2Yy0zLjUwOCw1LjE4Mi02LjAwOCwxMS4wOTQtNy4yNCwxNy40NTVoLTMzLjc3NkMxOTAuMTA3LDIxNC4yNSwxOTYuMjU3LDIwMC4wNTQsMjA1LjUzMSwxODguNDU0eiBNMTg4LjM3NywyNDcuNzk2ICAgIGgzMy43NzR2MC4wMDFjMS4yMzIsNi4zNTksMy43MzIsMTIuMjczLDcuMjQsMTcuNDUzbC0yMy44NiwyMy44NkMxOTYuMjU3LDI3Ny41MSwxOTAuMTA5LDI2My4zMTQsMTg4LjM3NywyNDcuNzk2eiAgICAgTTI1OS41OTMsMzE5LjAxNWMtMTUuNTE4LTEuNzMyLTI5LjcxMy03Ljg4MS00MS4zMTQtMTcuMTU1bDIzLjg2MS0yMy44NjFjNS4xODIsMy41MDgsMTEuMDk0LDYuMDA4LDE3LjQ1Myw3LjI0VjMxOS4wMTV6ICAgICBNMjM5LjMwOSwyMzguNzgzYzAtMTYuMTU1LDEzLjE0My0yOS4zLDI5LjI5OC0yOS4zczI5LjMsMTMuMTQ0LDI5LjMsMjkuM3MtMTMuMTQ0LDI5LjI5OC0yOS4zLDI5LjI5OCAgICBTMjM5LjMwOSwyNTQuOTM4LDIzOS4zMDksMjM4Ljc4M3ogTTI3Ny42MjMsMzE5LjAxM3YtMzMuNzc0aC0wLjAwMWM2LjM1OS0xLjIzMiwxMi4yNzMtMy43MzIsMTcuNDU1LTcuMjRsMjMuODYxLDIzLjg2ICAgIEMzMDcuMzM3LDMxMS4xMzMsMjkzLjE0MSwzMTcuMjgxLDI3Ny42MjMsMzE5LjAxM3ogTTMzMS42ODUsMjg5LjExMmwtMjMuODYxLTIzLjg2MWMzLjUwOC01LjE4Miw2LjAwOC0xMS4wOTQsNy4yNC0xNy40NTNoMzMuNzc2ICAgIEMzNDcuMTA4LDI2My4zMTYsMzQwLjk1OSwyNzcuNTEsMzMxLjY4NSwyODkuMTEyeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojMDA3N0ZGIiBkYXRhLW9sZF9jb2xvcj0iIyMwMDc3RiI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4="
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
