// import dependencies and functions
import axios from 'axios'
import { axiosWithAuth, axiosLogin } from '../utils/axiosWithAuth'

// login existing user
export const LOGIN_USER_START = 'LOGIN_USER_START'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const userLogin = (credentials) => (dispatch) => {
  dispatch({ type: LOGIN_USER_START })
  axiosLogin()
    .post('https://jwhit-dadjokes.herokuapp.com/login', credentials)
    .then((res) => {
      console.log('user login: ', res)
      localStorage.setItem('token', res.data.access_token)
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      console.log(`unable to login user: ${err}`)
      dispatch({ type: LOGIN_USER_FAILURE, payload: err })
    })
}

// logout existing user
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const userLogout = () => (dispatch) => {
  console.log('ssoidfnsoidfno')
  localStorage.setItem('token', null)
  dispatch({ type: LOGOUT_USER_SUCCESS })
}

// use saved token
export const USE_SAVED_TOKEN_SUCCESS = 'USE_SAVED_TOKEN_SUCCESS'
export const makeLoggedInTrue = () => (dispatch) => {
  dispatch({ type: USE_SAVED_TOKEN_SUCCESS })
}

// signup new user
export const SIGNUP_USER_START = 'SIGNUP_USER_START'
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE'
export const userSignup = (credentials) => (dispatch) => {
  dispatch({ type: SIGNUP_USER_START })
  axiosLogin()
    .post('https://jwhit-dadjokes.herokuapp.com/createnewuser', credentials)
    .then((res) => {
      console.log('user signup: ', res)
      localStorage.setItem('token', res.data.access_token)
      dispatch({ type: SIGNUP_USER_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      console.log(`unable to signup new user: ${err}`)
      dispatch({ type: SIGNUP_USER_FAILURE, payload: err })
    })
}

// get public flagged jokes
export const FETCH_JOKES_START = 'FETCH_JOKES_START'
export const FETCH_JOKES_SUCCESS = 'FETCH_JOKES_SUCCESS'
export const FETCH_JOKES_FAILURE = 'FETCH_JOKES_FAILURE'
export const getPublicJokes = () => (dispatch) => {
  dispatch({ type: FETCH_JOKES_START })
  axios
    .get('https://jwhit-dadjokes.herokuapp.com/dadjokes/public')
    .then((res) => {
      console.log('public jokes: ', res)
      dispatch({ type: FETCH_JOKES_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      console.log(`unable to fetch public jokes: ${err}`)
      dispatch({ type: FETCH_JOKES_FAILURE, payload: err })
    })
}

// get private flagged jokes
export const FETCH_PRIVATE_JOKES_START = 'FETCH_PRIVATE_JOKES_START'
export const FETCH_PRIVATE_JOKES_SUCCESS = 'FETCH_JOKES_PRIVATE_SUCCESS'
export const FETCH_PRIVATE_JOKES_FAILURE = 'FETCH_JOKES_PRIVATE_FAILURE'
export const getPrivateJokes = () => (dispatch) => {
  dispatch({ type: FETCH_PRIVATE_JOKES_START })
  axiosWithAuth()
    .get('https://jwhit-dadjokes.herokuapp.com/dadjokes/private')
    .then((res) => {
      console.log('private jokes: ', res)
      dispatch({ type: FETCH_PRIVATE_JOKES_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      console.log(`unable to fetch public jokes: ${err}`)
      dispatch({ type: FETCH_PRIVATE_JOKES_FAILURE, payload: err })
    })
}

// add joke
export const ADD_JOKE_START = 'ADD_JOKE_START'
export const ADD_PUBLIC_JOKE_SUCCESS = 'ADD_PUBLIC_JOKE_SUCCESS'
export const ADD_PRIVATE_JOKE_SUCCESS = 'ADD_PRIVATE_JOKE_SUCCESS'
export const ADD_JOKE_FAILURE = 'ADD_JOKE_FAILURE'
export const addJoke = (jokeToAdd) => (dispatch) => {
  dispatch({ type: ADD_JOKE_START })
  axiosWithAuth()
    .post('https://jwhit-dadjokes.herokuapp.com/dadjokes/add', jokeToAdd)
    .then((res) => {
      console.log(res)
      if (jokeToAdd.isprivate) {
        console.log('private joke is being added', jokeToAdd)
        dispatch({ type: ADD_PRIVATE_JOKE_SUCCESS, payload: jokeToAdd })
      } else {
        console.log('public joke is being added', jokeToAdd)
        dispatch({ type: ADD_PUBLIC_JOKE_SUCCESS, payload: jokeToAdd })
      }
    })
    .catch((err) => {
      console.log(`unable to add new joke: ${err}`)
      dispatch({ type: ADD_JOKE_FAILURE, payload: err })
    })
}

// delete joke
export const DELETE_JOKE_START = 'DELETE_JOKE_START'
export const DELETE_JOKE_SUCCESS = 'DELETE_JOKE_SUCCESS'
export const DELETE_JOKE_FAILURE = 'DELETE_JOKE_FAILURE'
export const deleteJoke = (jokeId) => (dispatch) => {
  dispatch({ type: DELETE_JOKE_START })
  axiosWithAuth()
    .delete(`https://jwhit-dadjokes.herokuapp.com/dadjokes/${jokeId}`)
    .then((res) => {
      console.log(res)
      dispatch({ type: DELETE_JOKE_SUCCESS, payload: jokeId })
    })
    .catch((err) => {
      console.log(`unable to delete joke: ${err}`)
      dispatch({ type: DELETE_JOKE_FAILURE, payload: err })
    })
}

// update joke
export const UPDATE_JOKE_START = 'UPDATE_JOKE_START'
export const UPDATE_JOKE_SUCCESS = 'UPDATE_JOKE_SUCCESS'
export const UPDATE_JOKE_FAILURE = 'UPDATE_JOKE_FAILURE'
export const updateJoke = (jokeToUpdate, jokeId) => (dispatch) => {
  dispatch({ type: UPDATE_JOKE_START })
  axiosWithAuth()
    .put(`https://jwhit-dadjokes.herokuapp.com/dadjokes/${jokeId}`)
    .then((res) => {
      console.log(res)
      dispatch({ type: UPDATE_JOKE_SUCCESS, payload: jokeToUpdate })
    })
    .catch((err) => {
      console.log(`unable to update joke: ${err}`)
      dispatch({ type: UPDATE_JOKE_FAILURE, payload: err })
    })
}
