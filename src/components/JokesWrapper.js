// import dependencies
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import '../styles/loadingSpinner.css'
import styled from 'styled-components'
import cloneDeep from 'clone-deep'
import queryString from 'query-string'

// import actions
import jokesData from '../ajax/jokesData'
import SingleJokeCard from './SingleJokeCard'
import Loading from './Loading'
import FilterJokesDashboard from './small/FilterJokesDashboard'

// joke display page component
function JokesWrapper({ isLoggedIn, username }) {
  // set location and get query
  const location = useLocation()
  const history = useHistory()
  const parsedQuery = queryString.parse(location.search)

  // set up state
  const [isLoading, setIsLoading] = useState(true)
  const [jokes, setJokes] = useState([])
  const [searchString, setSearchString] = useState('')
  const [display, setDisplay] = useState({
    heading: '',
  })

  const defaultCriteria = {
    sortBy: '-createdAt',
    resultsPerPage: '5',
    searchString: '',
    page: 1,
  }

  const [criteria, setCriteria] = useState({
    // set criteria by URL first, then by default if no URL search param
    sortBy: parsedQuery.sortBy || defaultCriteria.sortBy,
    resultsPerPage:
      parsedQuery.resultsPerPage || defaultCriteria.resultsPerPage,
    searchString: parsedQuery.searchString || defaultCriteria.searchString,
    page: parsedQuery.page || defaultCriteria.page,
    isprivate: location.pathname === '/privatejokes',
  })
  const [hasNextPage, setHasNextPage] = useState(false)

  // get jokes on page load
  useEffect(() => {
    console.log('calling useEffect with criteria', criteria)

    if (location.pathname === '/publicjokes') {
      setDisplay({ ...display, heading: 'Public Jokes' })
    } else {
      setDisplay({ ...display, heading: `${username}'s Jokes` })
    }

    // set the URL search params based on criteria state
    const params = new URLSearchParams()
    const keys = Object.keys(criteria)

    keys.forEach((key) => {
      // update params if different from default
      // don't reflect the isprivate criteria in the URL, as this is already in the path param
      if (criteria[key] !== defaultCriteria[key] && key !== 'isprivate') {
        params.append(key, criteria[key])
      }
    })

    // add search params
    history.push({ search: params.toString() })

    // get the jokes
    if (location.pathname === '/publicjokes' || isLoggedIn) {
      // TODO: here or earlier, set isLoading to true and show a load spinner while loading new data
      jokesData
        .getJokes(criteria)
        .then((res) => {
          console.log('jokes response:', res)
          setJokes(res.data.jokes)
          setHasNextPage(res.data.hasNextPage)
          setIsLoading(false)
        })
        .catch((err) => {
          window.alert('Unable to find jokes: ', err)
        })
    }
  }, [criteria])

  // set keyword search by search string, but with debounce
  const setKeywordSearch = () => {
    setCriteria({ ...criteria, searchString: searchString })
  }

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

  const removeDeletedJoke = (id) => {
    // TODO: add loading spinner
    let updatedJokes = cloneDeep(jokes)
    updatedJokes = updatedJokes.filter((joke) => {
      return joke._id !== id
    })

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

  // TODO :consolidate these handle functions
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
    // replace values of updated joke with response
    let index
    for (let i = 0; i < jokes.length; i++) {
      if (jokes[i]._id == jokeID) {
        index = i
        break
      }
    }
    const updatedJokes = cloneDeep(jokes)
    updatedJokes[index] = res.data
    setJokes(updatedJokes)
  }

  // login check
  if (location.pathname === '/privatejokes' && !isLoggedIn) {
    return (
      // TODO: add JokeWrapper here and a cool image
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
        <>
          {/* --- */}
          {/* SEARCH FILTERS */}
          <FilterJokesDashboard
            criteria={criteria}
            handlePageDown={handlePageDown}
            handlePageUp={handlePageUp}
            handleResultsPerPageChange={handleResultsPerPageChange}
            handleSortByChange={handleSortByChange}
            hasNextPage={hasNextPage}
            searchString={searchString}
            setKeywordSearch={setKeywordSearch}
            setSearchString={setSearchString}
          />

          {/* --- */}
          {/* JOKES LIST */}
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
                  removeDeletedJoke={removeDeletedJoke}
                  updateJokeKarma={updateJokeKarma}
                  updateJokeDetails={updateJokeDetails}
                  updateFollowJokeCreator={updateFollowJokeCreator}
                />
              )
            })
          )}
        </>
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
