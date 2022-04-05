import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import Button from 'react-bootstrap/esm/Button'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import FormControl from 'react-bootstrap/esm/FormControl'

import Modal from 'react-bootstrap/Modal'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import { MbComment } from '../../types/types'
import styled from 'styled-components'

function CommentCard(props: Props) {
  const { comment, handleUpdateMbComment, username, isThread } = props

  const [updateText, setUpdateText] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)

  function handleUpdate(id) {
    // TODO: needs to be different based on comment or thread
    console.log('is thread: ', isThread)
    if (isThread) {
      return
    }

    handleUpdateMbComment(id, updateText).then(() => {
      setUpdateText('')
      setIsUpdating(false)
    })
  }

  // handle change values, save to local state
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUpdateText(value)
    console.log('updated text', value)
  }

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
          {!isUpdating && <div>{comment.text}</div>}
          {isUpdating && (
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>Text</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Thread or Comment Update"
                  name="updateText"
                  value={updateText}
                  onChange={handleValueChange}
                />
              </InputGroup>
            </div>
          )}
        </div>

        <div className="controls">
          {comment.textHistory && comment.textHistory.length > 1 && (
            <Button
              size="sm"
              className="btn"
              variant="success"
              onClick={() => setShowHistoryModal(!showHistoryModal)}
            >
              Edit History
            </Button>
          )}

          {username === comment.creatorName && isUpdating && (
            <Button
              size="sm"
              className="btn"
              variant="success"
              onClick={() => handleUpdate(comment._id)}
            >
              Save
            </Button>
          )}

          {username === comment.creatorName && !isThread && (
            <Button
              size="sm"
              variant="warning"
              className="btn"
              onClick={function() {
                setUpdateText(comment.text)
                setIsUpdating(!isUpdating)
              }}
            >
              Toggle Update
            </Button>
          )}

          {/* TODO: build delete logic */}
          {/* <Button size="sm" variant="danger" className="btn">
              Delete
            </Button> */}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        show={showHistoryModal}
        onHide={() => setShowHistoryModal(!showHistoryModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Text History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comment.textHistory.map((entry) => {
            return (
              <EntryDiv key={entry._id} className="modal-div">
                <span className="modal-text">
                  {dayjs(entry.createdAt).format('MMM DD YY, hh:mm:ss a')}:
                </span>{' '}
                {entry.text}
              </EntryDiv>
            )
          })}
        </Modal.Body>
      </Modal>
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
  comment: MbComment
  isThread: boolean
  handleUpdateMbComment: (
    id: string | number,
    text: string,
  ) => Promise<MbComment>
}

export default connector(CommentCard)

// styled
const EntryDiv = styled.div`
  margin-bottom: 5px;

  .modal-text {
    color: gray;
    font-size: 12px;
  }
`

const Wrapper = styled.article`
  width: 100%;
  border: 1px solid black;
  margin: 10px 0;
  display: flex;

  .user-info {
    max-width: 150px;
    min-width: 80px;
    width: 20%;
    border-right: 1px solid black;
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

      .btn {
        margin: 0 5px;
      }
    }
  }
`
