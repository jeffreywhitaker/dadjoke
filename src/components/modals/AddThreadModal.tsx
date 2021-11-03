import React from 'react'

import Button from 'react-bootstrap/esm/Button'
import FormControl from 'react-bootstrap/esm/FormControl'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import Modal from 'react-bootstrap/esm/Modal'

export default (props) => {
  const {
    showNewThreadModal,
    setShowNewThreadModal,
    setNewThread,
    newThread,
    handleAddNewTopic,
  } = props

  return (
    <Modal
      show={showNewThreadModal}
      onHide={() => setShowNewThreadModal(false)}
    >
      <Modal.Header>
        <Modal.Title>New Thread</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Title</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={newThread.title}
            onChange={(e) =>
              setNewThread({ ...newThread, title: e.target.value })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Text</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            value={newThread.text}
            onChange={(e) =>
              setNewThread({ ...newThread, text: e.target.value })
            }
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddNewTopic}>
          Add Joke
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
