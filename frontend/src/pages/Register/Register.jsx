"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useToast } from "../../contexts/ToastContext"
import "./Register.css"

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const { register } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Nome completo é obrigatório"
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.phone) {
      newErrors.phone = "Telefone é obrigatório"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem"
    }

    if (!formData.terms) {
      newErrors.terms = "Você deve aceitar os termos de uso"
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
      const result = await register({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })

      if (result.success) {
        success("Conta criada com sucesso!")
        navigate("/")
        window.location.reload() // Força atualização visual após registro
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
    <div className="register-page">
      <div className="register-container">
        <div className="register-content">
          <div className="register-header">
            <Link to="/" className="register-logo">
              <span className="logo-icon">🐾</span>
              <span className="logo-text">AdotePet</span>
            </Link>
            <h1 className="register-title">Crie sua conta</h1>
            <p className="register-subtitle">Junte-se a nós na missão de salvar vidas</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="full_name" className="form-label">
                Nome Completo
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className={`form-input ${errors.full_name ? "error" : ""}`}
                placeholder="Seu nome completo"
                disabled={loading}
              />
              {errors.full_name && <div className="form-error">{errors.full_name}</div>}
            </div>

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
              <label htmlFor="phone" className="form-label">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${errors.phone ? "error" : ""}`}
                placeholder="(11) 99999-9999"
                disabled={loading}
              />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
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
                placeholder="Mínimo 6 caracteres"
                disabled={loading}
              />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                placeholder="Digite a senha novamente"
                disabled={loading}
              />
              {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span className="checkbox-text">
                  Eu aceito os{" "}
                  <Link to="/terms" className="terms-link">
                    Termos de Uso
                  </Link>{" "}
                  e{" "}
                  <Link to="/privacy" className="terms-link">
                    Política de Privacidade
                  </Link>
                </span>
              </label>
              {errors.terms && <div className="form-error">{errors.terms}</div>}
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Criando conta...
                </>
              ) : (
                "Criar Conta"
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Já tem uma conta?{" "}
              <Link to="/login" className="login-link">
                Faça login
              </Link>
            </p>
          </div>
        </div>

        <div className="register-image">
          <div className="image-container">
            <img
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=800&fit=crop"
              alt="Animais felizes"
            />
            <div className="image-overlay">
              <div className="overlay-content">
                <h3>Transforme vidas</h3>
                <p>Cada adoção é uma nova chance de felicidade para um animal abandonado</p>
                <div className="stats-mini">
                  <div className="stat-mini">
                    <div className="stat-mini-number">500+</div>
                    <div className="stat-mini-label">Animais Salvos</div>
                  </div>
                  <div className="stat-mini">
                    <div className="stat-mini-number">300+</div>
                    <div className="stat-mini-label">Famílias Felizes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
