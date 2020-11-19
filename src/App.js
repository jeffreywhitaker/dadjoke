// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

// import components
import NavBar from './components/NavBar'
import PublicJokes from './components/PublicJokes'
import PrivateJokes from './components/PrivateJokes'
import Login from './components/Login'
import Signup from './components/Signup'
import AddJoke from './components/AddJoke'
import BottomNav from './components/BottomNav'

import { checkTokenValidity } from './actions/actions'

// App component
export function App(props) {
  // destructure props
  const { checkTokenValidity } = props

  // use effect to check for token
  useEffect(() => {
    if (localStorage.token) {
      checkTokenValidity()
    }
  }, [checkTokenValidity])

  // return components
  return (
    <AppWrapper className="App">
      <Route component={NavBar} />
      <ContentContainer>
        <Redirect exact path="/" to="/publicjokes" />
        <Route path="/publicjokes" component={PublicJokes} />
        <Route path="/privatejokes" component={PrivateJokes} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/publicjokes/add" component={AddJoke} />
        <Route path="/privatejokes/add" component={AddJoke} />
      </ContentContainer>
      <Route component={BottomNav} />
    </AppWrapper>
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
  display: flex;
  flex-direction: column;
`

// set max width to 1100px eventually

const ContentContainer = styled.article`
  margin-top: 10px;
  flex-grow: 1;
`
