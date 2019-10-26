// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

// import functions

// NavBar component
function NavBar() {
    return (
        <>
        <NavLink exact to={'/'}>Home</NavLink>
        <NavLink to={'/login'}>Login</NavLink>
        </>
    )
}

// connect Redux state
const mapStateToProps = state => {
    return {
      login: state.login,
    //   user: state.user
    }
  }
  
  // export NavBar
  export default connect(mapStateToProps, { })(NavBar)