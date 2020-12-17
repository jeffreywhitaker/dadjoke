import axios, { AxiosPromise } from 'axios'

// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
const URI_STRING = process.env.PROD_URL || 'http://localhost:5000'

export default {

  getProfileStats(username: string): Promise<AxiosPromise> {
    return axios.get(`${URI_STRING}/api/users/profile/${username}`, { withCredentials: true})
  }
}
