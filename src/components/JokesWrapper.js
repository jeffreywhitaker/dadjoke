// import dependencies
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import '../styles/loadingSpinner.css'
import styled from 'styled-components'
import cloneDeep from 'clone-deep'

// import actions
import jokesData from '../ajax/jokesData'
import SingleJokeCard from './SingleJokeCard'
import Loading from './Loading'

// joke display page component
function JokesWrapper({ isLoggedIn, username }) {
  const location = useLocation()
  console.log('location is: ', location)
  // set up state
  const [isLoading, setIsLoading] = useState(true)
  const [jokes, setJokes] = useState([])
  const [display, setDisplay] = useState({
    heading: '',
  })

  // get jokes on page load
  useEffect(() => {
    if (location.pathname === '/publicjokes') {
      setDisplay({ ...display, heading: 'Public Jokes' })
      jokesData.getPublicJokes().then((res) => {
        console.log('jokes response:', res)
        setJokes(res.data)
        setIsLoading(false)
      })
    } else if (isLoggedIn) {
      setDisplay({ ...display, heading: `${username}'s Jokes` })
      jokesData.getPrivateJokes().then((res) => {
        console.log('jokes response:', res)
        setJokes(res.data)
        setIsLoading(false)
      })
    }
  }, [])

  const updateJokeKarma = (jokeID, newKarma, newVote) => {
    console.log('updateJokeKarma: ', jokeID, newKarma)
    const updatedJokes = cloneDeep(jokes)
    updatedJokes.forEach((joke) => {
      if (joke._id === jokeID) {
        joke.karma = newKarma
        joke.userVote = newVote.toString()
      }
    }),
      setJokes(updatedJokes)
  }

  const updateJokeDetails = (jokeID, res) => {
    const updatedJokes = cloneDeep(jokes).filter((joke) => joke._id !== jokeID)
    updatedJokes.push(res.data)
    setJokes(updatedJokes)
  }

  // login check
  if (location.pathname === '/privatejokes' && !isLoggedIn) {
    return (
      <p style={{ textAlign: 'center' }}>
        You must be logged in to see your private jokes. Please log in above!
      </p>
    )
  }

  // loading check
  if (isLoading) return <Loading />

  // empty check

  if (!jokes) {
    return <p>No jokes are in the database - add them now!</p>
  }

  // render the following if checks pass
  return (
    <JokeWrapper>
      <DisplayP>{display.heading}</DisplayP>
      {jokes.map((joke) => {
        return (
          <SingleJokeCard
            joke={joke}
            username={username}
            key={joke.dadjokequestion}
            updateJokeKarma={updateJokeKarma}
            updateJokeDetails={updateJokeDetails}
          />
        )
      })}
    </JokeWrapper>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.username,
    jokesUpvoted: state.loginReducer.jokesUpvoted,
    jokesDownvoted: state.loginReducer.jokesDownvoted,
    isLoggedIn: state.loginReducer.isLoggedIn,
  }
}

// export component
export default connect(mapStateToProps, {})(JokesWrapper)

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
