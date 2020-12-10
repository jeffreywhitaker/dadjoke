// import dependencies and functions
import axios from 'axios'
import { Thunk } from '../types/types'

// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
const URI_STRING = 'http://localhost:5000'

// types
import { Joke, LoginCredentials, SignupCredentials } from '../types/types'

// login existing user
export const LOGIN_USER_START = 'LOGIN_USER_START'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const userLogin = (credentials: LoginCredentials): Thunk => (dispatch) => {
  dispatch({ type: LOGIN_USER_START })
  axios
    .post(`${URI_STRING}/login`, credentials, { withCredentials: true} )
    .then((res) => {
      console.log('loggedin', res)
      // create object to send
      const toSend = {
        username: credentials.username,
        // data: res.data,
      }

      dispatch({ type: LOGIN_USER_SUCCESS, payload: toSend })
    })
    .catch((err) => {
      console.log(`unable to login user: ${err}`)
      // console.log(err.response)
      // dispatch({ type: LOGIN_USER_FAILURE, payload: err.response.data.error })
    })
}

// logout existing user
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const userLogout = (): Thunk => (dispatch) => {
  console.log('logout user')
  axios.get(`${URI_STRING}/logout`, { withCredentials: true }).then(() => {
    dispatch({ type: LOGOUT_USER_SUCCESS })
  }).catch((err) => console.log('err logging out', err))
}

// use saved token
export const USE_SAVED_TOKEN_SUCCESS = 'USE_SAVED_TOKEN_SUCCESS'
export const USE_SAVED_TOKEN_FAILURE = 'USE_SAVED_TOKEN_FAILURE'
export const checkTokenValidity = (): Thunk => (dispatch) => {
  console.log('inside checkToken')
  axios.get(`${URI_STRING}/cookie`, { withCredentials: true }).then((response) => {
    console.log('use cookie response:', response)
    dispatch({ type: USE_SAVED_TOKEN_SUCCESS, payload: response.data })
  }).catch((error) => {
    console.log(error)
    dispatch({ type: USE_SAVED_TOKEN_FAILURE, payload: { error }})
  })
}

// signup new user
export const SIGNUP_USER_START = 'SIGNUP_USER_START'
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE'
export const userSignup = (credentials: SignupCredentials): Thunk => (dispatch) => {
  dispatch({ type: SIGNUP_USER_START })
  axios
    .post(`${URI_STRING}/createnewuser`, credentials, { withCredentials: true})
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

// delete user
export const DELETE_USER_START = 'DELETE_USER_START'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE'
export const deleteUser = (): Thunk => (dispatch) => {
  dispatch({ type: DELETE_USER_START})
  axios.post(`${URI_STRING}/deleteuser`, null, { withCredentials: true}).then((res) => {
    console.log('Del user:', res)
    // TODO: handle the cookie/local storage
    dispatch({ type: DELETE_USER_SUCCESS })
  }).catch((err) => {
    console.log(`unable to delete user: ${err}`)
    dispatch({ type: DELETE_USER_FAILURE, payload: err })
  })
}

// add joke
export const ADD_JOKE_START = 'ADD_JOKE_START'
export const ADD_PUBLIC_JOKE_SUCCESS = 'ADD_PUBLIC_JOKE_SUCCESS'
export const ADD_PRIVATE_JOKE_SUCCESS = 'ADD_PRIVATE_JOKE_SUCCESS'
export const ADD_JOKE_FAILURE = 'ADD_JOKE_FAILURE'
export const addJoke = (jokeToAdd: Joke): Thunk => (dispatch) => {
  dispatch({ type: ADD_JOKE_START })
  axios
    .post(`${URI_STRING}/dadjokes/add`, jokeToAdd, { withCredentials: true})
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

// delete joke
export const DELETE_JOKE_START = 'DELETE_JOKE_START'
export const DELETE_JOKE_SUCCESS = 'DELETE_JOKE_SUCCESS'
export const DELETE_JOKE_FAILURE = 'DELETE_JOKE_FAILURE'
export const deleteJoke = (jokeId: string): Thunk => (dispatch) => {
  dispatch({ type: DELETE_JOKE_START })
  axios
    .delete(`${URI_STRING}/dadjokes/${jokeId}`, { withCredentials: true})
    .then((res) => {
      console.log(res)
      console.log('deleteJoke: id, ', jokeId)
      dispatch({ type: DELETE_JOKE_SUCCESS, payload: jokeId })
    })
    .catch((err) => {
      console.log(`unable to delete joke: ${err}`)
      dispatch({ type: DELETE_JOKE_FAILURE, payload: err })
    })
}
