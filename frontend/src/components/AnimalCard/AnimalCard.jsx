import { Link } from "react-router-dom"
import "./AnimalCard.css"

const AnimalCard = ({ animal }) => {
  const { id, name, age, breed, size, location, vaccinated, neutered, microchipped, species } = animal

  const getSpeciesIcon = (species) => {
    switch (species?.toLowerCase()) {
      case "dog":
        return "fas fa-dog"
      case "cat":
        return "fas fa-cat"
      default:
        return "fas fa-paw"
    }
  }

  return (
    <div className="animal-card">
      <div className="animal-image">
        <img
          src={animal.image}
          alt={animal.name}
        />
      </div>
      <div className="animal-status">
        <span className="status-badge available">
          <i className="fas fa-check"></i>
          Disponível
        </span>
      </div>
      <button className="favorite-btn" title="Adicionar aos favoritos">
        <i className="far fa-heart"></i>
      </button>

      <div className="animal-info">
        <div className="animal-header">
          <h3 className="animal-name">{name}</h3>
          <div className="animal-species">
            <i className={getSpeciesIcon(species)}></i>
          </div>
        </div>

        <div className="animal-details">
          <div className="detail-item">
            <i className="fas fa-birthday-cake"></i>
            <span>{age}</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-dna"></i>
            <span>{breed}</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-ruler-vertical"></i>
            <span>{size}</span>
          </div>
        </div>

        <div className="health-info">
          {vaccinated && (
            <span className="health-badge">
              <i className="fas fa-syringe"></i>
              Vacinado
            </span>
          )}
          {neutered && (
            <span className="health-badge">
              <i className="fas fa-cut"></i>
              Castrado
            </span>
          )}
          {microchipped && (
            <span className="health-badge">
              <i className="fas fa-microchip"></i>
              Chip
            </span>
          )}
        </div>

        <div className="animal-location">
          <i className="fas fa-map-marker-alt location-icon"></i>
          <span>{location}</span>
        </div>

        <div className="animal-actions">
          <Link to={`/animal/${id}`} className="btn btn-primary">
            <i className="fas fa-heart"></i>
            Quero Adotar
          </Link>
          <Link to={`/animal/${id}`} className="btn btn-outline">
            <i className="fas fa-eye"></i>
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AnimalCard
