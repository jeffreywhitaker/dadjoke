import React from 'react'
import { useHistory } from 'react-router-dom'

// bootstrap
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'

export default function(props) {
  // history
  const history = useHistory()

  // destructure props
  const {
    handleClose,
    handleDemo,
    handleDoNotShowAgain,
    isLoggedIn,
    setShowModal,
    showModal,
  } = props

  // return modal
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to JeffsDadJokes!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          {!isLoggedIn ? (
            <>
              <p>
                Here you can add, update, and browse dad jokes. You can upvote
                your favorites - and downvotes those you don't find as funny.
              </p>
              <p>
                You can even follow other users and view your joke stats on your
                profile!
              </p>
              <p>
                Please feel free to click the 'demo' button below to log in to a
                test account and check out all the features!
              </p>
              <div>
                <Button
                  onClick={() => {
                    setShowModal(false)
                    history.push('/login')
                  }}
                >
                  Login
                </Button>
                &nbsp;
                <Button
                  onClick={() => {
                    setShowModal(false)
                    history.push('/signup')
                  }}
                >
                  Signup
                </Button>
                &nbsp;
                <Button variant="success" onClick={handleDemo}>
                  Demo
                </Button>
              </div>
            </>
          ) : (
            <p>You are currently logged in - thanks for visiting!</p>
          )}
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDoNotShowAgain}>
          Close and Do Not Show Again
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
