// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { deleteJoke } from '../actions/actions'

// login page component
function SingleJokeCard(props) {
  // destructure props
  let { joke, deleteJoke } = props

  // helper functions
  function handleDelete(id) {
    deleteJoke(id)
  }

  function handleUpdate(id) {
    console.log('id', id)
  }

  // render the following
  return (
    <SingleJokeCardDiv>
      <p>{joke.dadjokequestion}</p>
      <p>>>> {joke.dadjokeanswer}</p>
      <button onClick={() => handleUpdate(joke.dadjokeid)}>Edit</button>
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
