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
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="bg-slate-900 text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <span>📦 Free Delivery Nairobi • Same-day • 100% Genuine</span>
          <span className="hidden md:flex gap-4 opacity-80">
            <Link to="/contact">Help</Link>
            <Link to="/privacy">Privacy</Link>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-black">
          <img src="/logo.png" alt="logo" className="h-8 w-auto" />
          SAMELIS
        </Link>

        <nav className="hidden lg:flex gap-2 text-sm font-semibold text-slate-700">
          <Link to="/" className="px-3 py-2 hover:bg-slate-100 rounded-full">Home</Link>
          <Link to="/#products" className="px-3 py-2 hover:bg-slate-100 rounded-full">Shop</Link>
          <Link to="/contact" className="px-3 py-2 hover:bg-slate-100 rounded-full">Contact</Link>
        </nav>

        <div className="flex-1 max-w-2xl relative">
          <input placeholder="Search shoes, boots, slides..." className="w-full h-10 pl-10 pr-4 bg-slate-100 rounded-full text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" />
          <span className="absolute left-3.5 top-2.5 text-slate-400">⌕</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex bg-slate-900 text-white px-4 h-10 rounded-full text-xs font-bold items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> TILL 6880156
          </div>

          <Link to="/cart" className="relative w-10 h-10 border rounded-full flex items-center justify-center">
            🛒
            {count > 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full grid place-items-center">{count}</span>}
          </Link>

          <div className="relative">
            <button onClick={()=>setShowUserMenu(!showUserMenu)} className="w-10 h-10 rounded-full bg-slate-100 border flex items-center justify-center font-bold">
              {user? user.email[0].toUpperCase() : '👤'}
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border p-2">
                {user? (
                  <>
                    <div className="px-3 py-2 border-b mb-1">
                      <div className="text-sm font-bold truncate">{user.email}</div>
                      <div className="text-xs text-slate-500">SAMELIS Customer</div>
                    </div>
                    <Link to="/" onClick={()=>setShowUserMenu(false)} className="flex gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl text-sm">🏠 Home</Link>
                    <Link to="/profile" onClick={()=>setShowUserMenu(false)} className="flex gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl text-sm">👤 Profile</Link>
                    <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl">🚪 Logout</button>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-2 border-b mb-1">
                      <div className="text-sm font-bold">Welcome to SAMELIS</div>
                      <div className="text-xs text-slate-500">Login for faster checkout</div>
                    </div>
                    <Link to="/" onClick={()=>setShowUserMenu(false)} className="flex gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl text-sm">🏠 Home</Link>
                    <Link to="/login" onClick={()=>setShowUserMenu(false)} className="flex gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl text-sm">🔑 Login</Link>
                    <Link to="/signup" onClick={()=>setShowUserMenu(false)} className="flex gap-2 px-3 py-2 bg-slate-900 text-white rounded-xl text-sm">✨ Sign Up</Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button className="lg:hidden w-10 h-10 border rounded-full" onClick={()=>setShowMobileMenu(!showMobileMenu)}>☰</button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="lg:hidden border-t px-4 py-3 flex flex-col gap-2 text-sm font-semibold">
          <Link to="/" onClick={()=>setShowMobileMenu(false)}>Home</Link>
          <Link to="/login" onClick={()=>setShowMobileMenu(false)}>Login</Link>
          <Link to="/signup" onClick={()=>setShowMobileMenu(false)}>Sign Up</Link>
          <Link to="/contact" onClick={()=>setShowMobileMenu(false)}>Contact</Link>
          <div className="bg-slate-900 text-white rounded-full px-4 py-2 text-center text-xs mt-2">TILL 6880156 • Lipa na M-Pesa</div>
        </div>
      )}
    </header>
  )
}
