// import actions
import {
  FETCH_JOKES_START,
  FETCH_JOKES_SUCCESS,
  FETCH_JOKES_FAILURE,
  FETCH_PRIVATE_JOKES_START,
  FETCH_PRIVATE_JOKES_SUCCESS,
  FETCH_PRIVATE_JOKES_FAILURE,
  ADD_JOKE_START,
  ADD_JOKE_SUCCESS,
  ADD_JOKE_FAILURE,
} from '../actions/actions'

// create initial state
const initialState = {
  publicJokes: [],
  privateJokes: [],
  isFetching: false,
  error: '',
}

// export reducer
export const dadjokeReducer = (state = initialState, action) => {
  switch (action.type) {
    // fetch public jokes actions
    case FETCH_JOKES_START:
      return {
        ...state,
        isFetching: true,
        error: '',
      }
    case FETCH_JOKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        publicJokes: action.payload,
      }
    case FETCH_JOKES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: `Unable to fetch jokes: ${action.payload}`,
      }

    // fetch private jokes actions
    case FETCH_PRIVATE_JOKES_START:
      return {
        ...state,
        isFetching: true,
        error: '',
      }
    case FETCH_PRIVATE_JOKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        privateJokes: action.payload,
      }
    case FETCH_PRIVATE_JOKES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: `Unable to fetch private jokes: ${action.payload}`,
      }

    // add joke actions
    case ADD_JOKE_START:
      return {
        ...state,
        isFetching: true,
        error: '',
      }
    case ADD_JOKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        jokes: [...state.jokes, action.payload],
      }
    case ADD_JOKE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: `Unable to add new joke: ${action.payload}`,
      }

    // set default
    default:
      return state
  }
}
