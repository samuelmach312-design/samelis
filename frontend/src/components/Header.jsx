import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { ShoppingCart, Menu, X, Search, Download } from 'lucide-react'
import { usePWAInstall } from '../hooks/usePWAInstall'

export default function Header() {
  const { canInstall, install, isInstalled } = usePWAInstall()
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const navigate = useNavigate()
  const totalItems = cart.reduce((s,i)=>s+(i.qty||0),0)

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16 gap-4">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center font-black">S</div>
              <div className="hidden sm:block leading-none">
                <div className="font-black tracking-wider">SAMELIS</div>
                <div className="text- tracking-[0.18em] text-orange-500 font-bold">TILL 6880156</div>
              </div>
            </Link>

            <form onSubmit={(e)=>{e.preventDefault(); if(search.trim()){navigate(`/?search=${encodeURIComponent(search)}`); setShowDropdown(false)}}}
              className="flex-1 max-w-lg mx-2">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-sm focus:bg-white focus:outline-none" />
              </div>
            </form>

            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link to="/" className="px-3 py-2 text-sm font-bold">Home</Link>
              <Link to="/cart" className="relative flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-full text-sm font-bold">
                <ShoppingCart size={16}/> Cart {totalItems>0 && <span className="bg-orange-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center px-1">{totalItems}</span>}
              </Link>
              {user? <button onClick={()=>{logout(); navigate("/")}} className="text-sm text-gray-500">Logout</button> : <Link to="/login" className="px-4 py-2 bg-black text-white text-sm font-bold rounded-full">Login</Link>}
              {canInstall &&!isInstalled && <button onClick={install} className="flex gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-full text-sm font-bold animate-pulse"><Download size={16}/> Install</button>}
            </div>

            <button onClick={()=>setMobileMenu(true)} className="md:hidden w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"><Menu size={20}/></button>
          </div>
        </div>
      </header>

      {mobileMenu && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={()=>setMobileMenu(false)}></div>
          <div className="absolute right-0 top-0 h-full w-[86%] bg-white shadow-2xl flex flex-col">
            <div className="p-5 flex justify-between bg-black text-white">
              <div><div className="font-black">SAMELIS</div><div className="text-xs text-orange-400 tracking-widest">TILL 6880156</div></div>
              <button onClick={()=>setMobileMenu(false)} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"><X size={18}/></button>
            </div>
            <div className="flex-1 p-3 space-y-2">
              <Link to="/" onClick={()=>setMobileMenu(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-black text-white font-bold">⌂ Home</Link>
              <Link to="/cart" onClick={()=>setMobileMenu(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border font-bold">🛒 Cart {totalItems>0 && <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full">{totalItems}</span>}</Link>
              {canInstall &&!isInstalled && <button onClick={()=>{install(); setMobileMenu(false)}} className="w-full flex gap-3 px-4 py-3.5 rounded-2xl bg-orange-500 text-white font-bold">⬇ Install App</button>}
            </div>
            <div className="p-3 border-t text-center text-xs text-gray-400">© 2026 SAMELIS • 0748440035 • Till 6880156</div>
          </div>
        </div>
      )}
    </>
  )
}