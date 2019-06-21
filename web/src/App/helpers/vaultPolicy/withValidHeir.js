import React from 'react'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'App/components/Parts/Loading'
import gql from 'graphql-tag'

export default function(ComposedComponent) {
  @withGraphQL(
    gql`
      query getData($accessToken: String) {
        validHeirs(accessToken: $accessToken)
      }
    `,
    {loading: <Loading />}
  )
  class withValidHeir extends React.Component {
    static propTypes = {
      validHeirs: PropTypes.string
    }

    state = {isValidHeir: false}

    static getDerivedStateFromProps(props, state) {
      const {validHeirs} = props
      if (!validHeirs) return {isValidHeir: false}
      return {isValidHeir: true, vaultName: validHeirs}
    }

    redirectHome() {
      this.props.history.replace({
        pathname: '/',
        state: {invalidHeir: true}
      })

      return <span />
    }

    render() {
      if (!this.state.isValidHeir) return this.redirectHome()
      return <ComposedComponent {...this.props} vaultName={this.state.vaultName} />
    }
  }

  return withValidHeir
}
