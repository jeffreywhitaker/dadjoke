import axios, { AxiosPromise } from 'axios'

// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
let URI_STRING = ''
// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
if (process.env.NODE_ENV === 'production') {
  URI_STRING = 'https://jeffsdadjokes-node-be.herokuapp.com/'
} else {
  URI_STRING = 'http://localhost:5000'
}

export default {

  getProfileStats(username: string): Promise<AxiosPromise> {
    return axios.get(`${URI_STRING}/api/users/profile/${username}`, { withCredentials: true})
  }
}
