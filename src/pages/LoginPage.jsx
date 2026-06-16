import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login, signup } from '../api/auth'

export default function LoginPage() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [form, setForm] = useState({ email: '', password: '', nickname: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginWithToken } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res =
        mode === 'login'
          ? await login(form.email, form.password)
          : await signup(form.email, form.password, form.nickname)
      await loginWithToken(res.data.data.token)
      navigate('/stories', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    const base = import.meta.env.VITE_API_BASE_URL ?? ''
    window.location.href = `${base}/oauth2/authorization/google`
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-4xl">🧸</span>
            <h1 className="font-display font-bold text-2xl text-brown mt-2">
              Plushie Tale
            </h1>
          </Link>
          <p className="text-brown-light text-sm mt-1">
            Turn your toys into stories
          </p>
        </div>

        {/* 카드 */}
        <div className="bg-card rounded-2xl shadow-sm border border-terra-50 p-8">
          {/* 탭 */}
          <div className="flex bg-cream rounded-xl p-1 mb-7">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  mode === m
                    ? 'bg-card shadow-sm text-brown'
                    : 'text-brown-light hover:text-brown'
                }`}
              >
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <input
                name="nickname"
                type="text"
                placeholder="Nickname"
                value={form.nickname}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors"
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-terra-50 bg-cream text-brown placeholder-brown-light/60 text-sm focus:outline-none focus:border-terra transition-colors"
            />

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terra text-white font-medium py-3.5 rounded-xl hover:bg-terra-dark transition-colors disabled:opacity-60 mt-1"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Create Account'}
            </button>

            {mode === 'signup' && (
              <p className="text-xs text-brown-light text-center mt-1">
                By creating an account, you agree to our{' '}
                <Link to="/privacy-policy" className="text-terra hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            )}
          </form>

          {/* 구분선 */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-terra-50" />
            <span className="text-xs text-brown-light">or</span>
            <div className="flex-1 h-px bg-terra-50" />
          </div>

          {/* Google 로그인 */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-terra-50 rounded-xl py-3.5 text-sm font-medium text-brown hover:bg-terra-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}
