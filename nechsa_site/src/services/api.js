import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor - attach token
api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ─── Auth ───────────────────────────────────────────────────────────────────
export const authAPI = {
  login:    (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  me:       ()     => api.get('/auth/me'),
  logout:   ()     => api.post('/auth/logout'),
}

// ─── Companies ──────────────────────────────────────────────────────────────
export const companiesAPI = {
  getAll:  (params) => api.get('/companies', { params }),
  getById: (id)     => api.get(`/companies/${id}`),
  create:  (data)   => api.post('/companies', data),
  update:  (id, data) => api.put(`/companies/${id}`, data),
  search:  (params) => api.get('/companies/search', { params }),
  verify:  (id)     => api.post(`/companies/${id}/verify`),
  getStats:(id)     => api.get(`/companies/${id}/stats`),
}

// ─── Projects ───────────────────────────────────────────────────────────────
export const projectsAPI = {
  getAll:  (params) => api.get('/projects', { params }),
  getById: (id)     => api.get(`/projects/${id}`),
  create:  (data)   => api.post('/projects', data),
  update:  (id, data) => api.put(`/projects/${id}`, data),
  delete:  (id)     => api.delete(`/projects/${id}`),
  join:    (id)     => api.post(`/projects/${id}/join`),
  getTasks:(id)     => api.get(`/projects/${id}/tasks`),
  addTask: (id, data) => api.post(`/projects/${id}/tasks`, data),
  updateTask: (id, taskId, data) => api.put(`/projects/${id}/tasks/${taskId}`, data),
}

// ─── Collaboration ──────────────────────────────────────────────────────────
export const collaborationAPI = {
  getPartners:  ()          => api.get('/collaboration/partners'),
  collaborate:  (data)      => api.post('/collaboration', data),
  getMatches:   ()          => api.get('/collaboration/matches'),
  acceptPartner:(partnerId) => api.post(`/collaboration/${partnerId}/accept`),
  declinePartner:(partnerId)=> api.post(`/collaboration/${partnerId}/decline`),
}

// ─── Messages ───────────────────────────────────────────────────────────────
export const messagesAPI = {
  getConversations: ()             => api.get('/messages/conversations'),
  getMessages:      (userId)       => api.get(`/messages/${userId}`),
  send:             (data)         => api.post('/messages', data),
  markRead:         (conversationId) => api.put(`/messages/${conversationId}/read`),
}

// ─── Contracts ──────────────────────────────────────────────────────────────
export const contractsAPI = {
  getAll:  ()         => api.get('/contracts'),
  getById: (id)       => api.get(`/contracts/${id}`),
  create:  (data)     => api.post('/contracts', data),
  sign:    (id, data) => api.post(`/contracts/${id}/sign`, data),
  archive: (id)       => api.post(`/contracts/${id}/archive`),
}

// ─── Marketplace ────────────────────────────────────────────────────────────
export const marketplaceAPI = {
  getAll:  (params)   => api.get('/marketplace', { params }),
  getById: (id)       => api.get(`/marketplace/${id}`),
  create:  (data)     => api.post('/marketplace', data),
  contact: (id, data) => api.post(`/marketplace/${id}/contact`, data),
}

// ─── Dashboard ──────────────────────────────────────────────────────────────
export const dashboardAPI = {
  getStats:        () => api.get('/dashboard/stats'),
  getActivity:     () => api.get('/dashboard/activity'),
  getOpportunities:() => api.get('/dashboard/opportunities'),
}

export default api
