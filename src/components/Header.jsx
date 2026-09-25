import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobile, setShowMobile] = useState(false)
  const navigate = useNavigate()

  // Mock user - replace with your useAuth() later
  const user = JSON.parse(localStorage.getItem('samelis_user') || 'null')
  const cartCount = JSON.parse(localStorage.getItem('samelis_cart') || '[]').length

  const logout = () => {
    localStorage.removeItem('samelis_user')
    setShowUserMenu(false)
    navigate('/')
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Trust bar - from your screenshot */}
      <div className="bg-slate-900 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-3 font-semibold">
            <span>📦 Free Delivery Nairobi • Same-day</span>
            <span className="hidden md:inline opacity-50">•</span>
            <span className="hidden md:inline">100% Genuine • SAMELIS Verified</span>
          </div>
          <div className="hidden md:flex gap-4 opacity-70">
            <Link to="/contact">Help</Link>
          </div>
        </div>
      </div>

      {/* Main bar - exactly like your screenshot but legit */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="SAMELIS" className="h-8 w-auto" onError={(e)=>e.target.style.display='none'} />
          <span className="font-black text-sm tracking-tight">SAMELIS</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm font-bold text-slate-700">
          <Link to="/" className="px-3 py-2 rounded-full hover:bg-slate-100">Home</Link>
          <Link to="/products" className="px-3 py-2 rounded-full hover:bg-slate-100">Shop</Link>
          <Link to="/contact" className="px-3 py-2 rounded-full hover:bg-slate-100">Contact</Link>
        </nav>

        <div className="flex-1 relative max-w-2xl">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
          <input
            placeholder="Search shoes, boots, slides, belts..."
            className="w-full h-11 pl-11 pr-4 bg-slate-100 rounded-full text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 border border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-4 h-10 rounded-full text-xs font-bold">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            TILL 6880156
          </div>

          <Link to="/cart" className="relative w-10 h-10 bg-white border rounded-full flex items-center justify-center hover:bg-slate-50">
            🛒
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
          </Link>

          <div className="relative">
            <button onClick={()=>setShowUserMenu(!showUserMenu)} className="w-10 h-10 rounded-full bg-slate-100 border font-bold flex items-center justify-center">
              {user? user.email[0].toUpperCase() : '👤'}
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
                {user? (
                  <>
                    <div className="px-3 py-3 border-b mb-1">
                      <div className="text-sm font-bold truncate">{user.email}</div>
                      <div className="text-xs text-slate-500">SAMELIS Customer</div>
                    </div>
                    <Link to="/" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold hover:bg-slate-50 rounded-xl">🏠 Home</Link>
                    <Link to="/orders" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold hover:bg-slate-50 rounded-xl">📦 My Orders</Link>
                    <Link to="/profile" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold hover:bg-slate-50 rounded-xl">👤 Profile</Link>
                    <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl">🚪 Logout</button>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-3 border-b mb-2">
                      <div className="text-sm font-bold">Welcome to SAMELIS</div>
                      <div className="text-xs text-slate-500">Login for faster checkout</div>
                    </div>
                    <Link to="/" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold hover:bg-slate-50 rounded-xl">🏠 Home</Link>
                    <Link to="/login" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold hover:bg-slate-50 rounded-xl">🔑 Login</Link>
                    <Link to="/signup" onClick={()=>setShowUserMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold bg-slate-900 text-white rounded-xl justify-center">✨ Sign Up</Link>
                    <div className="mt-2 p-3 bg-blue-50 rounded-xl text-xs text-slate-600">
                      <b>Till 6880156</b> • M-Pesa Buy Goods
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <button className="lg:hidden w-10 h-10 border rounded-full" onClick={()=>setShowMobile(!showMobile)}>☰</button>
        </div>
      </div>

      {showMobile && (
        <div className="lg:hidden border-t px-4 py-3 flex flex-col gap-1 text-sm font-bold">
          <Link to="/" onClick={()=>setShowMobile(false)} className="py-2">🏠 Home</Link>
          <Link to="/login" onClick={()=>setShowMobile(false)} className="py-2">🔑 Login</Link>
          <Link to="/signup" onClick={()=>setShowMobile(false)} className="py-2">✨ Sign Up</Link>
          <Link to="/profile" onClick={()=>setShowMobile(false)} className="py-2">👤 Profile</Link>
          <div className="mt-2 bg-slate-900 text-white rounded-full py-2.5 text-center text-xs">TILL 6880156 • Lipa na M-Pesa</div>
        </div>
      )}
    </header>
  )
}
