import axios, { AxiosPromise } from 'axios'
import { CommentResponse, Joke, NewJoke } from '../types/types'

// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
let URI_STRING = ''
// const URI_STRING = 'https://jwhit-dadjokes.herokuapp.com'
if (process.env.NODE_ENV === 'production') {
  URI_STRING = 'https://jeffsdadjokes-node-be.herokuapp.com'
} else {
  URI_STRING = 'http://localhost:5000'
}

export default {
  addNewJoke(jokeToAdd: NewJoke): Promise<AxiosPromise> {
    return axios.post(`${URI_STRING}/api/jokes/add`, jokeToAdd, { withCredentials: true})
  },

  deleteJoke(jokeId: string): Promise<AxiosPromise> {
    return axios.delete(`${URI_STRING}/api/jokes/${jokeId}`, { withCredentials: true})
  },

  getComments(jokeId: string, criteria: Record<string, unknown>): Promise<CommentResponse> {
    return axios.post(`${URI_STRING}/api/comments/${jokeId}`, criteria)
  },

  getJokes(criteria: Record<string, unknown>, publicOrPrivate: string): Promise<AxiosPromise> {
    console.log(`get ${publicOrPrivate} Jokes with: `, criteria)

    const { sortBy, resultsPerPage, searchString, page, isprivate, submittedBy } = criteria

    return axios.get(`${URI_STRING}/api/jokes?isprivate=${isprivate}&page=${page}&sortBy=${sortBy}&resultsPerPage=${resultsPerPage}&searchString=${searchString}&submittedBy=${submittedBy}`, { withCredentials: true})
  },

  uploadComment(comment: Record<string, unknown>): Promise<AxiosPromise> {
    return axios.post(`${URI_STRING}/api/comments/add`, comment, { withCredentials: true})
  },

  updateJoke(jokeToUpdate: Joke, jokeId: string): Promise<AxiosPromise> {
    return axios.put(`${URI_STRING}/api/jokes/${jokeId}`, jokeToUpdate, { withCredentials: true})
  },

  voteForJoke(jokeId: string, vote: string): Promise<AxiosPromise> {
    return axios.post(`${URI_STRING}/api/jokes/vote/${jokeId}`, { voteNum: vote }, { withCredentials: true})
  }
}
