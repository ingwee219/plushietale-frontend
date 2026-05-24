import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMyStories } from '../api/stories'

export default function StoriesPage() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyStories()
      .then((res) => setStories(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-terra border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brown">My Stories</h1>
        <Link
          to="/stories/new"
          className="bg-terra text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-terra-dark transition-colors"
        >
          ✨ Create
        </Link>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📖</p>
          <p className="font-display font-semibold text-brown text-lg mb-2">No stories yet</p>
          <p className="text-brown-light text-sm mb-6">Create your first story with your toys</p>
          <Link
            to="/stories/new"
            className="inline-block bg-terra text-white font-medium px-8 py-3 rounded-xl hover:bg-terra-dark transition-colors"
          >
            Create a story
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {stories.map((story) => (
            <Link
              key={story.id}
              to={`/stories/${story.id}`}
              className="bg-card rounded-2xl border border-terra-50 p-4 hover:border-terra transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-brown text-base leading-snug mb-1 truncate">
                    {story.title}
                  </p>
                  <p className="text-brown-light text-xs mb-2">
                    {story.toyNames.join(', ')} · Age {story.targetAge}
                  </p>
                  <p className="text-brown-light text-sm line-clamp-2 leading-relaxed">
                    {story.content}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {story.isShared && (
                    <span className="text-xs bg-terra-50 text-terra px-2 py-0.5 rounded-full">
                      Shared
                    </span>
                  )}
                  <span className="text-xs text-brown-light">
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
