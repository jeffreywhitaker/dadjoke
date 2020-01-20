// import dependencies
import React from 'react'
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

// App component
export default function App() {
  return (
    <AppWrapper className="App">
      <Route component={NavBar} />
      <ContentContainer>
        <Redirect exact path="/" to="/login" />
        <Route path="/publicjokes" component={PublicJokes} />
        <Route path="/privatejokes" component={PrivateJokes} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/jokes/add" component={AddJoke} />
      </ContentContainer>
      <Route component={BottomNav} />
    </AppWrapper>
  )
}

// styled components
const AppWrapper = styled.div`
  max-width: 414px
  width: 100%
  height: 100vh
  margin: 0 auto
  background: lightblue
  display: flex
  flex-direction: column
`

// set max width to 1100px eventually

const ContentContainer = styled.article`
  flex-grow: 1;
`
