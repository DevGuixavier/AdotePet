"use client"

import { useState, useEffect } from "react"
import { useToast } from "../../contexts/ToastContext"
import { adoptionsAPI } from "../../services/api"
import "./AdminAdoptions.css"

const AdminAdoptions = () => {
  const { success, error } = useToast()
  const [adoptions, setAdoptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAdoption, setSelectedAdoption] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  })
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  })

  const fetchAdoptions = async () => {
    try {
      setLoading(true)
      const response = await adoptionsAPI.getAdoptionRequests({
        page: pagination.page,
        per_page: 10,
        ...filters,
      })
      setAdoptions(response.data.requests)
      setPagination(response.data.pagination)
    } catch (err) {
      error("Erro ao carregar solicitações")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdoptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pagination.page])

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handleStatusUpdate = async (id, status, notes = "", rejectionReason = "") => {
    try {
      const updateData = { status }
      if (notes) updateData.admin_notes = notes
      if (rejectionReason) updateData.rejection_reason = rejectionReason

      await adoptionsAPI.updateAdoptionRequest(id, updateData)
      success(`Solicitação ${status === "approved" ? "aprovada" : "rejeitada"} com sucesso!`)
      setShowModal(false)
      setSelectedAdoption(null)
      fetchAdoptions()
    } catch (err) {
      const message = err.response?.data?.error || "Erro ao atualizar solicitação"
      error(message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar esta solicitação?")) {
      try {
        await adoptionsAPI.deleteAdoptionRequest(id)
        success("Solicitação deletada com sucesso!")
        fetchAdoptions()
      } catch (err) {
        error("Erro ao deletar solicitação")
      }
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: "warning", text: "Pendente", icon: "clock" },
      approved: { class: "success", text: "Aprovado", icon: "check" },
      rejected: { class: "danger", text: "Rejeitado", icon: "times" },
      cancelled: { class: "secondary", text: "Cancelado", icon: "ban" },
    }
    return badges[status] || badges.pending
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const AdoptionModal = ({ adoption, onClose, onApprove, onReject }) => {
    const [notes, setNotes] = useState(adoption?.admin_notes || "")
    const [rejectionReason, setRejectionReason] = useState("")

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Solicitação de Adoção</h2>
            <button className="modal-close" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="modal-body">
            <div className="adoption-details">
              <div className="detail-section">
                <h3>
                  <i className="fas fa-paw"></i>
                  Animal
                </h3>
                <div className="animal-card">
                  <img
                    src={adoption?.animal?.primary_image || "/placeholder.svg?height=100&width=100"}
                    alt={adoption?.animal?.name}
                    className="animal-image"
                  />
                  <div className="animal-info">
                    <h4>{adoption?.animal?.name}</h4>
                    <p>{adoption?.animal?.breed}</p>
                    <p>
                      {adoption?.animal?.age} • {adoption?.animal?.size}
                    </p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>
                  <i className="fas fa-user"></i>
                  Solicitante
                </h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Nome:</span>
                    <span className="value">{adoption?.full_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{adoption?.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Telefone:</span>
                    <span className="value">{adoption?.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Cidade:</span>
                    <span className="value">
                      {adoption?.city}, {adoption?.state}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>
                  <i className="fas fa-home"></i>
                  Informações da Moradia
                </h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Tipo:</span>
                    <span className="value">{adoption?.housing_type}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Quintal:</span>
                    <span className="value">{adoption?.has_yard ? "Sim" : "Não"}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Crianças:</span>
                    <span className="value">{adoption?.has_children ? `Sim (${adoption?.children_ages})` : "Não"}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Outros pets:</span>
                    <span className="value">{adoption?.has_other_pets ? "Sim" : "Não"}</span>
                  </div>
                </div>
                {adoption?.other_pets_description && (
                  <div className="description">
                    <strong>Descrição dos outros pets:</strong>
                    <p>{adoption.other_pets_description}</p>
                  </div>
                )}
              </div>

              <div className="detail-section">
                <h3>
                  <i className="fas fa-heart"></i>
                  Motivação
                </h3>
                <div className="description">
                  <p>{adoption?.reason}</p>
                </div>
              </div>

              <div className="detail-section">
                <h3>
                  <i className="fas fa-sticky-note"></i>
                  Notas Administrativas
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-textarea"
                  rows="4"
                  placeholder="Adicione observações sobre esta solicitação..."
                />
              </div>

              {adoption?.status === "pending" && (
                <div className="detail-section">
                  <h3>
                    <i className="fas fa-exclamation-triangle"></i>
                    Motivo da Rejeição (se aplicável)
                  </h3>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="form-textarea"
                    rows="3"
                    placeholder="Explique o motivo da rejeição..."
                  />
                </div>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn btn-outline" onClick={onClose}>
              Fechar
            </button>
            {adoption?.status === "pending" && (
              <>
                <button
                  className="btn btn-danger"
                  onClick={() => onReject(adoption.id, "rejected", notes, rejectionReason)}
                  disabled={!rejectionReason.trim()}
                >
                  <i className="fas fa-times"></i>
                  Rejeitar
                </button>
                <button className="btn btn-success" onClick={() => onApprove(adoption.id, "approved", notes)}>
                  <i className="fas fa-check"></i>
                  Aprovar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-adoptions-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">
              <i className="fas fa-heart"></i>
              Gerenciar Adoções
            </h1>
            <p className="page-subtitle">Analise e gerencie as solicitações de adoção</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <input
                type="text"
                placeholder="Buscar por nome do solicitante ou animal..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="filter-input"
              />
            </div>
            <div className="filter-group">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="filter-select"
              >
                <option value="">Todos os status</option>
                <option value="pending">Pendente</option>
                <option value="approved">Aprovado</option>
                <option value="rejected">Rejeitado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Adoptions Table */}
        <div className="table-section">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Carregando solicitações...</p>
            </div>
          ) : (
            <>
              <div className="table-container">
                <table className="adoptions-table">
                  <thead>
                    <tr>
                      <th>Solicitante</th>
                      <th>Animal</th>
                      <th>Data</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adoptions.map((adoption) => {
                      const badge = getStatusBadge(adoption.status)
                      return (
                        <tr key={adoption.id}>
                          <td>
                            <div className="requester-info">
                              <div className="requester-avatar">
                                <i className="fas fa-user"></i>
                              </div>
                              <div>
                                <div className="requester-name">{adoption.full_name}</div>
                                <div className="requester-email">{adoption.email}</div>
                                <div className="requester-location">{adoption.city}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="animal-info">
                              <img
                                src={adoption.animal?.primary_image || "/placeholder.svg?height=50&width=50"}
                                alt={adoption.animal?.name}
                                className="animal-avatar"
                              />
                              <div>
                                <div className="animal-name">{adoption.animal?.name}</div>
                                <div className="animal-breed">{adoption.animal?.breed}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="date-info">
                              <div className="date">{formatDate(adoption.created_at)}</div>
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${badge.class}`}>
                              <i className={`fas fa-${badge.icon}`}></i>
                              {badge.text}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => {
                                  setSelectedAdoption(adoption)
                                  setShowModal(true)
                                }}
                                title="Ver Detalhes"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(adoption.id)}
                                title="Deletar"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="pagination">
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={pagination.page === 1}
                    onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                  >
                    <i className="fas fa-chevron-left"></i>
                    Anterior
                  </button>
                  <span className="pagination-info">
                    Página {pagination.page} de {pagination.pages}
                  </span>
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={pagination.page === pagination.pages}
                    onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                  >
                    Próxima
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal */}
        {showModal && selectedAdoption && (
          <AdoptionModal
            adoption={selectedAdoption}
            onClose={() => {
              setShowModal(false)
              setSelectedAdoption(null)
            }}
            onApprove={handleStatusUpdate}
            onReject={handleStatusUpdate}
          />
        )}
      </div>
    </div>
  )
}

export default AdminAdoptions
