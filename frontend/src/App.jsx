import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import InstallPrompt from './components/InstallPrompt'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

export default function App(){
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    // Kill old Monique service workers that inject i9b5n5sl.js
    if('serviceWorker' in navigator){
      navigator.serviceWorker.getRegistrations().then(regs=>{
        regs.forEach(r=>r.unregister())
      })
    }
    const t=setTimeout(()=>setLoading(false),1000)
    return ()=>clearTimeout(t)
  },[])

  return (<BrowserRouter>
    {loading && <Preloader/>}
    <Header/>
    <main className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </main>
    <Footer/>
    <InstallPrompt/>
  </BrowserRouter>)
}
