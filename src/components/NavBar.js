// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'

// import functions
import { userLogout } from '../actions/actions'

// NavBar component
function NavBar(props) {
  // destructure props
  const { isLoggedIn, userLogout, username } = props

  // use history
  const history = useHistory()

  // helper functions
  const handleLogout = (e) => {
    e.preventDefault()
    userLogout()
    history.push('/publicjokes')
  }

  // return nav bar
  return (
    <NavBarSection>
      <NavLinkStyled to={'/publicjokes'}>Public</NavLinkStyled>
      <NavLinkStyled to={'/privatejokes'}>Private</NavLinkStyled>
      {isLoggedIn ? (
        <>
          <span>
            {'>>'} {username}
          </span>
          <NavLinkStyled onClick={handleLogout} to={' '}>
            Log Out
          </NavLinkStyled>
        </>
      ) : (
        <>
          <NavLinkStyled to={'/login'}>Login</NavLinkStyled>
          <NavLinkStyled to={'/signup'}>Signup</NavLinkStyled>
        </>
      )}
    </NavBarSection>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    username: state.loginReducer.username,
  }
}

// export NavBar
export default connect(mapStateToProps, { userLogout })(NavBar)

// styled components
const NavBarSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 10px 0px 15px 0px;
  background-color: lightblue;
  align-items: center;

  span {
    font-size: 16px;
    font-weight: bold;
  }

  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
`

const NavLinkStyled = styled(NavLink)`
  background: lightpink;
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  &.active {
    filter: brightness(75%);
  }
  :hover {
    filter: brightness(90%);
  }
  border-radius: 5px;

  @media screen and (max-width: 400px) {
    padding: 2px 10px;
    margin: 5px auto;
  }
`
