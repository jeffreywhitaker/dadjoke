import axios from 'axios'

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://dadjoke-node-be.onrender.com'
} else {
  baseURL = 'http://localhost:5000'
}

export const client = axios.create({ baseURL })
