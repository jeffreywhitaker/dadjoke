import { AxiosPromise } from 'axios'
import { client } from './axios'

export default {
  followUser(username: string): Promise<AxiosPromise> {
    return client.post(`/api/users/follow/${username}`, null, {
      withCredentials: true,
    })
  },

  unfollowUser(username: string): Promise<AxiosPromise> {
    return client.post(`/api/users/unfollow/${username}`, null, {
      withCredentials: true,
    })
  },
}
