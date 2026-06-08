import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { updateNickname, updatePassword, getMyPosts, getMyComments } from '../api/user'

const TABS = ['Profile', 'My Posts', 'My Comments']

export default function ProfilePage() {
  const { user, refreshUser, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('Profile')

  const [nickname, setNickname] = useState(user?.nickname || '')
  const [nicknameLoading, setNicknameLoading] = useState(false)
  const [nicknameMsg, setNicknameMsg] = useState(null)

  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState(null)

  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [postsLoading, setPostsLoading] = useState(false)
  const [commentsLoading, setCommentsLoading] = useState(false)

  useEffect(() => {
    if (tab === 'My Posts' && posts.length === 0) {
      setPostsLoading(true)
      getMyPosts()
        .then((res) => setPosts(res.data.data))
        .catch(() => {})
        .finally(() => setPostsLoading(false))
    }
    if (tab === 'My Comments' && comments.length === 0) {
      setCommentsLoading(true)
      getMyComments()
        .then((res) => setComments(res.data.data))
        .catch(() => {})
        .finally(() => setCommentsLoading(false))
    }
  }, [tab])

  const handleNicknameSubmit = async (e) => {
    e.preventDefault()
    if (!nickname.trim() || nickname.trim() === user.nickname) return
    setNicknameLoading(true)
    setNicknameMsg(null)
    try {
      await updateNickname(nickname.trim())
      await refreshUser()
      setNicknameMsg({ ok: true, text: 'Nickname updated!' })
    } catch (err) {
      setNicknameMsg({ ok: false, text: err.response?.data?.message || 'Something went wrong.' })
    } finally {
      setNicknameLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordMsg(null)
    if (passwords.next !== passwords.confirm) {
      setPasswordMsg({ ok: false, text: 'New passwords do not match.' })
      return
    }
    if (passwords.next.length < 6) {
      setPasswordMsg({ ok: false, text: 'Password must be at least 6 characters.' })
      return
    }
    setPasswordLoading(true)
    try {
      await updatePassword(passwords.current, passwords.next)
      setPasswords({ current: '', next: '', confirm: '' })
      setPasswordMsg({ ok: true, text: 'Password changed successfully!' })
    } catch (err) {
      setPasswordMsg({ ok: false, text: err.response?.data?.message || 'Something went wrong.' })
    } finally {
      setPasswordLoading(false)
    }
  }

  const isGoogleUser = user?.provider === 'GOOGLE'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="max-w-sm mx-auto">
      {/* 프로필 요약 */}
      <div className="bg-card rounded-2xl border border-terra-50 p-5 flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-terra-50 flex items-center justify-center text-2xl shrink-0">
          👤
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-brown">{user?.nickname}</p>
          <p className="text-brown-light text-sm">{user?.email}</p>
          {isGoogleUser && (
            <span className="text-xs bg-cream border border-terra-50 text-brown-light px-2 py-0.5 rounded-full mt-1 inline-block">
              Google account
            </span>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-brown-light hover:text-terra transition-colors shrink-0"
        >
          Logout
        </button>
      </div>

      {/* 탭 */}
      <div className="flex bg-cream rounded-xl p-1 mb-5 border border-terra-50">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
              tab === t ? 'bg-card shadow-sm text-brown' : 'text-brown-light hover:text-brown'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Profile 탭 */}
      {tab === 'Profile' && (
        <div className="flex flex-col gap-4">
          <div className="bg-card rounded-2xl border border-terra-50 p-5">
            <h2 className="font-display font-semibold text-brown mb-4">Change Nickname</h2>
            <form onSubmit={handleNicknameSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={nickname}
                onChange={(e) => { setNickname(e.target.value); setNicknameMsg(null) }}
                required
                className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown text-sm focus:outline-none focus:border-terra transition-colors"
              />
              {nicknameMsg && (
                <p className={`text-xs text-center ${nicknameMsg.ok ? 'text-sage' : 'text-red-500'}`}>
                  {nicknameMsg.text}
                </p>
              )}
              <button
                type="submit"
                disabled={nicknameLoading || !nickname.trim() || nickname.trim() === user?.nickname}
                className="w-full bg-terra text-white font-medium py-3 rounded-xl hover:bg-terra-dark transition-colors disabled:opacity-50"
              >
                {nicknameLoading ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>

          {!isGoogleUser && (
            <div className="bg-card rounded-2xl border border-terra-50 p-5">
              <h2 className="font-display font-semibold text-brown mb-4">Change Password</h2>
              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
                <input
                  type="password"
                  placeholder="Current password"
                  value={passwords.current}
                  onChange={(e) => { setPasswords((p) => ({ ...p, current: e.target.value })); setPasswordMsg(null) }}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors"
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={passwords.next}
                  onChange={(e) => { setPasswords((p) => ({ ...p, next: e.target.value })); setPasswordMsg(null) }}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwords.confirm}
                  onChange={(e) => { setPasswords((p) => ({ ...p, confirm: e.target.value })); setPasswordMsg(null) }}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors"
                />
                {passwordMsg && (
                  <p className={`text-xs text-center ${passwordMsg.ok ? 'text-sage' : 'text-red-500'}`}>
                    {passwordMsg.text}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full bg-terra text-white font-medium py-3 rounded-xl hover:bg-terra-dark transition-colors disabled:opacity-50"
                >
                  {passwordLoading ? 'Saving...' : 'Change Password'}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* My Posts 탭 */}
      {tab === 'My Posts' && (
        <div>
          {postsLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-terra border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-3xl mb-3">💬</p>
              <p className="text-brown-light text-sm">No posts yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/board/${post.id}`}
                  className="bg-card rounded-2xl border border-terra-50 p-4 hover:border-terra transition-colors"
                >
                  <p className="font-display font-semibold text-brown text-sm mb-1 truncate">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-brown-light">
                    <span>👁 {post.viewCount}</span>
                    <span>♥ {post.likeCount}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* My Comments 탭 */}
      {tab === 'My Comments' && (
        <div>
          {commentsLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-terra border-t-transparent rounded-full animate-spin" />
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-3xl mb-3">💭</p>
              <p className="text-brown-light text-sm">No comments yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {comments.map((comment) => (
                <Link
                  key={comment.id}
                  to={`/board/${comment.postId}`}
                  className="bg-card rounded-2xl border border-terra-50 p-4 hover:border-terra transition-colors"
                >
                  <p className="text-xs text-terra font-medium mb-1 truncate">
                    {comment.postTitle}
                  </p>
                  <p className="text-brown text-sm leading-relaxed line-clamp-2">
                    {comment.content}
                  </p>
                  <p className="text-xs text-brown-light mt-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
