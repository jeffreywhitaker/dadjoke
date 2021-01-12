import React from 'react'

// bootstrap
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default function AddJokeModal(props) {
  // destructure props
  const {
    callAddJoke,
    handleClose,
    handleKeywordsChange,
    handleValueChange,
    handleSetIsPrivate,
    newJoke,
    showAddJokeModal,
  } = props

  // return AddJokeModal
  return (
    <Modal show={showAddJokeModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Joke</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Q</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Add DadJoke Question"
            name="dadjokequestion"
            value={newJoke.dadjokequestion}
            onChange={handleValueChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>A</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Add DadJoke Answer"
            name="dadjokeanswer"
            value={newJoke.dadjokeanswer}
            onChange={handleValueChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>
              <span>Keywords</span> &nbsp;
              <OverlayTrigger
                key={`keywords`}
                placement="top"
                overlay={
                  <Tooltip id={`keywords`}>
                    Keywords should be a comma-seperated list of words
                  </Tooltip>
                }
              >
                <i className="fas fa-info-circle"></i>
              </OverlayTrigger>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Add DadJoke Answer"
            name="dadjokeanswer"
            onChange={handleKeywordsChange}
          />
        </InputGroup>

        <ButtonGroup toggle>
          <ToggleButton
            type="radio"
            name="radio"
            checked={!newJoke.isprivate}
            value={false}
            onClick={() => handleSetIsPrivate(false)}
          >
            Public
          </ToggleButton>
          <ToggleButton
            type="radio"
            checked={newJoke.isprivate}
            value={true}
            onClick={() => handleSetIsPrivate(true)}
          >
            Private
          </ToggleButton>
        </ButtonGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={callAddJoke}>
          Add Joke
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
