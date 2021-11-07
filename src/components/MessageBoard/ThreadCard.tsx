import React from 'react'

import Button from 'react-bootstrap/esm/Button'

import dayjs from 'dayjs'
import styled from 'styled-components'

export default ({ thread, handleDeleteThread }) => {
  return (
    <Wrapper>
      <div className="left">
        <div className="author-avatar-wrapper">
          <img src={thread.authorAvatar} />
        </div>
        <div className="title-wrapper">
          <span>{thread.title}</span>
          <span>
            {thread.authorName} . {dayjs(thread.createdAt).format('DD/MM/YY')}
          </span>
        </div>
      </div>
      <div className="right">
        <div className="replies-wrapper">
          <span>{thread.replies}</span>
        </div>
        <div className="last-reply-wrapper">
          <div className="text-wrapper">
            <span>{dayjs(thread.lastReply).format('DD/MM/YY')}</span>
            <span>{thread.lastReplyAuthor}</span>
          </div>
          <div className="avatar-wrapper">
            <img
              src={thread.lastReplyAvatar}
              alt="Avatar of last reply author"
            />
          </div>
        </div>
      </div>

      <span>
        {thread.title} {thread.text}
      </span>
      <Button onClick={() => handleDeleteThread(thread._id)}>Del</Button>
    </Wrapper>
  )
}

// styled
const Wrapper = styled.article`
  width: 100%;
`
