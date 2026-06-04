import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMyToys, deleteToy } from '../api/toys'

export default function ToysPage() {
  const [toys, setToys] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getMyToys()
      .then((res) => setToys(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (toy) => {
    if (!window.confirm(`Delete "${toy.name}"?`)) return
    setDeletingId(toy.id)
    try {
      await deleteToy(toy.id)
      setToys((prev) => prev.filter((t) => t.id !== toy.id))
    } catch {
      alert('Failed to delete. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-terra border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brown">My Plushies</h1>
        <Link
          to="/toys/new"
          className="bg-terra text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-terra-dark transition-colors"
        >
          + Add Plushie
        </Link>
      </div>

      {/* 빈 상태 */}
      {toys.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🧸</p>
          <p className="font-display font-semibold text-brown text-lg mb-2">No toys yet</p>
          <p className="text-brown-light text-sm mb-6">Add your first toy to start creating stories</p>
          <Link
            to="/toys/new"
            className="inline-block bg-terra text-white font-medium px-8 py-3 rounded-xl hover:bg-terra-dark transition-colors"
          >
            Add a toy
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {toys.map((toy) => (
            <div key={toy.id} className="bg-card rounded-2xl border border-terra-50 overflow-hidden">
              {/* 사진 */}
              <div className="aspect-square bg-cream overflow-hidden">
                {toy.imageUrl ? (
                  <img
                    src={toy.imageUrl}
                    alt={toy.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🧸
                  </div>
                )}
              </div>

              {/* 정보 */}
              <div className="p-3">
                <p className="font-display font-semibold text-brown text-sm truncate mb-1">
                  {toy.name}
                </p>
                {toy.personality && (
                  <p className="text-brown-light text-xs line-clamp-2 leading-relaxed">
                    {toy.personality}
                  </p>
                )}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/toys/${toy.id}/edit`)}
                    className="flex-1 text-xs text-brown-light hover:text-brown transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(toy)}
                    disabled={deletingId === toy.id}
                    className="flex-1 text-xs text-brown-light hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    {deletingId === toy.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
