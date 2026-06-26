import React from 'react'
import { Link } from 'react-router-dom'

const plans = [
  { id: 'monthly', label: '1 Month', price: '5,000', period: '/ mo' },
  { id: 'bimonthly', label: '2 Months', price: '9,500', period: '/ 2 mo', savings: 'Save 500' },
  { id: 'quarterly', label: '3 Months', price: '13,500', period: '/ 3 mo', savings: 'Save 1,500' },
  { id: 'yearly', label: '1 Year', price: '45,000', period: '/ yr', savings: 'Save 15,000' },
]

const features = [
  { icon: '🎮', title: 'Fun Science Games', desc: 'Quiz battles, memory match, and drag-drop experiments for IB & Cambridge.' },
  { icon: '🔬', title: 'AI Science Facts', desc: 'New amazing science discoveries every day, explained just for you.' },
  { icon: '🤖', title: 'AI Tutor', desc: 'Ask questions, get step-by-step explanations, and learn faster.' },
  { icon: '📝', title: 'Summer Worksheets', desc: 'Practice sheets aligned to your curriculum — IB or Cambridge.' },
  { icon: '⭐', title: 'Earn Stars & Badges', desc: 'Complete challenges, climb the leaderboard, and collect achievements.' },
]

const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English', 'Geography']

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-500 to-brand-700">
      <header className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-3xl">⭐</span>
          <span className="font-display font-900 text-white text-2xl">BrightPath</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="text-white/80 hover:text-white font-display font-600 px-4 py-2 rounded-xl">Log in</Link>
          <Link to="/signup" className="bg-sun-400 hover:bg-sun-500 text-gray-900 font-display font-700 px-5 py-2 rounded-2xl shadow-md">Get started</Link>
        </div>
      </header>

      <section className="text-center px-6 py-16 max-w-3xl mx-auto text-white">
        <h1 className="font-display font-900 text-4xl md:text-6xl mb-4">Learning that feels <span className="text-sun-400">like an adventure</span></h1>
        <p className="text-white/80 text-lg mb-8">IB and Cambridge students — play games, discover science, and ace your studies.</p>
        <Link to="/signup" className="bg-sun-400 hover:bg-sun-500 text-gray-900 font-display font-800 text-lg px-8 py-4 rounded-3xl shadow-xl inline-block">🎉 Start free trial</Link>
      </section>

      <section className="bg-brand-50 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-800 text-brand-800 text-3xl text-center mb-10">Everything you need to shine</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(f => (
              <div key={f.title} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-display font-700 text-gray-800 mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 px-6 py-16">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="text-white">
            <p className="text-sun-300 font-bold uppercase tracking-[0.25em] mb-3">New</p>
            <h2 className="font-display font-800 text-3xl md:text-4xl mb-4">Meet your AI Tutor</h2>
            <p className="text-white/80 text-base md:text-lg mb-6">Get help with homework, exam revision, and essay planning — all explained in friendly, easy-to-understand steps.</p>
            <Link to="/ai-tutor" className="inline-flex items-center gap-2 bg-sun-400 hover:bg-sun-500 text-gray-900 font-display font-semibold px-6 py-3 rounded-3xl shadow-lg">Try AI Tutor</Link>
          </div>
          <div className="bg-white/10 rounded-3xl p-6 border border-white/10 shadow-xl">
            <p className="text-white text-sm mb-4">Example questions</p>
            <ul className="space-y-3 text-white/90 text-sm">
              <li>• Explain a science concept in simple steps.</li>
              <li>• How do I solve this algebra problem?</li>
              <li>• Give me a study plan for an IB science test.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Dynamic Pricing Section */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display font-800 text-gray-800 text-3xl mb-8">Simple pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {plans.map(p => (
              <div key={p.id} className="border-2 border-gray-100 rounded-2xl p-6 hover:border-brand-400 transition-all">
                <div className="font-display font-700 text-gray-600 mb-2">{p.label}</div>
                <div className="text-3xl font-display font-900 text-brand-600 mb-1">{p.price}</div>
                <div className="text-gray-400 text-sm mb-4">RWF {p.period}</div>
                {p.savings && <div className="text-green-600 text-xs font-bold mb-4">{p.savings} RWF</div>}
                <Link to="/signup" className="text-sm bg-gray-100 hover:bg-brand-500 hover:text-white px-4 py-2 rounded-xl block">Select</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}