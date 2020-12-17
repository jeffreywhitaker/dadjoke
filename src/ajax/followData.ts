import axios, { AxiosPromise } from 'axios'

// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
const URI_STRING = process.env.PROD_URL || 'http://localhost:5000'

export default {
  followUser(username: string): Promise<AxiosPromise> {
    return axios.post(`${URI_STRING}/api/users/follow/${username}`, null, { withCredentials: true })
  },

  unfollowUser(username: string): Promise<AxiosPromise> {
    return axios.post(`${URI_STRING}/api/users/unfollow/${username}`, null, { withCredentials: true })
  }


}
