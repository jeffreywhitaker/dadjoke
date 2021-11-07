import React from 'react'

import styled from 'styled-components'

export default ({ comment }) => {
  return (
    <Wrapper>
      <div className="user-info">
        <div className="avatar-wrapper">
          <img
            className="img"
            src={
              comment.creator.image
                ? comment.creator.image
                : '/img/defaultAvatar.png'
            }
          />
        </div>
        <div className="text-wrapper">
          <span>{comment.creatorName}</span>
          <span>Join Date</span>
          <span>Threads</span>
          <span>Comments</span>
        </div>
      </div>
      <div className="content">
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
    width: 100px;
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
    }
  }

  .content {
  }
`
