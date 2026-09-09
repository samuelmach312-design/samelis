// src/components/Header.jsx — LEGIT VERSION
export default function Header({ search, setSearch, count, setView, view }) {
  return (
    <header style={{
      background:"#fff", 
      padding:"10px 24px", 
      display:"flex", 
      alignItems:"center", 
      gap:20, 
      borderBottom:"1px solid #f0f0f0",
      position:"sticky", top:0, zIndex:50,
      boxShadow:"0 1px 3px rgba(0,0,0,0.04)"
    }}>
      {/* LOGO - ONE BRAND ONLY */}
      <div onClick={()=>setView("shop")} style={{display:"flex", alignItems:"center", gap:12, cursor:"pointer", minWidth:200}}>
        <div style={{background:"#0f172a", color:"#fff", width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:18}}>S</div>
        <div>
          <div style={{display:"flex", alignItems:"baseline", gap:6}}>
            <span style={{fontWeight:900, fontSize:18, letterSpacing:-0.5}}>SAMELIS</span>
            <span style={{fontSize:9, background:"#EFF6FF", color:"#2563eb", padding:"2px 6px", borderRadius:10, fontWeight:800, letterSpacing:0.5}}>by MONIQUE</span>
          </div>
          <div style={{fontSize:8, fontWeight:700, opacity:0.5, letterSpacing:1.2, marginTop:-2}}>TRUSTED LIKE FAMILY • Till 6880156</div>
        </div>
      </div>

      {/* SEARCH - CENTER */}
      <div style={{flex:1, maxWidth:560, position:"relative"}}>
        <span style={{position:"absolute", left:14, top:11, opacity:0.4, fontSize:14}}>🔍</span>
        <input 
          value={search} 
          onChange={e=>{setSearch(e.target.value); setView("shop")}} 
          placeholder="Search products, Vitron, Oraimo, boots..." 
          style={{
            width:"100%", 
            padding:"11px 16px 11px 42px", 
            background:"#f5f6f7", 
            border:"1px solid #e5e7eb", 
            borderRadius:24, 
            fontSize:14, 
            outline:"none",
            fontWeight:500
          }}
        />
      </div>

      {/* NAV - RIGHT */}
      <div style={{display:"flex", alignItems:"center", gap:18, marginLeft:"auto"}}>
        <span onClick={()=>setView("shop")} style={{fontSize:13, fontWeight:600, cursor:"pointer", color: view==="shop" ? "#111":"#6b7280"}}>Home</span>
        <div style={{width:1, height:20, background:"#eee"}}></div>
        <span style={{fontSize:13, color:"#6b7280"}}>Hi, <b style={{color:"#111"}}>samuel macharia</b></span>
        
        <button onClick={()=>setView("cart")} style={{
          background: count>0 ? "#111":"#fff",
          color: count>0 ? "#fff":"#111",
          border: count>0 ? "0":"1px solid #e5e7eb",
          padding:"8px 16px", 
          borderRadius:24, 
          display:"flex", 
          alignItems:"center",
          gap:8, 
          fontWeight:700, 
          cursor:"pointer",
          fontSize:13
        }}>
          🛒 Cart {count>0 && <span style={{background: count>0 ? "#2563eb":"#111", color:"#fff", padding:"2px 8px", borderRadius:12, fontSize:11, fontWeight:800}}>{count}</span>}
          {count===0 && <span style={{opacity:0.5}}>0</span>}
        </button>

        <span style={{fontSize:13, color:"#6b7280", cursor:"pointer", fontWeight:500}}>Logout</span>
        
        <button style={{
          background:"#2563eb", 
          color:"#fff", 
          border:0, 
          padding:"9px 18px", 
          borderRadius:24, 
          fontWeight:700, 
          fontSize:13,
          display:"flex", 
          gap:6,
          boxShadow:"0 2px 8px rgba(37,99,235,0.25)"
        }}>⬇ Install</button>
      </div>
    </header>
  )
}