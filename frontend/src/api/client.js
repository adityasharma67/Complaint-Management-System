import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  signup: (data) => api.post('/api/auth/signup', data),
  login: (data) => api.post('/api/auth/login', data),
}

export const complaintsAPI = {
  submit: (data) => api.post('/api/complaints', data),
  getMyComplaints: () => api.get('/api/complaints'),
  getComplaintById: (id) => api.get(`/api/complaints/${id}`),
}

export const adminAPI = {
  getAllComplaints: () => api.get('/api/admin/complaints'),
  updateComplaintStatus: (id, status) => api.put(`/api/admin/complaints/${id}`, { status }),
}

export default api
