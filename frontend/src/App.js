import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastProvider } from "./contexts/ToastContext"
import "./App.css"
import "./index.css"

// Components
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Toast from "./components/Toast/Toast"

// Pages
import Home from "./pages/Home/Home"
import Animals from "./pages/Animals/Animals"
import AnimalDetail from "./pages/AnimalDetail/AnimalDetail"
import Adoption from "./pages/Adoption/Adoption"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"
import Admin from "./pages/Admin/Admin"
import AdminAnimals from "./pages/Admin/AdminAnimals"
import AdminAdoptions from "./pages/Admin/AdminAdoptions"
import AdminUsers from "./pages/Admin/AdminUsers"
import NotFound from "./pages/NotFound/NotFound"

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/animals" element={<Animals />} />
                <Route path="/animal/:id" element={<AnimalDetail />} />
                <Route path="/adoption" element={<Adoption />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/animals"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminAnimals />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/adoptions"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminAdoptions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminUsers />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
