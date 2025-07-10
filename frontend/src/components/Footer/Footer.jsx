import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <span className="logo-icon">🐾</span>
              <span className="logo-text">AdotePet</span>
            </div>
            <p className="footer-description">
              Conectando animais abandonados com famílias amorosas. Juntos, podemos fazer a diferença na vida desses
              pequenos seres.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                📘
              </a>
              <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                📷
              </a>
              <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                🐦
              </a>
              <a href="https://youtube.com" className="social-link" aria-label="YouTube">
                📺
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Links Rápidos</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/animals">Animais</Link>
              </li>
              <li>
                <Link to="/adoption">Como Adotar</Link>
              </li>
              <li>
                <Link to="/about">Sobre Nós</Link>
              </li>
              <li>
                <Link to="/contact">Contato</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Ajuda</h3>
            <ul className="footer-links">
              <li>
                <button type="button" className="footer-link-btn">FAQ</button>
              </li>
              <li>
                <button type="button" className="footer-link-btn">Termos de Uso</button>
              </li>
              <li>
                <button type="button" className="footer-link-btn">Política de Privacidade</button>
              </li>
              <li>
                <button type="button" className="footer-link-btn">Suporte</button>
              </li>
              <li>
                <button type="button" className="footer-link-btn">Denunciar</button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contato</h3>
            <div className="contact-info">
              <p>📧 contato@adotepet.com</p>
              <p>📞 (11) 99999-9999</p>
              <p>📍 São Paulo, SP</p>
            </div>
            <div className="newsletter">
              <h4>Newsletter</h4>
              <div className="newsletter-form">
                <input type="email" placeholder="Seu e-mail" className="newsletter-input" />
                <button className="newsletter-btn">✉️</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 AdotePet. Todos os direitos reservados.</p>
          <p>Feito com ❤️ para ajudar animais a encontrarem um lar.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
