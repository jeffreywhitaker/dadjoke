// import dependencies
import React, { ChangeEvent, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import '../styles/loadingSpinner.css'
import styled from 'styled-components'
import cloneDeep from 'clone-deep'
import queryString from 'query-string'

import Header from './small/PageHeader'

// import actions
import jokesData from '../ajax/jokesData'
import SingleJokeCard from './SingleJokeCard'
import Loading from './Loading'
import FilterJokesDashboard from './small/FilterJokesDashboard'
import { Criteria, Joke } from '../types/types'

// joke display page component
function JokesWrapper(props: Props) {
  // destructure props
  const { isLoggedIn, username } = props

  // set location and get query
  const location = useLocation()
  const history = useHistory()
  const parsedQuery = queryString.parse(location.search)

  // set up state
  const [advancedFilter, setAdvancedFilter] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [jokes, setJokes] = useState<Joke[]>([])

  // criteria
  const [display, setDisplay] = useState({
    heading: '',
  })

  const defaultCriteria = {
    sortBy: '-createdAt',
    resultsPerPage: '5',
    searchString: '',
    submittedBy: '',
    page: 1,
  }

  const [criteria, setCriteria] = useState<Criteria>({
    // set criteria by URL first, then by default if no URL search param
    // TODO: one saved as number, one saved as string
    sortBy: (parsedQuery.sortBy as string) || defaultCriteria.sortBy,
    resultsPerPage:
      (parsedQuery.resultsPerPage as string) || defaultCriteria.resultsPerPage,
    searchString:
      (parsedQuery.searchString as string) || defaultCriteria.searchString,
    page: parseInt(
      (parsedQuery.page as string) ||
        ((defaultCriteria.page as unknown) as string),
    ), // TODO: change this to always be number
    isprivate: location.pathname === '/privatejokes',
    keywords: '',
    submittedBy:
      (parsedQuery.submittedBy as string) || defaultCriteria.submittedBy,
  })

  // advanced filters
  const [searchString, setSearchString] = useState(criteria.searchString || '')
  const [submittedBy, setSubmittedBy] = useState(criteria.submittedBy || '')

  // has next page
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

    // change searchCriteria based on advancedFilter
    const searchCriteria = criteria
    if (!advancedFilter) {
      searchCriteria.submittedBy = ''
      searchCriteria.keywords = ''
    }

    // get the jokes
    if (location.pathname === '/publicjokes' || isLoggedIn) {
      // TODO: here or earlier, set isLoading to true and show a load spinner while loading new data
      jokesData
        .getJokes(searchCriteria)
        .then((res) => {
          console.log('jokes response:', res)
          setJokes(res.data.jokes)
          setHasNextPage(res.data.hasNextPage)
          setIsLoading(false)
        })
        .catch((err) => {
          window.alert('Unable to find jokes: ' + err)
        })
    }
  }, [criteria])

  // set advanced filters to criteria, triggering joke GET call
  const setAdvancedFilterCriteria = () => {
    setCriteria({ ...criteria, searchString, submittedBy })
  }

  // TODO: string or number?
  const updateJokeKarma = (
    jokeID: string,
    newKarma: number,
    newVote: number,
  ) => {
    console.log('updateJokeKarma: ', jokeID, newKarma)
    const updatedJokes = cloneDeep(jokes)
    updatedJokes.forEach((joke: Joke) => {
      if (joke._id === jokeID) {
        joke.karma = newKarma
        joke.userVote = newVote.toString()
      }
    }),
      setJokes(updatedJokes)
  }

  const removeDeletedJoke = (id: string) => {
    // TODO: add loading spinner
    let updatedJokes = cloneDeep(jokes)
    updatedJokes = updatedJokes.filter((joke: Joke) => {
      return joke._id !== id
    })

    setJokes(updatedJokes)
  }

  const updateFollowJokeCreator = (
    jokeCreator: string,
    isFollowing: boolean,
  ) => {
    console.log('updateFollowJokeCreator', jokeCreator, isFollowing)
    const updatedJokes = cloneDeep(jokes)
    updatedJokes.forEach((joke: Joke) => {
      if (joke.username === jokeCreator) {
        joke.userFollowingCreator = isFollowing
      }
    })
    setJokes(updatedJokes)
  }

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log('sort by changed to: ', e.currentTarget.value)
    setCriteria({
      ...criteria,
      sortBy: e.currentTarget.value,
    })
  }

  const handleResultsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
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

  const updateJokeDetails = (jokeID: string, res: Record<string, unknown>) => {
    // replace values of updated joke with response
    let index
    for (let i = 0; i < jokes.length; i++) {
      // TODO: make 2 joke types, one on created, one on return with more info from backend
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
    <Wrapper>
      <Header text={display.heading} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* --- */}
          {/* SEARCH FILTERS */}
          <FilterJokesDashboard
            advancedFilter={advancedFilter}
            criteria={criteria}
            handlePageDown={handlePageDown}
            handlePageUp={handlePageUp}
            handleResultsPerPageChange={handleResultsPerPageChange}
            handleSortByChange={handleSortByChange}
            hasNextPage={hasNextPage}
            searchString={searchString}
            setAdvancedFilter={setAdvancedFilter}
            setAdvancedFilterCriteria={setAdvancedFilterCriteria}
            setSearchString={setSearchString}
            setSubmittedBy={setSubmittedBy}
            submittedBy={submittedBy}
          />

          {/* --- */}
          {/* JOKES LIST */}
          {jokes.length < 1 ? (
            <div className="emptyWrapper">
              <img src="/img/maninrain.png" className="image" />
              <h2>No jokes are in the database - add them now!</h2>
            </div>
          ) : (
            jokes.map((joke: Joke) => {
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
    </Wrapper>
  )
}

interface State {
  loginReducer: {
    username: string
    jokesUpvoted: number
    jokesDownvoted: number
    isLoggedIn: boolean
  }
}

// connect component to redux store
const mapStateToProps = (state: State) => {
  return {
    username: state.loginReducer.username,
    jokesUpvoted: state.loginReducer.jokesUpvoted,
    jokesDownvoted: state.loginReducer.jokesDownvoted,
    isLoggedIn: state.loginReducer.isLoggedIn,
  }
}

// export component
const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

export default connector(JokesWrapper)

// styled components
const Wrapper = styled.div`
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
