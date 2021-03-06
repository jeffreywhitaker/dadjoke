// import dependencies
import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

// import components
import Header from './components/Header'
import IntroModal from './components/modals/IntroModal'
import JokesWrapper from './components/JokesWrapper'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'

import { ifSessionExistsLogIn, userLogin } from './actions/actions'

// App component
function App(props: Props) {
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
    setShowModal(false)
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
        <Route exact path="/">
          <Redirect to="/publicjokes" />
        </Route>
        <Route path="/publicjokes" component={JokesWrapper} />
        <Route path="/privatejokes" component={JokesWrapper} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile/:username" component={Profile} />
      </AppWrapper>

      <IntroModal
        handleClose={handleClose}
        handleDemo={handleDemo}
        handleDoNotShowAgain={handleDoNotShowAgain}
        isLoggedIn={isLoggedIn}
        setShowModal={setShowModal}
        showModal={showModal}
      />
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
const AppWrapper = styled.main`
  max-width: 1100px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  /* background: lightslategray; */
`
