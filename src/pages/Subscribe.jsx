import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import Navbar from '../components/Navbar.jsx'

const MOMO_NUMBER = '0783930289'
const WHATSAPP_NUMBER = '250783930289'
const ACCOUNT_NAME = 'Kirenga Yassin'

const plans = [
  {
    id: 'monthly',
    label: '1 Month',
    price: '5,000',
    period: '/ month',
    color: 'border-brand-200',
    badge: null,
    description: 'Perfect for trying it out',
    savings: null,
  },
  {
    id: 'bimonthly',
    label: '2 Months',
    price: '9,500',
    period: '/ 2 months',
    color: 'border-brand-400',
    badge: 'Popular',
    description: 'Great value for a school term stretch',
    savings: 'Save 500 RWF',
  },
  {
    id: 'quarterly',
    label: '3 Months',
    price: '13,500',
    period: '/ 3 months',
    color: 'border-purple-400',
    badge: 'Best Value',
    description: 'Full term academic coverage',
    savings: 'Save 1,500 RWF',
  },
  {
    id: 'yearly',
    label: '1 Year',
    price: '45,000',
    period: '/ year',
    color: 'border-sun-400',
    badge: '🌟 Best Deal',
    description: 'Full year, worry-free learning',
    savings: 'Save 15,000 RWF',
  },
]

const features = [
  '🎮 Unlimited level-appropriate games & quizzes',
  '🔬 AI-powered science facts customized to grade level',
  '📝 Personalized worksheets and math exercises',
  '⭐ Stars, badges & leaderboard tracking',
  '📊 Full progress tracking reports for parents',
  '🌍 Fully aligned with IB + Cambridge curriculums',
]

