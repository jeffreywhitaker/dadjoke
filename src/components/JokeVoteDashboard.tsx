import React from 'react'

// bootstrap
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import jokesData from '../ajax/jokesData'

import { Joke } from '../types/types'

interface Props {
  updateJokeKarma: (jokeId: string, newKarma: number, newVote: number) => void
  joke: Joke
  isLoggedIn: boolean
  voteOptions: {
    upvoteTooltip: string
    downvoteTooltip: string
  }
}

const JokeVoteDashboard: React.FC<Props> = (props) => {
  const { isLoggedIn, joke, voteOptions, updateJokeKarma } = props

  const handleJokeVote = (newVote: number) => {
    console.log('handleJokeVote newVote', newVote)
    const oldVote = parseInt(joke.userVote as string)
    jokesData
      .voteForJoke(joke._id as string, newVote.toString())
      .then(() => {
        console.log('voteForJoke called', joke.karma)
        if (joke.karma || joke.karma === 0) {
          const newKarma = joke.karma - oldVote + newVote
          console.log('new karma is')
          console.log(newKarma)
          updateJokeKarma(joke._id as string, newKarma, newVote)
        }
      })
      .catch((err) => {
        window.alert(
          `There was an error trying to vote, please try again later: ${err}`,
        )
      })
  }

  return (
    <>
      <OverlayTrigger
        key={`${joke._id}_upvote`}
        placement="top"
        overlay={
          <Tooltip id={`tooltip-upvote`}>{voteOptions.upvoteTooltip}</Tooltip>
        }
      >
        {joke.userVote === '1' ? (
          <Button
            size="sm"
            variant="success"
            disabled={!isLoggedIn}
            onClick={() => handleJokeVote(0)}
          >
            <i className="fas fa-thumbs-up"></i>
          </Button>
        ) : (
          <Button
            size="sm"
            variant="light"
            disabled={!isLoggedIn}
            onClick={() => handleJokeVote(1)}
          >
            <i className="fas fa-thumbs-up"></i>
          </Button>
        )}
      </OverlayTrigger>
      &nbsp;&nbsp;
      <OverlayTrigger
        key={`${joke._id}_karma`}
        placement="top"
        overlay={
          <Tooltip id={`tooltip-karma`}>
            This is the vote's karma - that is, total upvotes minus total
            downvotes
          </Tooltip>
        }
      >
        <span>{joke.karma}</span>
      </OverlayTrigger>
      &nbsp;&nbsp;
      <OverlayTrigger
        key={`${joke._id}_downvote`}
        placement="top"
        overlay={
          <Tooltip id={`tooltip-downvote`}>
            {voteOptions.downvoteTooltip}
          </Tooltip>
        }
      >
        {joke.userVote === '-1' ? (
          <Button
            size="sm"
            variant="danger"
            disabled={!isLoggedIn}
            onClick={() => handleJokeVote(0)}
          >
            <i className="fas fa-thumbs-down"></i>
          </Button>
        ) : (
          <Button
            size="sm"
            variant="light"
            disabled={!isLoggedIn}
            onClick={() => handleJokeVote(-1)}
          >
            <i className="fas fa-thumbs-down"></i>
          </Button>
        )}
      </OverlayTrigger>
    </>
  )
}

export default JokeVoteDashboard
