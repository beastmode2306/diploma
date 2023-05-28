import axios from 'axios'
import store from '../store/store'

const baseHeaders = {
  'Content-Type': 'application/json'
}

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    ...baseHeaders
  }
})

instance.interceptors.request.use((config) => {
  if (store.getters.apiKey) {
    config.headers['X-API-KEY'] = store.getters.apiKey
  }

  console.log(config.headers)

  return config
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const response = error.response
    if ([401, 403].includes(response.status)) {
      store.commit('SET_API_KEY', null)
      store.commit('SET_COMPANY_ID', null)
    }

    return Promise.reject(error)
  }
)
