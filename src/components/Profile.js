// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import SingleJokeCard from './SingleJokeCard'
import { getPrivateJokes } from '../actions/actions'

// Home component
function Profile({ getPrivateJokes, jokes, isLoading }) {
  useEffect(() => {
    getPrivateJokes()
  }, [getPrivateJokes])

  return (
    <div>
      {isLoading ? (
        <>
          <p>Content is currently loading...</p>
          <div class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : jokes ? (
        jokes.map((joke) => {
          if (joke.isprivate === true) {
            return <SingleJokeCard joke={joke} key={joke.dadjokeid} />
          } else return null
        })
      ) : (
        <p>No jokes are in database - add them now!</p>
      )}
    </div>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    jokes: state.jokeReducer.jokes,
    isLoading: state.jokeReducer.isFetching,
  }
}

// export component
export default connect(mapStateToProps, { getPrivateJokes })(Profile)
