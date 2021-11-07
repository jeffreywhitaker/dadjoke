import React from 'react'
import { NavLink } from 'react-router-dom'

import Button from 'react-bootstrap/esm/Button'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import styled from 'styled-components'

export default ({ thread, handleDeleteThread }) => {
  return (
    <Wrapper>
      <div className="left">
        <div className="author-avatar-wrapper">
          <img
            className="avatar"
            src={
              thread.creator.image
                ? thread.creator.image
                : '/img/defaultAvatar.png'
            }
          />
        </div>
        <div className="title-wrapper">
          <NavLink className="title" to={`/mboard/${thread.title}`}>
            {thread.title}
          </NavLink>
          <span className="creator">
            <NavLink to={`/profile/${thread.creatorName}`}>
              {thread.creatorName}
            </NavLink>{' '}
            | {dayjs(thread.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <div className="right">
        <div className="replies-wrapper">
          <span>Comments: {thread.commentCount}</span>
          <span>Views: {thread.viewCount}</span>
        </div>
        <div className="last-reply-wrapper">
          {thread.lastComment ? (
            <>
              <div className="text-wrapper">
                <span>{dayjs(thread.lastComment.createdAt).fromNow()}</span>
                <span>{thread.lastComment.creatorName}</span>
              </div>
              <div className="avatar-wrapper">
                <img
                  src={thread.lastComment.creator.image}
                  alt="Avatar of last reply author"
                />
              </div>
            </>
          ) : (
            <div>No comment yet</div>
          )}
        </div>
      </div>

      {/* <span>
        {thread.title} {thread.text}
      </span>
      <Button onClick={() => handleDeleteThread(thread._id)}>Del</Button> */}
    </Wrapper>
  )
}

// styled
const Wrapper = styled.article`
  width: 100%;
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .left {
    display: flex;

    .author-avatar-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px;

      .avatar {
        height: 40px;
        width: 40px;
      }
    }

    .title-wrapper {
      display: flex;
      flex-direction: column;

      .title {
        font-size: 16px;
        color: black;
      }

      .creator {
        font-size: 12px;
        color: gray;
      }
    }
  }

  .right {
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .replies-wrapper {
      display: flex;
      flex-direction: column;
    }

    .last-reply-wrapper {
      width: 50%;
    }
  }
`
