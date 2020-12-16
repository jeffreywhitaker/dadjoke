import { Action } from 'redux'
import { RootState } from '../reducers/rootReducer'
import { ThunkAction } from 'redux-thunk'

export type Joke = {
  dadjokequestion: string
  _id?: string
  dadjokeanswer: string
  isprivate: boolean
  username?: string
  error?: string
  createdAt?: Date
  karma?: number
  userVote?: string
  userFollowingCreator?: boolean
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
