// import dependencies
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import '../styles/loadingSpinner.css'
import styled from 'styled-components'
import cloneDeep from 'clone-deep'

// bootstrap
import Button from 'react-bootstrap/Button'

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

  const [criteria, setCriteria] = useState({
    sortBy: '-createdAt',
    resultsPerPage: '5',
    page: 1,
  })
  const [hasNextPage, setHasNextPage] = useState(false)

  // get jokes on page load
  useEffect(() => {
    console.log('calling useEffect with criteria', criteria)
    if (location.pathname === '/publicjokes') {
      setDisplay({ ...display, heading: 'Public Jokes' })
      jokesData.getPublicJokes(criteria).then((res) => {
        console.log('jokes response:', res)
        setJokes(res.data.jokes)
        setHasNextPage(res.data.hasNextPage)
        setIsLoading(false)
      })
    } else if (isLoggedIn) {
      setDisplay({ ...display, heading: `${username}'s Jokes` })
      jokesData.getPrivateJokes(criteria).then((res) => {
        console.log('jokes response:', res)
        setJokes(res.data.jokes)
        setHasNextPage(res.data.hasNextPage)
        setIsLoading(false)
      })
    }
  }, [criteria])

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

  const updateFollowJokeCreator = (jokeCreator, isFollowing) => {
    console.log('updateFollowJokeCreator', jokeCreator, isFollowing)
    const updatedJokes = cloneDeep(jokes)
    updatedJokes.forEach((joke) => {
      if (joke.username === jokeCreator) {
        joke.userFollowingCreator = isFollowing
      }
    })
    setJokes(updatedJokes)
  }

  const handleSortByChange = (e) => {
    console.log('sort by changed to: ', e.currentTarget.value)
    setCriteria({
      ...criteria,
      sortBy: e.currentTarget.value,
    })
  }

  const handleResultsPerPageChange = (e) => {
    setCriteria({
      ...criteria,
      page: 1,
      resultsPerPage: e.currentTarget.value,
    })
  }

  const handlePageDown = () => {
    setCriteria({
      ...criteria,
      page: criteria.page - 1,
    })
  }

  const handlePageUp = () => {
    setCriteria({
      ...criteria,
      page: criteria.page + 1,
    })
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

  // render the following if checks pass
  return (
    <JokeWrapper>
      <h1 className="title">{display.heading}</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <SortDiv>
            <div className="sortOptions">
              Sort by:{' '}
              <select
                name="sortBy"
                id="sortBy"
                value={criteria.sortBy}
                onChange={handleSortByChange}
              >
                <option value="-createdAt">Newest to Oldest</option>
                <option value="createdAt">Oldest to Newest</option>
                <option value="-karma">Karma, Highest to Lowest</option>
                <option value="karma">Karma, Lowest to Highest</option>
              </select>
              &nbsp;&nbsp; Results:{' '}
              <select
                name="resultsPerPage"
                id="resultsPerPage"
                value={criteria.resultsPerPage}
                onChange={handleResultsPerPageChange}
              >
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>

            <div className="pagination">
              <Button
                size="sm"
                onClick={handlePageDown}
                variant={criteria.page <= 1 ? 'secondary' : 'primary'}
                disabled={criteria.page <= 1}
              >
                {'<<'}
              </Button>
              <span className="page">Page: {criteria.page}</span>
              <Button
                size="sm"
                variant={!hasNextPage ? 'secondary' : 'primary'}
                disabled={!hasNextPage}
                onClick={handlePageUp}
              >
                {'>>'}
              </Button>
            </div>
          </SortDiv>
          {jokes.length < 1 ? (
            <div className="emptyWrapper">
              <img src="/img/maninrain.png" className="image" />
              <h2>No jokes are in the database - add them now!</h2>
            </div>
          ) : (
            jokes.map((joke) => {
              return (
                <SingleJokeCard
                  joke={joke}
                  username={username}
                  key={joke.dadjokequestion}
                  updateJokeKarma={updateJokeKarma}
                  updateJokeDetails={updateJokeDetails}
                  updateFollowJokeCreator={updateFollowJokeCreator}
                />
              )
            })
          )}
        </div>
      )}
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
  padding: 10px;

  > .title {
    text-align: center;
    font-size: 20px;
    background: lightblue;
    width: 50%;
    margin: 0 auto;
    border-radius: 15px;
    padding: 10px 0;
  }

  .emptyWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    .image {
      max-width: 400px;
    }
  }
`

const SortDiv = styled.div`
  background: lightblue;
  margin: 0 auto;
  border-radius: 6px;
  display: flex;
  padding: 10px;
  margin-top: 10px;
  justify-content: space-between;

  > .sortOptions {
    padding-left: 20px;
  }

  > .pagination {
    display: flex;
    padding-right: 20px;
    align-items: center;

    > .page {
      margin: 0 5px;
    }
  }
`
