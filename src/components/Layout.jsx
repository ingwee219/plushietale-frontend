import Navbar from './Navbar'
import BottomNav from './BottomNav'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
          {children}
        </div>
      </main>
      {user && <BottomNav />}
    </div>
  )
}
