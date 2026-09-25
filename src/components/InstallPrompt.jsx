import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault() // block auto banner
      setDeferredPrompt(e)
      setShowInstall(true) // show YOUR button instead
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    
    // This is the missing line that fixes your error:
    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response: ${outcome}`)

    setDeferredPrompt(null)
    setShowInstall(false)
  }

  if (!showInstall) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3">
      <div className="w-10 h-10 bg-white rounded-full grid place-items-center text-slate-900 font-black">S</div>
      <div className="flex-1">
        <div className="text-sm font-bold">Install SAMELIS App</div>
        <div className="text-xs opacity-80">Fast shopping • Till 6880156</div>
      </div>
      <button 
        onClick={handleInstall}
        className="bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-bold hover:bg-slate-100"
      >
        Install
      </button>
      <button onClick={()=>setShowInstall(false)} className="text-white opacity-60 text-sm ml-1">✕</button>
    </div>
  )
}
