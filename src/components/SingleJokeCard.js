// import dependencies
import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { deleteJoke, updateJoke } from '../actions/actions'

// joke card component
function SingleJokeCard(props) {
  // destructure props
  let { joke, deleteJoke, updateJoke } = props

  // empty joke object
  const emptyJoke = {
    dadjokeid: '',
    dadjokequestion: '',
    dadjokeanswer: '',
    isprivate: false,
  }

  // set local update state
  const [isBeingUpdated, setIsBeingUpdated] = useState(false)
  const [updatedJoke, setUpdatedJoke] = useState(emptyJoke)

  // helper functions
  function handleDelete(id) {
    deleteJoke(id)
  }

  function handleUpdate(updatedJoke) {
    updateJoke(updatedJoke, joke.dadjokeid)
  }

  function toggleUpdate() {
    console.log('toggleUpdate:', isBeingUpdated)
    if (isBeingUpdated) {
      // set update to false and empty the updated Joke state
      setIsBeingUpdated(false)
      setUpdatedJoke(emptyJoke)
    } else {
      // set update to true and update the local state
      setIsBeingUpdated(true)
      setUpdatedJoke({
        dadjokeid: joke.dadjokeid,
        dadjokequestion: joke.dadjokequestion,
        dadjokeanswer: joke.dadjokeanswer,
        isprivate: joke.isprivate,
      })
    }
  }

  // handle change values, save to local state
  const handleValueChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setUpdatedJoke({
      ...updatedJoke,
      [e.target.name]: value,
    })
    console.log('updated joke', updatedJoke)
  }

  // render the following
  return (
    <SingleJokeCardDiv>
      {!isBeingUpdated && (
        <>
          <p>{joke.dadjokequestion}</p>
          <p>>>> {joke.dadjokeanswer}</p>
        </>
      )}
      {isBeingUpdated && (
        <>
          <input
            type="text"
            name="dadjokequestion"
            value={updatedJoke.dadjokequestion}
            onChange={handleValueChange}
            size={50}
          />
          <p>
            >>>{' '}
            <input
              type="text"
              name="dadjokeanswer"
              value={updatedJoke.dadjokeanswer}
              onChange={handleValueChange}
              size={50}
            />
          </p>
          <button onClick={() => handleUpdate(updatedJoke)}>
            Accept Changes
          </button>
          {
            // need to add handleUpdate onClick to above button
          }
          <button onClick={() => toggleUpdate()}>Cancel Edit</button>
        </>
      )}

      {!isBeingUpdated && (
        <button onClick={() => toggleUpdate()}>Edit Joke</button>
      )}

      {joke.isprivate === true && (
        <button onClick={() => handleDelete(joke.dadjokeid)}>Del</button>
      )}
    </SingleJokeCardDiv>
  )
}

// export component
export default connect(null, { deleteJoke, updateJoke })(SingleJokeCard)

// styled components
const SingleJokeCardDiv = styled.div`
  width: 80%
  margin: 20px auto
  background: cyan
  border-radius: 15px
  padding: 5px 15px
`
