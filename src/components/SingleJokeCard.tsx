// import dependencies
import React, { ChangeEvent, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import { deleteJoke, updateJoke } from '../actions/actions'
import { Joke } from '../types/types'

import '../styles/styles.css'

// joke card component
function SingleJokeCard(props: Props) {
  // destructure props
  const { joke, deleteJoke, updateJoke, username } = props

  console.log('username:', username)

  // empty joke object
  const emptyJoke: Joke = {
    _id: '',
    dadjokequestion: '',
    dadjokeanswer: '',
    isprivate: false,
    username: '',
  }

  // set local update state
  const [isBeingUpdated, setIsBeingUpdated] = useState(false)
  const [updatedJoke, setUpdatedJoke] = useState(emptyJoke)

  // helper functions
  function handleDelete(id: string) {
    deleteJoke(id)
  }

  function handleUpdate(updatedJoke: Joke) {
    updateJoke(updatedJoke, joke._id as string)
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
        _id: joke._id,
        dadjokequestion: joke.dadjokequestion,
        dadjokeanswer: joke.dadjokeanswer,
        isprivate: joke.isprivate,
        username: joke.username,
      })
    }
  }

  // handle change values, save to local state
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      (e.target as HTMLInputElement).type === 'checkbox'
        ? e.target.checked
        : e.target.value
    setUpdatedJoke({
      ...updatedJoke,
      [e.target.name]: value,
    })
    console.log('updated joke', updatedJoke)
  }

  // render the following
  return (
    <DivWrapper>
      <Card>
        <Card.Header>
          <OverlayTrigger
            key={`${joke._id}_upvote`}
            placement="top"
            overlay={<Tooltip id={`tooltip-upvote`}>Upvote this joke</Tooltip>}
          >
            <i className="fas fa-thumbs-up"></i>
          </OverlayTrigger>
          &nbsp;47&nbsp;
          <OverlayTrigger
            key={`${joke._id}_downvote`}
            placement="top"
            overlay={
              <Tooltip id={`tooltip-downvote`}>Downvote this joke</Tooltip>
            }
          >
            <i className="fas fa-thumbs-down"></i>
          </OverlayTrigger>
          {/* GLOBE OR LOCK ICON */}
          {joke.isprivate && (
            <OverlayTrigger
              key={`${joke._id}_lock`}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-lock`}>
                  Joke is <strong>Private</strong>
                </Tooltip>
              }
            >
              <i className="fas fa-lock floatRight"></i>
            </OverlayTrigger>
          )}
          {!joke.isprivate && (
            <OverlayTrigger
              key={`${joke._id}_globe`}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-globe`}>
                  Joke is <strong>Public</strong>
                </Tooltip>
              }
            >
              <i className="fas fa-globe floatRight"></i>
            </OverlayTrigger>
          )}
        </Card.Header>
        <Card.Body>
          {/* QUESTION DISPLAY */}
          <Card.Title>
            {!isBeingUpdated && <span>Q: {joke.dadjokequestion}</span>}
            {isBeingUpdated && (
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>Q</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="DadJoke Question Update"
                  name="dadjokequestion"
                  value={updatedJoke.dadjokequestion}
                  onChange={handleValueChange}
                />
              </InputGroup>
            )}
          </Card.Title>
          {/* ANSWER DISPLAY */}
          <Card.Text>
            {!isBeingUpdated && <span>A: {joke.dadjokeanswer}</span>}
            {isBeingUpdated && (
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>A</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="DadJoke Answer Update"
                  name="dadjokeanswer"
                  value={updatedJoke.dadjokeanswer}
                  onChange={handleValueChange}
                />
              </InputGroup>
            )}
          </Card.Text>
          <footer className="blockquote-footer">
            submitted by: {joke.username}
          </footer>
          {/* ERROR DISPLAY */}
          {joke.error && <Alert variant="danger">{joke.error}</Alert>}
          {/* UPDATE BUTTON */}
          {!isBeingUpdated && (
            <Button variant="primary" onClick={() => toggleUpdate()}>
              Edit
            </Button>
          )}
          {isBeingUpdated && (
            <>
              <Button
                variant="primary"
                onClick={() => handleUpdate(updatedJoke)}
              >
                Accept Changes
              </Button>
              &nbsp;
              <Button variant="warning" onClick={() => toggleUpdate()}>
                Cancel Edit
              </Button>
            </>
          )}
          &nbsp;
          {/* DELETE BUTTON */}
          {joke.username === username && (
            <Button
              variant="danger"
              onClick={() => handleDelete(joke._id as string)}
            >
              Del
            </Button>
          )}
        </Card.Body>
      </Card>
    </DivWrapper>

    // <SingleJokeCardDiv>
    //   {!isBeingUpdated && (
    //     <>
    //       <p>{joke.dadjokequestion}</p>
    //       <p>
    //         {'>>>'} {joke.dadjokeanswer}
    //       </p>
    //     </>
    //   )}
    //   {isBeingUpdated && (
    //     <>
    //       <input
    //         type="text"
    //         name="dadjokequestion"
    //         value={updatedJoke.dadjokequestion}
    //         onChange={handleValueChange}
    //         size={50}
    //       />
    //       <p>
    //         {'>>>'}
    //         <input
    //           type="text"
    //           name="dadjokeanswer"
    //           value={updatedJoke.dadjokeanswer}
    //           onChange={handleValueChange}
    //           size={50}
    //         />
    //       </p>
    //       <StyledButton onClick={() => handleUpdate(updatedJoke)}>
    //         Accept Changes
    //       </StyledButton>
    //       {
    //         // need to add handleUpdate onClick to above button
    //       }
    //       <StyledButton onClick={() => toggleUpdate()}>
    //         Cancel Edit
    //       </StyledButton>
    //     </>
    //   )}

    //   <AuthorP>submitted by: {joke.username}</AuthorP>

    //   {!isBeingUpdated && (
    //     <StyledButton onClick={() => toggleUpdate()}>Edit Joke</StyledButton>
    //   )}

    //   {joke.error && <ErrorP>{joke.error}</ErrorP>}

    //   {(joke.isprivate === true || joke.username === username) && (
    //     <StyledButton onClick={() => handleDelete(joke._id as string)}>
    //       Del
    //     </StyledButton>
    //   )}
    // </SingleJokeCardDiv>
  )
}

// export component
const connector = connect(null, { deleteJoke, updateJoke })
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  joke: Joke
  username?: string
}

export default connector(SingleJokeCard)

// styled components
const SingleJokeCardDiv = styled.div`
  width: 80%;
  margin: 10px auto;
  background: lightblue;
  border-radius: 15px;
  padding: 5px 15px;
`

const StyledButton = styled.button`
  background: lightpink;
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  outline: none;
  border: 0;
  margin: 5px 10px;
  border-radius: 5px;

  :hover {
    cursor: pointer;
    filter: brightness(90%);
  }
`

const AuthorP = styled.p`
  font-size: 12px;
`

const ErrorP = styled.p`
  color: red;
  font-size: 12px;
  text-align: right;
  display: inline-block;
`

const DivWrapper = styled.div`
  margin: 10px;
`
