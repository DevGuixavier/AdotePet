"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AnimalCard from "../../components/AnimalCard/AnimalCard"
import { animalsAPI } from "../../services/api"
import adocaoCachorro from "../../assets/images/adocao-cachorro.jpg"
import "./Home.css"

const Home = () => {
  const [featuredAnimals, setFeaturedAnimals] = useState([])
  const [stats, setStats] = useState({
    total: 335,
    available: 327,
    adopted: 650,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch stats
      const statsResponse = await animalsAPI.getStats()
      setStats(statsResponse.data)

      // Fetch featured animals
      const animalsResponse = await animalsAPI.getAnimals({ per_page: 3 })
      setFeaturedAnimals(animalsResponse.data.animals)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Encontre seu novo
                <span className="hero-highlight"> melhor amigo</span>
              </h1>
              <p className="hero-subtitle">
                Conectamos animais abandonados com famílias amorosas. Cada adoção é uma segunda chance para a
                felicidade. Adote, não compre.
              </p>
              <div className="hero-actions">
                <Link to="/animals" className="btn btn-primary btn-lg">
                  <i className="fas fa-search"></i>
                  Encontrar Animais
                </Link>
                <Link to="/adoption" className="btn btn-outline btn-lg">
                  <i className="fas fa-heart"></i>
                  Como Adotar
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-image-container">
                <img
                  src={adocaoCachorro}
                  alt="Cachorro feliz esperando adoção"
                  className="hero-main-image"
                />
                <div className="hero-floating-card">
                  <div className="floating-card-content">
                    <i className="fas fa-home floating-card-icon"></i>
                    <div>
                      <div className="floating-card-number">{stats.adopted}+</div>
                      <div className="floating-card-text">Animais Adotados</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-paw"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{loading ? "..." : stats.total}</div>
                <div className="stat-label">Animais Cadastrados</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-heart"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{loading ? "..." : stats.adopted}</div>
                <div className="stat-label">Famílias Felizes</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-home"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{loading ? "..." : stats.available}</div>
                <div className="stat-label">Esperando um Lar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Animals */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Animais em Destaque</h2>
            <p className="section-subtitle">
              Conheça alguns dos nossos amiguinhos especiais que estão procurando uma família
            </p>
          </div>

          {loading ? (
            <div className="loading-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="loading-card">
                  <div className="loading-image"></div>
                  <div className="loading-content">
                    <div className="loading-line"></div>
                    <div className="loading-line short"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="animals-grid">
              {featuredAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          )}

          <div className="section-footer">
            <Link to="/animals" className="btn btn-outline btn-lg">
              Ver Todos os Animais
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Como Funciona</h2>
            <p className="section-subtitle">Processo simples e seguro para adoção responsável</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="step-title">Encontre seu Pet</h3>
              <p className="step-description">
                Navegue pelos nossos animais disponíveis e encontre aquele que combina com você e sua família
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h3 className="step-title">Preencha o Formulário</h3>
              <p className="step-description">
                Complete o formulário de interesse com suas informações e conte por que quer adotar
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3 className="step-title">Conheça o Animal</h3>
              <p className="step-description">
                Agende uma visita para conhecer pessoalmente o animal e ver se há compatibilidade
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-icon">
                <i className="fas fa-home"></i>
              </div>
              <h3 className="step-title">Leve para Casa</h3>
              <p className="step-description">
                Após aprovação, finalize a adoção e leve seu novo melhor amigo para casa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">
              <i className="fas fa-paw"></i>
            </div>
            <h2 className="cta-title">Pronto para Mudar uma Vida?</h2>
            <p className="cta-subtitle">
              Milhares de animais estão esperando por uma família amorosa. Seja a diferença na vida de um animal hoje
              mesmo.
            </p>
            <div className="cta-actions">
              <Link to="/animals" className="btn btn-primary btn-xl">
                Adotar Agora
              </Link>
              <Link to="/about" className="btn btn-outline btn-xl">
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
