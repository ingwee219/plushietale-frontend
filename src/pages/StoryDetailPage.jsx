import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getStory, deleteStory } from '../api/stories'
import { createPost } from '../api/posts'

export default function StoryDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sharing, setSharing] = useState(false)
  const [showShareForm, setShowShareForm] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [shareError, setShareError] = useState('')
  const [deleting, setDeleting] = useState(false)
  const shareFormRef = useRef(null)

  useEffect(() => {
    getStory(id)
      .then((res) => setStory(res.data.data))
      .catch(() => navigate('/stories', { replace: true }))
      .finally(() => setLoading(false))
  }, [id])

  const openShareForm = () => {
    setShowShareForm(true)
    // DOM 업데이트 후 스크롤
    setTimeout(() => {
      shareFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleShare = async (e) => {
    e.preventDefault()
    setShareError('')
    setSharing(true)
    try {
      await createPost(Number(id), story.title, postContent)
      setStory((prev) => ({ ...prev, isShared: true }))
      setShowShareForm(false)
    } catch (err) {
      setShareError(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setSharing(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this story?')) return
    setDeleting(true)
    try {
      await deleteStory(id)
      navigate('/stories', { replace: true })
    } catch {
      setDeleting(false)
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
    <div className="max-w-2xl mx-auto">
      {/* 상단 네비 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-brown-light hover:text-brown transition-colors"
        >
          ←
        </button>
        <span className="text-xs text-brown-light">
          {new Date(story.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* 이야기 헤더 */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {story.toyNames.map((name) => (
            <span key={name} className="text-xs bg-terra-50 text-terra px-2.5 py-1 rounded-full">
              🧸 {name}
            </span>
          ))}
          <span className="text-xs bg-cream text-brown-light px-2.5 py-1 rounded-full border border-terra-50">
            Age {story.targetAge}
          </span>
        </div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-brown leading-tight">
          {story.title}
        </h1>
      </div>

      {/* 이야기 본문 */}
      <div className="bg-card rounded-2xl border border-terra-50 p-6 mb-6">
        <p className="text-brown leading-relaxed whitespace-pre-wrap text-base">
          {story.content}
        </p>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex flex-col gap-3">
        {story.isShared ? (
          <div className="flex items-center justify-center gap-2 py-3 text-sm text-brown-light bg-cream rounded-xl border border-terra-50">
            <span>✓</span> Shared to the board
          </div>
        ) : (
          <button
            onClick={openShareForm}
            className="w-full bg-terra text-white font-medium py-3 rounded-xl hover:bg-terra-dark transition-colors"
          >
            📢 Share to Board
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-full text-sm text-brown-light hover:text-red-500 transition-colors py-2 disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Delete story'}
        </button>
      </div>

      {/* 공유 폼 */}
      {showShareForm && (
        <form
          ref={shareFormRef}
          onSubmit={handleShare}
          className="mt-4 bg-card rounded-2xl border border-terra p-5 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-brown">Share to Board</h2>
            <button
              type="button"
              onClick={() => setShowShareForm(false)}
              className="text-brown-light hover:text-brown text-lg leading-none"
            >
              ×
            </button>
          </div>
          <div>
            <label className="block text-xs font-medium text-brown mb-1.5">
              Message <span className="text-brown-light font-normal">(optional)</span>
            </label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Say something about this story..."
              rows={3}
              autoFocus
              className="w-full px-4 py-3 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors resize-none"
            />
          </div>
          {shareError && <p className="text-red-500 text-xs text-center">{shareError}</p>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowShareForm(false)}
              className="flex-1 py-3 rounded-xl border border-terra-50 text-sm text-brown-light hover:text-brown transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sharing}
              className="flex-1 py-3 rounded-xl bg-terra text-white text-sm font-medium hover:bg-terra-dark transition-colors disabled:opacity-60"
            >
              {sharing ? 'Sharing...' : 'Share'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
