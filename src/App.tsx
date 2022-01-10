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
import MessageBoard from './components/messageBoard'
import Profile from './components/Profile/Profile'
import Signup from './components/Signup'
import ThreadView from './components/MessageBoard/ThreadView'

import { ifSessionExistsLogIn, userLogin } from './actions/actions'

// App component
function App(props: Props) {
  // destructure props
  const { ifSessionExistsLogIn, isLoggedIn, userLogin } = props
  const [isDarkModeOn, setIsDarkModeOn] = useState(true)

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
    if (localStorage.getItem('dark-mode') === 'false') {
      setIsDarkModeOn(false)
    }

    ifSessionExistsLogIn()
    if (localStorage.getItem('doNotShowIntroModal') !== 'true') {
      setShowModal(true)
    }
  }, [ifSessionExistsLogIn])

  const toggleDarkMode = () => {
    console.log('dark mode is: ', isDarkModeOn)
    localStorage.setItem('dark-mode', (!isDarkModeOn).toString())
    setIsDarkModeOn(!isDarkModeOn)
  }

  // return components
  return (
    <Main isDarkModeOn={isDarkModeOn}>
      <Header isDarkModeOn={isDarkModeOn} toggleDarkMode={toggleDarkMode} />
      <AppWrapper className="App">
        <Route exact path="/">
          <Redirect to="/publicjokes" />
        </Route>
        <Route path="/publicjokes" component={JokesWrapper} />
        <Route path="/privatejokes" component={JokesWrapper} />
        <Route path="/mboard/:threadId" component={ThreadView} />
        <Route path="/mboard" component={MessageBoard} exact />
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
    </Main>
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
interface MainProps {
  isDarkModeOn: boolean
}

const Main = styled.main<MainProps>`
  background-color: ${(props) => (props.isDarkModeOn ? 'darkgray' : 'white')};
`
const AppWrapper = styled.section`
  max-width: 1100px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  /* background: lightslategray; */
`
