"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useToast } from "../../contexts/ToastContext"
import { adoptionsAPI } from "../../services/api"
import "./Adoption.css"

const Adoption = () => {
  const { animalId } = useParams()
  const navigate = useNavigate()
  const { success, error } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    animal_id: animalId || "",
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    reason: "",
    has_experience: false,
    has_other_pets: false,
    other_pets_description: "",
    has_children: false,
    children_ages: "",
    housing_type: "",
    has_yard: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await adoptionsAPI.createAdoptionRequest(formData)
      success("Solicitação de adoção enviada com sucesso!")
      navigate("/animals")
    } catch (err) {
      const message = err.response?.data?.error || "Erro ao enviar solicitação"
      error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="adoption-page">
      <div className="container">
        {/* Header */}
        <div className="adoption-header">
          <h1 className="adoption-title">
            <i className="fas fa-heart"></i>
            Formulário de Adoção
          </h1>
          <p className="adoption-subtitle">
            Preencha as informações abaixo para solicitar a adoção. Nossa equipe analisará sua solicitação e entrará em
            contato em breve.
          </p>
        </div>

        {/* Process Steps */}
        <div className="process-steps">
          <div className="step active">
            <div className="step-number">1</div>
            <div className="step-text">Formulário</div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-text">Análise</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-text">Visita</div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-text">Adoção</div>
          </div>
        </div>

        {/* Form */}
        <div className="adoption-form-container">
          <form className="adoption-form" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="fas fa-user"></i>
                Informações Pessoais
              </h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="full_name" className="form-label">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="form-input"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email *
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
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zip_code" className="form-label">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="zip_code"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="fas fa-home"></i>
                Endereço
              </h3>

              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Endereço Completo
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state" className="form-label">
                    Estado
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-select"
                    disabled={loading}
                  >
                    <option value="">Selecione o estado</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="PR">Paraná</option>
                    <option value="SC">Santa Catarina</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Housing Information */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="fas fa-building"></i>
                Informações da Moradia
              </h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="housing_type" className="form-label">
                    Tipo de Moradia
                  </label>
                  <select
                    id="housing_type"
                    name="housing_type"
                    value={formData.housing_type}
                    onChange={handleChange}
                    className="form-select"
                    disabled={loading}
                  >
                    <option value="">Selecione</option>
                    <option value="house">Casa</option>
                    <option value="apartment">Apartamento</option>
                    <option value="farm">Sítio/Chácara</option>
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="has_yard"
                      checked={formData.has_yard}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span className="checkbox-text">Possui quintal/área externa</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Family Information */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="fas fa-users"></i>
                Informações da Família
              </h3>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="has_children"
                    checked={formData.has_children}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span className="checkbox-text">Possui crianças em casa</span>
                </label>
              </div>

              {formData.has_children && (
                <div className="form-group">
                  <label htmlFor="children_ages" className="form-label">
                    Idades das crianças
                  </label>
                  <input
                    type="text"
                    id="children_ages"
                    name="children_ages"
                    value={formData.children_ages}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ex: 5, 8, 12 anos"
                    disabled={loading}
                  />
                </div>
              )}

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="has_other_pets"
                    checked={formData.has_other_pets}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span className="checkbox-text">Possui outros animais</span>
                </label>
              </div>

              {formData.has_other_pets && (
                <div className="form-group">
                  <label htmlFor="other_pets_description" className="form-label">
                    Descreva seus outros animais
                  </label>
                  <textarea
                    id="other_pets_description"
                    name="other_pets_description"
                    value={formData.other_pets_description}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="3"
                    disabled={loading}
                  />
                </div>
              )}

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="has_experience"
                    checked={formData.has_experience}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span className="checkbox-text">Tenho experiência com animais</span>
                </label>
              </div>
            </div>

            {/* Motivation */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="fas fa-heart"></i>
                Motivação para Adoção
              </h3>

              <div className="form-group">
                <label htmlFor="reason" className="form-label">
                  Por que você quer adotar este animal? *
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="5"
                  required
                  disabled={loading}
                  placeholder="Conte-nos sobre sua motivação, experiência com animais e como pretende cuidar do pet..."
                />
              </div>
            </div>

            {/* Submit */}
            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Enviar Solicitação
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Information Cards */}
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h4>Tempo de Resposta</h4>
            <p>Nossa equipe analisa todas as solicitações em até 48 horas úteis.</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h4>Processo Seguro</h4>
            <p>Todas as informações são tratadas com confidencialidade e segurança.</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h4>Suporte Contínuo</h4>
            <p>Oferecemos suporte mesmo após a adoção para garantir o bem-estar do animal.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adoption
