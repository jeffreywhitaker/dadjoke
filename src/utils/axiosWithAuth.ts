import axios, { AxiosInstance } from 'axios'

export const axiosWithAuth = (): AxiosInstance => {
  const token = localStorage.getItem('token')

  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const axiosLogin = (): AxiosInstance => {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
