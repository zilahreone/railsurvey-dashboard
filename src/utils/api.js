const baseURL = import.meta.env.VITE_BACKEND_URL
export default {
  get (endpoint, token = null) {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(baseURL + endpoint, { method: 'GET', headers })
  }
}