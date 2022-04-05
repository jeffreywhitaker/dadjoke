import React from 'react'
import Modal from 'react-bootstrap/Modal'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { MbComment } from '../../types/types'

interface Props {
  showHistoryModal: boolean
  setShowHistoryModal: (showHistoryModal: boolean) => void
  comment: MbComment
}

const CardHistoryModal = function(props: Props) {
  const { showHistoryModal, setShowHistoryModal, comment } = props
  return (
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
  )
}

export default CardHistoryModal

// styled
const EntryDiv = styled.div`
  margin-bottom: 5px;

  .modal-text {
    color: gray;
    font-size: 12px;
  }
`
