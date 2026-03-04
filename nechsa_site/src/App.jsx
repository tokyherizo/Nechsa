import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

// Layout
import MainLayout from '@/components/layout/MainLayout'
import AuthLayout from '@/components/layout/AuthLayout'
import DashboardLayout from '@/components/layout/DashboardLayout'

// Pages
import LandingPage from '@/pages/Landing/LandingPage'
import LoginPage from '@/pages/Auth/LoginPage'
import RegisterPage from '@/pages/Auth/RegisterPage'
import DashboardPage from '@/pages/Dashboard/DashboardPage'
import CompaniesPage from '@/pages/Companies/CompaniesPage'
import CompanyProfilePage from '@/pages/Companies/CompanyProfilePage'
import ProjectsPage from '@/pages/Projects/ProjectsPage'
import ProjectDetailPage from '@/pages/Projects/ProjectDetailPage'
import CreateProjectPage from '@/pages/Projects/CreateProjectPage'
import MessagesPage from '@/pages/Messages/MessagesPage'
import MarketplacePage from '@/pages/Marketplace/MarketplacePage'
import ContractsPage from '@/pages/Contracts/ContractsPage'
import MatchingPage from '@/pages/Matching/MatchingPage'
import SettingsPage from '@/pages/Settings/SettingsPage'
import NotFoundPage from '@/pages/NotFoundPage'

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />
}

export default function App() {
  return (
    <Routes>
      {/* Public landing */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/company/:id" element={<CompanyProfilePage />} />
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      </Route>

      {/* Protected dashboard routes */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/create" element={<CreateProjectPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/:id" element={<MessagesPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
