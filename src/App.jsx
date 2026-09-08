
import { useState, useMemo } from "react";

const TILL = "6880156";
const PHONE = "0748440035"; // changed as requested
const PHONE_DISPLAY = "0748 440 035";
const WHATSAPP = "https://wa.me/254748440035";

const products = [
  {id:1, cat:"Electronics", brand:"Vitron", name:'Vitron 32" Smart Android TV', price:16500, old:19900, disc:17, img:"📺"},
  {id:2, cat:"Electronics", brand:"Oraimo", name:"Oraimo 20000mAh Powerbank", price:2200, old:3000, disc:27, img:"🔋", new:false},
  {id:3, cat:"Electronics", brand:"Generic", name:"TWS Earbuds Pro", price:1800, old:2500, disc:28, img:"🎧"},
  {id:4, cat:"Electronics", brand:"Generic", name:"4-Way Power Extension 3M", price:750, old:1000, disc:25, img:"🔌"},
  {id:5, cat:"Electronics", brand:"Solar", name:"Solar 3-Bulb Kit 20W", price:4200, old:5500, disc:24, img:"☀️"},
  {id:6, cat:"Electronics", brand:"Vitron", name:"Vitron 2.1 Woofer 12000W", price:8500, old:10500, disc:19, img:"🔊"},
  {id:7, cat:"Electronics", brand:"Oraimo", name:"Fast Charger Type-C 20W", price:1100, old:1500, disc:27, img:"⚡"},
  {id:8, cat:"Electronics", brand:"Generic", name:"LED Bulb 10W 5pcs", price:650, old:900, disc:28, img:"💡"},
  {id:9, cat:"Electronics", brand:"Generic", name:"Bluetooth Speaker Bass", price:1500, old:2200, disc:32, img:"📻"},
  {id:10, cat:"Menswear", brand:"SAMELIS", name:"Classic Black Tee", price:850, old:1200, disc:29, img:"👕"},
  {id:11, cat:"Menswear", brand:"Denim Co", name:"Slim Fit Jeans Dark", price:1800, old:2500, disc:28, img:"👖"},
  {id:12, cat:"Menswear", brand:"SAMELIS", name:"Hoodie Premium Black", price:2200, old:3200, disc:31, img:"🧥"},
];

