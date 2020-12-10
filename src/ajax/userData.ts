import axios, { AxiosPromise } from 'axios'

// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
const URI_STRING = 'http://localhost:5000'

export default {
  getStats(): Promise<AxiosPromise> {
    return axios.get(`${URI_STRING}/stats`, { withCredentials: true})
  },
}
