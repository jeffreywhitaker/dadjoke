import axios, { AxiosPromise } from 'axios'
import { ThreadResponse, SingleCommentResponse } from '../types/types'

// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
let URI_STRING = ''
// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
if (process.env.NODE_ENV === 'production') {
  URI_STRING = 'https://jeffsdadjokes-node-be.herokuapp.com'
} else {
  URI_STRING = 'http://localhost:5000'
}

export default {
  createThread(topicObj: Record<string, any>): Promise<AxiosPromise> {
    return axios.post(`${URI_STRING}/api/mbthread/add`, topicObj, {
      withCredentials: true,
    })
  },

  getThreads(): Promise<{ data: Record<string, any>[] }> {
    return axios.get(`${URI_STRING}/api/mbthread`)
  },

  getThreadById(id: string): Promise<ThreadResponse> {
    return axios.get(`${URI_STRING}/api/mbthread/${id}`)
  },

  deleteThread(id: string): Promise<AxiosPromise> {
    return axios.delete(`${URI_STRING}/api/mbthread/${id}`)
  },

  postNewComment(threadId: string, text: string): Promise<AxiosPromise> {
    return axios.post(
      `${URI_STRING}/api/mbcomment`,
      { threadId, text },
      { withCredentials: true },
    )
  },

  updateMbComment(
    commentId: string,
    text: string,
  ): Promise<SingleCommentResponse> {
    return axios.put(
      `${URI_STRING}/api/mbcomment`,
      { commentId, text },
      { withCredentials: true },
    )
  },
}
