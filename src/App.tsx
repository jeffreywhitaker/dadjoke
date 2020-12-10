// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

// import components
import Header from './components/Header'
import JokesWrapper from './components/JokesWrapper'
import Login from './components/Login'
import Signup from './components/Signup'

import { ifSessionExistsLogIn } from './actions/actions'

// typing
type Props = {
  ifSessionExistsLogIn: () => void
}

// App component
export const App: React.FC<Props> = (props: Props) => {
  // destructure props
  const { ifSessionExistsLogIn } = props

  // use effect to check for token
  useEffect(() => {
    ifSessionExistsLogIn()
  }, [ifSessionExistsLogIn()])

  // return components
  return (
    <>
      <Route component={Header} />
      <AppWrapper className="App">
        <Redirect exact path="/" to="/publicjokes" />
        <Route path="/publicjokes" component={JokesWrapper} />
        <Route path="/privatejokes" component={JokesWrapper} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </AppWrapper>
    </>
  )
}

// export component
export default connect(null, { ifSessionExistsLogIn })(App)

// styled components
const AppWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background: lightslategray;
`
