// import dependencies
import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { deleteJoke, updateJoke } from '../actions/actions'

// joke card component
function SingleJokeCard(props) {
  // destructure props
  let { joke, deleteJoke, updateJoke, username } = props

  console.log('username:', username)

  // empty joke object
  const emptyJoke = {
    dadjokeid: '',
    dadjokequestion: '',
    dadjokeanswer: '',
    isprivate: false,
    username: '',
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
        username: joke.username,
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
            >>>
            <input
              type="text"
              name="dadjokeanswer"
              value={updatedJoke.dadjokeanswer}
              onChange={handleValueChange}
              size={50}
            />
          </p>
          <StyledButton onClick={() => handleUpdate(updatedJoke)}>
            Accept Changes
          </StyledButton>
          {
            // need to add handleUpdate onClick to above button
          }
          <StyledButton onClick={() => toggleUpdate()}>
            Cancel Edit
          </StyledButton>
        </>
      )}

      <AuthorP>submitted by: {joke.username}</AuthorP>

      {!isBeingUpdated && (
        <StyledButton onClick={() => toggleUpdate()}>Edit Joke</StyledButton>
      )}

      {joke.error && <ErrorP>{joke.error}</ErrorP>}

      {(joke.isprivate === true || joke.username === username) && (
        <StyledButton onClick={() => handleDelete(joke.dadjokeid)}>
          Del
        </StyledButton>
      )}
    </SingleJokeCardDiv>
  )
}

// export component
export default connect(null, { deleteJoke, updateJoke })(SingleJokeCard)

// styled components
const SingleJokeCardDiv = styled.div`
  width: 80%
  margin: 10px auto
  background: lightblue
  border-radius: 15px
  padding: 5px 15px
`

const StyledButton = styled.button`
  background: lightpink
  text-decoration: none
  color: black
  padding: 5px 10px
  outline: none
  border: 0
  margin: 5px 10px
  border-radius: 5px;
`

const AuthorP = styled.p`
  font-size: 12px;
`

const ErrorP = styled.p`
  color: red
  font-size: 12px
  text-align: right
  display: inline-block
`
