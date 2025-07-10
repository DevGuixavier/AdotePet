"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import "./Header.css"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsUserMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            <div className="logo">
              <i className="fas fa-paw logo-icon"></i>
              <span className="logo-text">AdotePet</span>
            </div>
          </Link>

          <button className={`navbar-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${isActive("/")}`}>
                  <i className="fas fa-home"></i>
                  Início
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/animals" className={`nav-link ${isActive("/animals")}`}>
                  <i className="fas fa-dog"></i>
                  Animais
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/adoption" className={`nav-link ${isActive("/adoption")}`}>
                  <i className="fas fa-heart"></i>
                  Como Adotar
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${isActive("/about")}`}>
                  <i className="fas fa-info-circle"></i>
                  Sobre
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className={`nav-link ${isActive("/contact")}`}>
                  <i className="fas fa-envelope"></i>
                  Contato
                </Link>
              </li>
            </ul>

            <div className="navbar-actions">
              {isAuthenticated ? (
                <div className="user-menu">
                  <button className="user-menu-trigger" onClick={toggleUserMenu}>
                    <div className="user-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <span className="user-name">{user?.full_name || "Usuário"}</span>
                    <i className="fas fa-chevron-down chevron"></i>
                  </button>

                  {isUserMenuOpen && (
                    <div className="user-menu-dropdown">
                      <Link to="/profile" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                        <i className="fas fa-user dropdown-icon"></i>
                        Meu Perfil
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                          <i className="fas fa-cog dropdown-icon"></i>
                          Administração
                        </Link>
                      )}
                      <hr className="dropdown-divider" />
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt dropdown-icon"></i>
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="btn btn-ghost">
                    <i className="fas fa-sign-in-alt"></i>
                    Entrar
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    <i className="fas fa-user-plus"></i>
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
