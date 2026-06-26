import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import Navbar from '../components/Navbar.jsx'

const starterTopics = [
  { label: 'Homework help', prompt: 'Help me with this homework question and explain it clearly.' },
  { label: 'Exam revision', prompt: 'Explain how to study a science topic for IB or Cambridge exams.' },
  { label: 'Math steps', prompt: 'Show me step-by-step how to solve a quadratic equation.' },
  { label: 'Essay tips', prompt: 'Give me a strong writing plan for a short English essay.' },
]

const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English', 'Geography']

const systemPrompt = `You are a friendly AI tutor for IB and Cambridge students. Answer in clear language, with examples and easy explanations. Keep responses helpful, positive, and suitable for primary or secondary learners.`

function parseAnthropicResponse(data) {
  if (!data) return ''
  if (typeof data.completion === 'string' && data.completion.trim()) return data.completion.trim()
  if (Array.isArray(data.output?.[0]?.content) && data.output[0].content[0]?.text) return data.output[0].content[0].text.trim()
  if (Array.isArray(data.content) && data.content[0]?.text) return data.content[0].text.trim()
  if (Array.isArray(data.message?.content) && data.message.content[0]?.text) return data.message.content[0].text.trim()
  return JSON.stringify(data)
}

export default function AITutor() {
  const { profile } = useAuth()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi there! I am your AI Tutor. Ask me a question about science, math, English, or study tips, and I will explain it clearly.'
    }
  ])
  const [question, setQuestion] = useState('')
  const [topic, setTopic] = useState(subjects[0])
  const [level, setLevel] = useState('Grade 9')
  const [curriculumText, setCurriculumText] = useState('IB / Cambridge')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')

  useEffect(() => {
    if (profile?.grade) setLevel(profile.grade)
    if (profile?.curriculum) setCurriculumText(profile.curriculum)
  }, [profile])

  const askTutor = async (promptText) => {
    const prompt = promptText || question.trim()
    if (!prompt) return

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey || apiKey === 'your_anthropic_api_key') {
      setError('Add your Anthropic API key in the .env file to use the AI Tutor.')
      return
    }

    setLoading(true)
    setError('')
    const userMessage = { role: 'user', text: prompt }
    setMessages((prev) => [...prev, userMessage])

    const gradeText = profile?.grade ? `for a ${profile.grade} student` : `for ${level}`
    const curriculumText = profile?.curriculum ? `in the ${profile.curriculum} curriculum` : ''
    const lessonPrompt = `Create a short lesson plan ${gradeText} ${curriculumText}. Topic: ${topic}. Include: 1) what students should learn, 2) 3 simple teaching steps, and 3) 2 practice questions with answers. Use clear language for secondary school learners.`

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          temperature: 0.3,
          max_tokens_to_sample: 700,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: lessonPrompt }
          ]
        })
      })

      const data = await response.json()
      const answer = parseAnthropicResponse(data)
      setMessages((prev) => [...prev, { role: 'assistant', text: answer || 'Sorry, the AI did not return a reply this time.' }])
      setQuestion('')
      setSelectedTopic('')
    } catch (e) {
      console.error(e)
      setError('AI Tutor request failed. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 pb-24 md:pb-8">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-display font-black text-gray-900 text-3xl md:text-4xl mb-2">🤖 AI Tutor</h1>
          <p className="text-gray-500 text-base">Ask questions, get explanations, and learn with a smart tutor tailored for IB and Cambridge learners.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] mb-8">
          <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-6">
            <h2 className="font-display font-bold text-gray-800 text-lg mb-4">Ask the tutor</h2>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="input-field min-h-[160px] resize-none"
              placeholder="Type your question here, like: 'How do I solve this algebra problem?'"
            />
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mt-4">
              <div className="flex flex-col gap-4 mb-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="block text-sm font-display font-600 text-gray-700">
                  Grade level
                  <input
                    value={profile?.grade || level}
                    onChange={(e) => setLevel(e.target.value)}
                    placeholder="Grade 9"
                    className="input-field mt-1"
                  />
                </label>
                <label className="block text-sm font-display font-600 text-gray-700">
                  Curriculum
                  <input
                    value={curriculumText}
                    onChange={(e) => setCurriculumText(e.target.value)}
                    placeholder="IB, Cambridge, etc."
                    className="input-field mt-1"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-display font-600 text-gray-700 mb-2">Lesson subject</label>
                <div className="grid grid-cols-2 gap-2">
                  {subjects.map((subjectItem) => (
                    <button
                      key={subjectItem}
                      type="button"
                      onClick={() => setTopic(subjectItem)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${topic === subjectItem ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                    >
                      {subjectItem}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => askTutor(question)}
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Generating lesson…' : 'Generate lesson'}
              </button>
              <button
                type="button"
                onClick={() => { setQuestion(''); setSelectedTopic(''); setTopic(subjects[0]) }}
                className="bg-white border-2 border-blue-200 text-blue-700 font-bold px-6 py-3 rounded-2xl hover:border-blue-400 transition-colors"
              >
                Reset
              </button>
            </div>
            {error && <p className="text-amber-600 text-sm mt-4">{error}</p>}
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-6">
            <h2 className="font-display font-bold text-gray-800 text-lg mb-4">How to use it</h2>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>• Ask the tutor for study tips, explanations, example problems, or essay help.</li>
              <li>• Keep questions clear so the AI can answer step-by-step.</li>
              <li>• Use the quick topic buttons if you want a fast example.</li>
              <li>• The assistant is tuned for IB and Cambridge-style learning.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`rounded-3xl p-5 border ${message.role === 'assistant' ? 'bg-white border-blue-100' : 'bg-blue-100/80 border-blue-200'} shadow-sm`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{message.role === 'assistant' ? '🤖' : '🧑‍🎓'}</span>
                <span className="font-semibold text-sm uppercase tracking-[0.2em] text-gray-500">{message.role === 'assistant' ? 'Tutor' : 'You'}</span>
              </div>
              <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{message.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
