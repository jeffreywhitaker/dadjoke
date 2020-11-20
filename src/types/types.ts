import { Action } from 'redux'
import { RootState } from '../reducers/rootReducer'
import { ThunkAction } from 'redux-thunk'

export type Joke = {
  dadjokequestion: string
  dadjokeid?: string
  dadjokeanswer: string
  isprivate: boolean
  username?: string
  error?: string
}

export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export interface LoginCredentials {
  username: string
  password: string
}

export interface SignupCredentials extends LoginCredentials {
  primaryemail: string
}
