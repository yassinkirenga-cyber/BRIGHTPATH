import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

const grades = ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12']
const curricula = ['IB (International Baccalaureate)','Cambridge IGCSE','Cambridge A-Level','Cambridge Primary']

export default function Signup() {
  const { signUp, supabaseReady } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', grade: '', curriculum: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.fullName || !form.email || !form.password || !form.grade || !form.curriculum) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await signUp(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">⭐</span>
            <span className="font-display font-900 text-white text-3xl">BrightPath</span>
          </Link>
          <p className="text-white/80 font-body">Create your free account — 7-day trial included!</p>
        </div>

        <div className="card">
          <h2 className="font-display font-800 text-gray-800 text-2xl mb-6 text-center">Join BrightPath 🚀</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 mb-4 font-body text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-display font-600 text-gray-700 text-sm mb-1">Full name</label>
              <input name="fullName" value={form.fullName} onChange={handleChange}
                placeholder="e.g. Marie Uwase" className="input-field" />
            </div>
            <div>
              <label className="block font-display font-600 text-gray-700 text-sm mb-1">Email address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="your@email.com" className="input-field" />
            </div>
            <div>
              <label className="block font-display font-600 text-gray-700 text-sm mb-1">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange}
                placeholder="Minimum 8 characters" className="input-field" />
            </div>
            <div>
              <label className="block font-display font-600 text-gray-700 text-sm mb-1">Your grade</label>
              <select name="grade" value={form.grade} onChange={handleChange} className="input-field bg-white">
                <option value="">Select your grade</option>
                {grades.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-display font-600 text-gray-700 text-sm mb-1">Curriculum</label>
              <select name="curriculum" value={form.curriculum} onChange={handleChange} className="input-field bg-white">
                <option value="">Select your curriculum</option>
                {curricula.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? '⏳ Creating account...' : '🎉 Start my free trial'}
            </button>
          </form>

          <p className="text-center text-gray-500 font-body text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-600 hover:underline">Log in</Link>
          </p>

          <div className="mt-4 p-3 bg-brand-50 rounded-2xl text-center">
            <p className="text-brand-700 font-body text-xs">
              🔒 7-day free trial · Then 5,000 RWF/month · Pay via MoMo after trial
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
