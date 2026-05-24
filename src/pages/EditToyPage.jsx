import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMyToys, updateToy } from '../api/toys'

export default function EditToyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [name, setName] = useState('')
  const [personality, setPersonality] = useState('')
  const [existingImageUrl, setExistingImageUrl] = useState(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getMyToys().then((res) => {
      const toy = res.data.data.find((t) => String(t.id) === id)
      if (!toy) { navigate('/toys', { replace: true }); return }
      setName(toy.name)
      setPersonality(toy.personality || '')
      setExistingImageUrl(toy.imageUrl || null)
    }).finally(() => setLoading(false))
  }, [id])

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('personality', personality)
      if (file) formData.append('image', file)
      await updateToy(id, formData)
      navigate('/toys', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-terra border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const displayImage = preview || existingImageUrl

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-brown-light hover:text-brown transition-colors"
        >
          ←
        </button>
        <h1 className="font-display font-bold text-2xl text-brown">Edit Toy</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* 사진 */}
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="w-full aspect-square rounded-2xl border-2 border-dashed border-terra-50 bg-cream hover:border-terra hover:bg-terra-50 transition-colors overflow-hidden flex items-center justify-center"
          >
            {displayImage ? (
              <img src={displayImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <p className="text-4xl mb-2">📸</p>
                <p className="text-sm font-medium text-brown">Add a photo</p>
              </div>
            )}
          </button>
          {displayImage && (
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
            required
            className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors"
          />
        </div>

        {/* 성격 */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">
            Personality{' '}
            <span className="text-brown-light font-normal">(optional)</span>
          </label>
          <textarea
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            rows={3}
            className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors resize-none leading-relaxed"
          />
        </div>

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-terra text-white font-medium py-3.5 rounded-xl hover:bg-terra-dark transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
