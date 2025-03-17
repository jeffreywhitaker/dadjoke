import { io } from 'socket.io-client'

const isProduction = process.env.NODE_ENV === 'production'
const URL = isProduction ? undefined : 'http://localhost:5000'

export const socket = io(URL, {
  autoConnect: false, // off so we can connect only when they visit the route
  path: '/chat-socket/',
  ackTimeout: 10000,
  // retries: 3,
  auth: { serverOffset: 0 },
})
