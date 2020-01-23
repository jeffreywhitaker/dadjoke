// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import '../styles/loadingSpinner.css'

// import actions
import { getPublicJokes } from '../actions/actions'
import SingleJokeCard from './SingleJokeCard'
import Loading from './Loading'

// login page component
function PublicJokes({ getPublicJokes, publicJokes, isLoading, isLoggedIn }) {
  // get jokes on page load
  useEffect(() => {
    getPublicJokes()
  }, [getPublicJokes])

  // login check
  if (!isLoggedIn) {
    return <p>You need to be logged in to do that!</p>
  }

  // loading check
  if (isLoading) return <Loading />

  // empty check

  if (!publicJokes) {
    return <p>No jokes are in the database - add them now!</p>
  }

  // render the following if checks pass
  return (
    <>
      <p>Public Jokes!</p>
      {publicJokes.map((joke) => {
        return <SingleJokeCard joke={joke} key={joke.dadjokeid} />
      })}
    </>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    publicJokes: state.jokeReducer.publicJokes,
    isLoading: state.jokeReducer.isFetching,
    isLoggedIn: state.loginReducer.isLoggedIn,
  }
}

// export component
export default connect(mapStateToProps, { getPublicJokes })(PublicJokes)
