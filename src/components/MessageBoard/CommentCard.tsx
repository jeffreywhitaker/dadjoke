import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import Button from 'react-bootstrap/esm/Button'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import styled from 'styled-components'

function CommentCard(props: Props) {
  const { comment, username } = props

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
      <div className="main">
        <div className="content">
          <div className="date-text">{dayjs(comment.createdAt).fromNow()}</div>
          <div>{comment.text}</div>
        </div>
        {username === comment.creatorName && (
          <div className="controls">
            <Button size="sm" variant="danger">
              Delete
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.username,
  }
}

// export component
const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  comment: Record<string, any>
}

export default connector(CommentCard)

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

  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    .content {
      padding: 10px;
      height: 100%;

      .date-text {
        font-size: 12px;
      }
    }

    .controls {
      max-height: min-content;
      flex: 0 0 auto;
      margin: 5px;
      display: flex;
      justify-content: flex-end;
    }
  }
`
