import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

const navItems = [
  { label: 'Home', path: '/dashboard', icon: '🏠' },
  { label: 'Games', path: '/games', icon: '🎮' },
  { label: 'Science', path: '/science', icon: '🔬' },
  { label: 'AI Tutor', path: '/ai-tutor', icon: '🤖' },
  { label: 'Worksheets', path: '/worksheets', icon: '📝' },
]

export default function Navbar() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const initials = (profile?.full_name || 'E')[0].toUpperCase()

  return (
    <>
      {/* Desktop top nav */}
      <nav className="bg-white border-b border-brand-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="font-display font-900 text-brand-600 text-xl">BrightPath</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl font-display font-600 text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-brand-500 text-white'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-600'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
            {profile?.role === 'admin' && (
              <Link to="/admin" className="px-4 py-2 rounded-xl font-display font-600 text-sm text-orange-600 hover:bg-orange-50">
                🛡️ Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Stars */}
            <div className="hidden md:flex items-center gap-2 bg-sun-400/20 rounded-2xl px-3 py-1.5">
              <span>⭐</span>
              <span className="font-display font-700 text-amber-700">{profile?.stars ?? 0}</span>
            </div>

            {/* Profile avatar */}
            <Link to="/profile" className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-white font-display font-900 text-sm">
                {initials}
              </div>
            </Link>

            {/* Mobile menu toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl hover:bg-brand-50">
              <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
            </button>

            <button onClick={handleSignOut} className="hidden md:block text-sm text-gray-400 hover:text-gray-600 font-body">
              Sign out
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-brand-100 px-4 py-3 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-display font-600 transition-colors ${
                  location.pathname === item.path
                    ? 'bg-brand-500 text-white'
                    : 'text-gray-700 hover:bg-brand-50'
                }`}
              >
                <span>{item.icon}</span> {item.label}
              </Link>
            ))}
            <Link to="/profile" onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-display font-600 transition-colors ${
                location.pathname === '/profile' ? 'bg-brand-500 text-white' : 'text-gray-700 hover:bg-brand-50'
              }`}>
              <span>👤</span> My Profile
            </Link>
            {profile?.role === 'admin' && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-display font-600 text-orange-600 hover:bg-orange-50">
                🛡️ Admin Panel
              </Link>
            )}
            <button onClick={handleSignOut} className="w-full text-left px-4 py-3 rounded-xl font-body text-gray-500 hover:bg-gray-50">
              Sign out
            </button>
          </div>
        )}
      </nav>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-brand-100 z-50 flex">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex-1 flex flex-col items-center py-2 text-xs font-display font-600 transition-colors ${
              location.pathname === item.path ? 'text-brand-600' : 'text-gray-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
        <Link to="/profile"
          className={`flex-1 flex flex-col items-center py-2 text-xs font-display font-600 transition-colors ${
            location.pathname === '/profile' ? 'text-brand-600' : 'text-gray-400'
          }`}>
          <span className="text-xl">👤</span>
          <span>Profile</span>
        </Link>
      </div>
    </>
  )
}