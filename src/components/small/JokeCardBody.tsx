// import dependencies
import React, { ReactElement } from 'react'

import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

import { Joke } from '../../types/types'

type Props = {
  isBeingUpdated: boolean
  joke: Joke
  updatedJoke: Joke
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeywordsChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function JokeCardBody(props: Props): ReactElement {
  const {
    isBeingUpdated,
    joke,
    updatedJoke,
    handleValueChange,
    handleKeywordsChange,
  } = props

  return (
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
      {/* KEYWORDS DISPLAY */}
      <Card.Text>
        {/* {!isBeingUpdated && (
              <span>
                Keywords: {joke.keywords ? joke.keywords.join(', ') : '[None'}
              </span>
            )} */}
        {isBeingUpdated && (
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Keywords</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="DadJoke Answer Update"
              name="dadjokeanswer"
              defaultValue={joke.keywords ? joke.keywords.join(', ') : ''}
              onChange={handleKeywordsChange}
            />
          </InputGroup>
        )}
      </Card.Text>
      {/* ERROR DISPLAY */}
      {joke.error && <Alert variant="danger">{joke.error}</Alert>}
    </Card.Body>
  )
}

export default JokeCardBody
