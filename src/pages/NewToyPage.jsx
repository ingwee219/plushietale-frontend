import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createToy } from '../api/toys'

export default function NewToyPage() {
  const [name, setName] = useState('')
  const [personality, setPersonality] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please add a photo of your toy.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('name', name)
      if (personality.trim()) formData.append('personality', personality.trim())
      await createToy(formData)
      navigate('/toys', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-brown-light hover:text-brown transition-colors"
        >
          ←
        </button>
        <h1 className="font-display font-bold text-2xl text-brown">New Toy</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* 사진 업로드 */}
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="w-full aspect-square rounded-2xl border-2 border-dashed border-terra-50 bg-cream hover:border-terra hover:bg-terra-50 transition-colors overflow-hidden flex items-center justify-center"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <p className="text-4xl mb-2">📸</p>
                <p className="text-sm font-medium text-brown">Add a photo</p>
                <p className="text-xs text-brown-light mt-1">Tap to choose from your device</p>
              </div>
            )}
          </button>
          {preview && (
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="mt-2 w-full text-xs text-brown-light hover:text-brown text-center transition-colors"
            >
              Change photo
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* 이름 */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">
            Name <span className="text-terra">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Daisy the Goose"
            required
            className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors"
          />
        </div>

        {/* 성격 (선택) */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">
            Personality{' '}
            <span className="text-brown-light font-normal">(optional)</span>
          </label>
          <textarea
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            placeholder="Describe your toy's personality... or leave blank and let AI decide!"
            rows={3}
            className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors resize-none leading-relaxed"
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-terra text-white font-medium py-3.5 rounded-xl hover:bg-terra-dark transition-colors disabled:opacity-60"
        >
          {loading ? 'Adding toy...' : 'Add Toy'}
        </button>
      </form>
    </div>
  )
}
