import axios, { AxiosPromise } from 'axios'
import { Joke } from '../types/types'

// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
const URI_STRING = 'http://localhost:5000'

export default {
  addNewJoke(jokeToAdd: Joke): Promise<AxiosPromise> {
    return axios.post(`${URI_STRING}/dadjokes/add`, jokeToAdd, { withCredentials: true})
  },

  deleteJoke(jokeId: string): Promise<AxiosPromise> {
    return axios.delete(`${URI_STRING}/dadjokes/${jokeId}`, { withCredentials: true})
  },

  getPrivateJokes(): Promise<AxiosPromise> {
    return axios.get(`${URI_STRING}/dadjokes/private`, { withCredentials: true})
  },

  getPublicJokes(): Promise<AxiosPromise> {
    return axios.get(`${URI_STRING}/dadjokes/public`, { withCredentials: true})
  },

  updateJoke(jokeToUpdate: Joke, jokeId: string): Promise<AxiosPromise> {
    return axios.put(`${URI_STRING}/dadjokes/${jokeId}`, jokeToUpdate, { withCredentials: true})
  },

  voteForJoke(jokeId: string, vote: string): Promise<AxiosPromise> {
    return axios.post(`${URI_STRING}/dadjokes/vote/${jokeId}`, { voteNum: vote }, { withCredentials: true})
  }
}
