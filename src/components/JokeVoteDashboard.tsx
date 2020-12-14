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
  voteOptions: {
    upvoteTooltip: string
    downvoteTooltip: string
  }
}

const JokeVoteDashboard: React.FC<Props> = (props) => {
  const { joke, voteOptions, updateJokeKarma } = props

  const handleJokeVote = (newVote: number) => {
    console.log('handleJokeVote newVote', newVote)
    const oldVote = parseInt(joke.userVote as string)
    jokesData.voteForJoke(joke._id as string, newVote.toString()).then(() => {
      console.log('voteForJoke called', joke.karma)
      if (joke.karma || joke.karma === 0) {
        const newKarma = joke.karma - oldVote + newVote
        console.log('new karma is')
        console.log(newKarma)
        updateJokeKarma(joke._id as string, newKarma, newVote)
      }
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
          <Button variant="success" onClick={() => handleJokeVote(0)}>
            <i className="fas fa-thumbs-up"></i>
          </Button>
        ) : (
          <Button variant="light" onClick={() => handleJokeVote(1)}>
            <i className="fas fa-thumbs-up"></i>
          </Button>
        )}
      </OverlayTrigger>
      &nbsp;
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
      &nbsp;
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
          <Button variant="danger" onClick={() => handleJokeVote(0)}>
            <i className="fas fa-thumbs-down"></i>
          </Button>
        ) : (
          <Button variant="light" onClick={() => handleJokeVote(-1)}>
            <i className="fas fa-thumbs-down"></i>
          </Button>
        )}
      </OverlayTrigger>
    </>
  )
}

export default JokeVoteDashboard