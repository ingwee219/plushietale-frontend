import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinkClass = ({ isActive }) =>
    `hidden md:inline text-sm font-medium transition-colors ${
      isActive ? 'text-terra' : 'text-brown-light hover:text-brown'
    }`

  return (
    <header className="bg-card border-b border-terra-50 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* 로고 */}
        <Link
          to="/"
          className="font-display font-bold text-xl text-brown tracking-tight"
        >
          🧸 Plushie Tale
        </Link>

        {/* 네비게이션 */}
        {user ? (
          <nav className="flex items-center gap-6">
            <NavLink to="/toys" className={navLinkClass}>Plushies</NavLink>
            <NavLink to="/stories" className={navLinkClass}>Stories</NavLink>
            <NavLink to="/board" className={navLinkClass}>Board</NavLink>

            {/* 프로필 드롭다운 대신 간단하게 */}
            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-terra-50">
              <NavLink
                to="/profile"
                className="text-sm font-medium text-brown-light hover:text-brown transition-colors"
              >
                {user.nickname}
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm text-brown-light hover:text-terra transition-colors"
              >
                Logout
              </button>
            </div>
          </nav>
        ) : (
          <nav className="flex items-center gap-6">
            <NavLink to="/login" className={navLinkClass}>Plushies</NavLink>
            <NavLink to="/login" className={navLinkClass}>Stories</NavLink>
            <NavLink to="/board" className={navLinkClass}>Board</NavLink>
            <Link
              to="/login"
              className="bg-terra text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-terra-dark transition-colors"
            >
              Get Started
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
