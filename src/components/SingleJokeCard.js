// import dependencies
import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { deleteJoke } from '../actions/actions'
import { updateJoke } from '../actions/actions'

// login page component
function SingleJokeCard(props) {
  // destructure props
  let { joke, deleteJoke } = props

  // set local update state
  const [isBeingUpdated, setIsBeingUpdated] = useState(false)
  const [updatedJoke, setUpdatedJoke] = useState({
    dadjokeid: '',
    dadjokequestion: '',
    dadjokeanswer: '',
    isprivate: false,
  })

  // helper functions
  function handleDelete(id) {
    deleteJoke(id)
  }

  function toggleUpdate(id) {
    console.log('toggleUpdate:', isBeingUpdated)
    if (isBeingUpdated) {
      // set update to false
      setIsBeingUpdated(false)
      setUpdatedJoke({
        dadjokeid: '',
        dadjokequestion: '',
        dadjokeanswer: '',
        isprivate: false,
      })
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
    // updateJoke()
  }

  function handleUpdate() {
    // put stuff here
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
          <button onClick={handleUpdate}>Accept Changes</button>
          {
            // need to add handleUpdate onClick to above button
          }
          <button onClick={() => toggleUpdate(joke.dadjokeid)}>
            Cancel Edit
          </button>
        </>
      )}

      {!isBeingUpdated && (
        <button onClick={() => toggleUpdate(joke.dadjokeid)}>Edit Joke</button>
      )}

      {joke.isprivate === true && (
        <button onClick={() => handleDelete(joke.dadjokeid)}>Del</button>
      )}
    </SingleJokeCardDiv>
  )
}

// export component
export default connect(null, { deleteJoke })(SingleJokeCard)

// styled components
const SingleJokeCardDiv = styled.div`
  width: 80%
  margin: 20px auto
  background: cyan
  border-radius: 15px
  padding: 5px 15px
`
