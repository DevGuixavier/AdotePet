"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { animalsAPI, adoptionsAPI, usersAPI } from "../../services/api"
import "./Admin.css"

const Admin = () => {
  const [stats, setStats] = useState({
    animals: { total: 0, available: 0, adopted: 0 },
    adoptions: { total: 0, pending: 0, approved: 0 },
    users: { total: 0, active: 0, admins: 0 },
  })
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [animalsStats, adoptionsStats, usersStats] = await Promise.all([
        animalsAPI.getStats(),
        adoptionsAPI.getStats(),
        usersAPI.getStats(),
      ])

      setStats({
        animals: animalsStats.data,
        adoptions: adoptionsStats.data,
        users: usersStats.data,
      })

      // Mock recent activity
      setRecentActivity([
        {
          id: 1,
          type: "adoption",
          message: "Nova solicitação de adoção para Luna",
          time: "2 minutos atrás",
          icon: "heart",
          color: "primary",
        },
        {
          id: 2,
          type: "animal",
          message: "Animal Max foi adicionado ao sistema",
          time: "1 hora atrás",
          icon: "plus",
          color: "success",
        },
        {
          id: 3,
          type: "user",
          message: "Novo usuário cadastrado: Maria Silva",
          time: "3 horas atrás",
          icon: "user-plus",
          color: "info",
        },
        {
          id: 4,
          type: "adoption",
          message: "Adoção de Bella foi aprovada",
          time: "5 horas atrás",
          icon: "check",
          color: "success",
        },
      ])
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, subtitle, icon, color, link }) => (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <div className="stat-content">
        <div className="stat-value">{loading ? "..." : value}</div>
        <div className="stat-title">{title}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
      {link && (
        <Link to={link} className="stat-link">
          <i className="fas fa-arrow-right"></i>
        </Link>
      )}
    </div>
  )

  const QuickAction = ({ title, description, icon, color, link }) => (
    <Link to={link} className={`quick-action ${color}`}>
      <div className="action-icon">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <div className="action-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="action-arrow">
        <i className="fas fa-chevron-right"></i>
      </div>
    </Link>
  )

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div className="header-content">
            <h1 className="admin-title">
              <i className="fas fa-tachometer-alt"></i>
              Painel Administrativo
            </h1>
            <p className="admin-subtitle">Gerencie o sistema AdotePet</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline" onClick={fetchStats}>
              <i className="fas fa-sync-alt"></i>
              Atualizar
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-section">
          <h2 className="section-title">Visão Geral</h2>
          <div className="stats-grid">
            <StatCard
              title="Total de Animais"
              value={stats.animals.total}
              subtitle={`${stats.animals.available} disponíveis`}
              icon="paw"
              color="primary"
              link="/admin/animals"
            />
            <StatCard
              title="Animais Adotados"
              value={stats.animals.adopted}
              subtitle="Famílias felizes"
              icon="home"
              color="success"
              link="/admin/animals"
            />
            <StatCard
              title="Solicitações"
              value={stats.adoptions.total}
              subtitle={`${stats.adoptions.pending} pendentes`}
              icon="clipboard-list"
              color="warning"
              link="/admin/adoptions"
            />
            <StatCard
              title="Usuários"
              value={stats.users.total}
              subtitle={`${stats.users.active} ativos`}
              icon="users"
              color="info"
              link="/admin/users"
            />
          </div>
        </div>

        <div className="admin-content">
          <div className="content-left">
            {/* Quick Actions */}
            <div className="quick-actions-section">
              <h2 className="section-title">Ações Rápidas</h2>
              <div className="quick-actions-grid">
                <QuickAction
                  title="Adicionar Animal"
                  description="Cadastrar novo animal para adoção"
                  icon="plus"
                  color="primary"
                  link="/admin/animals?action=add"
                />
                <QuickAction
                  title="Gerenciar Adoções"
                  description="Revisar solicitações pendentes"
                  icon="heart"
                  color="warning"
                  link="/admin/adoptions"
                />
                <QuickAction
                  title="Usuários"
                  description="Gerenciar contas de usuários"
                  icon="user-cog"
                  color="info"
                  link="/admin/users"
                />
                <QuickAction
                  title="Relatórios"
                  description="Visualizar relatórios detalhados"
                  icon="chart-bar"
                  color="success"
                  link="/admin/reports"
                />
              </div>
            </div>

            {/* Charts Section */}
            <div className="charts-section">
              <h2 className="section-title">Estatísticas</h2>
              <div className="charts-grid">
                <div className="chart-card">
                  <h3>Adoções por Mês</h3>
                  <div className="chart-placeholder">
                    <i className="fas fa-chart-line"></i>
                    <p>Gráfico de adoções mensais</p>
                  </div>
                </div>
                <div className="chart-card">
                  <h3>Animais por Espécie</h3>
                  <div className="chart-placeholder">
                    <i className="fas fa-chart-pie"></i>
                    <p>Distribuição por espécie</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            {/* Recent Activity */}
            <div className="activity-section">
              <h2 className="section-title">Atividade Recente</h2>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className={`activity-item ${activity.color}`}>
                    <div className="activity-icon">
                      <i className={`fas fa-${activity.icon}`}></i>
                    </div>
                    <div className="activity-content">
                      <p className="activity-message">{activity.message}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="activity-footer">
                <Link to="/admin/activity" className="btn btn-outline btn-sm">
                  Ver Todas
                </Link>
              </div>
            </div>

            {/* System Status */}
            <div className="status-section">
              <h2 className="section-title">Status do Sistema</h2>
              <div className="status-list">
                <div className="status-item">
                  <div className="status-indicator success"></div>
                  <div className="status-content">
                    <span className="status-label">Banco de Dados</span>
                    <span className="status-value">Online</span>
                  </div>
                </div>
                <div className="status-item">
                  <div className="status-indicator success"></div>
                  <div className="status-content">
                    <span className="status-label">API</span>
                    <span className="status-value">Funcionando</span>
                  </div>
                </div>
                <div className="status-item">
                  <div className="status-indicator warning"></div>
                  <div className="status-content">
                    <span className="status-label">Armazenamento</span>
                    <span className="status-value">75% usado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
