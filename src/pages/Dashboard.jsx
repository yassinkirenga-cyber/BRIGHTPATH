import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import Navbar from '../components/Navbar.jsx'

const quickLinks = [
  { path: '/games', icon: '🎮', label: 'Play Games', color: 'bg-purple-100 hover:bg-purple-200 text-purple-700', desc: 'Quiz & science challenges' },
  { path: '/science', icon: '🔬', label: 'Science Facts', color: 'bg-teal-100 hover:bg-teal-200 text-teal-700', desc: 'AI-powered discoveries' },
  { path: '/ai-tutor', icon: '🤖', label: 'AI Tutor', color: 'bg-blue-100 hover:bg-blue-200 text-blue-700', desc: 'Ask questions and learn faster' },
  { path: '/worksheets', icon: '📝', label: 'Worksheets', color: 'bg-orange-100 hover:bg-orange-200 text-orange-700', desc: 'Summer practice sheets' },
]

const recentBadges = ['🥇 First Quiz!', '🔥 3-Day Streak', '🌟 Science Star']

export default function Dashboard() {
  const { profile } = useAuth()
  const name = profile?.full_name?.split(' ')[0] || 'Explorer'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const isTrialActive = profile?.subscription_status === 'trial'
  const trialEnd = profile?.trial_ends_at ? new Date(profile.trial_ends_at) : null
  const daysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd - new Date()) / (1000 * 60 * 60 * 24))) : 0

  return (
    <div className="min-h-screen bg-brand-50 pb-24 md:pb-8">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Trial banner */}
        {isTrialActive && daysLeft <= 7 && (
          <div className="bg-sun-400/20 border border-sun-400 rounded-2xl px-4 py-3 mb-6 flex items-center justify-between">
            <p className="font-display font-600 text-amber-800 text-sm">
              🎉 Free trial: <strong>{daysLeft} days left</strong>
            </p>
            <Link to="/subscribe" className="bg-sun-400 text-gray-900 font-display font-700 text-sm px-4 py-1.5 rounded-xl hover:bg-sun-500 transition-colors">
              Subscribe
            </Link>
          </div>
        )}

        {/* Greeting */}
        <div className="mb-8">
          <h1 className="font-display font-900 text-gray-800 text-3xl md:text-4xl">
            {greeting}, {name}! 👋
          </h1>
          <p className="text-gray-500 font-body mt-1">
            {profile?.grade} · {profile?.curriculum}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Stars earned', value: profile?.stars ?? 0, icon: '⭐' },
            { label: 'Day streak', value: profile?.streak ?? 0, icon: '🔥' },
            { label: 'Activities done', value: profile?.activities_done ?? 0, icon: '✅' },
          ].map(stat => (
            <div key={stat.label} className="card text-center">
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="font-display font-900 text-2xl text-brand-600">{stat.value}</div>
              <div className="font-body text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <h2 className="font-display font-800 text-gray-700 text-xl mb-4">What do you want to do today?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {quickLinks.map(link => (
            <Link key={link.path} to={link.path}
              className={`${link.color} rounded-3xl p-5 transition-colors block`}>
              <div className="text-5xl mb-3">{link.icon}</div>
              <div className="font-display font-800 text-lg">{link.label}</div>
              <div className="font-body text-sm opacity-70 mt-1">{link.desc}</div>
            </Link>
          ))}
        </div>

        {/* Badges */}
        <div className="card">
          <h3 className="font-display font-700 text-gray-700 text-lg mb-3">Your badges 🏆</h3>
          {recentBadges.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {recentBadges.map(badge => (
                <span key={badge} className="bg-brand-50 text-brand-700 border border-brand-200 font-display font-600 text-sm px-3 py-1.5 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 font-body text-sm">Play some games to earn your first badge!</p>
          )}
        </div>
      </div>
    </div>
  )
}
