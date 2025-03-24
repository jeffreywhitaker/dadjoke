// import dependencies
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/globalStyles'
import { lightTheme, darkTheme } from './styles/theme'

// import components
import Chat from './components/Chat/Chat'
import Header from './components/Header'
import IntroModal from './components/modals/IntroModal'
import JokesWrapper from './components/JokesWrapper'
import Login from './components/Login'
import MessageBoard from './components/messageBoard'
import Profile from './components/Profile/Profile'
import Signup from './components/Signup'
import ThreadView from './components/MessageBoard/ThreadView'

import { ifSessionExistsLogIn, userLogin } from './actions/actions'
import { RootState } from './reducers/rootReducer'

// App component
function App() {
  const isLoggedIn = useSelector((s: RootState) => s.loginReducer.isLoggedIn)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  // destructure props
  // const { ifSessionExistsLogIn, userLogin } = props
  const [isDarkModeOn, setIsDarkModeOn] = useState(true)

  // for intro modal
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => {
    setShowModal(false)
  }

  function handleDemo() {
    console.log('handleDemo')
    dispatch(userLogin({ username: 'testuser', password: 'password' }))

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

    dispatch(ifSessionExistsLogIn())
    if (localStorage.getItem('doNotShowIntroModal') !== 'true') {
      setShowModal(true)
    }
  }, [ifSessionExistsLogIn])

  const toggleDarkMode = () => {
    console.log('dark mode is: ', isDarkModeOn)
    localStorage.setItem('dark-mode', (!isDarkModeOn).toString())
    setIsDarkModeOn(!isDarkModeOn)
  }

  if (location.pathname === '/') {
    navigate('/publicjokes')
  }

  // return components
  return (
    <ThemeProvider theme={isDarkModeOn ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Main isDarkModeOn={isDarkModeOn}>
        <Header isDarkModeOn={isDarkModeOn} toggleDarkMode={toggleDarkMode} />
        <AppWrapper className="App">
          <Routes>
            <Route path="/publicjokes" element={<JokesWrapper />} />
            <Route path="/privatejokes" element={<JokesWrapper />} />
            <Route path="/mboard/:threadId" element={<ThreadView />} />
            <Route path="/mboard" element={<MessageBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/:username" element={<Profile />} />
            {/* <Route path="/chat" element={<Chat />} /> */}
          </Routes>
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
    </ThemeProvider>
  )
}

export default App

// styled components
interface MainProps {
  isDarkModeOn: boolean
}

const Main = styled.main<MainProps>`
  /* background-color: ${(props) =>
    props.isDarkModeOn ? 'darkgray' : 'white'}; */
  height: 100%;
`
const AppWrapper = styled.section`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  /* background: lightslategray; */
`
