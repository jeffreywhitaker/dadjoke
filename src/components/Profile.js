// import dependencies
import React from 'react'
import { connect } from 'react-redux'

import SingleJokeCard from './SingleJokeCard'
import { getPrivateJokes } from '../actions/actions'

// Home component
function Profile({ getPrivateJokes, privateJokes, isLoading }) {
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
      ) : privateJokes ? (
        privateJokes.map((joke) => {
          return <SingleJokeCard joke={joke} key={joke.dadjokeid} />
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
    privateJokes: state.jokes.privateJokes,
    isLoading: state.jokes.isFetching,
  }
}

// export component
export default connect(mapStateToProps, { getPrivateJokes })(Profile)
