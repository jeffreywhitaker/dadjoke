// import dependencies
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { addJoke } from '../actions/actions'

// add joke component
export function AddJoke({ addJoke, usernameFromState }) {
  const history = useHistory()

  let blankJoke = {
    dadjokequestion: '',
    dadjokeanswer: '',
    isprivate: false,
  }
  // local state for adding new joke
  const [newJoke, setNewJoke] = useState(blankJoke)

  // call add joke function
  const callAddJoke = (e) => {
    e.preventDefault()
    console.log('new joke:')
    console.log(newJoke)
    addJoke(newJoke)
    setNewJoke(blankJoke)
    history.push('/publicjokes')
  }

  // handle change values, save to local state
  const handleValueChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setNewJoke({
      ...newJoke,
      [e.target.name]: value,
    })
    console.log(newJoke)
  }

  // render the following
  return (
    <AddJokeCardDiv>
      <span>Q: </span>
      <input
        type="text"
        name="dadjokequestion"
        value={newJoke.dadjokequestion}
        onChange={handleValueChange}
      />
      <br />
      <span>A: </span>
      <input
        type="text"
        name="dadjokeanswer"
        value={newJoke.dadjokeanswer}
        onChange={handleValueChange}
      />
      <br />
      <span>is Private?</span>
      <input
        type="checkbox"
        name="isprivate"
        checked={newJoke.isprivate}
        onChange={handleValueChange}
      />
      <button onClick={callAddJoke}>Add</button>
    </AddJokeCardDiv>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    jokes: state.jokeReducer.jokes,
    usernameFromState: state.loginReducer.username,
  }
}

// export component
export default connect(mapStateToProps, { addJoke })(AddJoke)

// styled components
const AddJokeCardDiv = styled.div`
  width: 80%
  margin: 20px auto
  background: lightblue
  border-radius: 15px
  padding: 5px 15px
`
