import React from 'react'
import { NavLink } from 'react-router-dom'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import styled from 'styled-components'

export default ({ comment }) => {
  return (
    <Wrapper>
      <div className="user-info">
        <NavLink
          to={`/profile/${comment.creatorName}`}
          className="avatar-wrapper"
        >
          <img
            className="img"
            src={
              comment.creator.image
                ? comment.creator.image
                : '/img/defaultAvatar.png'
            }
          />
        </NavLink>
        <div className="text-wrapper">
          <NavLink to={`/profile/${comment.creatorName}`} className="name-text">
            {comment.creatorName}
          </NavLink>
          <span className="small-text">
            Joined: {dayjs(comment.creator.createdAt).format('DD.MM.YY')}
          </span>
          <span className="small-text">
            Threads: {comment.creator.mbThreadCount}
          </span>
          <span className="small-text">
            Comments: {comment.creator.mbCommentCount}
          </span>
        </div>
      </div>
      <div className="content">
        <div className="date-text">{dayjs(comment.createdAt).fromNow()}</div>
        <div>{comment.text}</div>
      </div>
    </Wrapper>
  )
}

// styled
const Wrapper = styled.article`
  width: 100%;
  border: 1px solid black;
  margin: 10px 0;
  display: flex;

  .user-info {
    max-width: 150px;
    width: 20%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar-wrapper {
      margin: 10px;

      .img {
        height: 70px;
        width: 70px;
      }
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;

      .name-text {
        font-size: 16px;
        font-weight: 600;
        color: black;
      }

      .small-text {
        font-size: 12px;
        color: gray;
      }
    }
  }

  .content {
    padding: 10px;

    .date-text {
      font-size: 12px;
    }
  }
`
