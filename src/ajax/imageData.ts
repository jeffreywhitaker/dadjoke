import { AxiosPromise } from 'axios'
import { client } from './axios'
import type { AvatarResponse } from '../types/types'

export default {
  getAvatar(username: string): Promise<AvatarResponse> {
    return client.get(`/api/users/profile/avatar/${username}`, {
      withCredentials: true,
    })
  },

  uploadAvatar(formData: FormData): Promise<AxiosPromise> {
    return client.post(`/api/users/profile/avatar`, formData, {
      withCredentials: true,
      headers: { 'content-type': 'multipart/form-data' },
    })
  },

  deleteAvatar(): Promise<AxiosPromise> {
    return client.delete(`/api/users/profile/avatar`, { withCredentials: true })
  },
}