export default function Subscribe() {
  const { profile } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState('monthly')
  const [copied, setCopied] = useState(false)
  const [step, setStep] = useState(1)

  const plan = plans.find(p => p.id === selectedPlan)

  const whatsappMessage = encodeURIComponent(
    `Hi Kirenga Yassin! I just paid for BrightPath.\n\n` +
    `Name: ${profile?.full_name || ''}\n` +
    `Email: ${profile?.email || ''}\n` +
    `Plan: ${plan?.label} — ${plan?.price} RWF\n\n` +
    `Please activate my account. Thank you!`
  )

  function copyNumber() {
    navigator.clipboard.writeText(MOMO_NUMBER)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-24 md:pb-8">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🚀</div>
          <h1 className="font-display font-900 text-gray-800 text-3xl md:text-4xl mb-2">
            Unlock BrightPath
          </h1>
          <p className="text-gray-500 font-body text-lg">
            Choose your plan and pay via MTN MoMo
          </p>
        </div>

        {/* What you get */}
        <div className="card mb-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-display font-800 text-gray-700 text-base mb-3">Everything included:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {features.map(f => (
              <div key={f} className="flex items-center gap-2 font-body text-gray-600 text-sm">
                <span className="text-green-500 font-bold">✓</span> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1 — Choose plan */}
        <div className={`card mb-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ${step >= 1 ? '' : 'opacity-50'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 rounded-full bg-brand-500 text-white font-display font-900 text-sm flex items-center justify-center">1</div>
            <h2 className="font-display font-800 text-gray-700 text-lg">Choose your subscription length</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {plans.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => { setSelectedPlan(p.id); setStep(2) }}
                className={`relative rounded-2xl border-2 p-4 text-left transition-all ${
                  selectedPlan === p.id
                    ? `${p.color} bg-brand-50 shadow-md scale-[1.02]`
                    : 'border-gray-200 bg-white hover:border-brand-200'
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-2.5 left-3 bg-brand-500 text-white font-display font-700 text-xs px-2 py-0.5 rounded-full z-10">
                    {p.badge}
                  </span>
                )}
                <div className="font-display font-700 text-gray-500 text-xs mb-1 pt-1">{p.label}</div>
                <div className="font-display font-900 text-gray-800 text-xl">{p.price}</div>
                <div className="font-body text-gray-400 text-xs">RWF {p.period}</div>
                {p.savings && (
                  <div className="mt-1.5 bg-green-100 text-green-700 font-display font-700 text-[10px] px-2 py-0.5 rounded-full inline-block">
                    {p.savings}
                  </div>
                )}
                {selectedPlan === p.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Pay via MoMo */}
        <div className={`card mb-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all ${step >= 2 ? '' : 'opacity-40 pointer-events-none'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-7 h-7 rounded-full font-display font-900 text-sm flex items-center justify-center ${step >= 2 ? 'bg-brand-500 text-white' : 'bg-gray-200 text-gray-400'}`}>2</div>
            <h2 className="font-display font-800 text-gray-700 text-lg">Pay via MTN MoMo</h2>
          </div>

          {/* Selected plan summary */}
          <div className="bg-brand-50 rounded-2xl px-4 py-3 mb-4 flex justify-between items-center">
            <div>
              <p className="font-body text-gray-400 text-xs">Selected duration</p>
              <p className="font-display font-800 text-brand-700">{plan?.label}</p>
            </div>
            <div className="text-right">
              <p className="font-body text-gray-400 text-xs">Total amount to send</p>
              <p className="font-display font-900 text-brand-700 text-xl">{plan?.price} RWF</p>
            </div>
          </div>

          {/* MoMo number */}
          <div className="bg-white border-2 border-brand-300 rounded-2xl px-5 py-4 flex items-center justify-between mb-3">
            <div>
              <p className="font-body text-gray-400 text-xs mb-0.5">Send to this MoMo number</p>
              <p className="font-display font-900 text-brand-600 text-2xl tracking-wider">{MOMO_NUMBER}</p>
              <p className="font-body text-gray-400 text-xs mt-0.5">Account Name: <span className="text-gray-600 font-600">{ACCOUNT_NAME}</span></p>
            </div>
            <button 
              type="button"
              onClick={copyNumber}
              className="bg-brand-500 hover:bg-brand-600 text-white font-display font-700 text-sm px-4 py-2 rounded-xl transition-colors shrink-0"
            >
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>

          {/* Payment instructions */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4">
            <p className="font-display font-700 text-amber-800 text-sm mb-2">How to complete payment:</p>
            <ol className="space-y-1">
              {[
                `Dial *182*1# on your MTN phone`,
                `Select Send Money to a MoMo User`,
                `Enter phone number: ${MOMO_NUMBER}`,
                `Enter total amount: ${plan?.price} RWF`,
                `Confirm the recipient is ${ACCOUNT_NAME} and enter your PIN`,
              ].map((instruction, i) => (
                <li key={i} className="font-body text-amber-700 text-sm flex gap-2">
                  <span className="font-display font-800 text-amber-500 shrink-0">{i + 1}.</span>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          <button 
            type="button"
            onClick={() => setStep(3)}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-display font-800 py-3 rounded-xl transition-colors"
          >
            I have sent the payment safely →
          </button>
        </div>

        {/* Step 3 — Confirm on WhatsApp */}
        <div className={`card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all ${step >= 3 ? '' : 'opacity-40 pointer-events-none'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-7 h-7 rounded-full font-display font-900 text-sm flex items-center justify-center ${step >= 3 ? 'bg-brand-500 text-white' : 'bg-gray-200 text-gray-400'}`}>3</div>
            <h2 className="font-display font-800 text-gray-700 text-lg">Confirm on WhatsApp</h2>
          </div>

          <p className="font-body text-gray-500 text-sm mb-4">
            Send a screenshot of your MoMo transaction message over WhatsApp. Your educational profile access will be instantly updated.
          </p>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-display font-800 text-lg px-5 py-4 rounded-2xl transition-colors w-full shadow-md"
          >
            <span className="text-2xl">💬</span>
            Send Confirmation Message
          </a>

          <p className="text-center font-body text-gray-400 text-xs mt-3">
            Direct Support Line: +{WHATSAPP_NUMBER}
          </p>
        </div>

      </div>
    </div>
  )
}