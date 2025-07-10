import axios from "axios"

const API_BASE_URL = "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getCurrentUser: () => api.get("/auth/me"),
  refreshToken: () => api.post("/auth/refresh"),
}

// Animals API
export const animalsAPI = {
  getAnimals: (params) => api.get("/animals", { params }),
  getAnimal: (id) => api.get(`/animals/${id}`),
  createAnimal: (data) => api.post("/animals", data),
  updateAnimal: (id, data) => api.put(`/animals/${id}`, data),
  deleteAnimal: (id) => api.delete(`/animals/${id}`),
  uploadImage: (id, formData) =>
    api.post(`/animals/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getStats: () => api.get("/animals/stats"),
}

// Adoptions API
export const adoptionsAPI = {
  getAdoptionRequests: (params) => api.get("/adoptions", { params }),
  getAdoptionRequest: (id) => api.get(`/adoptions/${id}`),
  createAdoptionRequest: (data) => api.post("/adoptions", data),
  updateAdoptionRequest: (id, data) => api.put(`/adoptions/${id}`, data),
  deleteAdoptionRequest: (id) => api.delete(`/adoptions/${id}`),
  getStats: () => api.get("/adoptions/stats"),
}

// Users API
export const usersAPI = {
  getUsers: (params) => api.get("/users", { params }),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getStats: () => api.get("/users/stats"),
}

export default api
