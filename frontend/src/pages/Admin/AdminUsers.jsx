"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useToast } from "../../contexts/ToastContext"
import { usersAPI } from "../../services/api"
import "./AdminUsers.css"

const AdminUsers = () => {
  const { user: currentUser } = useAuth()
  const { success, error } = useToast()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [filters, setFilters] = useState({
    search: "",
    is_admin: "",
    is_active: "",
  })
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  })

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    is_admin: false,
    is_active: true,
    password: "",
  })

  // Torne fetchUsers uma função do componente
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await usersAPI.getUsers({
        page: pagination.page,
        per_page: 10,
        ...filters,
      })
      setUsers(response.data.users)
      setPagination(response.data.pagination)
    } catch (err) {
      error("Erro ao carregar usuários")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pagination.page])

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updateData = {
        full_name: formData.full_name,
        phone: formData.phone,
        is_admin: formData.is_admin,
        is_active: formData.is_active,
      }

      if (formData.password) {
        updateData.password = formData.password
      }

      await usersAPI.updateUser(editingUser.id, updateData)
      success("Usuário atualizado com sucesso!")
      setShowModal(false)
      setEditingUser(null)
      resetForm()
      fetchUsers()
    } catch (err) {
      const message = err.response?.data?.error || "Erro ao salvar usuário"
      error(message)
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      full_name: user.full_name || "",
      email: user.email || "",
      phone: user.phone || "",
      is_admin: user.is_admin || false,
      is_active: user.is_active !== false,
      password: "",
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (id === currentUser.id) {
      error("Você não pode deletar sua própria conta")
      return
    }

    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await usersAPI.deleteUser(id)
        success("Usuário deletado com sucesso!")
        fetchUsers()
      } catch (err) {
        error("Erro ao deletar usuário")
      }
    }
  }

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      is_admin: false,
      is_active: true,
      password: "",
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="admin-users-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">
              <i className="fas fa-users"></i>
              Gerenciar Usuários
            </h1>
            <p className="page-subtitle">Gerencie contas de usuários e permissões</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="filter-input"
              />
            </div>
            <div className="filter-group">
              <select
                value={filters.is_admin}
                onChange={(e) => handleFilterChange("is_admin", e.target.value)}
                className="filter-select"
              >
                <option value="">Todos os tipos</option>
                <option value="true">Administradores</option>
                <option value="false">Usuários</option>
              </select>
            </div>
            <div className="filter-group">
              <select
                value={filters.is_active}
                onChange={(e) => handleFilterChange("is_active", e.target.value)}
                className="filter-select"
              >
                <option value="">Todos os status</option>
                <option value="true">Ativos</option>
                <option value="false">Inativos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="table-section">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Carregando usuários...</p>
            </div>
          ) : (
            <>
              <div className="table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Usuário</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Tipo</th>
                      <th>Status</th>
                      <th>Cadastro</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar">
                              <i className="fas fa-user"></i>
                            </div>
                            <div>
                              <div className="user-name">{user.full_name}</div>
                              {user.id === currentUser.id && (
                                <span className="current-user-badge">Você</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="user-email">{user.email}</div>
                        </td>
                        <td>
                          <div className="user-phone">{user.phone || "-"}</div>
                        </td>
                        <td>
                          {user.is_admin ? (
                            <span className="status-badge success">Admin</span>
                          ) : (
                            <span className="status-badge secondary">Usuário</span>
                          )}
                        </td>
                        <td>
                          {user.is_active ? (
                            <span className="status-badge success">Ativo</span>
                          ) : (
                            <span className="status-badge danger">Inativo</span>
                          )}
                        </td>
                        <td>{formatDate(user.created_at)}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleEdit(user)}
                              title="Editar"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(user.id)}
                              title="Excluir"
                              disabled={user.id === currentUser.id}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Paginação */}
              <div className="pagination">
                <span className="pagination-info">
                  Página {pagination.page} de {pagination.pages} — {pagination.total} usuários
                </span>
                <div>
                  <button
                    className="btn btn-sm"
                    onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                    disabled={pagination.page <= 1}
                  >
                    Anterior
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                    disabled={pagination.page >= pagination.pages}
                  >
                    Próxima
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal de edição */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Editar Usuário</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Nome completo</label>
                    <input
                      type="text"
                      name="full_name"
                      className="form-input"
                      value={formData.full_name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telefone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nova senha</label>
                    <input
                      type="password"
                      name="password"
                      className="form-input"
                      value={formData.password}
                      onChange={handleFormChange}
                      placeholder="Deixe em branco para não alterar"
                    />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="is_admin"
                        checked={formData.is_admin}
                        onChange={handleFormChange}
                      />
                      Administrador
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleFormChange}
                      />
                      Ativo
                    </label>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary">
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false)
                      setEditingUser(null)
                      resetForm()
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsers
