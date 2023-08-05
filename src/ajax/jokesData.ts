import { AxiosPromise } from 'axios'
import {
  CommentResponse,
  Criteria,
  Joke,
  JokeResponse,
  JokesResponse,
  NewJoke,
} from '../types/types'
import { client } from './axios'

export default {
  addNewJoke(jokeToAdd: NewJoke): Promise<AxiosPromise> {
    return client.post(`/api/jokes/add`, jokeToAdd, {
      withCredentials: true,
    })
  },

  deleteJoke(jokeId: string): Promise<AxiosPromise> {
    return client.delete(`/api/jokes/${jokeId}`, {
      withCredentials: true,
    })
  },

  getComments(
    jokeId: string,
    criteria: Record<string, unknown>,
  ): Promise<CommentResponse> {
    return client.post(`/api/comments/${jokeId}`, criteria)
  },

  getJokes(criteria: Criteria): Promise<JokesResponse> {
    console.log(
      `get ${criteria.isprivate ? 'Private' : 'Public'} Jokes with: `,
      criteria,
    )

    const {
      sortBy,
      resultsPerPage,
      searchString,
      page,
      isprivate,
      submittedBy,
    } = criteria

    return client.get(
      `/api/jokes?isprivate=${isprivate}&page=${page}&sortBy=${sortBy}&resultsPerPage=${resultsPerPage}&searchString=${searchString}&submittedBy=${submittedBy}`,
      { withCredentials: true },
    )
  },

  uploadComment(comment: Record<string, unknown>): Promise<AxiosPromise> {
    return client.post(`/api/comments/add`, comment, {
      withCredentials: true,
    })
  },

  updateJoke(jokeToUpdate: Joke, jokeId: string): Promise<JokeResponse> {
    return client.put(`/api/jokes/${jokeId}`, jokeToUpdate, {
      withCredentials: true,
    })
  },

  voteForJoke(jokeId: string, vote: string): Promise<AxiosPromise> {
    return client.post(
      `/api/jokes/vote/${jokeId}`,
      { voteNum: vote },
      { withCredentials: true },
    )
  },
}
