// import dependencies
import React from 'react'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import followData from '../../ajax/followData'
import { Joke } from '../../types/types'

import '../../styles/styles.css'

type Props = {
  creatorAvatar: string
  handleUpdate: (updatedJoke: Joke) => void
  handleDelete: (id: string) => void
  isBeingUpdated: boolean
  joke: Joke
  setShowModal: (value: boolean) => void
  toggleUpdate: () => void
  updateFollowJokeCreator: (username: string, isFollowing: boolean) => void
  updatedJoke: Joke
  username?: string
}

function JokeCardFooter(props: Props) {
  const {
    joke,
    isBeingUpdated,
    setShowModal,
    toggleUpdate,
    handleUpdate,
    creatorAvatar,
    username,
    updateFollowJokeCreator,
    handleDelete,
    updatedJoke,
  } = props

  return (
    <Card.Footer>
      {/* COMMENT BUTTON */}
      <OverlayTrigger
        key={`${joke._id}_comment_link`}
        placement="top"
        overlay={
          <Tooltip id={`${joke._id}_comment_link`}>
            {`See comments for this joke`}
          </Tooltip>
        }
      >
        <Button size="sm" onClick={() => setShowModal(true)}>
          <i className="fas fa-comment-dots iconSize"></i>
        </Button>
      </OverlayTrigger>
      {/* KEYWORDS */}
      <OverlayTrigger
        key={`${joke.dadjokequestion}_keywords`}
        placement="top"
        overlay={
          <Tooltip id={`${joke.dadjokequestion}_keywords`}>
            {`Keywords: ${
              joke.keywords && joke.keywords.length >= 1
                ? joke.keywords.join(', ')
                : '[None]'
            }`}
          </Tooltip>
        }
      >
        <i className="fas fa-key"></i>
      </OverlayTrigger>
      &nbsp;&nbsp;
      {/* UPDATE BUTTON */}
      {!isBeingUpdated && joke.username === username && (
        <Button variant="primary" onClick={() => toggleUpdate()}>
          Edit
        </Button>
      )}
      {isBeingUpdated && (
        <>
          <Button variant="primary" onClick={() => handleUpdate(updatedJoke)}>
            Accept Changes
          </Button>
          &nbsp;
          <Button variant="warning" onClick={() => toggleUpdate()}>
            Cancel Edit
          </Button>
        </>
      )}
      &nbsp;
      {/* DELETE BUTTON */}
      {joke.username === username && (
        <Button
          variant="danger"
          onClick={() => handleDelete(joke._id as string)}
        >
          Del
        </Button>
      )}
      {/* FLOAT RIGHT IN FOOTER */}
      {window.location.pathname !== '/privatejokes' && (
        <span className="floatRight">
          {/* SUBMITTED BY */}
          &nbsp; submitted by: {/* CREATOR AVATAR LINK */}
          <OverlayTrigger
            key={`${joke.username}_link`}
            placement="top"
            overlay={
              <Tooltip id={`${joke.username}_avatarlink_onJoke_${joke._id}`}>
                {`Visit ${joke.username}'s profile`}
              </Tooltip>
            }
          >
            <Link to={`/profile/${joke.username}`}>
              <img
                className="creatorAvatarImg"
                src={
                  creatorAvatar === ''
                    ? '/img/defaultAvatar.png'
                    : creatorAvatar
                }
              />
            </Link>
          </OverlayTrigger>
          &nbsp;
          {/* CREATOR NAME LINK */}
          <OverlayTrigger
            key={`${joke.username}_textlink_onJoke_${joke._id}`}
            placement="top"
            overlay={
              <Tooltip id={`${joke.username}_link`}>
                {`Visit ${joke.username}'s profile`}
              </Tooltip>
            }
          >
            <Link to={`/profile/${joke.username}`}>{joke.username}</Link>
          </OverlayTrigger>
          &nbsp;&nbsp;
          {/* FOLLOW USER BUTTON */}
          {joke.userFollowingCreator ? (
            <OverlayTrigger
              key={`${joke.username}_follow`}
              placement="top"
              overlay={
                <Tooltip id={`${joke.username}_follow`}>
                  {`You are following ${joke.username} - click to unfollow`}
                </Tooltip>
              }
            >
              <Button
                size="sm"
                variant="success"
                onClick={() =>
                  followData
                    .unfollowUser((joke.username as unknown) as string)
                    .then(() => {
                      updateFollowJokeCreator(
                        (joke.username as unknown) as string,
                        false,
                      )
                    })
                    .catch((err) => {
                      window.alert(
                        'There was an error following this user: ' + err,
                      )
                    })
                }
              >
                <i className="fas fa-user-friends"></i>
              </Button>
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              key={`${joke.username}_follow`}
              placement="top"
              overlay={
                <Tooltip id={`${joke.username}_follow`}>
                  {!username ? (
                    <span>{`You must be logged in to follow someone`}</span>
                  ) : joke.username === username ? (
                    <span>{`You can't follow yourself`}</span>
                  ) : (
                    <span>{`Click to follow ${joke.username}`}</span>
                  )}
                </Tooltip>
              }
            >
              <Button
                size="sm"
                variant="secondary"
                disabled={!username || joke.username === username}
                onClick={() =>
                  followData
                    .followUser((joke.username as unknown) as string)
                    .then(() => {
                      updateFollowJokeCreator(
                        (joke.username as unknown) as string,
                        true,
                      )
                    })
                    .catch((err) => {
                      window.alert(
                        'There was an error following this user: ' + err,
                      )
                    })
                }
              >
                <i className="fas fa-user-friends"></i>
              </Button>
            </OverlayTrigger>
          )}
        </span>
      )}
    </Card.Footer>
  )
}

export default JokeCardFooter
