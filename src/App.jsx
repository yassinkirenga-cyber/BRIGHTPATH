import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth.jsx'

// Pages
import Profile from './pages/Profile.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Games from './pages/Games.jsx'
import ScienceFacts from './pages/ScienceFacts.jsx'
import Worksheets from './pages/Worksheets.jsx'
import AITutor from './pages/AITutor.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import Subscribe from './pages/Subscribe.jsx'

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, profile, loading } = useAuth()
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50">
      <div className="text-center">
        <div className="text-6xl mb-4 float">⭐</div>
        <p className="font-display font-700 text-brand-600 text-xl">Loading BrightPath...</p>
      </div>
    </div>
  )
  
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && profile?.role !== 'admin') return <Navigate to="/dashboard" replace />
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/games" element={<ProtectedRoute><Games /></ProtectedRoute>} />
        <Route path="/science" element={<ProtectedRoute><ScienceFacts /></ProtectedRoute>} />
        <Route path="/worksheets" element={<ProtectedRoute><Worksheets /></ProtectedRoute>} />
        <Route path="/ai-tutor" element={<ProtectedRoute><AITutor /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App