import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import CSS from 'csstype'
// import { AxiosPromise } from 'axios'

import Modal from 'react-bootstrap/Modal'
import jokesData from '../../ajax/jokesData'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import styled from 'styled-components'
import dayjs from 'dayjs'

function CommentModal(props) {
  const { isLoggedIn, showModal, handleClose, jokeID } = props

  console.log('comment modal open')

  const [newComment, setNewComment] = useState({
    data: '',
    jokeID: jokeID,
  })
  const [comments, setComments] = useState(null)
  const [loading, setLoading] = useState(true)

  // get comments for the appropriate joke
  useEffect(() => {
    console.log('in comment modal use effect')
    if (!comments && showModal) {
      // get comments
      setLoading(true)
      jokesData.getComments(jokeID).then((res) => {
        setComments(res.data)
        setLoading(false)
      })
    }
  }, [comments, showModal])

  function handleSubmitComment() {
    console.log('submitting new comment', newComment)
    jokesData.uploadComment(newComment).then(() => {
      setLoading(true)
      setComments(null)
    })
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Joke Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            {comments.map((comment) => {
              return (
                <Card key={comment._id}>
                  <Card.Header>
                    <HeaderDiv>
                      <Link to={`/profile/${comment.creatorName}`}>
                        {comment.creatorName}
                      </Link>
                      <span>
                        {dayjs(comment.createdAt).format("h:mm a MMM DD, 'YY")}
                      </span>
                    </HeaderDiv>
                  </Card.Header>
                  <Card.Body>
                    <p>{comment.data}</p>
                  </Card.Body>
                </Card>
              )
            })}
            {!comments ||
              (comments.length < 1 && (
                <>
                  <span>
                    This joke currently has no comments - you should add one!
                  </span>
                  <br />
                  <br />
                </>
              ))}
            {/* TODO: add a textarea for adding new comments, if logged in */}
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={style}>
        {!isLoggedIn ? (
          <span>You must be logged in to comment!</span>
        ) : (
          <>
            <label htmlFor="newComment">Add Comment</label>
            <InputGroup>
              <FormControl
                as="textarea"
                name="data"
                aria-label="With textarea"
                id="newComment"
                value={newComment.data}
                onChange={(e) =>
                  setNewComment({
                    ...newComment,
                    data: e.currentTarget.value,
                  })
                }
              />
            </InputGroup>
            <Button onClick={handleSubmitComment}>Submit</Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default CommentModal

const style = {
  display: 'block',
}

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
