import { AxiosPromise } from 'axios'
import { AvatarResponse } from '../types/types'
import { client as axios } from './axios'

export default {
  getAvatar(username: string): Promise<AvatarResponse> {
    return axios.get(`/api/users/profile/avatar/${username}`, {
      withCredentials: true,
    })
  },
  getProfileStats(username: string) {
    return axios.get<ProfileStatsRes>(`/api/users/profile/${username}`, {
      withCredentials: true,
    })
  },
  updateUserDescription(newDescription: string): Promise<AxiosPromise> {
    return axios.put(
      `/api/users/profile/description`,
      { newDescription },
      { withCredentials: true },
    )
  },
  uploadAvatar(formData: FormData): Promise<AxiosPromise> {
    return axios.post(`/api/users/profile/avatar`, formData, {
      withCredentials: true,
      headers: { 'content-type': 'multipart/form-data' },
    })
  },
}

interface ProfileStatsRes {
  publicJokesCount: number
  privateJokesCount: number
  upvoteCount: number
  downvoteCount: number
  accountCreationDate: string
  username: string
  followingUsers: string[]
  followedByUsers: string[]
  description: string
}
