// import dependencies
import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { addJoke } from '../actions/actions'

// add joke component
function AddJoke({ addJoke }) {
  // const history = useHistory()

  // local state for adding new joke
  const [newJoke, setNewJoke] = useState({
    dadjokequestion: '',
    dadjokeanswer: '',
    isprivate: false,
  })

  // call add joke function
  const callAddJoke = (e) => {
    console.log('callAddJoke in AddJoke has triggered')
    e.preventDefault()
    addJoke(newJoke)
    setNewJoke({ dadjokequestion: '', dadjokeanswer: '', isprivate: false })
    // history.push('/jokes')
  }

  // handle change values, save to local state
  const handleValueChange = (e) => {
    setNewJoke({
      ...newJoke,
      [e.target.name]: e.target.value,
    })
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
      <button onClick={callAddJoke}>Add</button>
    </AddJokeCardDiv>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    jokes: state.jokeReducer.jokes,
  }
}

// export component
export default connect(mapStateToProps, { addJoke })(AddJoke)

// styled components
const AddJokeCardDiv = styled.div`
  width: 80%
  margin: 20px auto
  background: cyan
  border-radius: 15px
  padding: 5px 15px
`
