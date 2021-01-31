// import dependencies
import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import styled from 'styled-components'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import jokesData from '../ajax/jokesData'
import followData from '../ajax/followData'
import userData from '../ajax/userData'
import { AvatarResponse, Joke } from '../types/types'

import CommentModal from './modals/CommentModal'
import JokeVoteDashboard from './JokeVoteDashboard'

import '../styles/styles.css'
import { AxiosPromise } from 'axios'

// joke card component
function SingleJokeCard(props: Props) {
  // destructure props
  const {
    joke,
    username,
    updateFollowJokeCreator,
    updateJokeDetails,
    updateJokeKarma,
    isLoggedIn,
    removeDeletedJoke,
  } = props

  console.log('username:', username)

  // empty joke object
  const emptyJoke: Joke = {
    _id: '',
    dadjokequestion: '',
    dadjokeanswer: '',
    isprivate: false,
    username: '',
  }

  // modal stuff
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => {
    setShowModal(false)
  }

  // set local update state
  const [isBeingUpdated, setIsBeingUpdated] = useState(false)
  const [updatedJoke, setUpdatedJoke] = useState(emptyJoke)

  // methods for displaying user image
  const [creatorAvatar, setCreatorAvatar] = useState('')
  useEffect(() => {
    if (joke.username) {
      userData
        .getAvatar(joke.username as string)
        .then((res: AvatarResponse) => {
          console.log('get avatar res is: ', res)
          const base64Flag = 'data:image/jpeg;base64,'
          const imageStr = arrayBufferToBase64(res.data.data.data)
          setCreatorAvatar(base64Flag + imageStr)
        })
        .catch((error) =>
          console.log('unable to fetch joke creator avatar', error),
        )
    }
  }, [joke])

  // TODO: this is copy/pasted and used twice - import from helper functions
  function arrayBufferToBase64(buffer: Buffer) {
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach((b) => (binary += String.fromCharCode(b)))
    console.log('window.btoa is: ', window.btoa(binary))
    return window.btoa(binary)
  }

  // helper functions
  function handleDelete(id: string) {
    console.log('id in handleDelete is: ', id)
    if (window.confirm('Are you sure you want to delete this joke?')) {
      // new version
      jokesData
        .deleteJoke(id)
        .then(() => {
          // delete joke by id
          removeDeletedJoke(id)
        })
        .catch((err) => {
          window.alert(
            'There was an error deleting this joke. Please try again: ' + err,
          )
        })
    }
  }

  function handleUpdate(updatedJoke: Joke) {
    jokesData
      .updateJoke(updatedJoke, joke._id as string)
      .then((res) => {
        console.log('update joke res', res)
        // get function from parent to update joke in array
        toggleUpdate()
        updateJokeDetails(joke._id as string, res)
      })
      .catch((err) => {
        window.alert(
          'There was an error updating your joke, please try again later: ' +
            err,
        )
      })
  }

  function toggleUpdate() {
    console.log('toggleUpdate:', isBeingUpdated)
    if (isBeingUpdated) {
      // set update to false and empty the updated Joke state
      setIsBeingUpdated(false)
      setUpdatedJoke(emptyJoke)
    } else {
      // set update to true and update the local state
      setIsBeingUpdated(true)
      setUpdatedJoke({
        _id: joke._id,
        dadjokequestion: joke.dadjokequestion,
        dadjokeanswer: joke.dadjokeanswer,
        isprivate: joke.isprivate,
        username: joke.username,
      })
    }
  }

  // handle change values, save to local state
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      (e.target as HTMLInputElement).type === 'checkbox'
        ? e.target.checked
        : e.target.value
    setUpdatedJoke({
      ...updatedJoke,
      [e.target.name]: value,
    })
    console.log('updated joke', updatedJoke)
  }

  // handle changing the keywords
  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stringOfKeywords = e.currentTarget.value
    setUpdatedJoke({
      ...updatedJoke,
      keywords: stringOfKeywords
        .trim()
        .replace(/\s/g, '')
        .split(','),
    })
  }

  useEffect(() => {
    console.log('updated joke changed: ', updatedJoke)
  }, [updatedJoke])

  const voteOptions = {
    upvoteTooltip: '',
    downvoteTooltip: '',
  }
  if (joke.userVote === '1') {
    voteOptions.upvoteTooltip =
      'You have upvoted this joke -- click again to rescind your vote'
    voteOptions.downvoteTooltip = 'Downvote this joke'
  } else if (joke.userVote === '-1') {
    voteOptions.upvoteTooltip = 'Upvote this joke'
    voteOptions.downvoteTooltip =
      'You have downvoted this joke -- click again to rescind your vote'
  } else {
    voteOptions.upvoteTooltip = 'Upvote this joke'
    voteOptions.downvoteTooltip = 'Downvote this joke'
  }

  if (!isLoggedIn) {
    voteOptions.upvoteTooltip = 'You must be logged in to upvote a joke'
    voteOptions.downvoteTooltip = 'You must be logged in to downvote a joke'
  }

  // render the following
  return (
    <>
      <DivWrapper>
        <Card>
          <Card.Header>
            <JokeVoteDashboard
              voteOptions={voteOptions}
              joke={joke}
              updateJokeKarma={updateJokeKarma}
              isLoggedIn={isLoggedIn}
            />
            {/* DATE */}
            <DetailsDiv className="floatRight">
              <OverlayTrigger
                key={`${joke._id}_submit`}
                placement="top"
                overlay={
                  <Tooltip id={`${joke._id}_submit`}>
                    Joke Submission date
                  </Tooltip>
                }
              >
                <span>{dayjs(joke.createdAt).format("MMM DD, 'YY")}</span>
              </OverlayTrigger>
              &nbsp;
              {/* GLOBE OR LOCK ICON */}
              {joke.isprivate && (
                <OverlayTrigger
                  key={`${joke._id}_lock`}
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-lock`}>
                      Joke is <strong>Private</strong>
                    </Tooltip>
                  }
                >
                  <i className="fas fa-lock floatRight"></i>
                </OverlayTrigger>
              )}
              {!joke.isprivate && (
                <OverlayTrigger
                  key={`${joke._id}_globe`}
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-globe`}>
                      Joke is <strong>Public</strong>
                    </Tooltip>
                  }
                >
                  <i className="fas fa-globe floatRight"></i>
                </OverlayTrigger>
              )}
            </DetailsDiv>
          </Card.Header>
          <Card.Body>
            {/* QUESTION DISPLAY */}
            <Card.Title>
              {!isBeingUpdated && <span>Q: {joke.dadjokequestion}</span>}
              {isBeingUpdated && (
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Q</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="DadJoke Question Update"
                    name="dadjokequestion"
                    value={updatedJoke.dadjokequestion}
                    onChange={handleValueChange}
                  />
                </InputGroup>
              )}
            </Card.Title>
            {/* ANSWER DISPLAY */}
            <Card.Text>
              {!isBeingUpdated && <span>A: {joke.dadjokeanswer}</span>}
              {isBeingUpdated && (
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>A</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="DadJoke Answer Update"
                    name="dadjokeanswer"
                    value={updatedJoke.dadjokeanswer}
                    onChange={handleValueChange}
                  />
                </InputGroup>
              )}
            </Card.Text>
            {/* KEYWORDS DISPLAY */}
            <Card.Text>
              {/* {!isBeingUpdated && (
              <span>
                Keywords: {joke.keywords ? joke.keywords.join(', ') : '[None'}
              </span>
            )} */}
              {isBeingUpdated && (
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Keywords</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="DadJoke Answer Update"
                    name="dadjokeanswer"
                    defaultValue={joke.keywords ? joke.keywords.join(', ') : ''}
                    onChange={handleKeywordsChange}
                  />
                </InputGroup>
              )}
            </Card.Text>
            {/* ERROR DISPLAY */}
            {joke.error && <Alert variant="danger">{joke.error}</Alert>}
          </Card.Body>
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
            &nbsp;&nbsp;
            {/* UPDATE BUTTON */}
            {!isBeingUpdated && joke.username === username && (
              <Button variant="primary" onClick={() => toggleUpdate()}>
                Edit
              </Button>
            )}
            {isBeingUpdated && (
              <>
                <Button
                  variant="primary"
                  onClick={() => handleUpdate(updatedJoke)}
                >
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
                {/* SUBMITTED BY */}
                &nbsp; submitted by:{' '}
                <img
                  className="creatorAvatarImg"
                  src={
                    creatorAvatar === ''
                      ? '/img/defaultAvatar.png'
                      : creatorAvatar
                  }
                />
                &nbsp;
                <OverlayTrigger
                  key={`${joke.username}_link`}
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
        </Card>
      </DivWrapper>
      <CommentModal
        showModal={showModal}
        handleClose={handleClose}
        jokeID={joke._id as string}
        isLoggedIn={isLoggedIn}
      />
    </>
  )
}

const mapStateToProps = (state: { loginReducer: { isLoggedIn: boolean } }) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  }
}

// export component
const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  joke: Joke
  username?: string
  updateJokeKarma: (jokeId: string, newKarma: number, newVote: number) => void
  updateJokeDetails: (jokeId: string, res: AxiosPromise) => void
  updateFollowJokeCreator: (username: string, isFollowing: boolean) => void
  removeDeletedJoke: (id: string) => void
}

export default connector(SingleJokeCard)

// styled components
const DetailsDiv = styled.div`
  display: flex;
  align-items: center;
`

const DivWrapper = styled.div`
  margin: 10px;

  .creatorAvatarImg {
    height: 25px;
    width: 25px;
    border-radius: 5px;
  }
`
