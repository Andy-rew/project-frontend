import axios, { AxiosInstance } from 'axios'

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? '/etuclasses/api'
    : 'http://localhost:3005/etuclasses/api'

export const clientBase =
  process.env.NODE_ENV === 'production'
    ? '/etuclasses'
    : 'http://localhost:8080'

export const socketURL =
  process.env.NODE_ENV === 'production' ? '' : 'localhost:3005'

export const http: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
})
