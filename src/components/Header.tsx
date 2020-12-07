// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

// bootstrap
import Navbar from 'react-bootstrap/navbar'
import Nav from 'react-bootstrap/nav'

// import functions
import { userLogout } from '../actions/actions'

// types
type Props = {
  isLoggedIn: boolean
  userLogout: () => void
  username: string
}

// Header component
export const Header: React.FC<Props> = (props) => {
  // destructure props
  const { isLoggedIn, userLogout, username } = props

  // use history
  const history = useHistory()

  console.log('is logged in', isLoggedIn)

  // helper functions
  const handleLogout = (e: { preventDefault: () => void }) => {
    console.log('handle logout called')
    e.preventDefault()
    userLogout()
    history.push('/publicjokes')
  }

  // return Header
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
            <Nav.Link as={NavLink} to="/profile">
              {username}'s Profile
            </Nav.Link>
          ) : null}
        </Nav>
        <Nav>
          {isLoggedIn ? (
            <>
              {/* <Navbar.Text>
                Signed in as: {'>>'} <a href="/profile">{username}</a> {'<<'}
              </Navbar.Text> */}
              <Nav.Link onClick={() => handleLogout} href=" ">
                Log Out
              </Nav.Link>
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
export default connector(Header)
