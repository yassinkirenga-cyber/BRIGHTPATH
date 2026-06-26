import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'

const worksheets = [
  {
    id: 1, title: 'Forces & Motion', subject: 'Physics', curriculum: ['IB', 'Cambridge'],
    grade: 'Grade 8-10', icon: '⚡', color: 'bg-blue-100 text-blue-700',
    questions: [
      { q: "Define Newton's First Law of Motion in your own words.", type: 'text' },
      { q: "A car travels 120 km in 2 hours. Calculate its average speed.", type: 'calc', answer: '60 km/h' },
      { q: "List THREE examples of friction in everyday life.", type: 'list' },
      { q: "What happens to the acceleration of an object if its mass doubles but the force stays the same?", type: 'text' },
      { q: "Draw and label a force diagram for a book resting on a table.", type: 'draw' },
    ]
  },
  {
    id: 2, title: 'Cells & Living Things', subject: 'Biology', curriculum: ['IB', 'Cambridge'],
    grade: 'Grade 6-9', icon: '🔬', color: 'bg-teal-100 text-teal-700',
    questions: [
      { q: "What are the THREE main parts found in all cells?", type: 'list' },
      { q: "Explain the difference between plant and animal cells. Give TWO differences.", type: 'text' },
      { q: "What is the function of the mitochondria?", type: 'text' },
      { q: "A cell divides every 20 minutes. How many cells will there be after 1 hour, starting from 1 cell?", type: 'calc', answer: '8 cells' },
      { q: "Why is the cell membrane important for the cell?", type: 'text' },
    ]
  },
  {
    id: 3, title: 'Algebra Fundamentals', subject: 'Maths', curriculum: ['IB', 'Cambridge'],
    grade: 'Grade 7-10', icon: '📐', color: 'bg-purple-100 text-purple-700',
    questions: [
      { q: "Solve for x:  3x + 7 = 22", type: 'calc', answer: 'x = 5' },
      { q: "Expand and simplify: (x + 3)(x + 4)", type: 'calc', answer: 'x² + 7x + 12' },
      { q: "A rectangle has a length of (2x + 1) cm and a width of 3 cm. Write an expression for its area.", type: 'calc', answer: '6x + 3 cm²' },
      { q: "Solve: 2x - 5 > 9", type: 'calc', answer: 'x > 7' },
      { q: "Factorise: x² - 9", type: 'calc', answer: '(x+3)(x-3)' },
    ]
  },
  {
    id: 4, title: 'Creative Writing', subject: 'English', curriculum: ['IB', 'Cambridge'],
    grade: 'Grade 5-8', icon: '✍️', color: 'bg-orange-100 text-orange-700',
    questions: [
      { q: "Write an opening paragraph (5-7 sentences) for a story beginning: 'The last thing Maya expected to find in the old library was...'", type: 'text' },
      { q: "Identify and explain the literary device in: 'The thunder roared its anger across the sky.'", type: 'text' },
      { q: "Rewrite this sentence using a more powerful vocabulary: 'The man walked slowly into the room.'", type: 'text' },
      { q: "Write a simile and a metaphor about the ocean.", type: 'text' },
      { q: "Plan a short story in 5 bullet points. Include: character, setting, problem, climax, solution.", type: 'list' },
    ]
  },
  {
    id: 5, title: 'Chemical Reactions', subject: 'Chemistry', curriculum: ['Cambridge'],
    grade: 'Grade 9-11', icon: '⚗️', color: 'bg-green-100 text-green-700',
    questions: [
      { q: "What is the difference between a physical change and a chemical change? Give one example of each.", type: 'text' },
      { q: "Balance this equation: H₂ + O₂ → H₂O", type: 'calc', answer: '2H₂ + O₂ → 2H₂O' },
      { q: "List the products when an acid reacts with a metal carbonate.", type: 'list' },
      { q: "What is the pH of a neutral substance?", type: 'calc', answer: 'pH 7' },
      { q: "Why is rusting of iron considered a slow chemical reaction? Explain with reference to reactants and products.", type: 'text' },
    ]
  },
]

const typeIcons = { text: '✏️', calc: '🔢', list: '📋', draw: '🎨' }
const typeLabels = { text: 'Written answer', calc: 'Calculation', list: 'List answer', draw: 'Diagram' }

