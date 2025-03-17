// import dependencies
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// bootstrap
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// import functions
import { NewJoke } from '../types/types'
import jokesData from '../ajax/jokesData'
import { userLogout } from '../actions/actions'

// components
import AddJokeModal from './modals/AddJokeModal'
import { RootState } from '../reducers/rootReducer'

type Props = { isDarkModeOn: boolean; toggleDarkMode: () => {} }

// Header component
export const Header: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((s: RootState) => s.loginReducer.isLoggedIn)
  const username = useSelector((s: RootState) => s.loginReducer.username)

  // destructure props
  const { isDarkModeOn, toggleDarkMode } = props

  // modal
  // local state for adding new joke
  function determineIfPrivate(): boolean {
    if (window.location.pathname === '/publicjokes') {
      return false
    } else return true
  }
  const blankJoke: NewJoke = {
    dadjokequestion: '',
    dadjokeanswer: '',
    keywords: [],
    isprivate: determineIfPrivate(),
  }
  const [showAddJokeModal, setShowAddJokeModal] = useState(false)
  const [newJoke, setNewJoke] = useState(blankJoke)

  const handleClose = () => setShowAddJokeModal(false)
  const handleSetIsPrivate = (val: boolean) =>
    setNewJoke({ ...newJoke, isprivate: val })

  // call add joke function
  const callAddJoke = (e: { preventDefault: () => unknown }) => {
    e.preventDefault()
    setShowAddJokeModal(false)
    console.log('new joke:')
    console.log(newJoke)
    // addJoke(newJoke)
    jokesData
      .addNewJoke(newJoke)
      .then(() => {
        setNewJoke(blankJoke)
        // RELOAD THE APP RATHER THAN BOTHER PIPING NEW JOKE TO THE CORRECT COMPONENT
        window.location.reload()
      })
      .catch((err) => {
        window.alert('Unable to add new joke: ' + err)
      })
  }

  useEffect(() => {
    console.log('isprivate', newJoke.isprivate)
  }, [newJoke])

  // handle change values, save to local state
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setNewJoke({
      ...newJoke,
      [e.target.name]: value,
    })
    console.log(newJoke)
  }

  // handle changing the keywords
  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stringOfKeywords = e.currentTarget.value
    setNewJoke({
      ...newJoke,
      keywords: stringOfKeywords
        .trim()
        .replace(/\s/g, '')
        .split(','),
    })
  }

  const handleShow = () => setShowAddJokeModal(true)

  // use history
  const navigate = useNavigate()

  console.log('is logged in', isLoggedIn)

  useEffect(() => {
    console.log('new joke changed: ', newJoke)
  }, [newJoke])

  // helper functions
  const handleLogout = (e: { preventDefault: () => void }) => {
    console.log('handle logout called')
    e.preventDefault()
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(userLogout())
      navigate('/publicjokes')
    }
  }

  // return Header
  return (
    <>
      <AddJokeModal
        callAddJoke={callAddJoke}
        handleClose={handleClose}
        handleKeywordsChange={handleKeywordsChange}
        handleValueChange={handleValueChange}
        handleSetIsPrivate={handleSetIsPrivate}
        newJoke={newJoke}
        showAddJokeModal={showAddJokeModal}
      />

      <HeaderWrapper>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Navbar.Brand as={NavLink} to="/publicjokes">
            JeffsDadJokes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/publicjokes">
                Public Jokes
              </Nav.Link>
              <Nav.Link as={NavLink} to="/privatejokes">
                Private Jokes
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  <Nav.Link as={NavLink} to={`/profile/${username}`}>
                    {username}'s Profile
                  </Nav.Link>
                </>
              ) : null}
              <Nav.Link as={NavLink} to={'/mboard'}>
                Message Board
              </Nav.Link>
              {/* <Nav.Link as={NavLink} to={'/chat'}>
                Chat
              </Nav.Link> */}
            </Nav>
            <Nav>
              <Button
                variant="outline-primary"
                size="sm"
                className="button"
                onClick={toggleDarkMode}
              >
                <i className={isDarkModeOn ? 'fa fa-sun' : 'fa fa-moon'} />
              </Button>
              {isLoggedIn ? (
                <>
                  <Button
                    variant="primary"
                    className="button"
                    onClick={handleShow}
                  >
                    Add Joke
                  </Button>
                  <Button
                    variant="danger"
                    className="button"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/signup">
                    Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </HeaderWrapper>
    </>
  )
}

// export component
export default Header

const HeaderWrapper = styled.header`
  .button {
    max-width: 150px;
    margin: 2px;
  }
`
