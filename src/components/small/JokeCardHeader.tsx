// import dependencies
import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import JokeVoteDashboard from '../JokeVoteDashboard'

import { Joke } from '../../types/types'
import '../../styles/styles.css'

type Props = {
  voteOptions: {
    upvoteTooltip: string
    downvoteTooltip: string
  }
  joke: Joke
  updateJokeKarma: (jokeId: string, newKarma: number, newVote: number) => void
  isLoggedIn: boolean
}

function JokeCardHeader(props: Props) {
  const { voteOptions, joke, updateJokeKarma, isLoggedIn } = props

  // return Card Header
  return (
    <Card.Header>
      <JokeVoteDashboard
        voteOptions={voteOptions}
        joke={joke}
        updateJokeKarma={updateJokeKarma}
        isLoggedIn={isLoggedIn}
      />
      {/* DATE */}
      <DetailsDiv className="floatRight">
        {/* SUBMISSION DATE */}
        <OverlayTrigger
          key={`${joke._id}_submit`}
          placement="top"
          overlay={
            <Tooltip id={`${joke._id}_submit`}>Joke Submission date</Tooltip>
          }
        >
          <span>{dayjs(joke.createdAt).format("MMM DD, 'YY")}</span>
        </OverlayTrigger>
        &nbsp;
        {/* LOCK ICON IF PRIVATE */}
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
        {/* GLOBE ICON IF PUBLIC */}
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
  )
}

export default JokeCardHeader

// styled components
const DetailsDiv = styled.div`
  display: flex;
  align-items: center;
`
