import axios, { AxiosPromise } from 'axios'
import { AvatarResponse } from '../types/types'

// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
let URI_STRING = ''
// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
if (process.env.NODE_ENV === 'production') {
  URI_STRING = 'https://jeffsdadjokes-node-be.herokuapp.com'
} else {
  URI_STRING = 'http://localhost:5000'
}

export default {

  getAvatar(username: string): Promise<AvatarResponse> {
    return axios.get(`${URI_STRING}/api/users/profile/avatar/${username}`, { withCredentials: true})
  },

  uploadAvatar(formData: FormData): Promise<AxiosPromise> {
    return axios.post(`${URI_STRING}/api/users/profile/avatar`, formData, { withCredentials: true, headers: {'content-type': 'multipart/form-data'}})
  },

  deleteAvatar(): Promise<AxiosPromise> {
    return axios.delete(`${URI_STRING}/api/users/profile/avatar`, { withCredentials: true})
  }
}