export default function App(){
  const [activeCat, setActiveCat] = useState("ALL");
  const [search, setSearch] = useState("");
  const [priceMax, setPriceMax] = useState(30000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const toggleBrand = (b)=> setSelectedBrands(s=> s.includes(b)? s.filter(x=>x!==b): [...s,b]);

  const filtered = useMemo(()=> products.filter(p=>{
    const catOk = activeCat==="ALL" || p.cat.toUpperCase()===activeCat;
    const searchOk = p.name.toLowerCase().includes(search.toLowerCase());
    const priceOk = p.price <= priceMax;
    const brandOk = selectedBrands.length===0 || selectedBrands.includes(p.brand);
    return catOk && searchOk && priceOk && brandOk;
  }), [activeCat, search, priceMax, selectedBrands]);

  const addCart = (p)=>{ setCart(c=>{const f=c.find(x=>x.id===p.id); if(f) return c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x); return [...c,{...p,qty:1}]}); setShowCart(true); }
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);

  return (
    <div style={{fontFamily:"Inter, sans-serif", background:"#f5f5f5", minHeight:"100vh", color:"#121212"}}>
      {/* TOP BAR - EXACT LIKE REF */}
      <div style={{background:"#111", color:"#fff", fontSize:10, padding:"6px 16px", display:"flex", justifyContent:"space-between", letterSpacing:0.3}}>
        <div style={{display:"flex", gap:14}}><span>🚚 FREE DELIVERY Chuka & Nairobi</span><span style={{opacity:0.8}}>◎ M-Pesa Till: {TILL}</span></div>
        <div style={{display:"flex", gap:14, opacity:0.9}}><span>📞 0712 345 678 / {PHONE_DISPLAY}</span><span>Open 8AM - 8PM Everyday</span></div>
      </div>

      {/* HEADER */}
      <header style={{background:"#fff", padding:"12px 16px", display:"flex", alignItems:"center", gap:16, position:"sticky", top:0, zIndex:20}}>
        <div style={{display:"flex", alignItems:"center", gap:8}}><div style={{background:"#000", color:"#fff", width:28, height:28, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800}}>S</div><div><div style={{fontWeight:800, lineHeight:1}}>SAMELIS</div><div style={{fontSize:8, opacity:0.6, fontWeight:700, letterSpacing:1}}>TRUSTED LIKE FAMILY</div></div></div>
        <div style={{flex:1, maxWidth:500, position:"relative"}}><span style={{position:"absolute", left:10, top:9}}>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search electronics, menswear..." style={{width:"100%", padding:"8px 12px 8px 32px", background:"#f2f2f2", border:0, borderRadius:20, fontSize:13}}/></div>
        <div style={{display:"flex", gap:18, alignItems:"center", fontSize:13, fontWeight:600}}><span>👤 Account</span><span>ⓘ Help</span><button onClick={()=>setShowCart(true)} style={{background:"#111", color:"#fff", border:0, padding:"7px 14px", borderRadius:20, display:"flex", gap:6}}>🛒 Cart {count>0?`(${count})`:''}</button></div>
      </header>

      {/* TABS + DELIVER */}
      <div style={{background:"#fff", padding:"8px 16px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div style={{display:"flex", gap:8}}>{["ALL","ELECTRONICS","MENSWEAR"].map(c=> <button key={c} onClick={()=>setActiveCat(c)} style={{padding:"6px 14px", borderRadius:20, border:"1px solid #ddd", background: activeCat===c ? "#111":"#fff", color: activeCat===c ? "#fff":"#111", fontSize:12, fontWeight:700}}>{c}</button>)}</div>
        <div style={{fontSize:11, display:"flex", alignItems:"center", gap:4}}>📍 Deliver to <b>Chuka Town</b></div>
      </div>

      {/* MAIN */}
      <div style={{display:"flex", gap:12, padding:12}}>
        {/* LEFT FILTERS - EXACT LIKE REF */}
        <aside style={{width:210, background:"#fff", borderRadius:12, padding:12, height:"fit-content", display:"block"}}>
          <div style={{display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:13}}><span>FILTERS</span><span style={{color:"#FF6A00", cursor:"pointer", fontSize:11}} onClick={()=>{setPriceMax(30000); setSelectedBrands([])}}>CLEAR</span></div>
          <div style={{marginTop:14, fontSize:11, fontWeight:700, opacity:0.5}}>CATEGORY</div>
          <div style={{marginTop:6, display:"flex", flexDirection:"column", gap:6, fontSize:12}}><div onClick={()=>setActiveCat("ALL")} style={{display:"flex", justifyContent:"space-between", cursor:"pointer"}}><span>Electronics</span><span style={{background:"#f2f2f2", padding:"1px 6px", borderRadius:10}}>12</span></div><div onClick={()=>setActiveCat("MENSWEAR")} style={{display:"flex", justifyContent:"space-between", cursor:"pointer"}}><span>Menswear</span><span style={{background:"#f2f2f2", padding:"1px 6px", borderRadius:10}}>12</span></div></div>
          <div style={{marginTop:14, fontSize:11, fontWeight:700, opacity:0.5}}>PRICE (KSh)</div>
          <div style={{display:"flex", gap:6, marginTop:6}}><div style={{background:"#f5f5f5", borderRadius:8, padding:"6px 10px", fontSize:11}}>0</div><div style={{background:"#f5f5f5", borderRadius:8, padding:"6px 10px", fontSize:11}}>{priceMax}</div></div>
          <input type="range" min={0} max={30000} value={priceMax} onChange={e=>setPriceMax(Number(e.target.value))} style={{width:"100%", marginTop:8}}/>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginTop:8}}>{["0 - 1000","1000 - 3000","3000 - 10000","10000 - 30000"].map(r=> <button key={r} style={{fontSize:10, padding:"6px", border:"1px solid #eee", borderRadius:8, background:"#fff"}}>{r}</button>)}</div>
          <div style={{marginTop:14, fontSize:11, fontWeight:700, opacity:0.5}}>BRAND</div>
          <div style={{marginTop:6, display:"flex", flexDirection:"column", gap:6}}>{["Vitron","Oraimo","DL.Light","Generic","SAMELIS","Denim Co"].map(b=> <label key={b} style={{fontSize:12, display:"flex", alignItems:"center", gap:6}}><input type="checkbox" checked={selectedBrands.includes(b)} onChange={()=>toggleBrand(b)}/> {b}</label>)}</div>
        </aside>

        {/* RIGHT CONTENT */}
        <main style={{flex:1}}>
          {/* HERO BANNER - EXACT LIKE REF */}
          <div style={{background:"#111", borderRadius:16, padding:"24px 28px", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", overflow:"hidden"}}>
            <div style={{maxWidth:340, zIndex:2}}>
              <div style={{background:"#FF6A00", display:"inline-block", padding:"3px 10px", borderRadius:12, fontSize:9, fontWeight:800}}>ELECTRONICS WEEK</div>
              <h1 style={{margin:"10px 0 0", fontSize:26, lineHeight:1.1, fontWeight:800}}>Vitron TVs from <span style={{color:"#FF8A33"}}>KSh 16,500</span></h1>
              <p style={{fontSize:12, opacity:0.7, marginTop:6}}>Free wall bracket + 1 year warranty. Chuka delivery in 2hrs.</p>
              <button style={{marginTop:12, background:"#fff", color:"#111", border:0, padding:"9px 18px", borderRadius:20, fontWeight:700, fontSize:12}}>Shop Electronics</button>
              <div style={{display:"flex", gap:6, marginTop:16}}><div style={{width:20, height:3, background:"#FF6A00", borderRadius:3}}></div><div style={{width:6, height:3, background:"#555", borderRadius:3}}></div><div style={{width:6, height:3, background:"#555", borderRadius:3}}></div></div>
            </div>
            <div style={{fontSize:80, opacity:0.15, position:"absolute", right:40, top:20}}>📺</div>
            <img src="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400" alt="TV" style={{width:280, height:150, objectFit:"cover", borderRadius:12, opacity:0.9}}/>
          </div>

          {/* PRODUCTS TITLE */}
          <div style={{margin:"14px 4px", fontSize:11, opacity:0.6}}>{filtered.length} products • All Collections</div>

          {/* GRID - MATCH REF CARDS */}
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(175px,1fr))", gap:10}}>
            {filtered.map(p=>(
              <div key={p.id} style={{background:"#fff", borderRadius:12, padding:8, position:"relative"}}>
                <div style={{position:"absolute", top:8, left:8, display:"flex", gap:4}}><span style={{background:"#FF6A00", color:"#fff", fontSize:9, padding:"3px 6px", borderRadius:10, fontWeight:700}}>-{p.disc}%</span>{p.id===2 && <span style={{background:"#111", color:"#fff", fontSize:8, padding:"3px 6px", borderRadius:10}}>NEW</span>}</div>
                <div style={{height:120, background:"#fafafa", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:40, marginTop:4}}>{p.img}</div>
                <div style={{fontSize:12, fontWeight:600, marginTop:8, height:30}}>{p.name}</div>
                <div style={{fontSize:13, fontWeight:800, marginTop:6}}>KSh {p.price.toLocaleString()} <span style={{fontSize:11, fontWeight:400, textDecoration:"line-through", opacity:0.5}}>KSh {p.old.toLocaleString()}</span></div>
                <button onClick={()=>addCart(p)} style={{marginTop:8, width:"100%", background:"#111", color:"#fff", border:0, padding:"7px", borderRadius:8, fontSize:12, fontWeight:700}}>Add to Cart</button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* CART DRAWER */}
      {showCart && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:50, display:"flex", justifyContent:"flex-end"}} onClick={()=>setShowCart(false)}>
          <div style={{background:"#fff", width:360, padding:16}} onClick={e=>e.stopPropagation()}>
            <h3>Cart ({count})</h3>
            <p style={{fontSize:12, background:"#FFF3E0", padding:8, borderRadius:8}}>Till: <b>{TILL}</b> | Call/WhatsApp: <b>{PHONE}</b></p>
            {cart.map(i=> <div key={i.id} style={{display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #eee", fontSize:13}}><span>{i.name} x{i.qty}</span><span>KSh {i.price*i.qty}</span></div>)}
            <h3>Total KSh {total.toLocaleString()}</h3>
            <button onClick={()=> window.open(`${WHATSAPP}?text=Hi SAMELIS Order Total KSh ${total} Till ${TILL}`)} style={{width:"100%", background:"#25D366", color:"#fff", border:0, padding:12, borderRadius:8, fontWeight:800, marginTop:10}}>Checkout via WhatsApp {PHONE_DISPLAY}</button>
          </div>
        </div>
      )}

      {/* WHATSAPP FLOAT - LINKED TO 0748440035 */}
      <a href={WHATSAPP} target="_blank" style={{position:"fixed", bottom:18, right:18, background:"#25D366", width:56, height:56, borderRadius:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, color:"#fff", textDecoration:"none", boxShadow:"0 4px 14px rgba(0,0,0,0.3)", zIndex:40}}>💬</a>
    </div>
  )
}
