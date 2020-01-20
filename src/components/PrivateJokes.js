// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import SingleJokeCard from './SingleJokeCard'
import Loading from './Loading'
import { getPrivateJokes } from '../actions/actions'

// Private Jokes component
function PrivateJokes(props) {
  // destructure props
  const { getPrivateJokes, privateJokes, isLoading, isLoggedIn } = props

  // get private jokes
  useEffect(() => {
    getPrivateJokes()
  }, [getPrivateJokes])

  // login check
  if (!isLoggedIn) {
    return <p>You need to be logged in to do that!</p>
  }

  // loading check
  if (isLoading) return <Loading />

  // empty check
  if (!privateJokes) {
    return <p>No jokes are in the database - add them now!</p>
  }

  // return jokes if all checks pass
  return privateJokes.map((joke) => {
    return <SingleJokeCard joke={joke} key={joke.dadjokeid} />
  })
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    privateJokes: state.jokeReducer.privateJokes,
    isLoading: state.jokeReducer.isFetching,
    isLoggedIn: state.loginReducer.isLoggedIn,
  }
}

// export component
export default connect(mapStateToProps, { getPrivateJokes })(PrivateJokes)
