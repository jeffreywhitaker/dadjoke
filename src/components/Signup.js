// import dependencies
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'

// import actions
import { userSignup } from '../actions/actions'

// login page component
const Signup = ({
  errors,
  touched,
  values,
  userSignup,
  isLoggedIn,
  handleSubmit,
}) => {
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
      <Form className="formContainer" onSubmit={handleSubmit}>
        <p>Username:</p>
        <Field type="text" name="username" />
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}
        <p>Password:</p>
        <Field type="password" name="password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <p>Email:</p>
        <Field type="email" name="email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <button className="button" type="submit">
          Submit
        </button>
      </Form>
      {/* <form onSubmit={callSignup}>
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
      </form> */}
      <h2>Already registered?</h2>
      <Link to="/login">Log In!</Link>
    </SignupDiv>
  )
}

// Formik component
const FormikSignup = withFormik({
  mapPropsToValues({ username, password, email }) {
    return {
      username: username || '',
      password: password || '',
      email: email || '',
    }
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required('Name is a required field'),
    password: Yup.string().required('Password is a required field'),
    email: Yup.string().required('Email is a required field'),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('HANDLE SUBMIT ADSJFKSF')
    props.userSignup(values)
    setSubmitting(false)
  },
})(Signup)

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  }
}

// export component
export default connect(mapStateToProps, { userSignup })(FormikSignup)

// styled components
const SignupDiv = styled.div`
  width: 200px
  margin: 20px auto
`
