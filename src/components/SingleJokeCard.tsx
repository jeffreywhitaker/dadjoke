// import dependencies
import React, { ChangeEvent, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import dayjs from 'dayjs'
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
    if (window.confirm('Are you sure you want to delete this joke?')) {
      deleteJoke(id)
    }
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
          {/* DATE */}
          <DetailsDiv className="floatRight">
            {dayjs(joke.createdAt).format("MMM DD, 'YY")} &nbsp;
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
          </DetailsDiv>
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
          {/* ERROR DISPLAY */}
          {joke.error && <Alert variant="danger">{joke.error}</Alert>}
        </Card.Body>
        <Card.Footer>
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
          {window.location.pathname !== '/privatejokes' && (
            <span className="floatRight">submitted by: {joke.username}</span>
          )}
        </Card.Footer>
      </Card>
    </DivWrapper>
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
const DetailsDiv = styled.div`
  display: flex;
  align-items: center;
`

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
