import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const ICON = {
  search: 'M21 21l-4.3-4.3M11 19a8 8 0 100-16 8 8 0 000 16z',
  cart: 'M9 20h.01M18 20h.01M2 3h3l2.7 11.6a1 1 0 001 .8h9.7a1 1 0 001-.8L21 7H6',
  user: 'M20 21v-1a6 6 0 00-6-6h-4a6 6 0 00-6 6v1M12 11a4 4 0 100-8 4 4 0 000 8z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
}
const Icon = ({ name, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ICON[name]} />
  </svg>
)

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

const navClass = ({ isActive }) =>
  `border-b-2 py-1 text-sm font-medium ${isActive ? 'border-blue-600 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'}`
const item = 'block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100'

export default function Header() {
  const [menu, setMenu] = useState(false)
  const [account, setAccount] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const user = read('samelis_user', null)
  const cartCount = read('samelis_cart', []).length

  const search = (e) => {
    e.preventDefault()
    navigate(`/products?q=${encodeURIComponent(q.trim())}`)
    setMenu(false)
  }
  const logout = () => {
    localStorage.removeItem('samelis_user')
    localStorage.removeItem('token')
    setAccount(false)
    navigate('/')
    window.location.reload()
  }

  const searchBox = (
    <form onSubmit={search} className="relative w-full">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="search" size={18} /></span>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search products"
        placeholder="Search shoes, boots, hoods"
        className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
      />
    </form>
  )

  return (
    <>
      <div className="bg-slate-900 text-xs text-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2 sm:justify-between">
          <span>Free same-day delivery in Nairobi</span>
          <span className="hidden items-center gap-4 sm:flex">
            <span>Chuka Town, behind Coop Bank</span>
            <a href="https://wa.me/254748440035" target="_blank" rel="noopener noreferrer" className="font-medium underline-offset-2 hover:underline">WhatsApp 0748 440 035</a>
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Samelis home">
            <img src="/logo.png" alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} className="h-9 w-9 rounded-lg object-contain" />
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Samelis</span>
          </Link>

          <nav className="ml-6 hidden gap-6 md:flex" aria-label="Main">
            <NavLink to="/" end className={navClass}>Home</NavLink>
            <NavLink to="/products" className={navClass}>Shop</NavLink>
            <NavLink to="/contact" className={navClass}>Contact</NavLink>
            <NavLink to="/orders" className={navClass}>Track order</NavLink>
          </nav>

          <div className="ml-auto hidden max-w-md flex-1 md:block">{searchBox}</div>

          <div className="relative ml-auto flex items-center gap-1 md:ml-0">
            <Link to="/cart" aria-label={`Cart, ${cartCount} items`} className="relative rounded-full p-2 text-slate-700 hover:bg-slate-100">
              <Icon name="cart" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">{cartCount > 9 ? '9+' : cartCount}</span>
              )}
            </Link>

            <button onClick={() => setAccount(!account)} aria-label="Account" aria-expanded={account} className="rounded-full p-2 text-slate-700 hover:bg-slate-100">
              {user ? <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white">{user.email?.[0]?.toUpperCase()}</span> : <Icon name="user" />}
            </button>

            <button onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'} className="rounded-full p-2 text-slate-700 hover:bg-slate-100 md:hidden">
              <Icon name={menu ? 'close' : 'menu'} />
            </button>

            {account && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setAccount(false)} />
                <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                  {user ? (
                    <>
                      <p className="truncate px-3 py-2 text-sm font-medium text-slate-900">{user.email}</p>
                      <Link to="/orders" onClick={() => setAccount(false)} className={item}>My orders</Link>
                      <Link to="/profile" onClick={() => setAccount(false)} className={item}>Profile</Link>
                      <button onClick={logout} className={`${item} text-red-600`}>Log out</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setAccount(false)} className={item}>Log in</Link>
                      <Link to="/signup" onClick={() => setAccount(false)} className="mt-1 block rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-medium text-white hover:bg-slate-800">Create account</Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {menu && (
          <div className="space-y-3 border-t border-slate-200 px-4 py-3 md:hidden">
            {searchBox}
            <Link to="/" onClick={() => setMenu(false)} className={item}>Home</Link>
            <Link to="/products" onClick={() => setMenu(false)} className={item}>Shop</Link>
            <Link to="/contact" onClick={() => setMenu(false)} className={item}>Contact</Link>
            <Link to="/orders" onClick={() => setMenu(false)} className={item}>Track order</Link>
            <a href="https://wa.me/254748440035" target="_blank" rel="noopener noreferrer" className={item}>WhatsApp us</a>
          </div>
        )}
      </header>
    </>
  )
}
