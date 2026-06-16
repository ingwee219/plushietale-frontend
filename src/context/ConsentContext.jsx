import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { loadAnalytics } from '../lib/analytics'

const ConsentContext = createContext(null)

const STORAGE_KEY = 'cookie_consent'
// 카테고리 구성이 바뀌면 버전을 올려 사용자에게 다시 동의를 받는다.
const CONSENT_VERSION = 1

function readStoredConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.version !== CONSENT_VERSION) return null // 구버전 → 다시 물어봄
    return parsed
  } catch {
    return null
  }
}

export function ConsentProvider({ children }) {
  // null = 아직 아무 선택도 하지 않은 상태
  const [stored, setStored] = useState(readStoredConsent)
  // 푸터의 "Cookie settings"로 설정 창을 다시 열었는지 여부
  const [settingsOpen, setSettingsOpen] = useState(false)

  const decided = stored !== null
  const analytics = stored?.analytics ?? false

  // analytics 동의가 있으면 추적 스크립트를 로드한다.
  useEffect(() => {
    if (analytics) loadAnalytics()
  }, [analytics])

  const persist = useCallback((analyticsAllowed) => {
    const value = {
      version: CONSENT_VERSION,
      analytics: analyticsAllowed,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    setStored(value)
    setSettingsOpen(false)
  }, [])

  const acceptAll = useCallback(() => persist(true), [persist])
  const rejectAll = useCallback(() => persist(false), [persist])
  const savePreferences = useCallback(
    (prefs) => persist(Boolean(prefs.analytics)),
    [persist],
  )
  const openSettings = useCallback(() => setSettingsOpen(true), [])
  const closeSettings = useCallback(() => setSettingsOpen(false), [])

  return (
    <ConsentContext.Provider
      value={{
        decided,
        analytics,
        settingsOpen,
        acceptAll,
        rejectAll,
        savePreferences,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  return useContext(ConsentContext)
}
