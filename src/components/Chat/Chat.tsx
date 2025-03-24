import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { socket } from '../../socket'
import styled from 'styled-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useLocation } from 'react-router-dom'
dayjs.extend(relativeTime)

//bootstrap
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { RootState } from '../../reducers/rootReducer'

type Message = {
  text: string
  creator?: string
  timestamp: number
}

const Chat = () => {
  const isLoggedIn = useSelector((s: RootState) => s.loginReducer.isLoggedIn)
  const username = useSelector((s: RootState) => s.loginReducer.username)

  const location = useLocation()

  // state
  const [userCount, setUserCount] = useState(0)
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<Message>({
    text: '',
    creator: username || 'Guest',
    timestamp: Date.now(),
  })

  useEffect(() => {
    socket.connect()
    socket.emit('get user count')
  }, [])

  // effects
  useEffect(() => {
    const onConnect = () => setIsConnected(true)
    const onUserCount = (num: number) => {
      console.log('user count updated: ', num)
      setUserCount(num)
    }
    const onDisconnect = () => setIsConnected(false)
    const onMessage = (message: Message, serverOffset: number) => {
      console.log('chat received on front end')
      setMessages((previous) => [...previous, message])
      // socket.auth.serverOffset = serverOffset
    }
    const onUserJoin = () => {
      console.log('user joined')
      setMessages((previous) => [
        ...previous,
        { text: 'User joined', timestamp: Date.now(), creator: 'System' },
      ])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('chat message', onMessage)
    socket.on('user join', onUserJoin)
    socket.on('user count', onUserCount)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('chat message', onMessage)
      socket.off('user join', onUserJoin)
      socket.off('user count', onUserCount)
      // socket.disconnect()
    }
  }, [])

  // useEffect(() => {
  //   console.log('disconnecting socket')
  //   socket.disconnect()
  // }, [location])

  useEffect(() => {
    if (isLoggedIn) setNewMessage({ ...newMessage, creator: username })
  }, [isLoggedIn])

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setNewMessage({ ...newMessage, text: value })
    // console.log('setting val: ', e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    console.log('handle submit called')
    if (newMessage.text.length <= 0) return
    setNewMessage((msg) => ({ ...msg, timestamp: Date.now() }))
    setMessages([...messages, newMessage])
    console.log('messages before emit:', messages)
    console.log('new message before emit: ', newMessage)
    socket.emit('chat message', newMessage)
    setNewMessage({
      text: '',
      creator: username || 'Guest',
      timestamp: Date.now(),
    })
  }

  function handleDisconnect(e) {
    e.preventDefault()
    socket.disconnect()
  }

  // useEffect(() => {
  //   socket.on('user join', (message) => {
  //     setMessages([
  //       ...messages,
  //       { text: 'User joined', timestamp: Date.now(), creator: 'System' },
  //     ])
  //   })

  //   return () => socket.off('user join')
  // }, [])

  function dateFormat(timestamp: number) {
    return `(${dayjs(timestamp).fromNow()})`
  }

  return (
    <Wrapper>
      <p>
        You are connected: {isConnected.toString()} .. Users connected:{' '}
        {userCount}{' '}
        <Button variant="secondary" size="sm" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </p>
      {messages.map((msg, i) => (
        <p className="message" key={msg.text + i}>
          <span className="creator">{msg.creator}</span>{' '}
          <span className="timestamp">{dateFormat(msg.timestamp)}</span>:{' '}
          <span className="text">{msg.text}</span>
        </p>
      ))}

      <div className="spacer"></div>

      <Form id="form" className="controls" onSubmit={handleSubmit}>
        <FormControl
          name="message"
          value={newMessage.text}
          onChange={handleValueChange}
        />
        <Button variant="primary" onClick={handleSubmit}>
          Post
        </Button>
      </Form>
    </Wrapper>
  )
}

export default Chat

// styled components
const Wrapper = styled.section`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  margin: 20px 0;

  .message {
    font-size: 16px;

    .creator,
    .timestamp {
      font-size: 14px;
    }
  }

  .controls {
    display: flex;
  }

  .spacer {
    flex-grow: 2;
  }
`
