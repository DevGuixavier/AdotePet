"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import "./AnimalDetail.css"

const AnimalDetail = () => {
  const { id } = useParams()
  const [animal, setAnimal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchAnimal = async () => {
      setLoading(true)

      // Simular dados do animal
      const mockAnimal = {
        id: Number.parseInt(id),
        name: "Luna",
        age: "2 anos",
        breed: "Dachshund",
        size: "Pequeno",
        weight: "8kg",
        gender: "Fêmea",
        color: "Preto e marrom",
        temperament: "Dócil, brincalhona, carinhosa",
        description:
          "Luna é uma cachorrinha muito especial que chegou até nós após ser encontrada abandonada. Ela é extremamente carinhosa e adora a companhia de pessoas. É muito brincalhona e se adapta bem a apartamentos. Luna já está acostumada com crianças e se dá bem com outros animais.",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luna.jpg-YeOhCDibxlR6dtxDcB3NL8gUqcLwwx.jpeg",
          "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1551717743-4995b6ee9643?w=600&h=400&fit=crop",
        ],
        location: "São Paulo, SP",
        vaccinated: true,
        neutered: true,
        microchipped: true,
        vaccines: ["V10", "Antirrábica", "Giárdia"],
        healthNotes: "Animal saudável, sem problemas de saúde conhecidos.",
        rescueDate: "15/03/2024",
        contact: {
          name: "ONG Patinhas Carentes",
          phone: "(11) 99999-9999",
          email: "contato@patinhascarentes.org",
        },
      }

      setTimeout(() => {
        setAnimal(mockAnimal)
        setLoading(false)
      }, 1000)
    }

    fetchAnimal()
  }, [id])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === animal.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? animal.images.length - 1 : prev - 1))
  }

  if (loading) {
    return (
      <div className="animal-detail-page">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Carregando informações do animal...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!animal) {
    return (
      <div className="animal-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Animal não encontrado</h2>
            <p>O animal que você está procurando não foi encontrado.</p>
            <Link to="/animals" className="btn btn-primary">
              Ver Outros Animais
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animal-detail-page">
      <div className="container">
        <div className="back-button">
          <Link to="/animals" className="btn btn-outline">
            ← Voltar para Animais
          </Link>
        </div>

        <div className="animal-detail">
          <div className="animal-gallery">
            <div className="main-image">
              <img
                src={animal.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${animal.name} - Foto ${currentImageIndex + 1}`}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x400?text=Foto+não+disponível"
                }}
              />
              {animal.images.length > 1 && (
                <>
                  <button className="nav-btn prev-btn" onClick={prevImage}>
                    ‹
                  </button>
                  <button className="nav-btn next-btn" onClick={nextImage}>
                    ›
                  </button>
                </>
              )}
              <div className="status-badge available">Disponível</div>
            </div>

            {animal.images.length > 1 && (
              <div className="thumbnail-gallery">
                {animal.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${animal.name} - Miniatura ${index + 1}`}
                    className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                    onClick={() => setCurrentImageIndex(index)}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100x100?text=Foto"
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="animal-info">
            <div className="animal-header">
              <h1 className="animal-name">{animal.name}</h1>
              <div className="animal-location">
                <span className="location-icon">📍</span>
                <span>{animal.location}</span>
              </div>
            </div>

            <div className="info-cards">
              <div className="info-card">
                <h3>Informações Básicas</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Idade:</span>
                    <span className="value">{animal.age}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Raça:</span>
                    <span className="value">{animal.breed}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Porte:</span>
                    <span className="value">{animal.size}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Peso:</span>
                    <span className="value">{animal.weight}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Sexo:</span>
                    <span className="value">{animal.gender}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Cor:</span>
                    <span className="value">{animal.color}</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Saúde</h3>
                <div className="health-badges">
                  {animal.vaccinated && <span className="health-badge">✓ Vacinado</span>}
                  {animal.neutered && <span className="health-badge">✓ Castrado</span>}
                  {animal.microchipped && <span className="health-badge">✓ Microchipado</span>}
                </div>

                {animal.vaccines && animal.vaccines.length > 0 && (
                  <div className="vaccines">
                    <h4>Vacinas:</h4>
                    <div className="vaccine-list">
                      {animal.vaccines.map((vaccine, index) => (
                        <span key={index} className="vaccine-badge">
                          {vaccine}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {animal.healthNotes && (
                  <div className="health-notes">
                    <h4>Observações:</h4>
                    <p>{animal.healthNotes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="description-card">
              <h3>Sobre {animal.name}</h3>
              <p className="description">{animal.description}</p>

              <div className="temperament">
                <h4>Temperamento:</h4>
                <p>{animal.temperament}</p>
              </div>

              <div className="rescue-info">
                <p>
                  <strong>Data de resgate:</strong> {animal.rescueDate}
                </p>
              </div>
            </div>

            <div className="contact-card">
              <h3>Interessado em adotar {animal.name}?</h3>
              <p>Entre em contato conosco para saber mais sobre o processo de adoção.</p>

              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">🏢</span>
                  <span>{animal.contact.name}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>{animal.contact.phone}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>{animal.contact.email}</span>
                </div>
              </div>

              <div className="action-buttons">
                <Link to="/adoption" className="btn btn-primary btn-lg">
                  Quero Adotar {animal.name}
                </Link>
                <button className="btn btn-outline btn-lg">Compartilhar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimalDetail
