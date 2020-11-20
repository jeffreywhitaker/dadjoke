// import dependencies and functions
import axios from 'axios'
import { axiosWithAuth, axiosLogin } from '../utils/axiosWithAuth'
import { Thunk } from '../types/types'

const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
// const URI_STRING = 'http://localhost:2019'


// types
import { Joke } from '../types/types'
interface Credentials {
  username: string
  password: string
  primaryemail?: string
}

// login existing user
export const LOGIN_USER_START = 'LOGIN_USER_START'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const userLogin = (credentials: Credentials): Thunk => (dispatch) => {
  dispatch({ type: LOGIN_USER_START })
  axiosLogin()
    .post(`${URI_STRING}/login`, credentials)
    .then((res) => {
      // set token, expiry, and username to local storage
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem(
        'tokenExpiry',
        new Date(new Date().getTime() + res.data.expires_in * 1000) as unknown as string,
      )
      localStorage.setItem('username', credentials.username)
      // create object to send
      const toSend = {
        username: credentials.username,
        data: res.data,
      }

      dispatch({ type: LOGIN_USER_SUCCESS, payload: toSend })
    })
    .catch((err) => {
      console.log(`unable to login user: ${err}`)
      console.log(err.response)
      dispatch({ type: LOGIN_USER_FAILURE, payload: err.response.data.error })
    })
}

// logout existing user
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const userLogout = (): Thunk => (dispatch) => {
  console.log('logout user')
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiry')
  localStorage.removeItem('username')
  dispatch({ type: LOGOUT_USER_SUCCESS })
}

// use saved token
export const USE_SAVED_TOKEN_SUCCESS = 'USE_SAVED_TOKEN_SUCCESS'
export const checkTokenValidity = (): Thunk => (dispatch) => {
  // get token Date
  const tokenDate: string | null = localStorage.getItem('tokenExpiry')

  // if token is expired
  if (
    !localStorage.getItem('token') || ( tokenDate !== null &&
    new Date(tokenDate) as unknown as number < Date.now())
  ) {
    // log out user, remove token
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiry')
    localStorage.removeItem('username')
    dispatch({ type: LOGOUT_USER_SUCCESS })
    // if token is not expired
  } else {
    // log in user, use token
    dispatch({
      type: USE_SAVED_TOKEN_SUCCESS,
      payload: { username: localStorage.getItem('username') },
    })
  }
}

// signup new user
export const SIGNUP_USER_START = 'SIGNUP_USER_START'
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE'
export const userSignup = (credentials: Credentials): Thunk => (dispatch) => {
  dispatch({ type: SIGNUP_USER_START })
  axiosLogin()
    .post(`${URI_STRING}/createnewuser`, credentials)
    .then((res) => {
      // set token, expiry, and username
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem(
        'tokenExpiry',
        new Date(new Date().getTime() + res.data.expires_in * 1000) as unknown as string,
      )
      localStorage.setItem('username', credentials.username)

      // create object to send
      const toSend = {
        username: credentials.username,
        data: res.data,
      }

      dispatch({ type: SIGNUP_USER_SUCCESS, payload: toSend })
    })
    .catch((err) => {
      console.log(`unable to signup new user: ${err}`)
      console.log(err.response)
      dispatch({ type: SIGNUP_USER_FAILURE, payload: err.response.data.detail })
    })
}

