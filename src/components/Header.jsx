import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    <header style={{position:'sticky', top:0, zIndex:50, background:'white', borderBottom:'1px solid #e2e8f0'}}>
      <div style={{background:'#0f172a', color:'white', fontSize:'11px', padding:'6px 0'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 16px', display:'flex', justifyContent:'space-between'}}>
          <span style={{fontWeight:600}}>📦 Free Delivery Nairobi • Same-day • 100% Genuine • SAMELIS Verified</span>
          <span style={{display:'none'}}>Help</span>
        </div>
      </div>

      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'12px 16px', display:'flex', alignItems:'center', gap:'16px'}}>
        <Link to="/" style={{display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', color:'black', fontWeight:900, fontSize:'16px'}}>SAMELIS</Link>

        <nav style={{display:'flex', gap:'4px'}} className="hide-mobile">
          <Link to="/" style={{padding:'8px 12px', borderRadius:'20px', background:'#f1f5f9', textDecoration:'none', color:'black', fontSize:'13px', fontWeight:700}}>Home</Link>
          <Link to="/products" style={{padding:'8px 12px', borderRadius:'20px', textDecoration:'none', color:'#334155', fontSize:'13px', fontWeight:700}}>Shop</Link>
          <Link to="/contact" style={{padding:'8px 12px', borderRadius:'20px', textDecoration:'none', color:'#334155', fontSize:'13px', fontWeight:700}}>Contact</Link>
        </nav>

        <div style={{flex:1, position:'relative', maxWidth:'600px'}}>
          <input placeholder="Search shoes, boots, slides, belts..." style={{width:'100%', height:'44px', paddingLeft:'40px', paddingRight:'16px', background:'#f1f5f9', border:'1px solid transparent', borderRadius:'999px', fontSize:'13px', outline:'none'}} />
          <span style={{position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'#94a3b8'}}>⌕</span>
        </div>

        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px', background:'#0f172a', color:'white', padding:'0 16px', height:'40px', borderRadius:'999px', fontSize:'12px', fontWeight:800}}>
            <span style={{width:'8px', height:'8px', background:'#4ade80', borderRadius:'50%', display:'inline-block'}}></span> TILL 6880156
          </div>

          <Link to="/cart" style={{position:'relative', width:'40px', height:'40px', border:'1px solid #e2e8f0', borderRadius:'50%', display:'grid', placeItems:'center', textDecoration:'none'}}>
            🛒
            {cartCount > 0 && <span style={{position:'absolute', top:'-4px', right:'-4px', background:'#2563eb', color:'white', fontSize:'10px', width:'20px', height:'20px', borderRadius:'50%', display:'grid', placeItems:'center', fontWeight:800}}>{cartCount}</span>}
          </Link>

          <div style={{position:'relative'}}>
            <button onClick={()=>setShowUserMenu(!showUserMenu)} style={{width:'40px', height:'40px', borderRadius:'50%', background:'#f1f5f9', border:'1px solid #e2e8f0', fontWeight:800, cursor:'pointer'}}>
              {user? user.email[0].toUpperCase() : '👤'}
            </button>
            {showUserMenu && (
              <div style={{position:'absolute', right:0, marginTop:'8px', width:'240px', background:'white', borderRadius:'16px', boxShadow:'0 20px 60px rgba(0,0,0,0.2)', border:'1px solid #f1f5f9', padding:'8px', zIndex:50}}>
                {user? (
                  <>
                    <div style={{padding:'10px 12px', borderBottom:'1px solid #f1f5f9', marginBottom:'4px'}}>
                      <div style={{fontSize:'13px', fontWeight:700, overflow:'hidden', textOverflow:'ellipsis'}}>{user.email}</div>
                      <div style={{fontSize:'11px', color:'#64748b'}}>SAMELIS Customer</div>
                    </div>
                    <Link to="/" onClick={()=>setShowUserMenu(false)} style={{display:'flex', gap:'8px', padding:'10px 12px', fontSize:'13px', fontWeight:600, textDecoration:'none', color:'black', borderRadius:'10px'}}>🏠 Home</Link>
                    <Link to="/profile" onClick={()=>setShowUserMenu(false)} style={{display:'flex', gap:'8px', padding:'10px 12px', fontSize:'13px', fontWeight:600, textDecoration:'none', color:'black', borderRadius:'10px'}}>👤 Profile</Link>
                    <button onClick={logout} style={{width:'100%', textAlign:'left', display:'flex', gap:'8px', padding:'10px 12px', fontSize:'13px', fontWeight:600, color:'#dc2626', background:'none', border:'none', cursor:'pointer'}}>🚪 Logout</button>
                  </>
                ) : (
                  <>
                    <div style={{padding:'10px 12px', borderBottom:'1px solid #f1f5f9', marginBottom:'8px'}}>
                      <div style={{fontSize:'13px', fontWeight:700}}>Welcome to SAMELIS</div>
                      <div style={{fontSize:'11px', color:'#64748b'}}>Login for faster checkout</div>
                    </div>
                    <Link to="/" onClick={()=>setShowUserMenu(false)} style={{display:'flex', gap:'8px', padding:'10px 12px', fontSize:'13px', fontWeight:600, textDecoration:'none', color:'black', background:'#f8fafc', borderRadius:'10px', marginBottom:'4px'}}>🏠 Home</Link>
                    <Link to="/login" onClick={()=>setShowUserMenu(false)} style={{display:'flex', gap:'8px', padding:'10px 12px', fontSize:'13px', fontWeight:600, textDecoration:'none', color:'black', background:'#f8fafc', borderRadius:'10px', marginBottom:'4px'}}>🔑 Login</Link>
                    <Link to="/signup" onClick={()=>setShowUserMenu(false)} style={{display:'flex', gap:'8px', padding:'10px 12px', fontSize:'13px', fontWeight:700, textDecoration:'none', color:'white', background:'#0f172a', borderRadius:'10px', justifyContent:'center'}}>✨ Sign Up</Link>
                    <div style={{marginTop:'8px', padding:'10px', background:'#eff6ff', borderRadius:'10px', fontSize:'11px', color:'#475569'}}><b>Till 6880156</b> • M-Pesa Buy Goods</div>
                  </>
                )}
              </div>
            )}
          </div>
          <button onClick={()=>setShowMobile(!showMobile)} style={{width:'40px', height:'40px', border:'1px solid #e2e8f0', borderRadius:'50%', background:'white', cursor:'pointer'}}>☰</button>
        </div>
      </div>

      {showMobile && (
        <div style={{borderTop:'1px solid #e2e8f0', padding:'12px 16px', display:'flex', flexDirection:'column', gap:'8px', fontSize:'14px', fontWeight:700}}>
          <Link to="/" onClick={()=>setShowMobile(false)} style={{textDecoration:'none', color:'black', padding:'6px 0'}}>🏠 Home</Link>
          <Link to="/login" onClick={()=>setShowMobile(false)} style={{textDecoration:'none', color:'black', padding:'6px 0'}}>🔑 Login</Link>
          <Link to="/signup" onClick={()=>setShowMobile(false)} style={{textDecoration:'none', color:'black', padding:'6px 0'}}>✨ Sign Up</Link>
          <Link to="/profile" onClick={()=>setShowMobile(false)} style={{textDecoration:'none', color:'black', padding:'6px 0'}}>👤 Profile</Link>
          <div style={{background:'#0f172a', color:'white', borderRadius:'20px', padding:'10px', textAlign:'center', fontSize:'12px', marginTop:'8px'}}>TILL 6880156 • Lipa na M-Pesa</div>
        </div>
      )}
    </header>
  )
}
