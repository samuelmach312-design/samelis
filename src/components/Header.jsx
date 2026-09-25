import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { user, setUser } = useAuth()
  const { count } = useCart()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    setUser(null)
    setShowUserMenu(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Top Trust Bar */}
      <div className="bg-[#0f172a] text-white text- py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4 font-semibold tracking-wide">
            <span>📦 Free Delivery Nairobi • Same-day</span>
            <span className="hidden md:inline">• 🛡️ 100% Genuine • SAMELIS Verified</span>
          </div>
          <div className="hidden md:flex gap-4 opacity-80">
            <Link to="/contact">Help</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3 md:gap-6">
          {/* Logo + Home */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="SAMELIS" className="h-9 w-auto object-contain" />
            <div className="hidden md:block leading-none">
              <div className="font-black text- tracking-tight">SAMELIS</div>
              <div className="text- font-bold tracking-[0.2em] text-[#3b82f6] -mt-0.5">TRUSTED FAMILY SHOP</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text- font-semibold text-slate-700">
            <Link to="/" className="px-3 py-2 hover:bg-slate-50 rounded-full">Home</Link>
            <Link to="/#products" className="px-3 py-2 hover:bg-slate-50 rounded-full">Shop</Link>
            <Link to="/contact" className="px-3 py-2 hover:bg-slate-50 rounded-full">Contact</Link>
          </nav>

          {/* Search - Like your screenshot but better */}
          <div className="flex-1 relative max-w-">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-">⌕</span>
            <input
              placeholder="Search shoes, boots, slides, belts..."
              className="w-full h-10 md:h-11 pl-10 pr-4 bg-[#f1f5f9] border border-transparent focus:bg-white focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 rounded-full text- outline-none transition-all"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Till Badge */}
            <div className="hidden md:flex items-center gap-2 bg-[#0f172a] text-white px-4 h-10 rounded-full text- font-bold">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> TILL 6880156
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:border-slate-300">
              <span className="text-">🛒</span>
              {count > 0 && <span className="absolute -top-1 -right-1 bg-[#3b82f6] text-white text- font-bold w-5 h-5 rounded-full grid place-items-center">{count}</span>}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-full bg-[#f1f5f9] border border-slate-200 flex items-center justify-center font-bold text- hover:bg-slate-100"
              >
                {user? user.email?.[0]?.toUpperCase() : '👤'}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-slate-100 p-2 z-50">
                  {user? (
                    <>
                      <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                        <div className="text- font-bold truncate">{user.email}</div>
                        <div className="text- text-slate-500">SAMELIS Customer</div>
                      </div>
                      <Link to="/" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-2 px-3 py-2.5 text- font-semibold hover:bg-slate-50 rounded-xl">🏠 Home</Link>
                      <Link to="/orders" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-2 px-3 py-2.5 text- font-semibold hover:bg-slate-50 rounded-xl">📦 My Orders</Link>
                      <Link to="/profile" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-2 px-3 py-2.5 text- font-semibold hover:bg-slate-50 rounded-xl">👤 Profile</Link>
                      <button onClick={logout} className="w-full text-left flex items-center gap-2 px-3 py-2.5 text- font-semibold text-red-600 hover:bg-red-50 rounded-xl">🚪 Logout</button>
                    </>
                  ) : (
                    <>
                      <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                        <div className="text- font-bold">Welcome to SAMELIS</div>
                        <div className="text- text-slate-500">Login for faster checkout</div>
                      </div>
                      <Link to="/" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-2 px-3 py-2.5 text- font-semibold hover:bg-slate-50 rounded-xl">🏠 Home</Link>
                      <Link to="/login" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-2 px-3 py-2.5 text- font-semibold hover:bg-slate-50 rounded-xl">🔑 Login</Link>
                      <Link to="/signup" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-2 px-3 py-2.5 text- font-semibold bg-[#0f172a] text-white rounded-xl">✨ Sign Up</Link>
                      <div className="mt-2 px-3 py-2 bg-blue-50 rounded-xl text- text-slate-600">
                        <b>Till:</b> 6880156 • M-Pesa Buy Goods<br/>No extra charge
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button className="lg:hidden w-10 h-10 border border-slate-200 rounded-full grid place-items-center" onClick={()=>setShowMobileMenu(!showMobileMenu)}>☰</button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden mt-3 border-t pt-3 flex flex-col gap-1 text- font-semibold">
            <Link to="/" onClick={()=>setShowMobileMenu(false)} className="py-2">Home</Link>
            <Link to="/contact" onClick={()=>setShowMobileMenu(false)} className="py-2">Contact</Link>
            <Link to="/privacy" onClick={()=>setShowMobileMenu(false)} className="py-2">Privacy</Link>
            <div className="mt-2 bg-[#0f172a] text-white rounded-full px-4 py-2.5 text-center text- font-bold">● TILL 6880156 • Lipa na M-Pesa</div>
          </div>
        )}
      </div>

      {/* Bottom trust strip - from your screenshot */}
      <div className="bg-[#f8fafc] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-4 text- font-semibold text-slate-600 overflow-x-auto">
          <span>📦 Free Delivery Nairobi • Same-day</span>
          <span className="opacity-30">|</span>
          <span>🛡️ 100% Genuine • SAMELIS Verified</span>
          <span className="opacity-30">|</span>
          <span>🔒 Secure M-Pesa • Till 6880156</span>
        </div>
      </div>
    </header>
  )
}
