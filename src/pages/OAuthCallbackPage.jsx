import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const { loginWithToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      loginWithToken(token)
        .then(() => navigate('/stories', { replace: true }))
        .catch(() => navigate('/login', { replace: true }))
    } else {
      navigate('/login', { replace: true })
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-terra border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-brown-light font-body">Signing you in...</p>
      </div>
    </div>
  )
}
