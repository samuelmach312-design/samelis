// src/components/Header.jsx
export default function Header({ search, setSearch, count, setView, view }) {
  return (
    <header style={{background:"#fff", padding:"12px 24px", display:"flex", alignItems:"center", gap:24, borderBottom:"1px solid #eee", position:"sticky", top:0, zIndex:20}}>
      <div onClick={()=>setView("shop")} style={{cursor:"pointer", display:"flex", alignItems:"center", gap:8}}>
        <div style={{fontWeight:900, lineHeight:1}}>
          <div style={{fontSize:16, letterSpacing:-0.5}}>MONIQUE</div>
          <div style={{fontSize:11, color:"#2563eb", letterSpacing:2, fontWeight:800}}>INVESTMENTS</div>
        </div>
        <div style={{marginLeft:8, background:"#000", color:"#fff", width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14}}>S</div>
        <div><div style={{fontWeight:900, fontSize:14}}>SAMELIS</div><div style={{fontSize:8, opacity:0.6, fontWeight:700}}>TRUSTED LIKE FAMILY</div></div>
      </div>

      <div style={{flex:1, maxWidth:520, position:"relative", marginLeft:24}}>
        <span style={{position:"absolute", left:14, top:10, opacity:0.4}}>🔍</span>
        <input value={search} onChange={e=>{setSearch(e.target.value); setView("shop")}} placeholder="Search products..." style={{width:"100%", padding:"10px 16px 10px 40px", background:"#f7f7f8", border:"1px solid #eee", borderRadius:24, fontSize:14, outline:"none"}}/>
      </div>

      <div style={{display:"flex", gap:20, alignItems:"center", marginLeft:"auto", fontSize:13, fontWeight:600}}>
        <span onClick={()=>setView("shop")} style={{cursor:"pointer", color: view==="shop" ? "#2563eb":""}}>Home</span>
        <span style={{opacity:0.7}}>Hi, <b>samuel macharia</b></span>
        <button onClick={()=>setView("cart")} style={{background:"#111", color:"#fff", border:0, padding:"8px 16px", borderRadius:24, display:"flex", gap:8, fontWeight:700, cursor:"pointer"}}>
          🛒 Cart <span style={{background:"#2563eb", padding:"2px 7px", borderRadius:10, fontSize:11}}>{count}</span>
        </button>
        <span style={{opacity:0.6, cursor:"pointer"}}>Logout</span>
        <button style={{background:"#2563eb", color:"#fff", border:0, padding:"8px 16px", borderRadius:24, fontWeight:700}}>⬇ Install</button>
      </div>
    </header>
  )
}
