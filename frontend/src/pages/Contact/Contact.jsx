"use client"

import { useState } from "react"
import { useToast } from "../../contexts/ToastContext"
import "./Contact.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const { success, error } = useToast()

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

    // Simular envio
    setTimeout(() => {
      success("Mensagem enviada com sucesso! Entraremos em contato em breve.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="contact-title">Entre em Contato</h1>
            <p className="contact-subtitle">Tem dúvidas sobre adoção? Quer ser voluntário? Estamos aqui para ajudar!</p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Envie sua Mensagem</h2>
                <p>Preencha o formulário abaixo e responderemos o mais breve possível.</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
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
                      onChange={handleChange}
                      className="form-input"
                      required
                      disabled={loading}
                    />
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

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Assunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-select"
                      required
                      disabled={loading}
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="adoption">Adoção</option>
                      <option value="volunteer">Voluntariado</option>
                      <option value="donation">Doação</option>
                      <option value="partnership">Parceria</option>
                      <option value="other">Outros</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="6"
                    required
                    disabled={loading}
                    placeholder="Conte-nos como podemos ajudar..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <span>📧</span>
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <div className="contact-info-card">
                <h3>Informações de Contato</h3>
                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="contact-icon">📍</div>
                    <div className="contact-details">
                      <div className="contact-label">Endereço</div>
                      <div className="contact-value">
                        Rua das Flores, 123
                        <br />
                        São Paulo, SP - 01234-567
                      </div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-icon">📞</div>
                    <div className="contact-details">
                      <div className="contact-label">Telefone</div>
                      <div className="contact-value">(11) 99999-9999</div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-icon">📧</div>
                    <div className="contact-details">
                      <div className="contact-label">Email</div>
                      <div className="contact-value">contato@adotepet.com</div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-icon">🕒</div>
                    <div className="contact-details">
                      <div className="contact-label">Horário de Funcionamento</div>
                      <div className="contact-value">
                        Segunda a Sexta: 8h às 18h
                        <br />
                        Sábado: 8h às 14h
                        <br />
                        Domingo: Fechado
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="social-card">
                <h3>Redes Sociais</h3>
                <p>Siga-nos nas redes sociais para acompanhar nossas atividades e conhecer mais animais!</p>
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <span className="social-icon">📘</span>
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="social-link instagram">
                    <span className="social-icon">📷</span>
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="social-link twitter">
                    <span className="social-icon">🐦</span>
                    <span>Twitter</span>
                  </a>
                  <a href="#" className="social-link youtube">
                    <span className="social-icon">📺</span>
                    <span>YouTube</span>
                  </a>
                </div>
              </div>

              <div className="emergency-card">
                <h3>Emergências</h3>
                <p>Para casos de emergência com animais abandonados ou em situação de risco:</p>
                <div className="emergency-contact">
                  <div className="emergency-number">(11) 99999-0000</div>
                  <div className="emergency-note">Disponível 24h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Perguntas Frequentes</h2>
            <p className="section-subtitle">Respostas para as dúvidas mais comuns</p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">Como posso adotar um animal?</h3>
              <p className="faq-answer">
                O processo é simples: escolha um animal, preencha o formulário de interesse, agende uma visita e, se
                aprovado, finalize a adoção. Todo o processo é gratuito.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Posso devolver um animal adotado?</h3>
              <p className="faq-answer">
                Entendemos que às vezes a adaptação não funciona. Se necessário, entre em contato conosco para
                discutirmos a melhor solução para o animal.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Como posso ser voluntário?</h3>
              <p className="faq-answer">
                Temos várias formas de voluntariado: cuidado direto com animais, eventos, transporte, divulgação e muito
                mais. Entre em contato para saber como ajudar.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Vocês aceitam doações?</h3>
              <p className="faq-answer">
                Sim! Aceitamos doações de ração, medicamentos, brinquedos, cobertores e também doações financeiras para
                custear tratamentos veterinários.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
