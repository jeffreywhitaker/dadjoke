// import dependencies
import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'

// bootstrap
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// import functions
import { Joke } from '../types/types'
import jokesData from '../ajax/jokesData'
import { userLogout } from '../actions/actions'

// Header component
export const Header: React.FC<Props> = (props: Props) => {
  // destructure props
  const { isLoggedIn, userLogout, username } = props

  // modal
  // local state for adding new joke
  function determineIfPrivate(): boolean {
    if (window.location.pathname === '/publicjokes') {
      return false
    } else return true
  }
  const blankJoke: Joke = {
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
  const history = useHistory()

  console.log('is logged in', isLoggedIn)

  useEffect(() => {
    console.log('new joke changed: ', newJoke)
  }, [newJoke])

  // helper functions
  const handleLogout = (e: { preventDefault: () => void }) => {
    console.log('handle logout called')
    e.preventDefault()
    if (window.confirm('Are you sure you want to log out?')) {
      userLogout()
      history.push('/publicjokes')
    }
  }

  // return Header
  return (
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
              <Nav.Link as={NavLink} to={`/profile/${username}`}>
                {username}'s Profile
              </Nav.Link>
            ) : null}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Button
                  variant="primary"
                  className="button"
                  onClick={handleShow}
                >
                  Add Joke
                </Button>
                &nbsp;
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
      <Modal show={showAddJokeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Joke</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Q</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Add DadJoke Question"
              name="dadjokequestion"
              value={newJoke.dadjokequestion}
              onChange={handleValueChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>A</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Add DadJoke Answer"
              name="dadjokeanswer"
              value={newJoke.dadjokeanswer}
              onChange={handleValueChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <span>Keywords</span> &nbsp;
                <OverlayTrigger
                  key={`keywords`}
                  placement="top"
                  overlay={
                    <Tooltip id={`keywords`}>
                      Keywords should be a comma-seperated list of words
                    </Tooltip>
                  }
                >
                  <i className="fas fa-info-circle"></i>
                </OverlayTrigger>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Add DadJoke Answer"
              name="dadjokeanswer"
              onChange={handleKeywordsChange}
            />
          </InputGroup>

          <ButtonGroup toggle>
            <ToggleButton
              type="radio"
              name="radio"
              checked={!newJoke.isprivate}
              value={false}
              onClick={() => handleSetIsPrivate(false)}
            >
              Public
            </ToggleButton>
            <ToggleButton
              type="radio"
              checked={newJoke.isprivate}
              value={true}
              onClick={() => handleSetIsPrivate(true)}
            >
              Private
            </ToggleButton>
          </ButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={callAddJoke}>
            Add Joke
          </Button>
        </Modal.Footer>
      </Modal>
    </HeaderWrapper>
  )
}

// connect component to redux store
const mapStateToProps = (state: {
  loginReducer: { isLoggedIn: boolean; username: string }
}) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    username: state.loginReducer.username,
  }
}

// export component
const connector = connect(mapStateToProps, { userLogout })
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux
export default connector(Header)

const HeaderWrapper = styled.section`
  .button {
    max-width: 150px;
  }
`
