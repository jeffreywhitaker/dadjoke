import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import mbData from '../../ajax/mbData'

import CommentCard from '../MessageBoard/CommentCard'
import styled from 'styled-components'

export default () => {
  // sdf
  const { threadId } = useParams()

  const [thread, setThread] = useState(null)

  useEffect(() => {
    mbData.getThreadById(threadId).then(({ data }) => {
      setThread(data)
    })
  }, [])

  if (!thread) return <div>Loading...</div>

  return (
    <Wrapper>
      <h1>{thread.title}</h1>
      <CommentCard comment={thread} />
      {thread.comments.map((comment) => (
        <CommentCard comment={comment} />
      ))}
    </Wrapper>
  )
}

// styled
const Wrapper = styled.section`
  margin: 20px;
`
