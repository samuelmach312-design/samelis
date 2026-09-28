import { useEffect, useState } from 'react'

const KEY = 'samelis_install_dismissed'
const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent)

export default function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState(null)
  const [show, setShow] = useState(false)
  const ios = isIOS()

  useEffect(() => {
    if (isStandalone()) return
    const dismissedAt = Number(localStorage.getItem(KEY) || 0)
    if (Date.now() - dismissedAt < 14 * 24 * 60 * 60 * 1000) return

    let timer
    const onPrompt = (e) => {
      e.preventDefault()
      setInstallEvent(e)
      timer = setTimeout(() => setShow(true), 8000)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    if (ios) timer = setTimeout(() => setShow(true), 8000)

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      clearTimeout(timer)
    }
  }, [ios])

  const dismiss = () => {
    localStorage.setItem(KEY, String(Date.now()))
    setShow(false)
  }

  const install = async () => {
    if (!installEvent) return
    installEvent.prompt()
    await installEvent.userChoice
    setInstallEvent(null)
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label="Install Samelis"
      className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:inset-x-auto md:right-4 md:w-80"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-900 text-lg font-extrabold text-white">S</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">Install the Samelis app</p>
          <p className="mt-0.5 text-sm text-slate-500">
            {ios ? 'Tap Share, then Add to Home Screen.' : 'Open Samelis straight from your home screen.'}
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        {!ios && (
          <button onClick={install} className="flex-1 rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
            Install
          </button>
        )}
        <button onClick={dismiss} className="flex-1 rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
          {ios ? 'Got it' : 'Not now'}
        </button>
      </div>
    </div>
  )
}
