// import dependencies
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import styled from 'styled-components'

// import actions
import { userLogin } from '../actions/actions'

// login page component
function Login({ userLogin, isLoggedIn, loginError }) {
  // useHistory
  const history = useHistory()

  // local state login credentials and errors
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)

  // form validation
  const formSchema = Yup.object().shape({
    username: Yup.string().required('A username is required.'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters.')
      .required('A password is required'),
  })

  // call login function
  const callLogin = (e) => {
    e.preventDefault()
    userLogin(credentials)
  }

  // if logged in, redirect to jokes
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/publicjokes')
    } else {
      formSchema.isValid(credentials).then((valid) => {
        setButtonDisabled(!valid)
      })
    }
  }, [history, isLoggedIn, credentials, formSchema])

  // if not valid form entry, submit button won't work
  // useEffect(() => {
  //   let mounted = true
  //   if (mounted) {
  //     formSchema.isValid(credentials).then(valid => {
  //       setButtonDisabled(!valid)
  //     })
  //   }

  //   return () => mounted = false;
  // }, [credentials, formSchema])

  const handleInputChange = (e) => {
    e.persist()
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      // if valid, clear error messages
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      })
      // if errors, set them
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        })
      })

    // update credentials as user is typing
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  // render the following
  return (
    <LoginDiv>
      <form onSubmit={callLogin}>
        <p>Username:</p>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
        />
        {errors.username.length > 0 ? (
          <ErrorP className="error">{errors.email}</ErrorP>
        ) : null}
        <p>Password:</p>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
        />
        {errors.password.length > 0 ? (
          <ErrorP className="error">{errors.password}</ErrorP>
        ) : null}
        <br />
        <br />
        {loginError && <ErrorP>{loginError}</ErrorP>}
        <button disabled={buttonDisabled}>Log in</button>
      </form>
      <h2>Not registered?</h2>
      <Link to="/signup">Sign Up!</Link>
    </LoginDiv>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    loginError: state.loginReducer.loginError,
  }
}

// export component
export default connect(mapStateToProps, { userLogin })(Login)

// styled components
const LoginDiv = styled.div`
  width: 200px
  margin: 20px auto
`

const ErrorP = styled.p`
  color: red
  font-size: 11px
`
