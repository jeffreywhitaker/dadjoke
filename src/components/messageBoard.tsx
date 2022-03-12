import React, { useEffect, useState } from 'react'
// import Card from 'react-bootstrap/esm/Card'
import Button from 'react-bootstrap/esm/Button'
import styled from 'styled-components'
import Header from './small/PageHeader'

import AddThreadModal from './modals/AddThreadModal'
import Loading from './Loading'
import ThreadCard from './MessageBoard/ThreadCard'
import mbData from '../ajax/mbData'

const MessageBoard = () => {
  const blankThreadObj = {
    title: '',
    text: '',
  }

  // state
  const [threads, setThreads] = useState([])
  const [isLoadingThreads, setIsLoadingThreads] = useState(false)
  const [showNewThreadModal, setShowNewThreadModal] = useState(false)
  const [newThread, setNewThread] = useState(blankThreadObj)

  function fetchThreads() {
    setIsLoadingThreads(true)
    mbData
      .getThreads()
      .then(({ data }) => setThreads(data))
      .catch(() => alert('Error fetching message board threads'))
      .finally(() => setIsLoadingThreads(false))
  }

  useEffect(() => {
    fetchThreads()
  }, [])

  function handleAddNewThread() {
    console.log('calling handleAddNewThread')
    if (newThread.title && newThread.text) {
      mbData.createThread(newThread).then((res) => {
        console.log('res is', res)
        setShowNewThreadModal(false)
        fetchThreads()
      })
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
        handleAddNewThread={handleAddNewThread}
      />

      <Wrapper>
        <Header text={'Message Board'} />
        <div className="thread-wrapper">
          {isLoadingThreads && <Loading />}
          {threads.map((thread) => {
            return (
              <ThreadCard
                key={thread._id}
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

  .thread-wrapper {
    margin: 10px 0;
    width: 900px;
    max-width: 100%;
    height: 400px;
  }
`
