import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/toys', label: 'Plushies', icon: '🧸' },
  { to: '/stories/new', label: 'Create', icon: '✨' },
  { to: '/stories', label: 'Stories', icon: '📖' },
  { to: '/board', label: 'Board', icon: '💬' },
  { to: '/profile', label: 'Me', icon: '👤' },
]

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-terra-50 z-50">
      <div className="flex">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-xs font-medium transition-colors ${
                isActive ? 'text-terra' : 'text-brown-light'
              }`
            }
          >
            <span className="text-xl leading-none">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
