import { useState, useEffect } from "react";
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [platform, setPlatform] = useState('other');
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) setPlatform('ios');
    else if (/android/.test(ua)) setPlatform('android');
    else setPlatform('desktop');
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) { setIsInstalled(true); return; }
    const handleBeforeInstall = (e) => { e.preventDefault(); setDeferredPrompt(e); setShowPrompt(true); };
    const handleInstalled = () => { setIsInstalled(true); setShowPrompt(false); setDeferredPrompt(null); setShowGuide(false); };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);
    const t = setTimeout(() => { if (!localStorage.getItem('samelis-pwa-dismissed-force')) setShowPrompt(true); }, 2500);
    return () => { window.removeEventListener('beforeinstallprompt', handleBeforeInstall); window.removeEventListener('appinstalled', handleInstalled); clearTimeout(t); };
  }, []);
  const handleInstall = async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; setDeferredPrompt(null); setShowPrompt(false); }
    else { setShowGuide(true); }
  };
  const handleDismiss = () => { setShowPrompt(false); localStorage.setItem('samelis-pwa-dismissed', Date.now().toString()); };
  if (isInstalled) return null;
  return (
    <>
      {showPrompt && !showGuide && (
        <div style={{position:'fixed',bottom:16,left:16,right:16,zIndex:999999,maxWidth:440,margin:'0 auto',background:'white',borderRadius:20,boxShadow:'0 20px 60px rgba(0,0,0,0.2)',border:'1px solid #e2e8f0',padding:16,display:'flex',alignItems:'center',gap:14}}>
          <img src="/logo.png" alt="SAMELIS" style={{width:52,height:52,borderRadius:14,background:'#f0f7ff',border:'1px solid #dbeafe',padding:4,objectFit:'contain'}} />
          <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14}}>Install SAMELIS App</div><div style={{fontSize:12,color:'#64748b'}}>Trusted Family Shop • Till <b>6880156</b> • Fast</div></div>
          <button onClick={handleDismiss} style={{background:'#f1f5f9',border:'none',width:32,height:32,borderRadius:9999,cursor:'pointer'}}>?</button>
          <button onClick={handleInstall} style={{background:'#0f2b46',color:'white',border:'none',borderRadius:9999,padding:'10px 18px',fontWeight:800,fontSize:13,cursor:'pointer'}}>Install App</button>
        </div>
      )}
      {showGuide && (
        <div style={{position:'fixed',inset:0,zIndex:1000000,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}} onClick={()=>setShowGuide(false)}>
          <div style={{background:'white',borderRadius:24,maxWidth:380,width:'100%',overflow:'hidden',boxShadow:'0 25px 80px rgba(0,0,0,0.3)'}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:24,textAlign:'center',borderBottom:'1px solid #f1f5f9'}}>
              <img src="/logo.png" alt="SAMELIS" style={{width:72,height:72,borderRadius:18,background:'#f0f7ff',border:'1px solid #dbeafe',padding:6,margin:'0 auto 12px',display:'block'}} />
              <div style={{fontWeight:900,fontSize:20}}>Install SAMELIS</div>
              <div style={{fontSize:13,color:'#64748b',marginTop:4}}>Till 6880156 • Blue S-shield icon</div>
            </div>
            <div style={{padding:20}}>
              {platform==='ios' ? (
                <div style={{display:'grid',gap:14}}><div>1. Tap Share ? (Safari bottom)</div><div>2. Tap Add to Home Screen ?</div><div>3. Tap Add - Blue S-shield!</div></div>
              ) : platform==='android' ? (
                <div style={{display:'grid',gap:14}}><div>1. Tap Menu ? top right</div><div>2. Tap Install App</div><div>3. Enjoy - Works Offline!</div></div>
              ) : (
                <div style={{display:'grid',gap:14}}><div>1. Chrome Menu ? ? Install SAMELIS</div><div>2. Or click ? in address bar</div><div>3. Pin to Taskbar - Till 6880156</div></div>
              )}
            </div>
            <div style={{padding:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,background:'#f8fafc'}}>
              <button onClick={()=>{setShowGuide(false); setShowPrompt(false); localStorage.setItem('samelis-pwa-dismissed-force','1');}} style={{height:44,borderRadius:9999,border:'1px solid #e2e8f0',background:'white',fontWeight:700,cursor:'pointer'}}>Not Now</button>
              <button onClick={()=>setShowGuide(false)} style={{height:44,borderRadius:9999,border:'none',background:'#0f2b46',color:'white',fontWeight:800,cursor:'pointer'}}>Got it!</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}