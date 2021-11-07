import React, { useEffect, useState } from 'react'
// import Card from 'react-bootstrap/esm/Card'
import Button from 'react-bootstrap/esm/Button'
import styled from 'styled-components'
import Header from './small/PageHeader'

import AddThreadModal from './modals/AddThreadModal'
import ThreadCard from '@/components/MessageBoard/ThreadCard'
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

  const handleAddNewThread = () => {
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
    <>
      <AddThreadModal
        showNewThreadModal={showNewThreadModal}
        setShowNewThreadModal={setShowNewThreadModal}
        setNewThread={setNewThread}
        newThread={newThread}
        handleAddNewTopic={handleAddNewThread}
      />

      <Wrapper>
        <Header text={'Message Board'} />
        <div class="topic-wrapper">
          {threads.map((thread) => {
            return (
              <ThreadCard
                thread={thread}
                handleDeleteThread={handleDeleteThread}
              />
            )
          })}
        </div>
        <Button onClick={() => setShowNewThreadModal(true)}>New Thread</Button>
      </Wrapper>
    </>
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
