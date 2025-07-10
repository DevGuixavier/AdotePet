"use client"

import { useState, useEffect } from "react"
import { useToast } from "../../contexts/ToastContext"
import { animalsAPI } from "../../services/api"
import "./AdminAnimals.css"

const AdminAnimals = () => {
  const { success, error } = useToast()
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingAnimal, setEditingAnimal] = useState(null)
  const [filters, setFilters] = useState({
    search: "",
    species: "",
    status: "",
    size: "",
  })
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  })

  const [formData, setFormData] = useState({
    name: "",
    species: "dog",
    breed: "",
    age: "",
    age_category: "",
    size: "",
    weight: "",
    gender: "",
    color: "",
    temperament: "",
    description: "",
    location: "",
    vaccinated: false,
    neutered: false,
    microchipped: false,
    vaccines: [],
    health_notes: "",
    status: "available",
  })

  const fetchAnimals = async () => {
    try {
      setLoading(true)
      const response = await animalsAPI.getAnimals({
        page: pagination.page,
        per_page: 10,
        ...filters,
      })
      setAnimals(response.data.animals)
      setPagination(response.data.pagination)
    } catch (err) {
      error("Erro ao carregar animais")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnimals()
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
      if (editingAnimal) {
        await animalsAPI.updateAnimal(editingAnimal.id, formData)
        success("Animal atualizado com sucesso!")
      } else {
        await animalsAPI.createAnimal(formData)
        success("Animal criado com sucesso!")
      }
      setShowModal(false)
      setEditingAnimal(null)
      resetForm()
      fetchAnimals()
    } catch (err) {
      const message = err.response?.data?.error || "Erro ao salvar animal"
      error(message)
    }
  }

  const handleEdit = (animal) => {
    setEditingAnimal(animal)
    setFormData({
      name: animal.name || "",
      species: animal.species || "dog",
      breed: animal.breed || "",
      age: animal.age || "",
      age_category: animal.age_category || "",
      size: animal.size || "",
      weight: animal.weight || "",
      gender: animal.gender || "",
      color: animal.color || "",
      temperament: animal.temperament || "",
      description: animal.description || "",
      location: animal.location || "",
      vaccinated: animal.vaccinated || false,
      neutered: animal.neutered || false,
      microchipped: animal.microchipped || false,
      vaccines: animal.vaccines || [],
      health_notes: animal.health_notes || "",
      status: animal.status || "available",
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este animal?")) {
      try {
        await animalsAPI.deleteAnimal(id)
        success("Animal deletado com sucesso!")
        fetchAnimals()
      } catch (err) {
        error("Erro ao deletar animal")
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      species: "dog",
      breed: "",
      age: "",
      age_category: "",
      size: "",
      weight: "",
      gender: "",
      color: "",
      temperament: "",
      description: "",
      location: "",
      vaccinated: false,
      neutered: false,
      microchipped: false,
      vaccines: [],
      health_notes: "",
      status: "available",
    })
  }

  const getStatusBadge = (status) => {
    const badges = {
      available: { class: "success", text: "Disponível", icon: "check" },
      adopted: { class: "primary", text: "Adotado", icon: "home" },
      pending: { class: "warning", text: "Pendente", icon: "clock" },
      unavailable: { class: "danger", text: "Indisponível", icon: "times" },
    }
    return badges[status] || badges.available
  }

  return (
    <div className="admin-animals-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">
              <i className="fas fa-paw"></i>
              Gerenciar Animais
            </h1>
            <p className="page-subtitle">Cadastre e gerencie os animais disponíveis para adoção</p>
          </div>
          <div className="header-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditingAnimal(null)
                resetForm()
                setShowModal(true)
              }}
            >
              <i className="fas fa-plus"></i>
              Adicionar Animal
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <input
                type="text"
                placeholder="Buscar por nome ou raça..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="filter-input"
              />
            </div>
            <div className="filter-group">
              <select
                value={filters.species}
                onChange={(e) => handleFilterChange("species", e.target.value)}
                className="filter-select"
              >
                <option value="">Todas as espécies</option>
                <option value="dog">Cachorro</option>
                <option value="cat">Gato</option>
              </select>
            </div>
            <div className="filter-group">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="filter-select"
              >
                <option value="">Todos os status</option>
                <option value="available">Disponível</option>
                <option value="adopted">Adotado</option>
                <option value="pending">Pendente</option>
                <option value="unavailable">Indisponível</option>
              </select>
            </div>
            <div className="filter-group">
              <select
                value={filters.size}
                onChange={(e) => handleFilterChange("size", e.target.value)}
                className="filter-select"
              >
                <option value="">Todos os portes</option>
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
          </div>
        </div>

        {/* Animals Table */}
        <div className="table-section">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Carregando animais...</p>
            </div>
          ) : (
            <>
              <div className="table-container">
                <table className="animals-table">
                  <thead>
                    <tr>
                      <th>Animal</th>
                      <th>Espécie</th>
                      <th>Idade</th>
                      <th>Porte</th>
                      <th>Localização</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {animals.map((animal) => {
                      const badge = getStatusBadge(animal.status)
                      return (
                        <tr key={animal.id}>
                          <td>
                            <div className="animal-info">
                              <img
                                src={animal.primary_image || "/placeholder.svg?height=50&width=50"}
                                alt={animal.name}
                                className="animal-avatar"
                              />
                              <div>
                                <div className="animal-name">{animal.name}</div>
                                <div className="animal-breed">{animal.breed}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="species-badge">
                              <i className={`fas fa-${animal.species === "dog" ? "dog" : "cat"}`}></i>
                              {animal.species === "dog" ? "Cachorro" : "Gato"}
                            </span>
                          </td>
                          <td>{animal.age}</td>
                          <td>{animal.size}</td>
                          <td>{animal.location}</td>
                          <td>
                            <span className={`status-badge ${badge.class}`}>
                              <i className={`fas fa-${badge.icon}`}></i>
                              {badge.text}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn btn-sm btn-outline"
                                onClick={() => handleEdit(animal)}
                                title="Editar"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(animal.id)}
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
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingAnimal ? "Editar Animal" : "Adicionar Animal"}</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Nome *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Espécie *</label>
                    <select
                      name="species"
                      value={formData.species}
                      onChange={handleFormChange}
                      className="form-select"
                      required
                    >
                      <option value="dog">Cachorro</option>
                      <option value="cat">Gato</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Raça</label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleFormChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Idade</label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleFormChange}
                      className="form-input"
                      placeholder="Ex: 2 anos"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Porte</label>
                    <select name="size" value={formData.size} onChange={handleFormChange} className="form-select">
                      <option value="">Selecione</option>
                      <option value="Pequeno">Pequeno</option>
                      <option value="Médio">Médio</option>
                      <option value="Grande">Grande</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Sexo</label>
                    <select name="gender" value={formData.gender} onChange={handleFormChange} className="form-select">
                      <option value="">Selecione</option>
                      <option value="male">Macho</option>
                      <option value="female">Fêmea</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Peso</label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleFormChange}
                      className="form-input"
                      placeholder="Ex: 15kg"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cor</label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleFormChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Localização</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select name="status" value={formData.status} onChange={handleFormChange} className="form-select">
                      <option value="available">Disponível</option>
                      <option value="adopted">Adotado</option>
                      <option value="pending">Pendente</option>
                      <option value="unavailable">Indisponível</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Temperamento</label>
                  <input
                    type="text"
                    name="temperament"
                    value={formData.temperament}
                    onChange={handleFormChange}
                    className="form-input"
                    placeholder="Ex: Dócil, brincalhão, carinhoso"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Descrição</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="form-textarea"
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Observações de Saúde</label>
                  <textarea
                    name="health_notes"
                    value={formData.health_notes}
                    onChange={handleFormChange}
                    className="form-textarea"
                    rows="3"
                  />
                </div>

                <div className="checkbox-grid">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="vaccinated"
                      checked={formData.vaccinated}
                      onChange={handleFormChange}
                    />
                    <span>Vacinado</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="neutered" checked={formData.neutered} onChange={handleFormChange} />
                    <span>Castrado</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="microchipped"
                      checked={formData.microchipped}
                      onChange={handleFormChange}
                    />
                    <span>Microchipado</span>
                  </label>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i>
                    {editingAnimal ? "Atualizar" : "Criar"}
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

export default AdminAnimals
