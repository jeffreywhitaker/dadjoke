// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import '../styles/loadingSpinner.css'
import styled from 'styled-components'

// import actions
import { getPublicJokes } from '../actions/actions'
import SingleJokeCard from './SingleJokeCard'
import Loading from './Loading'

// login page component
function PublicJokes({
  getPublicJokes,
  publicJokes,
  jokeError,
  jokesUpvoted,
  jokesDownvoted,
  isLoading,
  isLoggedIn,
  username,
}) {
  // get jokes on page load
  useEffect(() => {
    getPublicJokes()
  }, [getPublicJokes])

  // loading check
  if (isLoading) return <Loading />

  // empty check

  if (!publicJokes) {
    return <p>No jokes are in the database - add them now!</p>
  }

  // render the following if checks pass
  return (
    <>
      <JokeWrapper>
        <DisplayP>Public Jokes</DisplayP>
        {publicJokes.map((joke) => {
          return (
            <SingleJokeCard
              joke={joke}
              jokeError={jokeError}
              jokesUpvoted={jokesUpvoted}
              jokesDownvoted={jokesDownvoted}
              username={username}
              key={joke.dadjokequestion}
            />
          )
        })}
      </JokeWrapper>
    </>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    publicJokes: state.jokeReducer.publicJokes,
    isLoading: state.jokeReducer.isFetching,
    username: state.loginReducer.username,
    jokesUpvoted: state.loginReducer.jokesUpvoted,
    jokesDownvoted: state.loginReducer.jokesDownvoted,
  }
}

// export component
export default connect(mapStateToProps, { getPublicJokes })(PublicJokes)

// styled components
const JokeWrapper = styled.article`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const DisplayP = styled.p`
  text-align: center;
  font-size: 20px;
  background: lightblue;
  width: 50%;
  margin: 0 auto;
  border-radius: 15px;
  padding: 10px 0;
`
