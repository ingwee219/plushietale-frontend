import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getPost, deletePost, toggleLike,
  getComments, createComment, updateComment, deleteComment,
} from '../api/posts'

export default function PostDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [liking, setLiking] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const editRef = useRef(null)

  useEffect(() => {
    Promise.all([getPost(id), getComments(id)])
      .then(([postRes, commentsRes]) => {
        setPost(postRes.data.data)
        setComments(commentsRes.data.data)
      })
      .catch(() => navigate('/board', { replace: true }))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (editingId && editRef.current) editRef.current.focus()
  }, [editingId])

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    setSubmitting(true)
    try {
      const res = await createComment(id, commentText.trim())
      setComments((prev) => [...prev, res.data.data])
      setCommentText('')
    } catch {} finally {
      setSubmitting(false)
    }
  }

  const handleEditSave = async (commentId) => {
    if (!editText.trim()) return
    try {
      const res = await updateComment(id, commentId, editText.trim())
      setComments((prev) => prev.map((c) => c.id === commentId ? res.data.data : c))
      setEditingId(null)
    } catch {}
  }

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return
    try {
      await deleteComment(id, commentId)
      setComments((prev) => prev.filter((c) => c.id !== commentId))
    } catch {}
  }

  const handleToggleLike = async () => {
    if (!user || liking) return
    setLiking(true)
    try {
      const res = await toggleLike(id)
      const { likeCount, likedByMe } = res.data.data
      setPost((prev) => ({ ...prev, likeCount, likedByMe }))
    } catch {} finally {
      setLiking(false)
    }
  }

  const handleDeletePost = async () => {
    if (!window.confirm('Delete this post?')) return
    try {
      await deletePost(id)
      navigate('/board', { replace: true })
    } catch {}
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-terra border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const isOwner = user?.nickname === post.authorNickname

  return (
    <div className="max-w-2xl mx-auto">
      {/* 상단 네비 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-brown-light hover:text-brown transition-colors"
        >
          ← Back
        </button>
        {isOwner && (
          <button
            onClick={handleDeletePost}
            className="text-xs text-brown-light hover:text-red-500 transition-colors"
          >
            Delete post
          </button>
        )}
      </div>

      {/* 게시글 헤더 */}
      <div className="mb-4">
        <h1 className="font-display font-bold text-2xl text-brown leading-tight mb-2">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-brown-light">
          <span>by {post.authorNickname}</span>
          <span>·</span>
          <span>👁 {post.viewCount}</span>
          <span>·</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* 좋아요 */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={handleToggleLike}
          disabled={!user || liking}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
            post.likedByMe
              ? 'bg-terra-50 border-terra text-terra'
              : 'border-terra-50 text-brown-light hover:border-terra hover:text-terra'
          } disabled:opacity-50`}
        >
          <span>{post.likedByMe ? '♥' : '♡'}</span>
          <span>{post.likeCount}</span>
        </button>
        {!user && (
          <span className="text-xs text-brown-light">Log in to like</span>
        )}
      </div>

      {/* 작성자 메시지 */}
      {post.content && (
        <div className="bg-terra-50 rounded-2xl px-4 py-3 mb-5 text-sm text-brown leading-relaxed">
          {post.content}
        </div>
      )}

      {/* 이야기 본문 */}
      {post.storyContent && (
        <div className="bg-card rounded-2xl border border-terra-50 p-6 mb-6">
          <p className="text-xs font-medium text-terra mb-3 uppercase tracking-wide">The Story</p>
          <p className="text-brown leading-relaxed whitespace-pre-wrap text-base">
            {post.storyContent}
          </p>
        </div>
      )}

      {/* 댓글 */}
      <div>
        <h2 className="font-display font-semibold text-brown mb-4">
          Comments <span className="text-brown-light font-normal text-sm">({comments.length})</span>
        </h2>

        {/* 댓글 입력 */}
        {user ? (
          <form onSubmit={handleAddComment} className="flex gap-2 mb-5">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-3 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors"
            />
            <button
              type="submit"
              disabled={submitting || !commentText.trim()}
              className="px-5 py-3 bg-terra text-white text-sm font-medium rounded-xl hover:bg-terra-dark transition-colors disabled:opacity-50"
            >
              Post
            </button>
          </form>
        ) : (
          <p className="text-sm text-brown-light mb-5">
            <a href="/login" className="text-terra hover:underline">Log in</a> to leave a comment.
          </p>
        )}

        {/* 댓글 목록 */}
        {comments.length === 0 ? (
          <p className="text-sm text-brown-light text-center py-6">No comments yet. Be the first!</p>
        ) : (
          <div className="flex flex-col gap-3">
            {comments.map((comment) => {
              const isCommentOwner = user?.nickname === comment.authorNickname
              return (
                <div key={comment.id} className="bg-card rounded-2xl border border-terra-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-brown">{comment.authorNickname}</span>
                    <span className="text-xs text-brown-light">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {editingId === comment.id ? (
                    <div className="flex gap-2">
                      <input
                        ref={editRef}
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleEditSave(comment.id)
                          if (e.key === 'Escape') setEditingId(null)
                        }}
                        className="flex-1 px-3 py-2 rounded-lg border border-terra-50 bg-cream text-brown text-sm focus:outline-none focus:border-terra transition-colors"
                      />
                      <button
                        onClick={() => handleEditSave(comment.id)}
                        className="text-xs text-terra font-medium hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs text-brown-light hover:text-brown"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-brown leading-relaxed flex-1">{comment.content}</p>
                      {isCommentOwner && (
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => { setEditingId(comment.id); setEditText(comment.content) }}
                            className="text-xs text-brown-light hover:text-brown transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-xs text-brown-light hover:text-red-500 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
