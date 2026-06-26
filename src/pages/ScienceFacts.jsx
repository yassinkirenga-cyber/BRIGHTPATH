import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'

const fallbackFacts = [
  { emoji: '🌍', title: "Earth Core Temperature", fact: "The Earth inner core is about 5,400 degrees Celsius — almost as hot as the surface of the Sun! It is made of solid iron under incredible pressure.", subject: 'Physics', level: 'Cool Fact' },
  { emoji: '🦋', title: "Butterfly Taste Test", fact: "Butterflies taste with their feet! They have taste sensors on their legs so they can tell if a leaf is good to eat just by landing on it.", subject: 'Biology', level: 'Amazing!' },
  { emoji: '💧', title: "Water Molecules", fact: "A single drop of water contains more than 1.5 sextillion molecules. That is 1,500,000,000,000,000,000,000 molecules in one tiny drop!", subject: 'Chemistry', level: 'Mind-blowing' },
  { emoji: '🌙', title: "Moon Moving Away", fact: "The Moon is slowly moving away from Earth at about 3.8 cm per year — about the same rate your fingernails grow!", subject: 'Physics', level: 'Wow!' },
  { emoji: '🧬', title: "DNA Length", fact: "If you unraveled all the DNA in your body and stretched it out, it would reach from Earth to the Sun and back over 600 times!", subject: 'Biology', level: 'Incredible' },
  { emoji: '⚡', title: "Lightning Speed", fact: "Lightning travels at about 220,000 km per hour — fast enough to circle the Earth 1.4 times in just one second!", subject: 'Physics', level: 'Fast!' },
]

const topics = ['Space & Planets', 'Human Body', 'Animals', 'Chemistry', 'Physics', 'Environment', 'Technology', 'Mathematics']

export default function ScienceFacts() {
  const [facts, setFacts] = useState(fallbackFacts)
  const [loadingAI, setLoadingAI] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [aiError, setAiError] = useState(false)
  const [savedFacts, setSavedFacts] = useState([])
  const [flipped, setFlipped] = useState({})

  const getAIFact = async (topic) => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey || apiKey === 'your_anthropic_api_key') {
      setAiError(true)
      return
    }
    setLoadingAI(true)
    setAiError(false)
    try {
      const prompt = `Generate 3 amazing science fun facts${topic ? ` about "${topic}"` : ''} for primary and secondary school students (IB and Cambridge curriculum). Return ONLY valid JSON array like this: [{"emoji":"🌟","title":"Short Title","fact":"The amazing fact in 2 sentences max.","subject":"Physics","level":"Cool"}] No extra text, no apostrophes inside strings, use plain words instead.`

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || ''
      const clean = text.replace(/```json|```/g, '').trim()
      const newFacts = JSON.parse(clean)
      setFacts(newFacts)
    } catch (e) {
      console.error(e)
      setAiError(true)
    } finally {
      setLoadingAI(false)
    }
  }

  const saveFact = (fact) => {
    setSavedFacts(prev => prev.find(f => f.title === fact.title) ? prev : [...prev, fact])
  }

  const toggleFlip = (i) => setFlipped(f => ({ ...f, [i]: !f[i] }))

  const subjectColors = {
    Physics: 'bg-blue-100 text-blue-700',
    Chemistry: 'bg-green-100 text-green-700',
    Biology: 'bg-teal-100 text-teal-700',
    Maths: 'bg-purple-100 text-purple-700',
  }

  return (
    <div className="min-h-screen bg-blue-50 pb-24 md:pb-8">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="text-center mb-8">
          <h1 className="font-display font-black text-gray-800 text-3xl md:text-4xl mb-2">
            🔬 Science Fun Facts
          </h1>
          <p className="text-gray-500 text-base">Powered by AI — discover something amazing every day!</p>
        </div>

        {/* AI Topic selector */}
        <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-6 mb-8">
          <h2 className="font-display font-bold text-gray-700 text-lg mb-3">✨ Ask AI for facts on a topic</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {topics.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-1.5 rounded-full font-bold text-sm transition-colors ${
                  selectedTopic === t
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => getAIFact(selectedTopic)}
              disabled={loadingAI}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl transition-colors disabled:opacity-60"
            >
              {loadingAI ? '🤖 Generating...' : '🤖 Get AI Facts'}
            </button>
            <button
              onClick={() => { setFacts(fallbackFacts); setSelectedTopic('') }}
              className="bg-white border-2 border-blue-200 text-blue-700 font-bold px-6 py-3 rounded-2xl hover:border-blue-400 transition-colors"
            >
              Reset
            </button>
          </div>
          {aiError && (
            <p className="text-amber-600 text-sm mt-3">
              Add your Anthropic API key in the .env file to enable AI facts. Showing built-in facts for now.
            </p>
          )}
        </div>

        {/* Facts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {facts.map((fact, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => toggleFlip(i)}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-4xl">{fact.emoji}</span>
                <div className="flex gap-2 items-center">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${subjectColors[fact.subject] || 'bg-gray-100 text-gray-600'}`}>
                    {fact.subject}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); saveFact(fact) }}
                    className="text-gray-300 hover:text-yellow-400 text-xl transition-colors"
                  >
                    {savedFacts.find(f => f.title === fact.title) ? '⭐' : '☆'}
                  </button>
                </div>
              </div>
              <h3 className="font-display font-bold text-gray-800 text-lg mb-2">{fact.title}</h3>
              {flipped[i] ? (
                <div className="bg-blue-50 rounded-2xl p-3">
                  <p className="text-gray-700 text-sm leading-relaxed">{fact.fact}</p>
                  <span className="text-xs font-bold text-blue-400 mt-2 block">{fact.level} ✨</span>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Tap to reveal the fact! 👆</p>
              )}
            </div>
          ))}
        </div>

        {/* Saved facts */}
        {savedFacts.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-6">
            <h3 className="font-display font-bold text-gray-700 text-lg mb-3">⭐ Your saved facts</h3>
            <div className="space-y-2">
              {savedFacts.map((fact, i) => (
                <div key={i} className="bg-blue-50 rounded-2xl p-3 flex gap-3 items-start">
                  <span className="text-2xl">{fact.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-700 text-sm">{fact.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{fact.fact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
