import React from 'react'

// bootstrap
import Button from 'react-bootstrap/Button'

import styled from 'styled-components'

const Stats = (props) => {
  const {
    binary,
    handleDeleteAvatar,
    handleUploadAvatar,
    inputRef,
    isUserHaveAvatar,
    loggedInUsername,
    username,
  } = props

  return (
    <Wrapper>
      {/* AVATAR */}
      <div className="avatarWrapper">
        <h2 className="subTitle">Avatar</h2>

        <img
          className="avatar"
          src={!isUserHaveAvatar ? '/img/defaultAvatar.png' : binary}
        />
        {username === loggedInUsername && (
          <div>
            <Button
              size="sm"
              onClick={() => {
                if (
                  window.confirm(
                    'For best results, please upload an image 200 x 200 pixels or larger.',
                  )
                ) {
                  inputRef.current.click()
                }
              }}
            >
              Edit
            </Button>
            &nbsp;
            {isUserHaveAvatar && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this image? This action cannot be undone.',
                    )
                  ) {
                    handleDeleteAvatar()
                  }
                }}
              >
                Delete
              </Button>
            )}
            <input
              type="file"
              id="image"
              name="image"
              ref={inputRef}
              accept="image/*"
              onChange={handleUploadAvatar}
            />
          </div>
        )}
      </div>

      {/* STATS */}
      <div>
        <h2 className="subTitle">Statistics</h2>

        <canvas id="myChart" width="400" height="400" />
      </div>
    </Wrapper>
  )
}

export default Stats

const Wrapper = styled.article`
  width: 420px;
  background-color: lightblue;

  .avatarWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;

    .avatar {
      display: block;
      max-width: 200px;
      max-height: 200px;
      width: auto;
      height: auto;
      border-radius: 10px;
      margin-bottom: 10px;
    }

    input {
      align-self: flex-end;
      display: none;
    }
  }
`
