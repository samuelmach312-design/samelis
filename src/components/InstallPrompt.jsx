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

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e) => {
      console.log('[SAMELIS] PWA installable!');
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = localStorage.getItem('samelis-pwa-dismissed');
      const lastDismiss = dismissed ? parseInt(dismissed) : 0;
      if (!dismissed || Date.now() - lastDismiss > 24*60*60*1000) setShowPrompt(true);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      setShowGuide(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);

    // Show after 2.5s if not dismissed
    const t = setTimeout(() => {
      if (!localStorage.getItem('samelis-pwa-dismissed-force')) setShowPrompt(true);
    }, 2500);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
      clearTimeout(t);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('[SAMELIS] outcome', outcome);
      if (outcome === 'accepted') setShowPrompt(false);
      setDeferredPrompt(null);
    } else {
      // No auto prompt - show beautiful guide for any device
      setShowGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('samelis-pwa-dismissed', Date.now().toString());
  };

  if (isInstalled) return null;

  return (
    <>
      {showPrompt && !showGuide && (
        <div style={{position:'fixed',bottom:16,left:16,right:16,zIndex:999999,maxWidth:440,margin:'0 auto',background:'white',borderRadius:20,boxShadow:'0 20px 60px rgba(0,0,0,0.2)',border:'1px solid #e2e8f0',padding:16,display:'flex',alignItems:'center',gap:14,animation:'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',fontFamily:'system-ui, sans-serif'}}>
          <img src="/logo.png" alt="SAMELIS" style={{width:52,height:52,borderRadius:14,background:'#f0f7ff',border:'1px solid #dbeafe',padding:4,objectFit:'contain'}} />
          <div style={{flex:1,minWidth:0}}><div style={{fontWeight:800,fontSize:14,color:'#0f172a'}}>Install SAMELIS App</div><div style={{fontSize:12,color:'#475569',marginTop:2}}>Trusted Family Shop • Till <b style={{color:'#0f172a'}}>6880156</b> • Fast</div></div>
          <button onClick={handleDismiss} style={{background:'#f1f5f9',border:'none',width:32,height:32,borderRadius:9999,cursor:'pointer',color:'#64748b'}}>✕</button>
          <button onClick={handleInstall} style={{background:'#0f2b46',color:'white',border:'none',borderRadius:9999,padding:'10px 18px',fontWeight:800,fontSize:13,cursor:'pointer',boxShadow:'0 4px 12px rgba(15,43,70,0.25)'}}>Install App</button>
          <style>{`@keyframes slideUp { from { transform:translateY(120%); opacity:0 } to { transform:translateY(0); opacity:1 } }`}</style>
        </div>
      )}

      {showGuide && (
        <div style={{position:'fixed',inset:0,zIndex:1000000,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16,fontFamily:'system-ui, sans-serif'}} onClick={()=>setShowGuide(false)}>
          <div style={{background:'white',borderRadius:24,maxWidth:380,width:'100%',overflow:'hidden',boxShadow:'0 25px 80px rgba(0,0,0,0.3)',animation:'slideUp 0.35s ease'}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:24,textAlign:'center',borderBottom:'1px solid #f1f5f9'}}>
              <img src="/logo.png" alt="SAMELIS" style={{width:72,height:72,borderRadius:18,background:'#f0f7ff',border:'1px solid #dbeafe',padding:6,margin:'0 auto 12px',display:'block'}} />
              <div style={{fontWeight:900,fontSize:20,color:'#0f172a'}}>Install SAMELIS</div>
              <div style={{fontSize:13,color:'#64748b',marginTop:4}}>Till 6880156 • Trusted Family Shop • Blue S-shield icon</div>
            </div>
            <div style={{padding:20}}>
              {platform === 'ios' ? (
                <div style={{display:'grid',gap:14}}>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start'}}><div style={{width:32,height:32,background:'#0f2b46',color:'white',borderRadius:9999,display:'grid',placeItems:'center',fontWeight:800,flexShrink:0}}>1</div><div><b style={{fontSize:14}}>Tap Share</b><div style={{fontSize:12,color:'#475569',marginTop:2}}>Tap the share button at bottom of Safari (square with arrow)</div><div style={{fontSize:20,marginTop:6}}>⎙</div></div></div>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start'}}><div style={{width:32,height:32,background:'#0f2b46',color:'white',borderRadius:9999,display:'grid',placeItems:'center',fontWeight:800,flexShrink:0}}>2</div><div><b style={{fontSize:14}}>Add to Home Screen</b><div style={{fontSize:12,color:'#475569',marginTop:2}}>Scroll down and tap “Add to Home Screen”</div><div style={{fontSize:20,marginTop:6}}>➕</div></div></div>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start'}}><div style={{width:32,height:32,background:'#16a34a',color:'white',borderRadius:9999,display:'grid',placeItems:'center',fontWeight:800,flexShrink:0}}>3</div><div><b style={{fontSize:14}}>Tap Add</b><div style={{fontSize:12,color:'#475569',marginTop:2}}>You will get our blue S-shield on your home screen!</div></div></div>
                </div>
              ) : platform === 'android' ? (
                <div style={{display:'grid',gap:14}}>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start'}}><div style={{width:32,height:32,background:'#0f2b46',color:'white',borderRadius:9999,display:'grid',placeItems:'center',fontWeight:800,flexShrink:0}}>1</div><div><b style={{fontSize:14}}>Tap Menu (⋮)</b><div style={{fontSize:12,color:'#475569',marginTop:2}}>Top right corner in Chrome</div></div></div>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start'}}><div style={{width:32,height:32,background:'#0f2b46',color:'white',borderRadius:9999,display:'grid',placeItems:'center',fontWeight:800,flexShrink:0}}>2</div><div><b style={{fontSize:14}}>Tap Install App</b><div style={{fontSize:12,color:'#475569',marginTop:2}}>Or “Add to Home Screen”</div></div></div>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start'}}><div style={{width:32,height:32,background:'#16a34a',color:'white',borderRadius:9999,display:'grid',placeItems:'center',fontWeight:800,flexShrink:0}}>3</div><div><b style={{fontSize:14}}>Enjoy Fast Shopping</b><div style={{fontSize:12,color:'#475569',marginTop:2}}>Works offline • Till 6880156</div></div></div>
                </div>
              ) : (
                <div style={{display:'grid',gap:14}}>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start'}}><div style={{width:32,height:32,background:'#0f2b46',color:'white',borderRadius:9999,display:'grid',placeItems:'center',fontWeight:800,flexShrink:0}}>1</div><div><b style={{fontSize:14}}>Chrome Menu → Install</b><div style={{fontSize:12,color:'#475569',marginTop:2}}>Top right (⋮) → Install SAMELIS or “Save and share → Install”</div></div></div>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start'}}><div style={{width:32,height:32,background:'#0f2b46',color:'white',borderRadius:9999,display:'grid',placeItems:'center',fontWeight:800,flexShrink:0}}>2</div><div><b style={{fontSize:14}}>Or Address Bar</b><div style={{fontSize:12,color:'#475569',marginTop:2}}>Click the install icon in address bar (computer with arrow)</div><div style={{fontSize:18,marginTop:6}}>⤓</div></div></div>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start'}}><div style={{width:32,height:32,background:'#16a34a',color:'white',borderRadius:9999,display:'grid',placeItems:'center',fontWeight:800,flexShrink:0}}>3</div><div><b style={{fontSize:14}}>Pin to Taskbar</b><div style={{fontSize:12,color:'#475569',marginTop:2}}>Get blue S-shield icon • Till 6880156</div></div></div>
                </div>
              )}
            </div>
            <div style={{padding:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,background:'#f8fafc'}}>
              <button onClick={()=>{setShowGuide(false); setShowPrompt(false); localStorage.setItem('samelis-pwa-dismissed-force','1');}} style={{height:44,borderRadius:9999,border:'1px solid #e2e8f0',background:'white',fontWeight:700,fontSize:13,cursor:'pointer'}}>Not Now</button>
              <button onClick={()=>setShowGuide(false)} style={{height:44,borderRadius:9999,border:'none',background:'#0f2b46',color:'white',fontWeight:800,fontSize:13,cursor:'pointer'}}>Got it!</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
