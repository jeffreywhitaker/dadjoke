// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

// import components
import Header from './components/Header'
import PublicJokes from './components/PublicJokes'
import PrivateJokes from './components/PrivateJokes'
import Login from './components/Login'
import Signup from './components/Signup'

import { checkTokenValidity } from './actions/actions'

// typing
type Props = {
  checkTokenValidity: () => void
}

// App component
export const App: React.FC<Props> = (props) => {
  // destructure props
  const { checkTokenValidity } = props

  // use effect to check for token
  useEffect(() => {
    checkTokenValidity()
  }, [checkTokenValidity()])

  // return components
  return (
    <>
      <Route component={Header} />
      <AppWrapper className="App">
        <Redirect exact path="/" to="/publicjokes" />
        <Route path="/publicjokes" component={PublicJokes} />
        <Route path="/privatejokes" component={PrivateJokes} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </AppWrapper>
    </>
  )
}

// export component
export default connect(null, { checkTokenValidity })(App)

// styled components
const AppWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background: lightslategray;
`
