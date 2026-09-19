import { useState, useEffect } from 'react'
export default function Preloader(){
 const [loading,setLoading]=useState(true); const [fade,setFade]=useState(false)
 useEffect(()=>{const t=setTimeout(()=>{setFade(true); setTimeout(()=>setLoading(false),500)},800); return ()=>clearTimeout(t)},[])
 if(!loading) return null
 return (<div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${fade?'opacity-0':'opacity-100'}`}>
  <div className="flex flex-col items-center gap-4"><div className="w-20 h-20 bg-white text-black rounded-xl flex items-center justify-center font-black text-3xl animate-pulse">S</div>
  <h1 className="text-white font-black text-3xl tracking-wider">SAMELIS</h1><p className="text-orange-400 text-xs tracking-[0.2em]">TILL 6880156 • TRUSTED LIKE FAMILY</p>
  <div className="w-40 h-0.5 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full bg-white w-full animate-pulse"/></div></div></div>)
}
