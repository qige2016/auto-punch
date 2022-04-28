import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { url } from '../config/url.json'
import { store } from './store'
import { logger } from './logger'

const baseConfig: AxiosRequestConfig = {
  timeout: 30000,
  baseURL: url,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
  }
}

axios.interceptors.request.use(
  (config) => {
    config = {
      headers: {
        'ncov-access-token': store.get('AUTH_TOKEN') || ''
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const get = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      ...baseConfig,
      ...config
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        logger.error(
          error.response?.data?.message || `Failed to get ${config.url}`
        )
        reject(error)
      })
  })
}

export const post = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      ...baseConfig,
      ...config
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        logger.error(
          error.response?.data?.message || `Failed to post ${config.url}`
        )
        reject(error)
      })
  })
}
