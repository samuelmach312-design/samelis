// src/components/Header.jsx — CLEAN LEGIT VERSION
export default function Header({ search, setSearch, count, setView, view }) {
  return (
    <header style={{
      background:"#fff", 
      padding:"12px 24px", 
      display:"flex", 
      alignItems:"center", 
      gap:24, 
      borderBottom:"1px solid #f0f0f0",
      position:"sticky", top:0, zIndex:50
    }}>
      {/* LOGO ONLY */}
      <div onClick={()=>setView("shop")} style={{display:"flex", alignItems:"center", gap:10, cursor:"pointer"}}>
        <div style={{background:"#111", color:"#fff", width:32, height:32, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:16}}>S</div>
        <div style={{fontWeight:900, fontSize:18, letterSpacing:-0.5}}>SAMELIS</div>
      </div>

      {/* SEARCH CENTER */}
      <div style={{flex:1, maxWidth:520, position:"relative", margin:"0 auto"}}>
        <span style={{position:"absolute", left:14, top:11, opacity:0.4}}>🔍</span>
        <input 
          value={search} 
          onChange={e=>{setSearch(e.target.value); setView("shop")}} 
          placeholder="Search products..." 
          style={{
            width:"100%", 
            padding:"10px 16px 10px 40px", 
            background:"#f6f6f7", 
            border:"1px solid #eee", 
            borderRadius:24, 
            fontSize:14, 
            outline:"none"
          }}
        />
      </div>

      {/* NAV RIGHT - ONLY HOME + CART */}
      <div style={{display:"flex", alignItems:"center", gap:20}}>
        <span onClick={()=>setView("shop")} style={{fontSize:13, fontWeight:600, cursor:"pointer"}}>Home</span>
        <button onClick={()=>setView("cart")} style={{
          background:"#111",
          color:"#fff",
          border:0,
          padding:"8px 16px", 
          borderRadius:24, 
          display:"flex", 
          gap:8, 
          fontWeight:700, 
          cursor:"pointer",
          fontSize:13
        }}>
          🛒 Cart {count>0 ? `(${count})` : ""}
        </button>
      </div>
    </header>
  )
}