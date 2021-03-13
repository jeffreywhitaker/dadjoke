import { Action } from 'redux'
import { RootState } from '../reducers/rootReducer'
import { ThunkAction } from 'redux-thunk'

export type Comment = {
  _id: string
  creatorName: string
  createdAt: Date
  data: string
}

export interface CommentResponse {
  data: {
    comments: Comment[]
    hasNextPage: boolean      
  }
}

export interface AvatarResponse {
  data: {
    data: {
      data: Buffer
    }
  }
}

export type NewJoke = {
  dadjokeanswer: string
  dadjokequestion: string
  isprivate: boolean
  keywords: string[]
}

// TODO: check which of these need changed
export type Joke = NewJoke & {
  _id: string
  username: string
  error?: string
  createdAt: Date
  karma: number
  userVote?: string
  userFollowingCreator?: boolean
  creator?: string
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
