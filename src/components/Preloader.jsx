import { useState, useEffect } from 'react'
export default function Preloader(){
 const [loading,setLoading]=useState(true);
 const [fade,setFade]=useState(false)
 useEffect(()=>{
  const t=setTimeout(()=>{
    setFade(true);
    setTimeout(()=>setLoading(false),500)
  },1200);
  return ()=>clearTimeout(t)
 },[])
 if(!loading) return null
 return (
  <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f172a] transition-opacity duration-500 ${fade?'opacity-0':'opacity-100'}`}>
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <div className="w-24 h-24 bg-white rounded-[20px] flex items-center justify-center shadow-2xl p-3">
          <img src="/logo.png" alt="SAMELIS" className="w-full h-full object-contain" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-[3px] border-[#0f172a] flex items-center justify-center text-[11px] text-white font-bold">✓</div>
      </div>
      <div className="flex flex-col items-center gap-2 mt-2">
        <h1 className="text-white font-black text-[28px] tracking-[0.15em]">SAMELIS</h1>
        <p className="text-blue-300 text-[11px] tracking-[0.25em] font-bold">TRUSTED FAMILY SHOP</p>
      </div>
      <div className="w-48 h-[3px] bg-white/10 rounded-full overflow-hidden mt-4">
        <div className="h-full bg-white rounded-full w-full" style={{animation:'loadProgress 1.2s ease-in-out forwards'}}></div>
      </div>
      <style>{`@keyframes loadProgress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </div>
  </div>
 )
}
