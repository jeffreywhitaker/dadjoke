import React, { useEffect, useState } from 'react'
// import Card from 'react-bootstrap/esm/Card'
import Button from 'react-bootstrap/esm/Button'
import FormControl from 'react-bootstrap/esm/FormControl'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import Modal from 'react-bootstrap/esm/Modal'
import styled from 'styled-components'
import Header from './small/PageHeader'

import mbData from '../ajax/mbData'

const MessageBoard = (props) => {
  const blankThreadObj = {
    title: '',
    text: '',
  }

  // state
  const [threads, setThreads] = useState([])
  const [isLoadingTopics, setIsLoadingTopics] = useState(false)
  const [showNewThreadModal, setShowNewThreadModal] = useState(false)
  const [newThread, setNewThread] = useState(blankThreadObj)

  useEffect(() => {
    mbData
      .getThreads()
      .then(({ data }) => setThreads(data))
      .catch(() => alert('Error fetching message board threads'))
  }, [])

  const handleAddNewTopic = () => {
    if (newThread.title && newThread.text) {
      mbData.createThread(newThread).then((res) => console.log('res is', res))
    }
  }

  function handleDeleteThread(id) {
    mbData
      .deleteThread(id)
      .then(() => alert('Deleted successfully'))
      .catch(() => alert('Unable to delete thread'))
  }

  return (
    <Wrapper>
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

      <Header text={'Message Board'} />
      <div class="topic-wrapper">
        {threads.map((thread) => {
          return (
            <div>
              <span>
                {thread.title} {thread.text}
              </span>
              <Button onClick={() => handleDeleteThread(thread._id)}>
                Del
              </Button>
            </div>
          )
        })}
      </div>
      <Button onClick={() => setShowNewThreadModal(true)}>New Thread</Button>
    </Wrapper>
  )
}

export default MessageBoard

// styled components
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;

  .topic-wrapper {
    margin: 10px 0;
    width: 900px;
    height: 400px;
    /* background-color: blue; */
  }
`
