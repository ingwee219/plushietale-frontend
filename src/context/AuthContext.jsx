import { createContext, useContext, useState, useEffect } from 'react'
import { getMyInfo } from '../api/user'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)       // { email, nickname, role }
  const [loading, setLoading] = useState(true)  // 초기 로딩 (토큰 확인 중)

  // 앱 시작 시 토큰이 있으면 내 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMyInfo()
        .then((res) => setUser(res.data.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const loginWithToken = (token) => {
    localStorage.setItem('token', token)
    return getMyInfo().then((res) => setUser(res.data.data))
  }

  const refreshUser = () =>
    getMyInfo().then((res) => setUser(res.data.data))

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithToken, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
