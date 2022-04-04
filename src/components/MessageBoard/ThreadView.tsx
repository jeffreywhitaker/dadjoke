import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import mbData from '../../ajax/mbData'
import { connect, ConnectedProps } from 'react-redux'
import Loading from '../Loading'
import { MbThread, MbComment } from '../../types/types'

import AddCommentCard from '../MessageBoard/AddCommentCard'
import Button from 'react-bootstrap/esm/Button'
import CommentCard from '../MessageBoard/CommentCard'
import styled from 'styled-components'

function ThreadView(props: Props) {
  const { isLoggedIn, username } = props

  const { threadId } = useParams<{ threadId: string }>()

  const [thread, setThread] = useState<MbThread>(null)

  function fetchThread() {
    mbData.getThreadById(threadId).then((res) => {
      setThread(res.data as MbThread)
    })
  }

  useEffect(() => {
    fetchThread()
  }, [])

  async function handleUpdateMbComment(
    id: string | number,
    text: string,
  ): Promise<MbComment> {
    return new Promise((resolve, reject) => {
      mbData
        .updateMbComment(id as string, text)
        .then((res) => {
          setThread({
            ...thread,
            comments: thread.comments.map((cmnt) => {
              if (cmnt._id === id) console.log('found a match', cmnt, id)
              if (cmnt._id !== id) return cmnt
              return res.data as MbComment
            }),
          })

          // thread.comments = thread.comments.map((cmnt) => {
          //   if (cmnt._id === id) console.log('found a match', cmnt, id)
          //   if (cmnt._id !== id) return cmnt
          //   return res.data
          // })
          return resolve(res.data as MbComment)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  function addNewComment(text) {
    mbData.postNewComment(thread._id, text).then(() => {
      fetchThread()
    })
  }

  function handleDeleteThread(id) {
    mbData
      .deleteThread(id)
      .then(() => alert('Deleted successfully'))
      .catch(() => alert('Unable to delete thread'))
  }

  if (!thread) return <Loading />

  return (
    <Wrapper>
      <div className="top-wrapper">
        <NavLink to="/mboard">
          <Button size="sm">Back</Button>
          {/* TODO: decide where i want the delete button - also update it */}
          {username === thread.creatorName && false && (
            <Button size="sm" onClick={() => handleDeleteThread(thread._id)}>
              Delete
            </Button>
          )}
        </NavLink>
        <h1>{thread.title}</h1>
        <div />
      </div>

      <CommentCard
        comment={thread}
        isThread={true}
        key={thread._id}
        handleUpdateMbComment={handleUpdateMbComment}
      />
      {thread.comments.map((comment) => (
        <CommentCard
          comment={comment}
          key={comment._id}
          isThread={false}
          handleUpdateMbComment={handleUpdateMbComment}
        />
      ))}
      {isLoggedIn && <AddCommentCard addNewComment={addNewComment} />}
    </Wrapper>
  )
}

// connect component to redux store
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    username: state.loginReducer.username,
  }
}

// export component
const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

export default connector(ThreadView)

// styled
const Wrapper = styled.section`
  margin: 20px;

  .top-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
