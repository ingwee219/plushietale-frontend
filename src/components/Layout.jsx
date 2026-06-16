import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNav from './BottomNav'
import { useAuth } from '../context/AuthContext'
import { useConsent } from '../context/ConsentContext'

export default function Layout({ children, hideFooter }) {
  const { user } = useAuth()
  const { openSettings } = useConsent()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
          {children}
        </div>
      </main>
      {!hideFooter && (
        <footer className="hidden md:block border-t border-terra-50 bg-card py-4">
          <div className="max-w-4xl mx-auto px-4 flex items-center justify-between text-xs text-brown-light">
            <span>© {new Date().getFullYear()} Plushie Tale</span>
            <div className="flex items-center gap-4">
              <button onClick={openSettings} className="hover:text-terra transition-colors">
                Cookie settings
              </button>
              <Link to="/privacy-policy" className="hover:text-terra transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      )}
      {user && <BottomNav />}
    </div>
  )
}
