// import dependencies
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

// import actions
import { userSignup } from '../actions/actions'

// login page component
function Signup({ userSignup, isLoggedIn }) {
  // use history
  const history = useHistory()

  // local state login credentials
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    priamryemail: '',
  })

  // call login function
  const callSignup = (e) => {
    e.preventDefault()
    userSignup(credentials)
  }

  // if logged in, redirect to game list
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/jokes')
    }
  }, [history, isLoggedIn])

  // handle form values, save to local state
  const handleValueChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  // render the following
  return (
    <SignupDiv>
      <form onSubmit={callSignup}>
        <p>Username:</p>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleValueChange}
        />
        <p>Password:</p>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleValueChange}
        />
        <p>Email:</p>
        <input
          type="email"
          name="primaryemail"
          value={credentials.primaryemail}
          onChange={handleValueChange}
        />
        <br />
        <br />
        <button>Sign Up</button>
      </form>
      <h2>Already registered?</h2>
      <Link to="/login">Log In!</Link>
    </SignupDiv>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  }
}

// export component
export default connect(mapStateToProps, { userSignup })(Signup)

// styled components
const SignupDiv = styled.div`
  width: 200px
  margin: 20px auto
`
