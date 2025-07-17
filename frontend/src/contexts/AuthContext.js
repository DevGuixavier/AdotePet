"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { authAPI } from "../services/api"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem("token"))

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }, [])

  const fetchUser = useCallback(async () => {
    try {
      const response = await authAPI.getCurrentUser()
      setUser(response.data.user)
    } catch (error) {
      console.error("Error fetching user:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }, [logout])

  useEffect(() => {
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [token, fetchUser])

  const login = async (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Preencha e-mail e senha." }
    }
    // Exemplo: senha fixa "!#02072024!4a"
    if (password !== "!#02072024!4a") {
      return { success: false, message: "Senha incorreta." }
    }

    // Define nome diferente para admin e usuário comum
    const isAdmin = email === "admin@adotepet.com"
    const fakeUser = {
      id: 1,
      full_name: isAdmin ? "Administrador" : "Usuário Demo",
      email,
      is_admin: isAdmin,
    }
    const fakeToken = "fake-token"

    setToken(fakeToken)
    setUser(fakeUser)
    localStorage.setItem("token", fakeToken)
    localStorage.setItem("user", JSON.stringify(fakeUser))

    return { success: true, message: "Login simulado com sucesso!" }
  }

  const register = async (userData) => {
    try {
      // Mock register API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              user: {
                id: 2,
                full_name: userData.full_name,
                email: userData.email,
                is_admin: false,
              },
              token: "fake-token",
              message: "Registro simulado com sucesso!",
            },
          })
        }, 500)
      })

      const { user, token } = response.data

      setToken(token)
      setUser(user)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      return { success: true, message: response.data.message }
    } catch (error) {
      const message = error.response?.data?.error || "Erro de conexão"
      return { success: false, message }
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin || false,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
