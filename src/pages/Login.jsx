import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-500 to-brand-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-4xl">⭐</span>
          <h1 className="font-display font-900 text-brand-600 text-2xl mt-2">Welcome back!</h1>
          <p className="text-gray-500 font-body text-sm mt-1">Log in to BrightPath</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 rounded-2xl px-4 py-3 mb-4 text-sm font-body">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in...' : 'Log in →'}
          </button>
        </form>
        <p className="text-center text-gray-500 font-body text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-brand-500 font-600 hover:underline">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}