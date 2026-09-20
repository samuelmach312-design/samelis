import { useState, useEffect } from "react";
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) { setIsInstalled(true); return; }
    const handleBeforeInstall = (e) => { console.log('[SAMELIS] beforeinstallprompt fired'); e.preventDefault(); setDeferredPrompt(e); const dismissed = localStorage.getItem('samelis-pwa-dismissed'); const lastDismiss = dismissed ? parseInt(dismissed) : 0; const oneDay = 24*60*60*1000; if (!dismissed || Date.now() - lastDismiss > oneDay) { setShowPrompt(true); } };
    const handleInstalled = () => { console.log('[SAMELIS] PWA installed'); setIsInstalled(true); setShowPrompt(false); setDeferredPrompt(null); };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);
    const debugTimer = setTimeout(() => { if (!isInstalled && !localStorage.getItem('samelis-pwa-dismissed-force')) { console.log('[SAMELIS] Debug prompt - showing for testing'); setDebugMode(true); setShowPrompt(true); } }, 2000);
    return () => { window.removeEventListener('beforeinstallprompt', handleBeforeInstall); window.removeEventListener('appinstalled', handleInstalled); clearTimeout(debugTimer); };
  }, []);
  const handleInstall = async () => { if (deferredPrompt) { deferredPrompt.prompt(); const { outcome } = await deferredPrompt.userChoice; console.log('[SAMELIS] Install outcome:', outcome); if (outcome === 'accepted') { setShowPrompt(false); } setDeferredPrompt(null); setDebugMode(false); } else { alert('To install SAMELIS:\n\nOn Android: Tap menu (⋮) → Install app\nOn iPhone: Tap Share → Add to Home Screen\n\nYou will get our blue S-shield icon!'); } };
  const handleDismiss = () => { setShowPrompt(false); setDebugMode(false); localStorage.setItem('samelis-pwa-dismissed', Date.now().toString()); };
  const handleForceDismiss = () => { setShowPrompt(false); setDebugMode(false); localStorage.setItem('samelis-pwa-dismissed-force', '1'); localStorage.setItem('samelis-pwa-dismissed', Date.now().toString()); };
  if (isInstalled || !showPrompt) return null;
  return (
    <div style={{position:'fixed',bottom:16,left:16,right:16,zIndex:999999,maxWidth:440,margin:'0 auto',background:'white',borderRadius:20,boxShadow:'0 20px 60px rgba(0,0,0,0.2)',border:'1px solid #e2e8f0',padding:16,display:'flex',alignItems:'center',gap:14,animation:'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',fontFamily:'system-ui, -apple-system, sans-serif'}}>
      <div style={{position:'relative',flexShrink:0}}>
        <img src="/logo.png" alt="SAMELIS" style={{width:52,height:52,borderRadius:14,objectFit:'contain',background:'#f0f7ff',border:'1px solid #dbeafe',padding:4}} />
        {!debugMode && <div style={{position:'absolute',bottom:-2,right:-2,width:16,height:16,background:'#16a34a',borderRadius:9999,border:'2px solid white',display:'grid',placeItems:'center',fontSize:10}}>✓</div>}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:800,fontSize:14,color:'#0f172a',lineHeight:1.2,display:'flex',alignItems:'center',gap:6}}>Install SAMELIS App{debugMode && <span style={{fontSize:10,background:'#f59e0b',color:'white',padding:'2px 6px',borderRadius:9999,fontWeight:700}}>PREVIEW</span>}</div>
        <div style={{fontSize:12,color:'#475569',marginTop:3,lineHeight:1.35}}>Trusted Family Shop • Till <b style={{color:'#0f172a'}}>6880156</b> • Fast & Offline</div>
      </div>
      <div style={{display:'flex',gap:8,alignItems:'center',flexShrink:0}}>
        <button onClick={handleForceDismiss} title="Don't show again" style={{background:'#f1f5f9',border:'none',fontSize:16,cursor:'pointer',color:'#64748b',width:32,height:32,borderRadius:9999,display:'grid',placeItems:'center'}}>✕</button>
        <button onClick={handleInstall} style={{background:'#0f2b46',color:'white',border:'none',borderRadius:9999,padding:'10px 18px',fontWeight:800,fontSize:13,cursor:'pointer',boxShadow:'0 4px 12px rgba(15,43,70,0.25)',letterSpacing:'0.2px'}}>{deferredPrompt ? 'Install' : 'How to Install'}</button>
      </div>
      <style>{`@keyframes slideUp { from { transform:translateY(120%); opacity:0 } to { transform:translateY(0); opacity:1 } }`}</style>
    </div>
  );
}