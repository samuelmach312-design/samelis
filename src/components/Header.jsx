import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobile, setShowMobile] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('samelis_user') || 'null')
  const cartCount = JSON.parse(localStorage.getItem('samelis_cart') || '[]').length

  const logout = () => {
    localStorage.removeItem('samelis_user')
    setShowUserMenu(false)
    navigate('/')
    window.location.reload()
  }

  return (
    <header className="samelis-header">
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <span>📦 Free Delivery Nairobi</span><span className="top-bar-dot">•</span><span>Same-day Delivery</span>
            <span className="hide-m" style={{display:'flex', gap:'12px'}}><span className="top-bar-dot">•</span>🛡 100% Genuine • SAMELIS Verified</span>
          </div>
          <div className="hide-m" style={{opacity:0.7}}>🔒 Secure M-Pesa • Till 6880156</div>
        </div>
      </div>

      <div className="main-bar">
        <div className="main-bar-inner">
          <Link to="/" className="logo">
            <div className="logo-badge">S</div>
            <div style={{lineHeight:1}}>
              <div className="logo-title">SAMELIS</div>
              <div className="logo-sub">TRUSTED FAMILY SHOP</div>
            </div>
          </Link>

          <nav className="desktop-nav hide-m">
            <Link to="/" className="nav-pill nav-pill-active">Home</Link>
            <Link to="/products" className="nav-pill nav-pill-idle">Shop</Link>
            <Link to="/contact" className="nav-pill nav-pill-idle">Contact</Link>
          </nav>

          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input className="search-input" placeholder="Search shoes, boots, slides, belts..." />
          </div>

          <div className="actions">
            <div className="till-badge hide-m"><span className="till-dot"></span> TILL 6880156</div>
            <Link to="/cart" className="icon-btn">🛒{cartCount>0 && <span className="cart-badge">{cartCount}</span>}</Link>

            <div style={{position:'relative'}}>
              <button onClick={()=>setShowUserMenu(!showUserMenu)} className={`icon-btn avatar-btn ${user?'avatar-active':''}`}>
                {user? user.email[0].toUpperCase() : '👤'}
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  {user? (
                    <>
                      <div className="dropdown-head" style={{display:'flex', gap:'10px', alignItems:'center'}}>
                        <div className="logo-badge" style={{width:'36px', height:'36px', borderRadius:'50%'}}>{user.email[0].toUpperCase()}</div>
                        <div><div style={{fontSize:'13px', fontWeight:700}}>{user.email}</div><div style={{fontSize:'11px', color:'#64748b'}}>SAMELIS Customer • Verified</div></div>
                      </div>
                      <Link to="/" onClick={()=>setShowUserMenu(false)} className="menu-link">🏠 Home</Link>
                      <Link to="/orders" onClick={()=>setShowUserMenu(false)} className="menu-link">📦 My Orders</Link>
                      <Link to="/profile" onClick={()=>setShowUserMenu(false)} className="menu-link">👤 Profile</Link>
                      <button onClick={logout} className="menu-link" style={{width:'100%', border:'none', background:'none', color:'#dc2626', cursor:'pointer'}}>🚪 Logout</button>
                    </>
                  ) : (
                    <>
                      <div className="dropdown-head"><div className="dropdown-title">Welcome to SAMELIS</div><div className="dropdown-sub">Login for faster checkout & tracking</div></div>
                      <Link to="/" onClick={()=>setShowUserMenu(false)} className="menu-link menu-link-light">🏠 Home</Link>
                      <Link to="/login" onClick={()=>setShowUserMenu(false)} className="menu-link" style={{border:'1px solid #f1f5f9'}}>🔑 Login</Link>
                      <Link to="/signup" onClick={()=>setShowUserMenu(false)} className="menu-link menu-link-dark">✨ Sign Up - Free</Link>
                      <div className="till-note"><b>Till 6880156</b> • M-Pesa Buy Goods • No extra charge<br/><span style={{fontSize:'10px', color:'#64748b'}}>Trusted like family since 2020</span></div>
                    </>
                  )}
                </div>
              )}
            </div>
            <button onClick={()=>setShowMobile(!showMobile)} className="icon-btn">☰</button>
          </div>
        </div>
      </div>

      <div className="bottom-strip">
        <div className="bottom-strip-inner">
          <span>📦 Free Delivery Nairobi • Same-day</span><span className="sep">|</span><span>🛡 100% Genuine • SAMELIS Verified</span><span className="sep">|</span><span>🔒 Secure M-Pesa • Till 6880156</span><span className="hide-m" style={{display:'flex', gap:'16px'}}><span className="sep">|</span><span>↩️ Easy Returns • WhatsApp 0748440035</span></span>
        </div>
      </div>

      {showMobile && (
        <div className="mobile-menu">
          <Link to="/" onClick={()=>setShowMobile(false)} className="mobile-link mobile-link-active">🏠 Home</Link>
          <Link to="/login" onClick={()=>setShowMobile(false)} className="mobile-link">🔑 Login</Link>
          <Link to="/signup" onClick={()=>setShowMobile(false)} className="mobile-link">✨ Sign Up</Link>
          <Link to="/profile" onClick={()=>setShowMobile(false)} className="mobile-link">👤 Profile</Link>
          <div className="mobile-till">● TILL 6880156 • Lipa na M-Pesa Buy Goods</div>
        </div>
      )}
    </header>
  )
}
