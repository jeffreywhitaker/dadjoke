import axios, { AxiosPromise } from 'axios'

// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
const URI_STRING = 'http://localhost:5000'

export default {
  getOwnStats(): Promise<AxiosPromise> {
    return axios.get(`${URI_STRING}/api/users/profile`, { withCredentials: true})
  },

  getOtherUserStats(username: string): Promise<AxiosPromise> {
    return axios.get(`${URI_STRING}/api/users/profile/${username}`, { withCredentials: true})
  }
}
