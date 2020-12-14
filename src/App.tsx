// import dependencies
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

// bootstrap
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/navbar'
import Nav from 'react-bootstrap/nav'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

// import components
import Header from './components/Header'
import JokesWrapper from './components/JokesWrapper'
import Login from './components/Login'
import Profile from './components/Profile'
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

  // for intro modal
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => {
    setShowModal(false)
  }

  const handleLogin = () => {
    console.log('handleLogin')
  }

  function handleSignup() {
    console.log('handleSignup')
  }

  function handleDemo() {
    console.log('handleLogin')
  }

  function handleDoNotShowAgain() {
    console.log('handleLogin')
  }

  // use effect to check for token
  useEffect(() => {
    ifSessionExistsLogIn()
    if (localStorage.getItem('doNotShowIntroModal') !== 'true') {
      setShowModal(true)
    }
  }, [ifSessionExistsLogIn()])

  // return components
  return (
    <>
      <Route component={Header} />
      <AppWrapper className="App">
        <Redirect exact path="/" to="/publicjokes" />
        <Route path="/publicjokes" component={JokesWrapper} />
        <Route path="/privatejokes" component={JokesWrapper} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/myprofile" component={Profile} />
        <Route path="/profile/:username" component={Profile} />
      </AppWrapper>

      {showModal && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Welcomet to JeffDadJokes!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              Welcome to the site! If you'd like to see a demo, please click the
              demo button below. Otherwise, enjoy!
            </InputGroup>

            <div>
              <Button onClick={handleLogin}>Login</Button>
              <Button onClick={handleSignup}>Signup</Button>
              <Button onClick={handleDemo}>Demo</Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleDoNotShowAgain}>
              Do Not Show Again
            </Button>
          </Modal.Footer>
        </Modal>
      )}
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
