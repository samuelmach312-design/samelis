import { useState, useEffect } from "react";
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) { setIsInstalled(true); return; }
    const handleBeforeInstall = (e) => { e.preventDefault(); setDeferredPrompt(e); setShowPrompt(true); };
    const handleInstalled = () => { setIsInstalled(true); setShowPrompt(false); setDeferredPrompt(null); };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);
    // Show preview after 2.5s for testing even if event didn't fire
    const t = setTimeout(() => { if(!isInstalled) setShowPrompt(true); }, 2500);
    return () => { window.removeEventListener('beforeinstallprompt', handleBeforeInstall); window.removeEventListener('appinstalled', handleInstalled); clearTimeout(t); };
  }, []);
  const handleInstall = async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; setDeferredPrompt(null); setShowPrompt(false); }
    else { alert('To install SAMELIS:\nAndroid: Tap menu (3 dots) > Install app\n iPhone: Tap Share > Add to Home Screen\n\nYou will get our blue S-shield icon! Till 6880156'); }
  };
  const handleDismiss = () => { setShowPrompt(false); localStorage.setItem('samelis-pwa-dismissed', Date.now().toString()); };
  if (isInstalled || !showPrompt) return null;
  return (
    <div style={{position:'fixed',bottom:16,left:16,right:16,zIndex:999999,maxWidth:440,margin:'0 auto',background:'white',borderRadius:20,boxShadow:'0 20px 60px rgba(0,0,0,0.2)',border:'1px solid #e2e8f0',padding:16,display:'flex',alignItems:'center',gap:14}}>
      <img src="/logo.png" alt="SAMELIS" style={{width:52,height:52,borderRadius:14,background:'#f0f7ff',border:'1px solid #dbeafe',padding:4,objectFit:'contain'}} />
      <div style={{flex:1,minWidth:0}}><div style={{fontWeight:800,fontSize:14,color:'#0f172a'}}>Install SAMELIS App</div><div style={{fontSize:12,color:'#64748b',marginTop:2}}>Trusted Family Shop • Till <b style={{color:'#0f172a'}}>6880156</b> • Fast</div></div>
      <button onClick={handleDismiss} style={{background:'#f1f5f9',border:'none',width:32,height:32,borderRadius:9999,cursor:'pointer',color:'#64748b'}}>✕</button>
      <button onClick={handleInstall} style={{background:'#0f2b46',color:'white',border:'none',borderRadius:9999,padding:'10px 18px',fontWeight:800,fontSize:13,cursor:'pointer'}}>Install</button>
    </div>
  );
}