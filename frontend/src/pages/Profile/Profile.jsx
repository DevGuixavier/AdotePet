"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useToast } from "../../contexts/ToastContext"
import { usersAPI } from "../../services/api"
import "./Profile.css"

const Profile = () => {
  const { user, logout } = useAuth()
  const { success, error } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [adoptionRequests, setAdoptionRequests] = useState([])
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        confirmPassword: "",
      })
    }
  }, [user])

  useEffect(() => {
    if (activeTab === "adoptions") {
      fetchAdoptionRequests()
    }
  }, [activeTab])

  const fetchAdoptionRequests = async () => {
    try {
      // Note: This would need to be implemented in the backend to filter by user
      // For now, we'll show a placeholder
      setAdoptionRequests([])
    } catch (err) {
      console.error("Error fetching adoption requests:", err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (formData.password && formData.password !== formData.confirmPassword) {
        error("Senhas não coincidem")
        return
      }

      const updateData = {
        full_name: formData.full_name,
        phone: formData.phone,
      }

      if (formData.password) {
        updateData.password = formData.password
      }

      await usersAPI.updateUser(user.id, updateData)
      success("Perfil atualizado com sucesso!")

      // Clear password fields
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }))
    } catch (err) {
      const message = err.response?.data?.error || "Erro ao atualizar perfil"
      error(message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: "warning", text: "Pendente", icon: "clock" },
      approved: { class: "success", text: "Aprovado", icon: "check" },
      rejected: { class: "danger", text: "Rejeitado", icon: "times" },
    }
    return badges[status] || badges.pending
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <i className="fas fa-user"></i>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user?.full_name}</h1>
            <p className="profile-email">{user?.email}</p>
            <div className="profile-badges">
              {user?.is_admin && (
                <span className="badge badge-primary">
                  <i className="fas fa-crown"></i>
                  Administrador
                </span>
              )}
              <span className="badge badge-success">
                <i className="fas fa-check-circle"></i>
                Conta Ativa
              </span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-tabs">
            <button
              className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <i className="fas fa-user"></i>
              Meu Perfil
            </button>
            <button
              className={`tab-button ${activeTab === "adoptions" ? "active" : ""}`}
              onClick={() => setActiveTab("adoptions")}
            >
              <i className="fas fa-heart"></i>
              Minhas Adoções
            </button>
            <button
              className={`tab-button ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <i className="fas fa-cog"></i>
              Configurações
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "profile" && (
              <div className="tab-panel">
                <div className="panel-header">
                  <h2>Informações Pessoais</h2>
                  <p>Atualize suas informações pessoais</p>
                </div>

                <form className="profile-form" onSubmit={handleSubmit}>
                  <div className="form-row">
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
                        className="form-input"
                        disabled={loading}
                      />
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
                        className="form-input"
                        disabled
                      />
                      <div className="form-help">O email não pode ser alterado</div>
                    </div>
                  </div>

                  <div className="form-row">
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
                        className="form-input"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        Nova Senha
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input"
                        disabled={loading}
                        placeholder="Deixe em branco para manter a atual"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirmar Nova Senha
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="form-input"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="loading-spinner"></div>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save"></i>
                          Salvar Alterações
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "adoptions" && (
              <div className="tab-panel">
                <div className="panel-header">
                  <h2>Minhas Solicitações de Adoção</h2>
                  <p>Acompanhe o status das suas solicitações</p>
                </div>

                {adoptionRequests.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <i className="fas fa-heart"></i>
                    </div>
                    <h3>Nenhuma solicitação encontrada</h3>
                    <p>Você ainda não fez nenhuma solicitação de adoção.</p>
                    <a href="/animals" className="btn btn-primary">
                      <i className="fas fa-search"></i>
                      Encontrar Animais
                    </a>
                  </div>
                ) : (
                  <div className="adoptions-list">
                    {adoptionRequests.map((request) => {
                      const badge = getStatusBadge(request.status)
                      return (
                        <div key={request.id} className="adoption-card">
                          <div className="adoption-animal">
                            <img
                              src={request.animal?.primary_image || "/placeholder.svg?height=80&width=80"}
                              alt={request.animal?.name}
                            />
                            <div className="animal-info">
                              <h4>{request.animal?.name}</h4>
                              <p>{request.animal?.breed}</p>
                            </div>
                          </div>
                          <div className="adoption-status">
                            <span className={`status-badge ${badge.class}`}>
                              <i className={`fas fa-${badge.icon}`}></i>
                              {badge.text}
                            </span>
                          </div>
                          <div className="adoption-date">
                            {new Date(request.created_at).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="tab-panel">
                <div className="panel-header">
                  <h2>Configurações da Conta</h2>
                  <p>Gerencie suas preferências e configurações</p>
                </div>

                <div className="settings-section">
                  <h3>Notificações</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Email de Atualizações</h4>
                      <p>Receba emails sobre o status das suas adoções</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Newsletter</h4>
                      <p>Receba novidades sobre novos animais disponíveis</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Privacidade</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Perfil Público</h4>
                      <p>Permitir que outros usuários vejam seu perfil</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-section danger-zone">
                  <h3>Zona de Perigo</h3>
                  <div className="danger-actions">
                    <button className="btn btn-danger" onClick={logout}>
                      <i className="fas fa-sign-out-alt"></i>
                      Sair da Conta
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
