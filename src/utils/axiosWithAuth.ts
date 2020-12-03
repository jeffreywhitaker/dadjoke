import axios, { AxiosInstance } from 'axios'

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token')

  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const axiosLogin = () => {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
  })
}