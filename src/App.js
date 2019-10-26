// import dependencies
import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

// import components
import NavBar from './components/NavBar'
import Login from './components/Login'

// App component
export default function App() {
  return (
    <AppWrapper className="App">
      <Route path='/' component={NavBar} />
      <Route path='/login' component={Login} />
      <p>App test.</p>
    </AppWrapper>
  )
}

// styled components
const AppWrapper = styled.div`
  max-width: 1100px
  margin: 0 auto
`