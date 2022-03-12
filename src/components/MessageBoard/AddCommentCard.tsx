import React, { useState } from 'react'

import Button from 'react-bootstrap/esm/Button'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import FormControl from 'react-bootstrap/esm/FormControl'
import styled from 'styled-components'

export default ({ addNewComment }) => {
  // if not logged in return a login component

  const [newCommentText, setNewCommentText] = useState('')

  return (
    <Wrapper>
      <h4>Join the Discussion!</h4>
      <span>Add a comment below...</span>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Text</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as="textarea"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
      </InputGroup>
      <Button onClick={() => addNewComment(newCommentText)}>Post</Button>
    </Wrapper>
  )
}

// styled
const Wrapper = styled.article`
  width: 100%;
  border: 1px solid black;
  padding: 12px;
  margin: 10px 0;
`
