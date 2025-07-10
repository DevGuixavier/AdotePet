import "./About.css"

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-title">Nossa Missão</h1>
            <p className="about-subtitle">
              Conectamos animais abandonados com famílias amorosas, promovendo a adoção responsável e transformando
              vidas através do amor incondicional.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-title">Nossa História</h2>
              <p>
                O AdotePet nasceu em 2020 com um propósito simples mas poderoso: reduzir o número de animais abandonados
                nas ruas e conectá-los com famílias que possam oferecer amor, cuidado e um lar seguro.
              </p>
              <p>
                Começamos como um pequeno grupo de voluntários apaixonados por animais, e hoje somos uma organização que
                já facilitou mais de 500 adoções, transformando a vida de centenas de animais e famílias.
              </p>
              <p>
                Acreditamos que cada animal merece uma segunda chance e que a adoção responsável é a chave para resolver
                o problema do abandono animal em nosso país.
              </p>
            </div>
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=400&fit=crop"
                alt="Voluntários cuidando de animais"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nossos Valores</h2>
            <p className="section-subtitle">Os princípios que guiam nosso trabalho diário</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3 className="value-title">Amor e Compaixão</h3>
              <p className="value-description">
                Tratamos cada animal com amor, respeito e dignidade, reconhecendo seu valor único e direito à
                felicidade.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3 className="value-title">Adoção Responsável</h3>
              <p className="value-description">
                Promovemos adoções conscientes, garantindo que cada animal encontre a família ideal para suas
                necessidades.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3 className="value-title">Transparência</h3>
              <p className="value-description">
                Mantemos total transparência em nossos processos, fornecendo informações completas sobre cada animal.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🏥</div>
              <h3 className="value-title">Bem-estar Animal</h3>
              <p className="value-description">
                Priorizamos a saúde física e emocional dos animais, oferecendo cuidados veterinários e reabilitação.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">👥</div>
              <h3 className="value-title">Comunidade</h3>
              <p className="value-description">
                Construímos uma comunidade forte de adotantes, voluntários e parceiros unidos pela causa animal.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">📚</div>
              <h3 className="value-title">Educação</h3>
              <p className="value-description">
                Educamos sobre posse responsável, cuidados veterinários e a importância da castração e vacinação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nossa Equipe</h2>
            <p className="section-subtitle">Conheça as pessoas dedicadas que tornam nossa missão possível</p>
          </div>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-image">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
                  alt="Maria Silva"
                />
              </div>
              <div className="team-info">
                <h3 className="team-name">Maria Silva</h3>
                <p className="team-role">Fundadora & Diretora</p>
                <p className="team-description">
                  Veterinária apaixonada por animais, fundou o AdotePet com o sonho de reduzir o abandono animal.
                </p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-image">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="João Santos"
                />
              </div>
              <div className="team-info">
                <h3 className="team-name">João Santos</h3>
                <p className="team-role">Coordenador de Adoções</p>
                <p className="team-description">
                  Especialista em comportamento animal, responsável por garantir matches perfeitos entre pets e
                  famílias.
                </p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-image">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
                  alt="Ana Costa"
                />
              </div>
              <div className="team-info">
                <h3 className="team-name">Ana Costa</h3>
                <p className="team-role">Coordenadora de Voluntários</p>
                <p className="team-description">
                  Gerencia nossa rede de voluntários dedicados e organiza eventos de conscientização.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nosso Impacto</h2>
            <p className="section-subtitle">Números que mostram a diferença que fazemos juntos</p>
          </div>

          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-number">500+</div>
              <div className="impact-label">Animais Adotados</div>
              <div className="impact-description">Vidas transformadas através da adoção responsável</div>
            </div>

            <div className="impact-card">
              <div className="impact-number">300+</div>
              <div className="impact-label">Famílias Felizes</div>
              <div className="impact-description">Lares que receberam um novo membro da família</div>
            </div>

            <div className="impact-card">
              <div className="impact-number">150+</div>
              <div className="impact-label">Voluntários Ativos</div>
              <div className="impact-description">Pessoas dedicadas à causa animal</div>
            </div>

            <div className="impact-card">
              <div className="impact-number">50+</div>
              <div className="impact-label">Parceiros</div>
              <div className="impact-description">Clínicas, petshops e organizações parceiras</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Faça Parte da Nossa Missão</h2>
            <p className="cta-subtitle">
              Seja voluntário, adote um animal ou ajude de outras formas. Juntos podemos salvar mais vidas.
            </p>
            <div className="cta-actions">
              <a href="/contact" className="btn btn-primary btn-lg">
                Seja Voluntário
              </a>
              <a href="/animals" className="btn btn-outline btn-lg">
                Adotar Agora
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
