import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import Navbar from '../components/Navbar.jsx'
import { supabase } from '../lib/supabaseClient'

export default function Profile() {
  const { user, profile } = useAuth()
  const [copied, setCopied] = useState(false)
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [grade, setGrade] = useState(profile?.grade || '')
  const [curriculum, setCurriculum] = useState(profile?.curriculum || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const momoNumber = '0783930289'

  const subscriptionLabel = {
    trial: '🎉 Free Trial',
    active: '✅ Active',
    expired: '❌ Expired',
  }[profile?.subscription_status] || '—'

  const trialEnd = profile?.trial_ends_at ? new Date(profile.trial_ends_at) : null
  const daysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd - new Date()) / (1000 * 60 * 60 * 24))) : 0

  function copyMomo() {
    navigator.clipboard.writeText(momoNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleSave() {
    setSaving(true)
    await supabase.from('profiles').update({ full_name: fullName, grade, curriculum }).eq('id', user.id)
    setSaving(false)
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-brand-50 pb-24 md:pb-8">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-14 h-14 rounded-full bg-brand-500 flex items-center justify-center text-white text-2xl font-display font-900">
            {(profile?.full_name || 'E')[0].toUpperCase()}
          </div>
          <div>
            <h1 className="font-display font-900 text-gray-800 text-2xl">{profile?.full_name || 'Explorer'}</h1>
            <p className="text-gray-400 font-body text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display font-800 text-gray-700 text-lg">Your details</h2>
            {!editing && (
              <button onClick={() => setEditing(true)}
                className="text-brand-500 font-display font-700 text-sm hover:text-brand-700 transition-colors">
                Edit ✏️
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-3">
              <div>
                <label className="font-display font-600 text-gray-600 text-sm block mb-1">Full name</label>
                <input value={fullName} onChange={e => setFullName(e.target.value)}
                  className="input-field" placeholder="Your full name" />
              </div>
              <div>
                <label className="font-display font-600 text-gray-600 text-sm block mb-1">Grade</label>
                <input value={grade} onChange={e => setGrade(e.target.value)}
                  className="input-field" placeholder="e.g. Grade 10" />
              </div>
              <div>
                <label className="font-display font-600 text-gray-600 text-sm block mb-1">Curriculum</label>
                <select value={curriculum} onChange={e => setCurriculum(e.target.value)} className="input-field">
                  <option value="">Select curriculum</option>
                  <option value="IB">IB</option>
                  <option value="Cambridge">Cambridge</option>
                </select>
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={handleSave} disabled={saving}
                  className="btn-primary flex-1">
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
                <button onClick={() => setEditing(false)}
                  className="btn-secondary flex-1">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: 'Full name', value: profile?.full_name || '—' },
                { label: 'Email', value: user?.email || '—' },
                { label: 'Grade', value: profile?.grade || '—' },
                { label: 'Curriculum', value: profile?.curriculum || '—' },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="font-body text-gray-400 text-sm">{item.label}</span>
                  <span className="font-display font-700 text-gray-700 text-sm">{item.value}</span>
                </div>
              ))}
              {saved && <p className="text-green-500 font-body text-sm text-center">✅ Profile updated!</p>}
            </div>
          )}
        </div>

        {/* Subscription Status Card */}
        <div className="card">
          <h2 className="font-display font-800 text-gray-700 text-lg mb-4">Subscription</h2>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-body text-gray-400 text-sm">Status</span>
            <span className="font-display font-700 text-gray-700 text-sm">{subscriptionLabel}</span>
          </div>
          {profile?.subscription_status === 'trial' && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-body text-gray-400 text-sm">Trial ends</span>
              <span className="font-display font-700 text-amber-600 text-sm">{daysLeft} days left</span>
            </div>
          )}
          <div className="flex justify-between items-center py-2">
            <span className="font-body text-gray-400 text-sm">Plan</span>
            <span className="font-display font-700 text-gray-700 text-sm">5,000 RWF / month</span>
          </div>
        </div>

        {/* MoMo Payment Card */}
        <div className="card border-2 border-brand-200 bg-brand-50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">📱</span>
            <h2 className="font-display font-800 text-brand-700 text-lg">Pay via MTN MoMo</h2>
          </div>
          <p className="font-body text-gray-500 text-sm mb-4">
            Send <strong className="text-gray-700">5,000 RWF</strong> to this number to activate or renew your subscription:
          </p>

          <div className="bg-white rounded-2xl border-2 border-brand-300 px-5 py-4 flex items-center justify-between mb-4">
            <div>
              <p className="font-body text-gray-400 text-xs mb-0.5">MTN MoMo number</p>
              <p className="font-display font-900 text-brand-600 text-2xl tracking-wider">{momoNumber}</p>
            </div>
            <button onClick={copyMomo}
              className="bg-brand-500 hover:bg-brand-600 text-white font-display font-700 text-sm px-4 py-2 rounded-xl transition-colors">
              {copied ? '✅ Copied!' : 'Copy'}
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
            <p className="font-display font-700 text-amber-800 text-sm mb-1">📋 Payment steps</p>
            <ol className="font-body text-amber-700 text-sm space-y-1 list-decimal list-inside">
              <li>Dial <strong>*182*1#</strong> on your MTN phone</li>
              <li>Enter the number above: <strong>{momoNumber}</strong></li>
              <li>Send <strong>5,000 RWF</strong></li>
              <li>WhatsApp your payment screenshot to confirm</li>
            </ol>
          </div>

          <a href="https://wa.me/250783930289?text=Hi!%20I%20just%20paid%20for%20BrightPath%20subscription"
            target="_blank" rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-display font-700 px-5 py-3 rounded-2xl transition-colors w-full">
            <span>💬</span> Confirm payment on WhatsApp
          </a>
        </div>

        {/* Stats Card */}
        <div className="card">
          <h2 className="font-display font-800 text-gray-700 text-lg mb-4">Your progress</h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { icon: '⭐', value: profile?.stars ?? 0, label: 'Stars' },
              { icon: '🔥', value: profile?.streak ?? 0, label: 'Streak' },
              { icon: '✅', value: profile?.activities_done ?? 0, label: 'Activities' },
            ].map(s => (
              <div key={s.label} className="bg-brand-50 rounded-2xl py-3">
                <div className="text-2xl">{s.icon}</div>
                <div className="font-display font-900 text-xl text-brand-600">{s.value}</div>
                <div className="font-body text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
