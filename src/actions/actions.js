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
export const LOGOUT_USER_START = 'LOGOUT_USER_START'
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE'
export const userLogout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER_SUCCESS })
  localStorage.setItem('token', null)
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
export const ADD_JOKE_SUCCESS = 'ADD_JOKE_SUCCESS'
export const ADD_JOKE_FAILURE = 'ADD_JOKE_FAILURE'
export const addJoke = (jokeToAdd) => (dispatch) => {
  dispatch({ type: ADD_JOKE_START })
  axiosWithAuth()
    .post('https://jwhit-dadjokes.herokuapp.com/dadjokes/add', jokeToAdd)
    .then((res) => {
      console.log(res)
      dispatch({ type: ADD_JOKE_SUCCESS, payload: jokeToAdd })
    })
    .catch((err) => {
      console.log(`unable to add new joke: ${err}`)
      dispatch({ type: ADD_JOKE_FAILURE, payload: err })
    })
}
