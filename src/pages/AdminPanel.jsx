import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import { supabase } from '../lib/supabase.js'

const MOCK_STUDENTS = [
  { id: 1, full_name: 'Amina Uwase', email: 'amina@example.com', grade: 'Grade 9', curriculum: 'Cambridge IGCSE', subscription_status: 'active', stars: 142, created_at: '2025-06-01' },
  { id: 2, full_name: 'Jean Paul Nkurunziza', email: 'jeanpaul@example.com', grade: 'Grade 11', curriculum: 'IB', subscription_status: 'trial', stars: 89, created_at: '2025-06-15' },
  { id: 3, full_name: 'Grace Mutoni', email: 'grace@example.com', grade: 'Grade 7', curriculum: 'Cambridge Primary', subscription_status: 'pending', stars: 34, created_at: '2025-06-20' },
  { id: 4, full_name: 'Eric Habimana', email: 'eric@example.com', grade: 'Grade 10', curriculum: 'Cambridge IGCSE', subscription_status: 'active', stars: 201, created_at: '2025-06-03' },
]

const statusColors = {
  active: 'bg-green-100 text-green-700',
  trial: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
  expired: 'bg-red-100 text-red-700',
}

export default function AdminPanel() {
  const [students, setStudents] = useState(MOCK_STUDENTS)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('students')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    if (supabase) {
      setLoading(true)
      supabase.from('profiles').select('*').order('created_at', { ascending: false })
        .then(({ data }) => {
          if (data && data.length > 0) setStudents(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [])

  const updateStatus = async (id, status) => {
    if (supabase) {
      await supabase.from('profiles').update({ subscription_status: status }).eq('id', id)
    }
    setStudents(prev => prev.map(s => s.id === id ? { ...s, subscription_status: status } : s))
    setNotification(`Student status updated to "${status}"`)
    setTimeout(() => setNotification(''), 3000)
  }

  const filtered = students.filter(s =>
    s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total: students.length,
    active: students.filter(s => s.subscription_status === 'active').length,
    trial: students.filter(s => s.subscription_status === 'trial').length,
    pending: students.filter(s => s.subscription_status === 'pending').length,
    revenue: students.filter(s => s.subscription_status === 'active').length * 5000,
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🛡️</span>
          <div>
            <h1 className="font-display font-900 text-gray-800 text-2xl">Admin Panel</h1>
            <p className="font-body text-gray-400 text-sm">Full control of BrightPath</p>
          </div>
        </div>

        {notification && (
          <div className="bg-green-100 border border-green-300 text-green-800 font-display font-600 px-4 py-3 rounded-2xl mb-4">
            ✓ {notification}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: 'Total students', value: stats.total, icon: '👥' },
            { label: 'Active', value: stats.active, icon: '✅' },
            { label: 'On trial', value: stats.trial, icon: '⏳' },
            { label: 'Pending payment', value: stats.pending, icon: '💳' },
            { label: 'Revenue (RWF)', value: `${stats.revenue.toLocaleString()}`, icon: '💰' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-display font-900 text-xl text-gray-800">{stat.value}</div>
              <div className="font-body text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {['students', 'payments'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl font-display font-600 text-sm capitalize transition-colors ${tab === t ? 'bg-brand-500 text-white' : 'bg-white text-gray-600 hover:bg-brand-50'}`}>
              {t === 'students' ? '👥 Students' : '💳 Payments'}
            </button>
          ))}
        </div>

        {tab === 'students' && (
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-brand-400"
              />
            </div>

            {loading && <p className="text-center py-8 font-body text-gray-400">Loading students...</p>}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-display font-700 text-gray-400 uppercase tracking-wide border-b border-gray-100">
                    <th className="text-left px-4 py-3">Student</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Grade / Curriculum</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Stars</th>
                    <th className="text-left px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(student => (
                    <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-display font-700 text-gray-800 text-sm">{student.full_name}</p>
                        <p className="font-body text-gray-400 text-xs">{student.email}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="font-body text-gray-600 text-sm">{student.grade}</p>
                        <p className="font-body text-gray-400 text-xs">{student.curriculum}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-display font-700 px-2 py-1 rounded-full ${statusColors[student.subscription_status] || 'bg-gray-100 text-gray-500'}`}>
                          {student.subscription_status}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="font-display font-600 text-amber-600 text-sm">⭐ {student.stars}</span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={student.subscription_status}
                          onChange={e => updateStatus(student.id, e.target.value)}
                          className="text-xs font-display font-600 border border-gray-200 rounded-xl px-2 py-1 bg-white focus:outline-none focus:border-brand-400"
                        >
                          <option value="trial">Trial</option>
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="expired">Expired</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'payments' && (
          <div className="card">
            <h2 className="font-display font-700 text-gray-700 text-lg mb-4">💳 Payment instructions for students</h2>
            <div className="bg-brand-50 rounded-2xl p-4 mb-4">
              <p className="font-display font-700 text-brand-700 mb-2">Your current setup:</p>
              <ul className="space-y-1 font-body text-gray-600 text-sm">
                <li>• MoMo number: <strong>Update in Subscribe.jsx</strong></li>
                <li>• WhatsApp: <strong>Update in Subscribe.jsx and Landing.jsx</strong></li>
                <li>• Price: <strong>5,000 RWF/month</strong></li>
              </ul>
            </div>
            <p className="font-body text-gray-500 text-sm">
              When a student sends payment and confirms via WhatsApp, find them in the Students tab and change their status from "pending" or "trial" to "active".
            </p>
            <div className="mt-4 p-3 bg-amber-50 rounded-2xl">
              <p className="font-display font-600 text-amber-700 text-sm">
                🚀 MTN MoMo API integration available in Phase 2 — this will automate payment activation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
