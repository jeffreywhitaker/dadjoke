// import dependencies
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import * as Yup from 'yup'
import styled from 'styled-components'

import Header from './small/PageHeader'

// import actions
import { userLogin } from '../actions/actions'

// login page component
const Login: React.FC<Props> = (props) => {
  // destructure props
  const { userLogin, isFetching, isLoggedIn, loginError } = props
  // useNavigate
  const navigate = useNavigate()

  // local state login credentials and errors
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)

  // form validation
  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required('A username is required.')
      .min(2, 'Username must be at least 2 characters')
      .max(10, 'Username must be 10 characters or less'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters.')
      .required('A password is required'),
  })

  // call login function
  const callLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    userLogin(credentials)
  }

  // if logged in, redirect to jokes
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/publicjokes')
    } else {
      formSchema.isValid(credentials).then((valid: boolean) => {
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

  const handleInputChange = (e: {
    persist: () => void
    target: { name: string; value: string | boolean }
  }) => {
    e.persist()
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      // if valid, clear error messages
      .then(() => {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      })
      // if errors, set them
      .catch((err: { errors: string[] }) => {
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
    <Wrapper>
      <Header text={'Login'} />
      <div className="box">
        <form onSubmit={callLogin}>
          <p>Username:</p>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
          />
          {errors.username.length > 0 ? (
            <p className="error">{errors.email}</p>
          ) : null}
          <p>Password:</p>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
          {errors.password.length > 0 ? (
            <p className="error">{errors.password}</p>
          ) : null}
          <br />
          <br />
          {loginError && <p className="error">{loginError}</p>}
          <button disabled={buttonDisabled || isFetching}>
            {isFetching ? 'Loading...' : 'Log in'}
          </button>
        </form>
        <h2>Not registered?</h2>
        <Link to="/signup">Sign Up!</Link>
      </div>
    </Wrapper>
  )
}

interface LoginReducer {
  isLoggedIn: boolean
  loginError: string
  isFetching: boolean
}

// connect component to redux store
const mapStateToProps = (state: { loginReducer: LoginReducer }) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    loginError: state.loginReducer.loginError,
    isFetching: state.loginReducer.isFetching,
  }
}

// export component
const connector = connect(mapStateToProps, { userLogin })
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux
export default connector(Login)

// styled components
const Wrapper = styled.div`
  padding: 10px;

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    margin: 20px auto;
    border: 1px solid black;
    padding: 10px 20px;
    border-radius: 5px;
  }

  .error {
    color: red;
    font-size: 12px;
    background-color: lightgray;
  }
`