export default function Worksheets() {
  const [active, setActive] = useState(null)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [filter, setFilter] = useState('All')

  const subjects = ['All', ...new Set(worksheets.map(w => w.subject))]

  const filtered = filter === 'All' ? worksheets : worksheets.filter(w => w.subject === filter)

  const handleAnswer = (qIdx, val) => {
    setAnswers(a => ({ ...a, [qIdx]: val }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  const progress = active ? Math.round((Object.keys(answers).length / active.questions.length) * 100) : 0

  if (active) {
    return (
      <div className="min-h-screen bg-brand-50 pb-24 md:pb-8">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button onClick={() => { setActive(null); setAnswers({}); setSubmitted(false) }}
            className="text-gray-400 hover:text-gray-600 font-display font-600 text-sm mb-6 block">
            ← Back to worksheets
          </button>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-7xl mb-4">🎉</div>
              <h2 className="font-display font-900 text-gray-800 text-3xl mb-2">Worksheet submitted!</h2>
              <p className="text-gray-500 font-body mb-6">Great work completing this worksheet. Check your answers below.</p>
              <div className="space-y-4 text-left">
                {active.questions.map((q, i) => q.answer && (
                  <div key={i} className="card bg-green-50 border-green-200">
                    <p className="font-display font-700 text-gray-700 text-sm mb-1">Q{i + 1}: {q.q}</p>
                    <p className="font-body text-gray-500 text-sm mb-2">Your answer: <em>{answers[i] || '(blank)'}</em></p>
                    <p className="text-green-700 font-display font-700 text-sm">✓ Expected: {q.answer}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => { setActive(null); setAnswers({}); setSubmitted(false) }}
                className="btn-primary mt-6">
                ← Back to worksheets
              </button>
            </div>
          ) : (
            <>
              <div className="card mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{active.icon}</span>
                  <div>
                    <h1 className="font-display font-900 text-gray-800 text-2xl">{active.title}</h1>
                    <p className="text-gray-400 font-body text-sm">{active.subject} · {active.grade}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="font-display font-600 text-brand-600 text-sm">{progress}%</span>
                </div>
              </div>

              <div className="space-y-5 mb-6">
                {active.questions.map((q, i) => (
                  <div key={i} className="card">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-brand-500 text-white font-display font-700 w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-xs font-display font-600 text-gray-400">
                        {typeIcons[q.type]} {typeLabels[q.type]}
                      </span>
                    </div>
                    <p className="font-display font-600 text-gray-800 mb-3">{q.q}</p>
                    <textarea
                      value={answers[i] || ''}
                      onChange={e => handleAnswer(i, e.target.value)}
                      placeholder="Write your answer here..."
                      rows={q.type === 'text' ? 4 : 2}
                      className="w-full rounded-2xl border-2 border-brand-100 focus:border-brand-400 outline-none px-4 py-3 font-body text-gray-800 text-sm resize-none transition-colors"
                    />
                  </div>
                ))}
              </div>

              <button onClick={handleSubmit}
                disabled={Object.keys(answers).length === 0}
                className="btn-primary w-full disabled:opacity-50">
                ✅ Submit worksheet
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-50 pb-24 md:pb-8">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-display font-900 text-gray-800 text-3xl md:text-4xl mb-2">📝 Summer Worksheets</h1>
          <p className="text-gray-500 font-body">Practice makes perfect — work at your own pace this holiday!</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {subjects.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full font-display font-600 text-sm transition-colors ${filter === s ? 'bg-brand-500 text-white' : 'bg-white border border-brand-200 text-gray-600 hover:bg-brand-50'}`}>
              {s}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(ws => (
            <button key={ws.id} onClick={() => { setActive(ws); setAnswers({}); setSubmitted(false) }}
              className="card text-left hover:shadow-md transition-shadow active:scale-95">
              <div className="text-4xl mb-3">{ws.icon}</div>
              <span className={`text-xs font-display font-600 px-2 py-1 rounded-full ${ws.color} mb-2 inline-block`}>
                {ws.subject}
              </span>
              <h3 className="font-display font-700 text-gray-800 text-lg mb-1">{ws.title}</h3>
              <p className="text-gray-400 font-body text-sm mb-3">{ws.grade}</p>
              <div className="flex gap-2 flex-wrap">
                {ws.curriculum.map(c => (
                  <span key={c} className="bg-brand-50 text-brand-600 text-xs font-display font-600 px-2 py-0.5 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-brand-500 font-display font-600 text-sm mt-3">{ws.questions.length} questions →</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
