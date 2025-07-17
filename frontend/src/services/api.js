import axios from "axios"

// Mock API base URL (not used since backend is not running)
const API_BASE_URL = "http://localhost:5000/api"

// Create axios instance (not used for mocks)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token (not used for mocks)
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

// Response interceptor to handle errors (not used for mocks)
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

// Mock data for animals stats
const mockStats = {
  total: 335,
  available: 327,
  adopted: 650,
}


// Auth API mocks
export const authAPI = {
  login: (credentials) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { user: { id: 1, full_name: "Usuário Demo", email: credentials.email, is_admin: false }, token: "fake-token" } })
      }, 500)
    }),
  register: (userData) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { user: { id: 2, full_name: userData.full_name, email: userData.email, is_admin: false }, token: "fake-token" } })
      }, 500)
    }),
  getCurrentUser: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
          resolve({ data: { user } })
        } else {
          resolve({ data: { user: null } })
        }
      }, 500)
    }),
  refreshToken: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { token: "fake-token" } })
      }, 500)
    }),
}

// Animals API mocks
export const animalsAPI = {
  createAnimal: (data) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data })
      }, 500)
    }),
  updateAnimal: (id, data) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data })
      }, 500)
    }),
  deleteAnimal: (id) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true } })
      }, 500)
    }),
  uploadImage: (id, formData) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true } })
      }, 500)
    }),
  getStats: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockStats })
      }, 500)
    }),
}

// Adoptions API mocks
export const adoptionsAPI = {
  getAdoptionRequests: (params) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: [] })
      }, 500)
    }),
  getAdoptionRequest: (id) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: null })
      }, 500)
    }),
  createAdoptionRequest: (data) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data })
      }, 500)
    }),
  updateAdoptionRequest: (id, data) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data })
      }, 500)
    }),
  deleteAdoptionRequest: (id) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true } })
      }, 500)
    }),
  getStats: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { total: 0 } })
      }, 500)
    }),
}

// Users API mocks
export const usersAPI = {
  getUsers: (params) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: [] })
      }, 500)
    }),
  getUser: (id) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: null })
      }, 500)
    }),
  updateUser: (id, data) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data })
      }, 500)
    }),
  deleteUser: (id) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true } })
      }, 500)
    }),
  getStats: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { total: 0 } })
      }, 500)
    }),
}

export default api