// get public flagged jokes
export const FETCH_JOKES_START = 'FETCH_JOKES_START'
export const FETCH_JOKES_SUCCESS = 'FETCH_JOKES_SUCCESS'
export const FETCH_JOKES_FAILURE = 'FETCH_JOKES_FAILURE'
export const getPublicJokes = (): Thunk => (dispatch) => {
  dispatch({ type: FETCH_JOKES_START })
  axios
    .get(`${URI_STRING}/dadjokes/public`)
    .then((res) => {
      console.log('GET public jokes: ', res)
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
export const getPrivateJokes = (): Thunk => (dispatch) => {
  dispatch({ type: FETCH_PRIVATE_JOKES_START })
  axiosWithAuth()
    .get(`${URI_STRING}/dadjokes/private`)
    .then((res) => {
      console.log('GET private jokes: ', res)
      dispatch({ type: FETCH_PRIVATE_JOKES_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      console.log(`unable to fetch private jokes: ${err.response}`)
      dispatch({
        type: FETCH_PRIVATE_JOKES_FAILURE,
        payload: err.response.data.detail,
      })
    })
}

// add joke
export const ADD_JOKE_START = 'ADD_JOKE_START'
export const ADD_PUBLIC_JOKE_SUCCESS = 'ADD_PUBLIC_JOKE_SUCCESS'
export const ADD_PRIVATE_JOKE_SUCCESS = 'ADD_PRIVATE_JOKE_SUCCESS'
export const ADD_JOKE_FAILURE = 'ADD_JOKE_FAILURE'
export const addJoke = (jokeToAdd: Joke): Thunk => (dispatch) => {
  dispatch({ type: ADD_JOKE_START })
  axiosWithAuth()
    .post(`${URI_STRING}/dadjokes/add`, jokeToAdd)
    .then((res) => {
      // if joke is private, dispatch response to reducer
      if (jokeToAdd.isprivate) {
        console.log('private joke is being added', res.data)
        dispatch({ type: ADD_PRIVATE_JOKE_SUCCESS, payload: res.data })

        // if joke is public, dispatch response to reducer
      } else {
        console.log('public joke is being added', res.data)
        dispatch({ type: ADD_PUBLIC_JOKE_SUCCESS, payload: res.data })
      }
    })
    .catch((err) => {
      console.log(`unable to add new joke: ${err}`)
      dispatch({ type: ADD_JOKE_FAILURE, payload: err })
    })
}

// update joke
export const UPDATE_JOKE_START = 'UPDATE_JOKE_START'
export const UPDATE_PUBLIC_JOKE_SUCCESS = 'UPDATE_PUBLIC_JOKE_SUCCESS'
export const UPDATE_PRIVATE_JOKE_SUCCESS = 'UPDATE_PRIVATE_JOKE_SUCCESS'
export const UPDATE_JOKE_FAILURE = 'UPDATE_JOKE_FAILURE'
export const updateJoke = (jokeToUpdate: Joke, jokeId: string): Thunk => (dispatch) => {
  dispatch({ type: UPDATE_JOKE_START })
  console.log('begin updateJoke', jokeToUpdate, jokeId)
  axiosWithAuth()
    .put(`${URI_STRING}/dadjokes/${jokeId}`, jokeToUpdate)
    .then((res) => {
      console.log(res)
      if (jokeToUpdate.isprivate) {
        console.log('private joke is being updated', res.data)
        dispatch({ type: UPDATE_PRIVATE_JOKE_SUCCESS, payload: res.data })
      } else {
        console.log('public joke is being updated', res.data)
        dispatch({ type: UPDATE_PUBLIC_JOKE_SUCCESS, payload: res.data })
      }
    })
    .catch((err) => {
      console.log(err.response)
      console.log(`unable to update joke: ${err.response.data.detail}`)
      dispatch({
        type: UPDATE_JOKE_FAILURE,
        payload: {
          msg: err.response.data.detail,
          jokeId: jokeId,
          isPrivate: jokeToUpdate.isprivate,
        },
      })
    })
}

// delete joke
export const DELETE_JOKE_START = 'DELETE_JOKE_START'
export const DELETE_JOKE_SUCCESS = 'DELETE_JOKE_SUCCESS'
export const DELETE_JOKE_FAILURE = 'DELETE_JOKE_FAILURE'
export const deleteJoke = (jokeId: string): Thunk => (dispatch) => {
  dispatch({ type: DELETE_JOKE_START })
  axiosWithAuth()
    .delete(`${URI_STRING}/dadjokes/${jokeId}`)
    .then((res) => {
      console.log(res)
      dispatch({ type: DELETE_JOKE_SUCCESS, payload: jokeId })
    })
    .catch((err) => {
      console.log(`unable to delete joke: ${err}`)
      dispatch({ type: DELETE_JOKE_FAILURE, payload: err })
    })
}
