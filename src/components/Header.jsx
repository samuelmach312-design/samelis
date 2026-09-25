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
    <header style={{position:'sticky', top:0, zIndex:100, background:'white'}}>
      <style>{`
        @media(max-width: 768px){.hide-m{display:none!important} }
       .pill:hover{ background:#f1f5f9!important }
       .menu-link:hover{ background:#f8fafc!important }
      `}</style>

      {/* Top Trust Bar */}
      <div style={{background:'#0f172a', color:'white', fontSize:'11px', padding:'7px 0', letterSpacing:'0.2px'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex', gap:'12px', fontWeight:600}}>
            <span>📦 Free Delivery Nairobi</span>
            <span style={{opacity:0.3}}>•</span>
            <span>Same-day Delivery</span>
            <span className="hide-m" style={{display:'flex', gap:'12px'}}>
              <span style={{opacity:0.3}}>•</span>🛡️ 100% Genuine • SAMELIS Verified
            </span>
          </div>
          <div className="hide-m" style={{opacity:0.7, display:'flex', gap:'12px'}}>
            <span>🔒 Secure M-Pesa • Till 6880156</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div style={{borderBottom:'1px solid #f1f5f9', boxShadow:'0 1px 2px rgba(0,0,0,0.04)'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'10px 16px', display:'flex', alignItems:'center', gap:'14px'}}>

          <Link to="/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none', minWidth:'fit-content'}}>
            <div style={{width:'38px', height:'38px', background:'#0f172a', borderRadius:'10px', display:'grid', placeItems:'center', color:'white', fontWeight:900, fontSize:'16px'}}>S</div>
            <div style={{lineHeight:1}}>
              <div style={{color:'black', fontWeight:900, fontSize:'15px', letterSpacing:'-0.3px'}}>SAMELIS</div>
              <div style={{color:'#2563eb', fontWeight:800, fontSize:'8.5px', letterSpacing:'1.5px', marginTop:'1px'}}>TRUSTED FAMILY SHOP</div>
            </div>
          </Link>

          <nav className="hide-m" style={{display:'flex', gap:'2px', marginLeft:'8px'}}>
            <Link to="/" className="pill" style={{padding:'8px 14px', borderRadius:'999px', background:'#0f172a', color:'white', textDecoration:'none', fontSize:'13px', fontWeight:700}}>Home</Link>
            <Link to="/products" className="pill" style={{padding:'8px 14px', borderRadius:'999px', textDecoration:'none', color:'#334155', fontSize:'13px', fontWeight:700}}>Shop</Link>
            <Link to="/contact" className="pill" style={{padding:'8px 14px', borderRadius:'999px', textDecoration:'none', color:'#334155', fontSize:'13px', fontWeight:700}}>Contact</Link>
          </nav>

          <div style={{flex:1, position:'relative', maxWidth:'620px', margin:'0 8px'}}>
            <span style={{position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'#94a3b8', fontSize:'14px'}}>⌕</span>
            <input placeholder="Search shoes, boots, slides, belts..." style={{width:'100%', height:'42px', paddingLeft:'40px', paddingRight:'16px', background:'#f1f5f9', border:'1px solid #f1f5f9', borderRadius:'999px', fontSize:'13px', outline:'none', transition:'all 0.2s'}} onFocus={e=>{e.target.style.background='white'; e.target.style.borderColor='#2563eb'; e.target.style.boxShadow='0 0 0 4px #eff6ff'}} onBlur={e=>{e.target.style.background='#f1f5f9'; e.target.style.borderColor='#f1f5f9'; e.target.style.boxShadow='none'}} />
          </div>

          <div style={{display:'flex', alignItems:'center', gap:'8px', flexShrink:0}}>
            <div className="hide-m" style={{display:'flex', alignItems:'center', gap:'8px', background:'#0f172a', color:'white', padding:'0 14px', height:'40px', borderRadius:'999px', fontSize:'11px', fontWeight:800, letterSpacing:'0.3px'}}>
              <span style={{width:'7px', height:'7px', background:'#4ade80', borderRadius:'50%', display:'inline-block', boxShadow:'0 0 0 3px rgba(74,222,128,0.2)'}}></span> TILL 6880156
            </div>

            <Link to="/cart" style={{position:'relative', width:'42px', height:'42px', border:'1px solid #e2e8f0', borderRadius:'50%', display:'grid', placeItems:'center', textDecoration:'none', background:'white'}}>
              <span style={{fontSize:'16px'}}>🛒</span>
              {cartCount > 0 && <span style={{position:'absolute', top:'-3px', right:'-3px', background:'#2563eb', color:'white', fontSize:'10px', minWidth:'18px', height:'18px', padding:'0 4px', borderRadius:'999px', display:'grid', placeItems:'center', fontWeight:800, border:'2px solid white'}}>{cartCount}</span>}
            </Link>

            <div style={{position:'relative'}}>
              <button onClick={()=>setShowUserMenu(!showUserMenu)} style={{width:'42px', height:'42px', borderRadius:'50%', background: user? '#0f172a' : '#f1f5f9', color: user? 'white' : 'black', border:'1px solid #e2e8f0', fontWeight:800, cursor:'pointer', display:'grid', placeItems:'center', fontSize:'13px'}}>
                {user? user.email[0].toUpperCase() : '👤'}
              </button>
              {showUserMenu && (
                <div style={{position:'absolute', right:0, marginTop:'10px', width:'260px', background:'white', borderRadius:'18px', boxShadow:'0 20px 60px -12px rgba(0,0,0,0.25)', border:'1px solid #f1f5f9', padding:'8px', zIndex:200, animation:'fadeIn 0.15s'}}>
                  {user? (
                    <>
                      <div style={{padding:'12px 12px 10px', borderBottom:'1px solid #f1f5f9', marginBottom:'6px', display:'flex', gap:'10px', alignItems:'center'}}>
                        <div style={{width:'36px', height:'36px', borderRadius:'50%', background:'#0f172a', color:'white', display:'grid', placeItems:'center', fontWeight:800}}>{user.email[0].toUpperCase()}</div>
                        <div><div style={{fontSize:'13px', fontWeight:700, maxWidth:'140px', overflow:'hidden', textOverflow:'ellipsis'}}>{user.email}</div><div style={{fontSize:'11px', color:'#64748b'}}>SAMELIS Customer • Verified</div></div>
                      </div>
                      <Link to="/" onClick={()=>setShowUserMenu(false)} className="menu-link" style={{display:'flex', gap:'10px', padding:'10px 12px', fontSize:'13px', fontWeight:600, textDecoration:'none', color:'black', borderRadius:'12px', alignItems:'center'}}><span>🏠</span> Home</Link>
                      <Link to="/orders" onClick={()=>setShowUserMenu(false)} className="menu-link" style={{display:'flex', gap:'10px', padding:'10px 12px', fontSize:'13px', fontWeight:600, textDecoration:'none', color:'black', borderRadius:'12px', alignItems:'center'}}><span>📦</span> My Orders</Link>
                      <Link to="/profile" onClick={()=>setShowUserMenu(false)} className="menu-link" style={{display:'flex', gap:'10px', padding:'10px 12px', fontSize:'13px', fontWeight:600, textDecoration:'none', color:'black', borderRadius:'12px', alignItems:'center'}}><span>👤</span> Profile</Link>
                      <div style={{height:'1px', background:'#f1f5f9', margin:'6px 0'}}></div>
                      <button onClick={logout} style={{width:'100%', display:'flex', gap:'10px', padding:'10px 12px', fontSize:'13px', fontWeight:600, color:'#dc2626', background:'none', border:'none', cursor:'pointer', borderRadius:'12px', alignItems:'center'}}>🚪 Logout</button>
                    </>
                  ) : (
                    <>
                      <div style={{padding:'12px', borderBottom:'1px solid #f1f5f9', marginBottom:'6px'}}>
                        <div style={{fontSize:'14px', fontWeight:800}}>Welcome to SAMELIS</div>
                        <div style={{fontSize:'11px', color:'#64748b', marginTop:'2px'}}>Login for faster checkout & tracking</div>
                      </div>
                      <Link to="/" onClick={()=>setShowUserMenu(false)} className="menu-link" style={{display:'flex', gap:'10px', padding:'11px 12px', fontSize:'13px', fontWeight:600, textDecoration:'none', color:'black', background:'#f8fafc', borderRadius:'12px', marginBottom:'6px', alignItems:'center'}}><span>🏠</span> Home</Link>
                      <Link to="/login" onClick={()=>setShowUserMenu(false)} className="menu-link" style={{display:'flex', gap:'10px', padding:'11px 12px', fontSize:'13px', fontWeight:600, textDecoration:'none', color:'black', borderRadius:'12px', alignItems:'center', border:'1px solid #f1f5f9'}}><span>🔑</span> Login</Link>
                      <Link to="/signup" onClick={()=>setShowUserMenu(false)} style={{display:'flex', gap:'10px', padding:'11px 12px', fontSize:'13px', fontWeight:800, textDecoration:'none', color:'white', background:'#0f172a', borderRadius:'12px', justifyContent:'center', alignItems:'center', marginTop:'6px'}}>✨ Sign Up - Free</Link>
                      <div style={{marginTop:'10px', padding:'10px 12px', background:'#eff6ff', borderRadius:'12px', fontSize:'11px', color:'#334155', border:'1px solid #dbeafe'}}><b style={{color:'#0f172a'}}>Till 6880156</b> • M-Pesa Buy Goods • No extra charge<br/><span style={{fontSize:'10px', color:'#64748b'}}>Trusted like family since 2020</span></div>
                    </>
                  )}
                </div>
              )}
            </div>

            <button onClick={()=>setShowMobile(!showMobile)} style={{width:'42px', height:'42px', border:'1px solid #e2e8f0', borderRadius:'50%', background:'white', cursor:'pointer', display:'grid', placeItems:'center'}}>☰</button>
          </div>
        </div>
      </div>

      {/* Bottom trust strip */}
      <div style={{background:'#f8fafc', borderBottom:'1px solid #f1f5f9'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'7px 16px', display:'flex', gap:'16px', fontSize:'11px', fontWeight:600, color:'#475569', overflowX:'auto', whiteSpace:'nowrap'}}>
          <span>📦 Free Delivery Nairobi • Same-day</span><span style={{opacity:0.2}}>|</span><span>🛡️ 100% Genuine • SAMELIS Verified</span><span style={{opacity:0.2}}>|</span><span>🔒 Secure M-Pesa • Till 6880156</span><span className="hide-m" style={{display:'flex', gap:'16px'}}><span style={{opacity:0.2}}>|</span><span>↩️ Easy Returns • WhatsApp 0748440035</span></span>
        </div>
      </div>

      {showMobile && (
        <div style={{borderBottom:'1px solid #f1f5f9', padding:'12px 16px', display:'flex', flexDirection:'column', gap:'2px', background:'white'}}>
          <Link to="/" onClick={()=>setShowMobile(false)} style={{textDecoration:'none', color:'black', padding:'12px', background:'#f1f5f9', borderRadius:'12px', fontSize:'14px', fontWeight:700}}>🏠 Home</Link>
          <Link to="/login" onClick={()=>setShowMobile(false)} style={{textDecoration:'none', color:'black', padding:'12px', borderRadius:'12px', fontSize:'14px', fontWeight:700}}>🔑 Login</Link>
          <Link to="/signup" onClick={()=>setShowMobile(false)} style={{textDecoration:'none', color:'black', padding:'12px', borderRadius:'12px', fontSize:'14px', fontWeight:700}}>✨ Sign Up</Link>
          <Link to="/profile" onClick={()=>setShowMobile(false)} style={{textDecoration:'none', color:'black', padding:'12px', borderRadius:'12px', fontSize:'14px', fontWeight:700}}>👤 Profile</Link>
          <div style={{background:'#0f172a', color:'white', borderRadius:'999px', padding:'12px', textAlign:'center', fontSize:'12px', fontWeight:800, marginTop:'8px', letterSpacing:'0.3px'}}>● TILL 6880156 • Lipa na M-Pesa Buy Goods</div>
        </div>
      )}
    </header>
  )
}
