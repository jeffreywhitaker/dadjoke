import React from 'react'
import { MbComment } from '../../types/types'
import Button from 'react-bootstrap/esm/Button'
import styled from 'styled-components'

interface Props {
  comment: MbComment
  isUpdating: boolean
  isThread: boolean
  username: string
  showHistoryModal: boolean
  setShowHistoryModal: (bool: boolean) => void
  handleUpdate: (id: string) => void
  setUpdateText: (text: string) => void
  setIsUpdating: (isUpdating: boolean) => void
}

export default function(props: Props) {
  const {
    comment,
    setShowHistoryModal,
    setUpdateText,
    setIsUpdating,
    showHistoryModal,
    handleUpdate,
    isThread,
    username,
    isUpdating,
  } = props

  return (
    <Wrapper>
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
    </Wrapper>
  )
}

//styled

const Wrapper = styled.div`
  max-height: min-content;
  flex: 0 0 auto;
  margin: 5px;
  display: flex;
  justify-content: flex-end;

  .btn {
    margin: 0 5px;
  }
`
