// import login actions
import {
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_SUCCESS,
} from '../actions/actions'

// create initial login state
const initialState = {
    isFetching: false,
    error: '',
    isLoggedIn: false
}

// export login reducer
export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_START:
            return {
                ...state,
                isFetching: true,
                error: ''
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: `Unable to login user: ${action.payload}`
            }
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: false
            }
        default:
            return state
    }
}