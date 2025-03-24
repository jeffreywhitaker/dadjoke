// import dependencies
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

// bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { userSignup } from '../actions/actions'
import { RootState } from '../reducers/rootReducer'

// signup page component
const Signup = () => {
  const isLoggedIn = useSelector((s: RootState) => s.loginReducer.isLoggedIn)
  const signupError = useSelector((s: RootState) => s.loginReducer.signupError)
  const isFetching = useSelector((s: RootState) => s.loginReducer.isFetching)
  const dispatch = useDispatch()

  // useNavigate
  const navigate = useNavigate()

  // if logged in, redirect to game list
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/publicjokes')
    }
  }, [history, isLoggedIn])

  // render the following
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        primaryemail: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .required('Username is a required field')
          .min(2, 'Username must be at least 2 characters')
          .max(10, 'Username must be 10 characters or less'),
        password: Yup.string()
          .required('Password is a required field')
          .min(4, 'Password must be at least 4 characters'),
        primaryemail: Yup.string()
          .required('Email is a required field')
          .email('Must be a valid email'),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        dispatch(userSignup(values))
        setSubmitting(false)
        resetForm()
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        isSubmitting,
      }) => (
        <SignupDiv>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={
                  ((touched.username && errors.username) as unknown) as boolean
                }
              />
              {errors.username ? <ErrorP>{errors.username}</ErrorP> : ''}
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={
                  ((touched.password && errors.password) as unknown) as boolean
                }
              />
              {errors.password ? <ErrorP>{errors.password}</ErrorP> : ''}
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="primaryemail"
                value={values.primaryemail}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={
                  ((touched.primaryemail &&
                    errors.primaryemail) as unknown) as boolean
                }
              />
              {errors.primaryemail ? (
                <ErrorP>{errors.primaryemail}</ErrorP>
              ) : (
                ''
              )}
            </Form.Group>

            <Button
              type="submit"
              variant={
                errors.username || errors.password || errors.primaryemail
                  ? 'secondary'
                  : 'primary'
              }
              disabled={
                (isFetching ||
                  errors.username ||
                  errors.password ||
                  errors.primaryemail ||
                  isSubmitting) as boolean
              }
            >
              {isFetching ? 'Loading...' : 'Submit'}
            </Button>
          </Form>
          <h4>Already registered?</h4>
          <Link to="/login">Log In!</Link>
          {signupError ? <ErrorP>{signupError}</ErrorP> : ''}
        </SignupDiv>
      )}
    </Formik>
  )
}

export default Signup

// styled components
const SignupDiv = styled.div`
  width: 200px;
  margin: 20px auto;
`

const ErrorP = styled.div`
  color: red;
  font-size: 13px;
`
