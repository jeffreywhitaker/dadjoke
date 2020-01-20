// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import '../styles/loadingSpinner.css'

// import actions
import { getPublicJokes } from '../actions/actions'
import SingleJokeCard from './SingleJokeCard'

// login page component
function PublicJokes({ getPublicJokes, jokes, isLoading }) {
  // get jokes on page load
  useEffect(() => {
    getPublicJokes()
  }, [getPublicJokes])

  // render the following
  return (
    <>
      {isLoading ? (
        <>
          <p>Content is currently loading...</p>
          <div className="lds-spinner">
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
          if (joke.isprivate === false) {
            return <SingleJokeCard joke={joke} key={joke.dadjokeid} />
          } else return null
        })
      ) : (
        <p>No jokes are in database - add them now!</p>
      )}
    </>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    jokes: state.jokeReducer.publicJokes,
    isLoading: state.jokeReducer.isFetching,
  }
}

// export component
export default connect(mapStateToProps, { getPublicJokes })(PublicJokes)
