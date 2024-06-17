import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    let errorMessage = 'Unknown error'
    if (error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        errorMessage = 'Request error'
      } else if (error.response.status >= 500) {
        errorMessage = 'Server error'
      }
    }
    return Promise.reject(new Error(errorMessage))
  }
)

export default axiosInstance
