// import dependencies
import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components'

import Card from 'react-bootstrap/Card'

import jokesData from '../ajax/jokesData'
import userData from '../ajax/userData'
import { AvatarResponse, Joke } from '../types/types'

import CommentModal from './modals/CommentModal'
import JokeCardHeader from './small/JokeCardHeader'
import JokeCardBody from './small/JokeCardBody'
import JokeCardFooter from './small/JokeCardFooter'

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

  // render the Joke Card
  return (
    <>
      <DivWrapper>
        <Card>
          {/* HEADER */}
          <JokeCardHeader
            isLoggedIn={isLoggedIn}
            joke={joke}
            voteOptions={voteOptions}
            updateJokeKarma={updateJokeKarma}
          />

          {/* BODY */}
          <JokeCardBody
            isBeingUpdated={isBeingUpdated}
            joke={joke}
            updatedJoke={updatedJoke}
            handleValueChange={handleValueChange}
            handleKeywordsChange={handleKeywordsChange}
          />

          {/* FOOTER */}
          <JokeCardFooter
            creatorAvatar={creatorAvatar}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            isBeingUpdated={isBeingUpdated}
            joke={joke}
            setShowModal={setShowModal}
            toggleUpdate={toggleUpdate}
            updateFollowJokeCreator={updateFollowJokeCreator}
            updatedJoke={updatedJoke}
            username={username}
          />
        </Card>
      </DivWrapper>

      {/* COMMENT MODAL */}
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

const DivWrapper = styled.article`
  margin: 10px;
`
