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
  VOTE_FOR_JOKE_START,
  VOTE_FOR_JOKE_SUCCESS,
  VOTE_FOR_JOKE_FAILURE
} from '../actions/actions'
import PublicJokes from '../components/PublicJokes'

import { Joke } from '../types/types'

// create initial state
const initialState = {
  publicJokes: [],
  privateJokes: [],
  isFetching: false,
  error: '',
}

interface JokeState {
  publicJokes?: Joke[]
  privateJokes?: Joke[]
  isFetching?: boolean
  error?: string
}

interface UpdateJokeFailurePayload {
  msg: string,
  _id: string,
  isPrivate: boolean
}

interface VoteForJokePayload {
  oldVote: string,
  vote: string,
  jokeId: string
}

interface FetchJokesActions {
  type: typeof FETCH_JOKES_START | typeof FETCH_JOKES_SUCCESS | typeof FETCH_JOKES_FAILURE | typeof FETCH_PRIVATE_JOKES_START | typeof FETCH_PRIVATE_JOKES_SUCCESS | typeof FETCH_PRIVATE_JOKES_FAILURE | typeof ADD_JOKE_START | typeof ADD_PUBLIC_JOKE_SUCCESS | typeof ADD_PRIVATE_JOKE_SUCCESS | typeof ADD_JOKE_FAILURE | typeof DELETE_JOKE_START | typeof DELETE_JOKE_SUCCESS | typeof DELETE_JOKE_FAILURE
  payload: JokeState | Record<string, unknown> | Joke
}

interface UpdateJokesActions {
  type: typeof UPDATE_JOKE_START | typeof UPDATE_PUBLIC_JOKE_SUCCESS | typeof UPDATE_PRIVATE_JOKE_SUCCESS | typeof UPDATE_JOKE_FAILURE
  payload: UpdateJokeFailurePayload
}

interface VoteForJokeActions {
  type: typeof VOTE_FOR_JOKE_FAILURE | typeof VOTE_FOR_JOKE_START | typeof VOTE_FOR_JOKE_SUCCESS,
  payload: VoteForJokePayload
}

type JokeActionTypes = FetchJokesActions | UpdateJokesActions | VoteForJokeActions

// export reducer
export const dadjokeReducer = (state = initialState, action: JokeActionTypes): JokeState => {
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
        publicJokes: action.payload as Joke[],
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
        privateJokes: action.payload as Joke[],
      }
    case FETCH_PRIVATE_JOKES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload as string,
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
        publicJokes: [...state.publicJokes, action.payload as Joke],
      }
    case ADD_PRIVATE_JOKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        privateJokes: [...state.privateJokes, action.payload as Joke],
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
            (joke: Joke): boolean => joke._id !== action.payload._id,
          ),
          action.payload as unknown as Joke,
        ],
      }
    case UPDATE_PRIVATE_JOKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        privateJokes: [
          ...state.privateJokes.filter(
            (joke: Joke): boolean => joke._id !== action.payload._id,
          ),
          action.payload as unknown as Joke,
        ],
      }
    case UPDATE_JOKE_FAILURE:
      return {
        ...state,
        isFetching: false,
        privateJokes: action.payload.isPrivate
          ? [
              ...state.privateJokes.map((joke: Joke) => {
                if (joke._id === action.payload._id) {
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
              ...state.publicJokes.map((joke: Joke) => {
                if (joke._id === action.payload._id) {
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
      console.log('payload: ', action.payload)
      return {
        ...state,
        isFetching: false,
        privateJokes: [
          ...state.privateJokes.filter(
            (joke: Joke): boolean => joke._id !== action.payload,
          ),
        ],
        publicJokes: [
          ...state.publicJokes.filter(
            (joke: Joke): boolean => joke._id !== action.payload,
          ),
        ],
      }
    case DELETE_JOKE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: `Unable to delete joke: ${action.payload}`,
      }

    // vote on joke actions
    case VOTE_FOR_JOKE_START:
      return {
        ...state,
        isFetching: true,
        error: undefined
      }
    case VOTE_FOR_JOKE_SUCCESS:
      // figure out what the change is
      const changeToJokeKarma = parseInt(action.payload.vote) - parseInt(action.payload.oldVote)

      // get index of joke
      let index = state.publicJokes.findIndex((obj: Joke) => obj._id === action.payload.jokeId)

      console.log('result 0')
      if (index !== -1) {
        const joke: Joke = state.publicJokes[index]
        if (joke.karma) {
          joke.karma += changeToJokeKarma}

          console.log('result 1')
        return {
          ...state,
          isFetching: false,
          publicJokes: [
            ...state.publicJokes.filter((joke: Joke) => joke._id === joke._id), joke
          ]
        }

      } else {
        index = state.privateJokes.findIndex((obj: Joke) => obj._id === action.payload.jokeId)

        const joke: Joke = state.privateJokes[index]
        if (joke.karma) {
          joke.karma += changeToJokeKarma
        }
        
        console.log('result 2')
        return {
          ...state,
          isFetching: false,
          privateJokes: [
            ...state.privateJokes.filter((joke: Joke) => joke._id === joke._id), joke
          ]
        }
      }

    // set default
    default:
      return state
  }
}
