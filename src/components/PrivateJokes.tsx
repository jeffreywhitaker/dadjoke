// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SingleJokeCard from './SingleJokeCard'
import Loading from './Loading'
import { getPrivateJokes } from '../actions/actions'

// typing
import { Joke } from '../types/types'

type Props = {
  getPrivateJokes: () => void
  privateJokes: Array<Joke>
  jokesError: string
  isLoading: boolean
  isLoggedIn: boolean
  username: string
}

// Private Jokes component
export const PrivateJokes: React.FC<Props> = (props) => {
  // destructure props
  const {
    getPrivateJokes,
    privateJokes,
    jokesError,
    isLoading,
    isLoggedIn,
    username,
  } = props

  // get private jokes
  useEffect(() => {
    if (isLoggedIn) {
      getPrivateJokes()
    }
  }, [isLoggedIn, getPrivateJokes])

  // login check
  if (!isLoggedIn) {
    return (
      <p style={{ textAlign: 'center' }}>
        You must be logged in to see your private jokes. Please log in above!
      </p>
    )
  }

  // loading check
  if (isLoading) return <Loading />

  // empty check
  if (!privateJokes) {
    return (
      <p style={{ textAlign: 'center' }}>
        No jokes are in the database - add them now!
      </p>
    )
  }

  // return jokes if all checks pass
  return (
    <>
      <DisplayP>Private Jokes</DisplayP>

      {jokesError && <ErrorP>{jokesError}</ErrorP>}

      {privateJokes.map((joke: Joke) => {
        return (
          <SingleJokeCard
            joke={joke}
            key={joke.dadjokequestion}
            username={username}
          />
        )
      })}
    </>
  )
}

// connect component to redux store
const mapStateToProps = (state: {
  jokeReducer: { privateJokes: []; isFetching: boolean; error: string }
  loginReducer: { isLoggedIn: boolean; username: string }
}) => {
  return {
    privateJokes: state.jokeReducer.privateJokes,
    isLoading: state.jokeReducer.isFetching,
    isLoggedIn: state.loginReducer.isLoggedIn,
    jokesError: state.jokeReducer.error,
    username: state.loginReducer.username,
  }
}

// export component
const connector = connect(mapStateToProps, { getPrivateJokes })
export default connector(PrivateJokes)

// styled components
const DisplayP = styled.p`
  text-align: center;
  font-size: 20px;
  background: lightblue;
  width: 50%;
  margin: 0 auto;
  border-radius: 15px;
  padding: 10px 0;
`

const ErrorP = styled.p`
  text-align: center;
`
