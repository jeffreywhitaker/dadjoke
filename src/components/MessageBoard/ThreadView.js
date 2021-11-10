import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import mbData from '../../ajax/mbData'

import Loading from '../Loading'

import AddCommentCard from '../MessageBoard/AddCommentCard'
import Button from 'react-bootstrap/esm/Button'
import CommentCard from '../MessageBoard/CommentCard'
import styled from 'styled-components'

const ThreadView = () => {
  // sdf
  const { threadId } = useParams()

  const [thread, setThread] = useState(null)

  function fetchThread() {
    mbData.getThreadById(threadId).then(({ data }) => {
      setThread(data)
    })
  }

  useEffect(() => {
    fetchThread()
  }, [])

  function addNewComment(text) {
    mbData.postNewComment(thread._id, text).then(() => {
      fetchThread()
    })
  }

  if (!thread) return <Loading />

  return (
    <Wrapper>
      <div className="top-wrapper">
        <NavLink to="/mboard">
          <Button size="sm">Back</Button>
        </NavLink>
        <h1>{thread.title}</h1>
        <div />
      </div>

      <CommentCard comment={thread} />
      {thread.comments.map((comment) => (
        <CommentCard comment={comment} />
      ))}
      <AddCommentCard addNewComment={addNewComment} />
    </Wrapper>
  )
}

export default ThreadView

// styled
const Wrapper = styled.section`
  margin: 20px;

  .top-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
