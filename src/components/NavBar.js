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
  const { isLoggedIn, userLogout } = props

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
        <NavLinkStyled onClick={handleLogout} to={' '}>
          Log Out
        </NavLinkStyled>
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
  }
}

// export NavBar
export default connect(mapStateToProps, { userLogout })(NavBar)

// styled components
const NavBarSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 10px 0px 15px 0px;
`

const NavLinkStyled = styled(NavLink)`
  background: darksalmon;
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
`
