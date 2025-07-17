"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useToast } from "../../contexts/ToastContext"
import "./Login.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const { login } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/"

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)

      if (result.success) {
        success("Login realizado com sucesso!")
        navigate(from, { replace: true })
      } else {
        error(result.message)
      }
    } catch (err) {
      error("Erro inesperado. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <Link to="/" className="login-logo">
              <span className="logo-icon">🐾</span>
              <span className="logo-text">AdotePet</span>
            </Link>
            <h1 className="login-title">Bem-vindo de volta</h1>
            <p className="login-subtitle">Entre na sua conta para continuar ajudando animais</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? "error" : ""}`}
                placeholder="seu@email.com"
                disabled={loading}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? "error" : ""}`}
                placeholder="Sua senha"
                disabled={loading}
              />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkbox-text">Lembrar de mim</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Esqueceu a senha?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Não tem uma conta?{" "}
              <Link to="/register" className="register-link">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>

        <div className="login-image">
          <div className="image-container">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=800&fit=crop"
              alt="Cachorro feliz"
            />
            <div className="image-overlay">
              <div className="overlay-content">
                <h3>Faça parte da nossa missão</h3>
                <p>Conectando animais abandonados com famílias amorosas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-mock-info" style={{ marginBottom: "1.5rem", background: "#fff8e1", borderRadius: "8px", padding: "1rem", border: "1px solid #ffe0b2" }}>
        <strong>Para testar:</strong>
        <ul style={{ margin: "0.5rem 0 0 1.2rem", padding: 0 }}>
          <li>
            <b>Usuário comum:</b> <span style={{ fontFamily: "monospace" }}>usuario@teste.com</span>
          </li>
          <li>
            <b>Administrador:</b> <span style={{ fontFamily: "monospace" }}>admin@adotepet.com</span>
          </li>
          <li>
            <b>Senha:</b> <span style={{ fontFamily: "monospace" }}>!#02072024!4a</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Login
