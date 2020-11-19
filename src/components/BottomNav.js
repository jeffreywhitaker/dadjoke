// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

// import functions

// NavBar component
function BottomNav(props) {
  // destructure props
  const { isLoggedIn } = props

  // logged out
  if (props.location.pathname === '/privatejokes' && !isLoggedIn) {
    return (
      <NavBarSection>
        <span>You must be logged in to add a private joke!</span>
      </NavBarSection>
    )
  }

  return (
    <NavBarSection>
      {window.location.pathname === '/publicjokes' && (
        <NavLinkStyled disabled exact to={'/publicjokes/add'}>
          Add Public Joke
        </NavLinkStyled>
      )}
      {window.location.pathname === '/publicjokes/add' && (
        <NavLinkStyled disabled exact to={'/publicjokes'}>
          Don't Add New Joke
        </NavLinkStyled>
      )}
      {window.location.pathname === '/privatejokes' && (
        <NavLinkStyled disabled exact to={'/privatejokes/add'}>
          Add Private Joke
        </NavLinkStyled>
      )}
      {window.location.pathname === '/privatejokes/add' && (
        <NavLinkStyled disabled exact to={'/privatejokes'}>
          Don't Add New Joke
        </NavLinkStyled>
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
export default connect(mapStateToProps, {})(BottomNav)

// styled components
const NavBarSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`

const NavLinkStyled = styled(NavLink)`
  background: lightpink;
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  &.active {
    filter: brightness(75%);
  }
  border-radius: 5px;
`
