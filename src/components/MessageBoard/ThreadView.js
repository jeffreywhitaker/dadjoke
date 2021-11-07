import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import mbData from '../../ajax/mbData'

export default () => {
  // sdf
  const { threadId } = useParams()

  const [thread, setThread] = useState(null)

  useEffect(() => {
    mbData.getThreadById(threadId).then(({ data }) => {
      setThread(data)
    })
  }, [])

  return (
    <>
      {!thread ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Hello world</div>
          <div>
            {thread.title} {thread.text}
          </div>
        </>
      )}
    </>
  )
}
