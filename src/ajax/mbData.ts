import axios, { AxiosPromise } from 'axios'

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

  getThreads(): Promise<AxiosPromise> {
    return axios.get(`${URI_STRING}/api/mbthread`)
  },

  deleteThread(id: string): Promise<AxiosPromise> {
    return axios.delete(`${URI_STRING}/api/mbthread/${id}`)
  },
}
