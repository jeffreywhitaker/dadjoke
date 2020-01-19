// import dependencies
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

// import functions

// NavBar component
function BottomNav() {
  return (
    <NavBarSection>
      {window.location.pathname === '/jokes/' && (
        <NavLinkStyled exact to={'/jokes/add'}>
          Add Public Joke
        </NavLinkStyled>
      )}
      {window.location.pathname === '/jokes/add' && (
        <NavLinkStyled exact to={'/jokes'}>
          Don't Add New Joke
        </NavLinkStyled>
      )}
      {window.location.pathname === '/profile/' && (
        <NavLinkStyled exact to={'/profile/add'}>
          Add Private Joke
        </NavLinkStyled>
      )}
      {window.location.pathname === '/profile/add' && (
        <NavLinkStyled exact to={'/profile'}>
          Don't Add New Joke
        </NavLinkStyled>
      )}
    </NavBarSection>
  )
}

// export NavBar
export default BottomNav

// styled components
const NavBarSection = styled.section`
  display: flex
  justify-content: space-around
  padding: 10px 0
`

const NavLinkStyled = styled(NavLink)`
  background: lightpink;
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  &.active {
    filter: brightness(75%);
  }
`
