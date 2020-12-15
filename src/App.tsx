// import dependencies
import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Route, Redirect, useHistory } from 'react-router-dom'
import styled from 'styled-components'

// bootstrap
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'

// import components
import Header from './components/Header'
import JokesWrapper from './components/JokesWrapper'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'

import { ifSessionExistsLogIn, userLogin } from './actions/actions'

// App component
function App(props: Props) {
  const history = useHistory()
  // destructure props
  const { ifSessionExistsLogIn, isLoggedIn, userLogin } = props

  // for intro modal
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => {
    setShowModal(false)
  }

  function handleDemo() {
    console.log('handleDemo')
    userLogin({ username: 'testuser', password: 'password' })
    setShowModal(false)
  }

  function handleDoNotShowAgain() {
    localStorage.setItem('doNotShowIntroModal', 'true')
  }

  // use effect to check for token
  useEffect(() => {
    ifSessionExistsLogIn()
    if (localStorage.getItem('doNotShowIntroModal') !== 'true') {
      setShowModal(true)
    }
  }, [ifSessionExistsLogIn])

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
            <Modal.Title>Welcome to JeffDadJokes!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              {!isLoggedIn ? (
                <>
                  <p>
                    Here you can add, update, and browse dad jokes. You can
                    upvote your favorites - and downvotes those you don't find
                    as funny.
                  </p>
                  <p>
                    Please click the 'demo' button below to check out all the
                    features!
                  </p>
                  <div>
                    <Button
                      onClick={() => {
                        setShowModal(false)
                        history.push('/login')
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        setShowModal(false)
                        history.push('/signup')
                      }}
                    >
                      Signup
                    </Button>
                    <Button onClick={handleDemo}>Demo</Button>
                  </div>
                </>
              ) : (
                <p>You are currently logged in - thanks for visiting!</p>
              )}
            </InputGroup>
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

interface LoginReducer {
  isLoggedIn: boolean
}

// connect component to redux store
const mapStateToProps = (state: { loginReducer: LoginReducer }) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  }
}

// export component
const connector = connect(mapStateToProps, { ifSessionExistsLogIn, userLogin })
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux
export default connector(App)

// styled components
const AppWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  /* background: lightslategray; */
`
