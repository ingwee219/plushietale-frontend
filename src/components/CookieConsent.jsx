import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useConsent } from '../context/ConsentContext'

export default function CookieConsent() {
  const {
    decided,
    analytics,
    settingsOpen,
    acceptAll,
    rejectAll,
    savePreferences,
    closeSettings,
  } = useConsent()

  const [customizing, setCustomizing] = useState(false)
  const [analyticsPref, setAnalyticsPref] = useState(analytics)

  // 첫 방문(미결정) 또는 푸터에서 설정을 다시 열었을 때 노출
  const show = !decided || settingsOpen
  // 재오픈한 경우엔 항상 카테고리 패널부터 보여준다
  const showCustomize = settingsOpen || customizing

  // 패널이 보일 때마다 토글 값을 현재 저장된 동의 상태로 맞춘다
  useEffect(() => {
    if (show) setAnalyticsPref(analytics)
  }, [show, analytics])

  if (!show) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="max-w-2xl mx-auto bg-card border border-terra-50 rounded-2xl shadow-lg p-5 sm:p-6">

        {!showCustomize ? (
          /* ── 간단 배너 ── */
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none">🍪</span>
              <div>
                <h2 className="font-display font-semibold text-brown mb-1">
                  We value your privacy
                </h2>
                <p className="text-sm text-brown-light leading-relaxed">
                  We use storage that is strictly necessary to keep you logged in. With your
                  permission, we'd also like to use analytics cookies to understand how the
                  service is used and improve it. You can change your choice at any time.{' '}
                  <Link to="/privacy-policy" className="text-terra hover:underline">
                    Learn more
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
              <button
                onClick={rejectAll}
                className="order-2 sm:order-1 px-5 py-2.5 text-sm font-medium rounded-xl border border-terra-50 text-brown hover:bg-terra-50 transition-colors"
              >
                Reject all
              </button>
              <button
                onClick={() => setCustomizing(true)}
                className="order-3 sm:order-2 px-5 py-2.5 text-sm font-medium rounded-xl border border-terra-50 text-brown hover:bg-terra-50 transition-colors"
              >
                Customize
              </button>
              <button
                onClick={acceptAll}
                className="order-1 sm:order-3 px-5 py-2.5 text-sm font-medium rounded-xl bg-terra text-white hover:bg-terra-dark transition-colors"
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          /* ── 카테고리 설정 ── */
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display font-semibold text-brown">Cookie settings</h2>
              {decided && (
                <button
                  onClick={closeSettings}
                  aria-label="Close cookie settings"
                  className="text-brown-light hover:text-brown text-xl leading-none"
                >
                  ×
                </button>
              )}
            </div>

            {/* Necessary — 항상 켜짐 */}
            <div className="flex items-start justify-between gap-4 border-t border-terra-50 pt-4">
              <div>
                <p className="text-sm font-medium text-brown">Strictly necessary</p>
                <p className="text-xs text-brown-light leading-relaxed mt-0.5">
                  Required to keep you logged in and operate the service. These cannot be
                  turned off.
                </p>
              </div>
              <span className="text-xs font-medium text-brown-light whitespace-nowrap mt-0.5">
                Always active
              </span>
            </div>

            {/* Analytics — 옵트인 */}
            <div className="flex items-start justify-between gap-4 border-t border-terra-50 pt-4">
              <div>
                <p className="text-sm font-medium text-brown">Analytics</p>
                <p className="text-xs text-brown-light leading-relaxed mt-0.5">
                  Helps us understand how the service is used so we can improve it. Optional.
                </p>
              </div>
              <button
                role="switch"
                aria-checked={analyticsPref}
                aria-label="Toggle analytics cookies"
                onClick={() => setAnalyticsPref((v) => !v)}
                className={`relative shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors ${
                  analyticsPref ? 'bg-terra' : 'bg-terra-50'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-sm transition-transform ${
                    analyticsPref ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-2 border-t border-terra-50 pt-4">
              <button
                onClick={rejectAll}
                className="order-2 sm:order-1 px-5 py-2.5 text-sm font-medium rounded-xl border border-terra-50 text-brown hover:bg-terra-50 transition-colors"
              >
                Reject all
              </button>
              <button
                onClick={() => savePreferences({ analytics: analyticsPref })}
                className="order-1 sm:order-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-terra text-white hover:bg-terra-dark transition-colors"
              >
                Save preferences
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
