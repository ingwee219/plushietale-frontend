import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import OAuthCallbackPage from './pages/OAuthCallbackPage'
import ToysPage from './pages/ToysPage'
import NewToyPage from './pages/NewToyPage'
import EditToyPage from './pages/EditToyPage'
import StoriesPage from './pages/StoriesPage'
import NewStoryPage from './pages/NewStoryPage'
import StoryDetailPage from './pages/StoryDetailPage'
import BoardPage from './pages/BoardPage'
import PostDetailPage from './pages/PostDetailPage'
import ProfilePage from './pages/ProfilePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 공개 페이지 */}
          <Route path="/" element={<Layout hideFooter><LandingPage /></Layout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth2/callback" element={<OAuthCallbackPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/board" element={<Layout><BoardPage /></Layout>} />
          <Route path="/board/:id" element={<Layout><PostDetailPage /></Layout>} />

          {/* 로그인 필요 페이지 */}
          <Route element={<PrivateRoute />}>
            <Route path="/toys" element={<Layout><ToysPage /></Layout>} />
            <Route path="/toys/new" element={<Layout><NewToyPage /></Layout>} />
            <Route path="/toys/:id/edit" element={<Layout><EditToyPage /></Layout>} />
            <Route path="/stories" element={<Layout><StoriesPage /></Layout>} />
            <Route path="/stories/new" element={<Layout><NewStoryPage /></Layout>} />
            <Route path="/stories/:id" element={<Layout><StoryDetailPage /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
