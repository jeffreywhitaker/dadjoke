// import login, logout, and signup actions
import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  SIGNUP_USER_START,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
} from '../actions/actions'

// create initial login state
const initialState = {
  isFetching: false,
  error: '',
  isLoggedIn: false,
}

// export login reducer
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    //login user actions
    case LOGIN_USER_START:
      return {
        ...state,
        isFetching: true,
        error: '',
      }
    case LOGIN_USER_SUCCESS:
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
        error: `Unable to login user: ${action.payload}`,
      }

    // logout user action
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
      }

    // signup user actions
    case SIGNUP_USER_START:
      return {
        ...state,
        isFetching: true,
        error: '',
      }
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        error: '',
      }
    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        error: `Unable to signup user: ${action.payload}`,
      }

    // set default
    default:
      return state
  }
}
