import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layouts
import LandingLayout from './layouts/LandingLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import MockInterviewPage from './pages/MockInterviewPage'
import CodingPracticePage from './pages/CodingPracticePage'
import ResumePage from './pages/ResumePage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public Routes */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/interviews" element={<MockInterviewPage />} />
          <Route path="/coding" element={<CodingPracticePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
