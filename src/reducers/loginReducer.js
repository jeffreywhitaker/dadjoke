// import login, logout, and signup actions
import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  SIGNUP_USER_START,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  USE_SAVED_TOKEN_SUCCESS,
} from '../actions/actions'

// create initial login state
const initialState = {
  isFetching: false,
  isLoggedIn: false,
  loginError: '',
  signupError: '',
}

// export login reducer
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    //login user actions
    case LOGIN_USER_START:
      return {
        ...state,
        isFetching: true,
        loginError: '',
      }
    case LOGIN_USER_SUCCESS:
      console.log(state)
      console.log(action)
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        loginError: `Unable to login user: ${action.payload}`,
      }

    // logout user action
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
      }

    // use saved token
    case USE_SAVED_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
      }

    // signup user actions
    case SIGNUP_USER_START:
      return {
        ...state,
        isFetching: true,
        signupError: '',
      }
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        signupError: '',
      }
    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        signupError: `Unable to signup user: ${action.payload}`,
      }

    // set default
    default:
      return state
  }
}
