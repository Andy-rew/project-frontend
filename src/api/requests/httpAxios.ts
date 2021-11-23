import axios, { AxiosInstance } from 'axios'

export const baseURL = 'http://localhost:3005/api'

export const http: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
})
