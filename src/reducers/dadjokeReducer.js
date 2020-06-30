// import actions
import {
  FETCH_JOKES_START,
  FETCH_JOKES_SUCCESS,
  FETCH_JOKES_FAILURE,
  FETCH_PRIVATE_JOKES_START,
  FETCH_PRIVATE_JOKES_SUCCESS,
  FETCH_PRIVATE_JOKES_FAILURE,
  ADD_JOKE_START,
  ADD_PUBLIC_JOKE_SUCCESS,
  ADD_PRIVATE_JOKE_SUCCESS,
  ADD_JOKE_FAILURE,
  UPDATE_JOKE_START,
  UPDATE_PUBLIC_JOKE_SUCCESS,
  UPDATE_PRIVATE_JOKE_SUCCESS,
  UPDATE_JOKE_FAILURE,
  DELETE_JOKE_START,
  DELETE_JOKE_SUCCESS,
  DELETE_JOKE_FAILURE,
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
      console.log('fetch jokes success', action.payload)
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
        error:
          action.payload === 'invalid_token'
            ? 'You do not have sufficient permission to access this area.'
            : null,
      }

    // add joke actions
    case ADD_JOKE_START:
      return {
        ...state,
        isFetching: true,
        error: '',
      }
    case ADD_PUBLIC_JOKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        publicJokes: [...state.publicJokes, action.payload],
      }
    case ADD_PRIVATE_JOKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        privateJokes: [...state.privateJokes, action.payload],
      }
    case ADD_JOKE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: `Unable to add new joke: ${action.payload}`,
      }

    // update joke actions
    case UPDATE_JOKE_START:
      return {
        ...state,
        isFetching: true,
        error: '',
      }
    case UPDATE_PUBLIC_JOKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        publicJokes: [
          ...state.publicJokes.filter(
            (joke) => joke.dadjokeid !== action.payload.dadjokeid,
          ),
          action.payload,
        ],
      }
    case UPDATE_PRIVATE_JOKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        privateJokes: [
          ...state.privateJokes.filter(
            (joke) => joke.dadjokeid !== action.payload.dadjokeid,
          ),
          action.payload,
        ],
      }
    case UPDATE_JOKE_FAILURE:
      return {
        ...state,
        isFetching: false,
        privateJokes: action.payload.isPrivate
          ? [
              ...state.privateJokes.map((joke) => {
                if (joke.dadjokeid === action.payload.jokeId) {
                  return {
                    ...joke,
                    error: `Unable to update joke: ${action.payload.msg}`,
                  }
                }
                return joke
              }),
            ]
          : state.privateJokes,
        publicJokes: !action.payload.isPrivate
          ? [
              ...state.publicJokes.map((joke) => {
                if (joke.dadjokeid === action.payload.jokeId) {
                  return {
                    ...joke,
                    error: `Unable to update joke: ${action.payload.msg}`,
                  }
                }
                return joke
              }),
            ]
          : state.publicJokes,
      }

    // delete joke actions
    case DELETE_JOKE_START:
      return {
        ...state,
        isFetching: true,
        error: '',
      }
    case DELETE_JOKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        // publicJokes: state.publicJokes.filter(
        //   (joke) => joke.dadjokeid !== action.payload,
        // ),
        privateJokes: state.privateJokes.filter(
          (joke) => joke.dadjokeid !== action.payload,
        ),
      }

    case DELETE_JOKE_FAILURE:
      return {
        ...state,
        isFetchinig: false,
        error: `Unable to delete joke: ${action.payload}`,
      }

    // set default
    default:
      return state
  }
}
