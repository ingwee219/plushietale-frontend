import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyToys } from '../api/toys'
import { createStory } from '../api/stories'

const LOADING_MESSAGES = [
  "Reading your toy's personality...",
  'Crafting a magical world...',
  'Writing the adventure...',
  'Adding the finishing touches...',
]

export default function NewStoryPage() {
  const navigate = useNavigate()
  const [toys, setToys] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [targetAge, setTargetAge] = useState(6)
  const [storyPrompt, setStoryPrompt] = useState('')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    getMyToys()
      .then((res) => setToys(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!generating) return
    const interval = setInterval(() => {
      setLoadingMsg((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [generating])

  const toggleToy = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 10 ? [...prev, id] : prev
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedIds.length === 0) {
      setError('Please select at least one toy.')
      return
    }
    setError('')
    setGenerating(true)
    try {
      const res = await createStory(selectedIds, targetAge, storyPrompt.trim() || null)
      navigate(`/stories/${res.data.data.id}`, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-terra border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-6 animate-bounce">🧸</div>
        <div className="w-10 h-10 border-4 border-terra border-t-transparent rounded-full animate-spin mb-6" />
        <p className="font-display font-semibold text-brown text-lg mb-2">
          Creating your story...
        </p>
        <p className="text-brown-light text-sm transition-all duration-500">
          {LOADING_MESSAGES[loadingMsg]}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-brown-light hover:text-brown transition-colors"
        >
          ←
        </button>
        <h1 className="font-display font-bold text-2xl text-brown">New Story</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* 인형 선택 */}
        <div>
          <label className="block text-sm font-medium text-brown mb-3">
            Choose your toys <span className="text-terra">*</span>
            <span className="text-brown-light font-normal ml-1">
              ({selectedIds.length} selected)
            </span>
          </label>

          {toys.length === 0 ? (
            <div className="text-center py-8 bg-cream rounded-2xl border border-terra-50">
              <p className="text-2xl mb-2">🧸</p>
              <p className="text-sm text-brown-light mb-3">You have no toys yet</p>
              <button
                type="button"
                onClick={() => navigate('/toys/new')}
                className="text-sm text-terra font-medium hover:underline"
              >
                Add a toy first →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {toys.map((toy) => {
                const selected = selectedIds.includes(toy.id)
                return (
                  <button
                    key={toy.id}
                    type="button"
                    onClick={() => toggleToy(toy.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                      selected
                        ? 'border-terra bg-terra-50'
                        : 'border-terra-50 bg-cream hover:border-terra'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-card shrink-0">
                      {toy.imageUrl ? (
                        <img src={toy.imageUrl} alt={toy.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">🧸</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brown truncate">{toy.name}</p>
                    </div>
                    {selected && <span className="text-terra text-sm shrink-0">✓</span>}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* 나이 */}
        <div>
          <label className="block text-sm font-medium text-brown mb-3">
            Child's age
            <span className="text-terra font-semibold ml-2">{targetAge}</span>
          </label>
          <input
            type="range"
            min={3}
            max={11}
            value={targetAge}
            onChange={(e) => setTargetAge(Number(e.target.value))}
            className="w-full accent-terra"
          />
          <div className="flex justify-between text-xs text-brown-light mt-1">
            <span>3</span>
            <span>11</span>
          </div>
        </div>

        {/* 선택 프롬프트 */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">
            Story idea{' '}
            <span className="text-brown-light font-normal">(optional)</span>
          </label>
          <textarea
            value={storyPrompt}
            onChange={(e) => setStoryPrompt(e.target.value)}
            placeholder={`e.g. "Daisy got a fever and went dramatic. While Enzo went to get medicine, Mr. Crab tried to calm her down..."`}
            rows={4}
            className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors resize-none leading-relaxed"
          />
          <p className="text-xs text-brown-light mt-1">
            Leave blank for a fully AI-generated story.
          </p>
        </div>

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <button
          type="submit"
          disabled={toys.length === 0}
          className="w-full bg-terra text-white font-medium py-3.5 rounded-xl hover:bg-terra-dark transition-colors disabled:opacity-60"
        >
          ✨ Generate Story
        </button>
      </form>
    </div>
  )
}
