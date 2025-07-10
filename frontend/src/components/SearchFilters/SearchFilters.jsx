"use client"

import { useState } from "react"
import "./SearchFilters.css"

const SearchFilters = ({ filters, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false)

  const handleInputChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value,
    })
  }

  const handleCheckboxChange = (field, checked) => {
    onFilterChange({
      ...filters,
      [field]: checked,
    })
  }

  const clearFilters = () => {
    onFilterChange({
      search: "",
      size: "",
      age: "",
      location: "",
      vaccinated: false,
      neutered: false,
    })
  }

  const hasActiveFilters = Object.values(filters).some((value) => (typeof value === "boolean" ? value : value !== ""))

  return (
    <div className="search-filters">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Buscar por nome ou raça..."
            value={filters.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <button className={`filter-toggle ${showFilters ? "active" : ""}`} onClick={() => setShowFilters(!showFilters)}>
          <span className="filter-icon">⚙️</span>
          Filtros
          {hasActiveFilters && <span className="filter-badge"></span>}
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filtrar Resultados</h3>
            {hasActiveFilters && (
              <button className="clear-filters" onClick={clearFilters}>
                Limpar Filtros
              </button>
            )}
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Porte</label>
              <select
                value={filters.size}
                onChange={(e) => handleInputChange("size", e.target.value)}
                className="filter-select"
              >
                <option value="">Todos os portes</option>
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Localização</label>
              <select
                value={filters.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="filter-select"
              >
                <option value="">Todas as cidades</option>
                <option value="São Paulo">São Paulo, SP</option>
                <option value="Rio de Janeiro">Rio de Janeiro, RJ</option>
                <option value="Belo Horizonte">Belo Horizonte, MG</option>
                <option value="Curitiba">Curitiba, PR</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status de Saúde</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.vaccinated}
                    onChange={(e) => handleCheckboxChange("vaccinated", e.target.checked)}
                  />
                  <span className="checkbox-text">Vacinado</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.neutered}
                    onChange={(e) => handleCheckboxChange("neutered", e.target.checked)}
                  />
                  <span className="checkbox-text">Castrado</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchFilters
