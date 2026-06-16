// 애널리틱스 로더.
// 사용자가 analytics 쿠키에 동의했을 때만 ConsentContext가 이 함수를 호출한다.
// VITE_GA_MEASUREMENT_ID가 설정되어 있지 않으면 아무것도 하지 않는다
// (아직 GA를 붙이지 않은 상태 — 동의 인프라만 준비됨).

let loaded = false

export function loadAnalytics() {
  if (loaded) return // 중복 삽입 방지 (StrictMode에서 effect 2회 실행 대비)

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (!measurementId) return // GA 미설정 → no-op

  loaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', measurementId, { anonymize_ip: true })
}
