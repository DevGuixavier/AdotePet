"use client"

import { useState, useEffect } from "react"
import AnimalCard from "../../components/AnimalCard/AnimalCard"
import SearchFilters from "../../components/SearchFilters/SearchFilters"
import "./Animals.css"
import lunaImg from "../../assets/images/luna.jpg"
import BellaImg from "../../assets/images/Bella.png"
import charlieImg from "../../assets/images/Charlie.png"

const Animals = () => {
  const [animals, setAnimals] = useState([])
  const [filteredAnimals, setFilteredAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    size: "",
    age: "",
    location: "",
    vaccinated: false,
    neutered: false,
  })

  useEffect(() => {
    // Simular carregamento de dados da API
    const fetchAnimals = async () => {
      setLoading(true)

      // Dados mockados
      const mockAnimals = [
        {
          id: 1,
          name: "Luna",
          age: "2 anos",
          breed: "Dachshund",
          size: "Pequeno",
          image: lunaImg, // alterado para usar a imagem local
          location: "São Paulo, SP",
          vaccinated: true,
          neutered: true,
          microchipped: true,
        },
        {
          id: 2,
          name: "Max",
          age: "3 anos",
          breed: "Golden Retriever",
          size: "Grande",
          image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
          location: "Rio de Janeiro, RJ",
          vaccinated: true,
          neutered: false,
          microchipped: true,
        },
        {
          id: 3,
          name: "Bella",
          age: "1 ano",
          breed: "Border Collie",
          size: "Médio",
          image: BellaImg,
          location: "São Paulo, SP",
          vaccinated: true,
          neutered: true,
          microchipped: false,
        },
        {
          id: 4,
          name: "Charlie",
          age: "2 anos",
          breed: "Beagle",
          size: "Médio",
          image: charlieImg,
          location: "Belo Horizonte, MG",
          vaccinated: false,
          neutered: true,
          microchipped: true,
        },
        {
          id: 5,
          name: "Mia",
          age: "2 anos",
          breed: "Poodle",
          size: "Pequeno",
          image: "https://images.unsplash.com/photo-1616190264687-b7ebf7aa2eb4?w=400&h=300&fit=crop",
          location: "São Paulo, SP",
          vaccinated: true,
          neutered: true,
          microchipped: true,
        },
        {
          id: 6,
          name: "Rocky",
          age: "5 anos",
          breed: "Bulldog",
          size: "Médio",
          image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
          location: "Curitiba, PR",
          vaccinated: true,
          neutered: false,
          microchipped: false,
        },
      ]

      setTimeout(() => {
        setAnimals(mockAnimals)
        setFilteredAnimals(mockAnimals)
        setLoading(false)
      }, 1000)
    }

    fetchAnimals()
  }, [])

  useEffect(() => {
    // Aplicar filtros
    const filtered = animals.filter((animal) => {
      const matchesSearch =
        animal.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        animal.breed.toLowerCase().includes(filters.search.toLowerCase())
      const matchesSize = !filters.size || animal.size === filters.size
      const matchesLocation = !filters.location || animal.location.includes(filters.location)
      const matchesVaccinated = !filters.vaccinated || animal.vaccinated
      const matchesNeutered = !filters.neutered || animal.neutered

      return matchesSearch && matchesSize && matchesLocation && matchesVaccinated && matchesNeutered
    })

    setFilteredAnimals(filtered)
  }, [animals, filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  if (loading) {
    return (
      <div className="animals-page">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Carregando animais...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animals-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Animais Disponíveis para Adoção</h1>
          <p className="page-subtitle">
            Encontre seu novo melhor amigo entre nossos {animals.length} animais cadastrados
          </p>
        </div>

        <SearchFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="results-info">
          <p className="results-count">
            {filteredAnimals.length} {filteredAnimals.length === 1 ? "animal encontrado" : "animais encontrados"}
          </p>
        </div>

        {filteredAnimals.length > 0 ? (
          <div className="animals-grid">
            {filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>Nenhum animal encontrado</h3>
            <p>Tente ajustar os filtros para encontrar mais opções</p>
            <button
              className="btn btn-outline"
              onClick={() =>
                setFilters({
                  search: "",
                  size: "",
                  age: "",
                  location: "",
                  vaccinated: false,
                  neutered: false,
                })
              }
            >
              Limpar Filtros
            </button>
          </div>
        )}

        {filteredAnimals.length > 0 && (
          <div className="load-more">
            <button className="btn btn-outline btn-lg">Carregar Mais Animais</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Animals
