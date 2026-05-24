import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../api/posts'

export default function BoardPage() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchPosts = async (pageNum) => {
    try {
      const res = await getPosts(pageNum)
      const data = res.data.data
      if (pageNum === 0) {
        setPosts(data.content)
      } else {
        setPosts((prev) => [...prev, ...data.content])
      }
      setHasMore(!data.last)
    } catch {}
  }

  useEffect(() => {
    fetchPosts(0).finally(() => setLoading(false))
  }, [])

  const handleLoadMore = async () => {
    setLoadingMore(true)
    const nextPage = page + 1
    await fetchPosts(nextPage)
    setPage(nextPage)
    setLoadingMore(false)
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
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-brown">Story Board</h1>
        <p className="text-brown-light text-sm mt-1">Stories shared by the community</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">💬</p>
          <p className="font-display font-semibold text-brown text-lg mb-2">No stories yet</p>
          <p className="text-brown-light text-sm">Be the first to share a story!</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/board/${post.id}`}
                className="bg-card rounded-2xl border border-terra-50 p-4 hover:border-terra transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-brown text-base leading-snug mb-1 truncate">
                      {post.title}
                    </p>
                    {post.content && (
                      <p className="text-brown-light text-sm line-clamp-2 leading-relaxed mb-2">
                        {post.content}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-brown-light">
                      <span>by {post.authorNickname}</span>
                      <span>·</span>
                      <span>👁 {post.viewCount}</span>
                      <span>·</span>
                      <span className={post.likedByMe ? 'text-terra' : ''}>
                        ♥ {post.likeCount}
                      </span>
                      <span>·</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-8 py-3 rounded-xl border border-terra-50 text-sm font-medium text-brown hover:bg-terra-50 transition-colors disabled:opacity-50"
              >
                {loadingMore ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
