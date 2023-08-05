import { AxiosPromise } from 'axios'
import { ThreadResponse, SingleCommentResponse } from '../types/types'
import { client } from './axios'

export default {
  createThread(topicObj: Record<string, any>): Promise<AxiosPromise> {
    return client.post(`/api/mbthread/add`, topicObj, {
      withCredentials: true,
    })
  },

  getThreads(): Promise<{ data: Record<string, any>[] }> {
    return client.get(`/api/mbthread`)
  },

  getThreadById(id: string): Promise<ThreadResponse> {
    return client.get(`/api/mbthread/${id}`)
  },

  deleteThread(id: string): Promise<AxiosPromise> {
    return client.delete(`/api/mbthread/${id}`)
  },

  postNewComment(threadId: string, text: string): Promise<AxiosPromise> {
    return client.post(
      `/api/mbcomment`,
      { threadId, text },
      { withCredentials: true },
    )
  },

  updateMbComment(
    commentId: string,
    text: string,
  ): Promise<SingleCommentResponse> {
    return client.put(
      `/api/mbcomment`,
      { commentId, text },
      { withCredentials: true },
    )
  },
}
