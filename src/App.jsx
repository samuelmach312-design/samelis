import { useState, useMemo } from "react";

const TILL = "6880156";
const PHONE = "0748440035"; // changed as requested
const PHONE_DISPLAY = "0748 440 035";
const PHONE_ALT = "0712 345 678";
const WHATSAPP = "https://wa.me/254748440035";

const products = [
  {id:1, cat:"Electronics", brand:"Vitron", name:'Vitron 32" Smart Android TV', price:16500, old:19900, disc:17, img:"https://images.unsplash.com/photo-1593359677879-a4bb92f367d8?w=500", tag:"HOT"},
  {id:2, cat:"Electronics", brand:"Oraimo", name:"Oraimo 20000mAh Powerbank Fast Charge", price:2200, old:3000, disc:27, img:"https://images.unsplash.com/photo-1609592424308-83bcd3d15c3e?w=500", tag:"NEW"},
  {id:3, cat:"Electronics", brand:"Generic", name:"TWS Pro 6 Wireless Earbuds BT 5.3", price:1800, old:2500, disc:28, img:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500"},
  {id:4, cat:"Electronics", brand:"Generic", name:"4-Way Power Extension 3M Cable", price:750, old:1000, disc:25, img:"https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500"},
  {id:5, cat:"Electronics", brand:"Solar", name:"Solar Kit 20W + 3 Bulbs + Radio", price:4200, old:5500, disc:24, img:"https://images.unsplash.com/photo-1508514177221-188b1ab99762?w=500"},
  {id:6, cat:"Electronics", brand:"Vitron", name:"Vitron 2.1 Woofer 12000W Bluetooth", price:8500, old:10500, disc:19, img:"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500"},
  {id:7, cat:"Electronics", brand:"Oraimo", name:"Oraimo 20W Type-C Fast Charger", price:1100, old:1500, disc:27, img:"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500"},
  {id:8, cat:"Electronics", brand:"Generic", name:"LED Bulb 10W - Pack of 5 Super Bright", price:650, old:900, disc:28, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"},
  {id:9, cat:"Electronics", brand:"Generic", name:"Portable Bluetooth Speaker Bass+", price:1500, old:2200, disc:32, img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e4?w=500"},
  {id:10, cat:"Menswear", brand:"SAMELIS", name:"Classic Black Tee - Premium Cotton", price:850, old:1200, disc:29, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"},
  {id:11, cat:"Menswear", brand:"Denim Co", name:"Slim Fit Jeans - Dark Wash", price:1800, old:2500, disc:28, img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"},
  {id:12, cat:"Menswear", brand:"SAMELIS", name:"Premium Hoodie Black - Heavyweight", price:2200, old:3200, disc:31, img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"},
];

const brands = ["Vitron","Oraimo","Generic","Solar","SAMELIS","Denim Co"];

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
    <div style={{fontFamily:"Inter, system-ui, sans-serif", background:"#f5f5f5", minHeight:"100vh", color:"#121212"}}>
      {/* TOP BAR */}
      <div style={{background:"#111", color:"#fff", fontSize:11, padding:"7px 20px", display:"flex", justifyContent:"space-between"}}>
        <div style={{display:"flex", gap:18}}><span>🚚 FREE DELIVERY Chuka & Nairobi</span><span style={{background:"#222", padding:"2px 8px", borderRadius:10}}>◎ M-Pesa Till: {TILL}</span></div>
        <div style={{display:"flex", gap:18, opacity:0.9}}><span>📞 {PHONE_ALT} / {PHONE_DISPLAY}</span><span>Open 8AM - 8PM Everyday</span></div>
      </div>

      {/* HEADER */}
      <header style={{background:"#fff", padding:"12px 20px", display:"flex", alignItems:"center", gap:20, position:"sticky", top:0, zIndex:20, borderBottom:"1px solid #eee"}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}><div style={{background:"#000", color:"#fff", width:32, height:32, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900}}>S</div><div><div style={{fontWeight:900, lineHeight:1, fontSize:18}}>SAMELIS</div><div style={{fontSize:8, opacity:0.6, fontWeight:800, letterSpacing:1.2}}>TRUSTED LIKE FAMILY</div></div></div>
        <div style={{flex:1, maxWidth:560, position:"relative"}}><span style={{position:"absolute", left:14, top:10, opacity:0.5}}>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search electronics, menswear..." style={{width:"100%", padding:"10px 16px 10px 40px", background:"#f2f3f5", border:"1px solid #eee", borderRadius:24, fontSize:14}}/></div>
        <div style={{display:"flex", gap:20, alignItems:"center", fontSize:13, fontWeight:600}}><span>👤 Account</span><span>ⓘ Help</span><button onClick={()=>setShowCart(true)} style={{background:"#111", color:"#fff", border:0, padding:"9px 18px", borderRadius:24, display:"flex", gap:8, fontWeight:700}}>🛒 Cart {count>0 && <span style={{background:"#FF6A00", padding:"1px 7px", borderRadius:10}}>{count}</span>}</button></div>
      </header>

      <div style={{background:"#fff", padding:"10px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #f0f0f0"}}>
        <div style={{display:"flex", gap:8}}>{["ALL","ELECTRONICS","MENSWEAR"].map(c=> <button key={c} onClick={()=>setActiveCat(c)} style={{padding:"7px 16px", borderRadius:20, border:"1px solid #e5e5e5", background: activeCat===c ? "#111":"#fff", color: activeCat===c ? "#fff":"#111", fontSize:12, fontWeight:800}}>{c}</button>)}</div>
        <div style={{fontSize:12}}>📍 Deliver to <b>Chuka Town</b> • <span style={{color:"#FF6A00"}}>2hr Express</span></div>
      </div>

      <div style={{display:"flex", gap:14, padding:14, maxWidth:1400, margin:"0 auto"}}>
        <aside style={{width:230, background:"#fff", borderRadius:14, padding:16, height:"fit-content", border:"1px solid #eee"}}>
          <div style={{display:"flex", justifyContent:"space-between", fontWeight:800, fontSize:13}}><span>FILTERS</span><span style={{color:"#FF6A00", cursor:"pointer", fontSize:11}} onClick={()=>{setPriceMax(30000); setSelectedBrands([]); setActiveCat("ALL")}}>CLEAR ALL</span></div>
          <div style={{marginTop:18, fontSize:11, fontWeight:800, opacity:0.4}}>CATEGORY</div>
          <div style={{marginTop:8, display:"flex", flexDirection:"column", gap:6}}>
            {[{l:"All Products", v:"ALL", c:12},{l:"Electronics", v:"ELECTRONICS", c:9},{l:"Menswear", v:"MENSWEAR", c:3}].map(x=><div key={x.v} onClick={()=>setActiveCat(x.v)} style={{display:"flex", justifyContent:"space-between", cursor:"pointer", padding:"6px 8px", borderRadius:8, background: activeCat===x.v ? "#f7f7f7":"transparent", fontSize:13, fontWeight: activeCat===x.v?700:400}}><span>{x.l}</span><span style={{background:"#f2f2f2", padding:"1px 8px", borderRadius:10, fontSize:11}}>{x.c}</span></div>)}
          </div>
          <div style={{marginTop:18, fontSize:11, fontWeight:800, opacity:0.4}}>PRICE (KSh)</div>
          <div style={{display:"flex", gap:8, marginTop:10}}><div style={{background:"#f5f5f5", border:"1px solid #eee", borderRadius:8, padding:"8px 12px", fontSize:12, flex:1}}>0</div><div style={{background:"#111", color:"#fff", borderRadius:8, padding:"8px 12px", fontSize:12, flex:1, fontWeight:700}}>{priceMax.toLocaleString()}</div></div>
          <input type="range" min={0} max={30000} step={500} value={priceMax} onChange={e=>setPriceMax(Number(e.target.value))} style={{width:"100%", marginTop:10, accentColor:"#111"}}/>
          <div style={{marginTop:18, fontSize:11, fontWeight:800, opacity:0.4}}>BRAND</div>
          <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:8}}>{brands.map(b=> <label key={b} style={{fontSize:13, display:"flex", alignItems:"center", gap:8}}><input type="checkbox" checked={selectedBrands.includes(b)} onChange={()=>toggleBrand(b)}/> {b}</label>)}</div>
          <div style={{marginTop:20, background:"#FFF7ED", border:"1px solid #FFEDD5", borderRadius:10, padding:10, fontSize:11}}><div style={{fontWeight:800}}>💳 Pay with M-Pesa</div><div style={{marginTop:4}}>Till <b>{TILL}</b><br/>Call <b>{PHONE_DISPLAY}</b> after payment</div></div>
        </aside>

        <main style={{flex:1}}>
          <div style={{background:"#111", borderRadius:18, padding:"28px 30px", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", overflow:"hidden"}}>
            <div style={{maxWidth:380, zIndex:2}}>
              <div style={{background:"#FF6A00", display:"inline-block", padding:"4px 12px", borderRadius:20, fontSize:10, fontWeight:900}}>ELECTRONICS WEEK • FREE BRACKET</div>
              <h1 style={{margin:"12px 0 0", fontSize:30, lineHeight:1.05, fontWeight:900}}>Vitron TVs from <span style={{color:"#FF8A33"}}>KSh 16,500</span></h1>
              <p style={{fontSize:13, opacity:0.7, marginTop:8}}>Free wall bracket + 1 year warranty. Chuka delivery in 2hrs. Till {TILL}</p>
              <div style={{display:"flex", gap:10, marginTop:14}}><button onClick={()=>setActiveCat("ELECTRONICS")} style={{background:"#fff", color:"#111", border:0, padding:"10px 20px", borderRadius:24, fontWeight:800, fontSize:13}}>Shop Electronics →</button><button onClick={()=>window.open(WHATSAPP)} style={{background:"transparent", color:"#fff", border:"1px solid #333", padding:"10px 18px", borderRadius:24, fontWeight:700, fontSize:13}}>WhatsApp {PHONE_DISPLAY}</button></div>
            </div>
            <img src="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=520" alt="TV" style={{width:340, height:180, objectFit:"cover", borderRadius:14}}/>
          </div>
          <div style={{margin:"16px 4px", fontSize:12, opacity:0.6}}>{filtered.length} products • Till {TILL}</div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(190px,1fr))", gap:12}}>
            {filtered.map(p=>(<div key={p.id} style={{background:"#fff", borderRadius:14, padding:10, border:"1px solid #f0f0f0", position:"relative"}}><div style={{position:"absolute", top:10, left:10, display:"flex", gap:5, zIndex:2}}><span style={{background:"#FF6A00", color:"#fff", fontSize:10, padding:"4px 8px", borderRadius:12, fontWeight:800}}>-{p.disc}%</span>{p.tag && <span style={{background:"#111", color:"#fff", fontSize:9, padding:"4px 8px", borderRadius:12, fontWeight:800}}>{p.tag}</span>}</div><div style={{height:150, background:"#fafafa", borderRadius:12, overflow:"hidden"}}><img src={p.img} alt={p.name} style={{width:"100%", height:"100%", objectFit:"cover"}}/></div><div style={{fontSize:10, opacity:0.5, marginTop:10, fontWeight:700}}>{p.brand}</div><div style={{fontSize:13, fontWeight:600, marginTop:4, height:36}}>{p.name}</div><div style={{fontSize:15, fontWeight:900, marginTop:8}}>KSh {p.price.toLocaleString()} <span style={{fontSize:11, textDecoration:"line-through", opacity:0.5}}>KSh {p.old.toLocaleString()}</span></div><button onClick={()=>addCart(p)} style={{marginTop:10, width:"100%", background:"#111", color:"#fff", border:0, padding:"10px", borderRadius:10, fontSize:13, fontWeight:700}}>Add to Cart</button></div>))}
          </div>
        </main>
      </div>

      {/* LEGIT FOOTER ADDED */}
      <footer style={{background:"#0f0f0f", color:"#bbb", marginTop:30, padding:"40px 20px 20px"}}>
        <div style={{maxWidth:1400, margin:"0 auto", display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1.3fr", gap:30}}>
          <div>
            <div style={{display:"flex", alignItems:"center", gap:10}}><div style={{background:"#fff", color:"#000", width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900}}>S</div><div><div style={{fontWeight:900, color:"#fff", fontSize:20}}>SAMELIS</div><div style={{fontSize:10, fontWeight:700, color:"#FF6A00"}}>TRUSTED LIKE FAMILY</div></div></div>
            <p style={{fontSize:13, lineHeight:1.6, marginTop:14, color:"#999"}}>Kenya's trusted electronics & menswear store. Free delivery in Chuka & Nairobi. Pay via M-Pesa Till <b style={{color:"#fff"}}>{TILL}</b>.</p>
            <div style={{marginTop:14, display:"flex", gap:10}}><a href={WHATSAPP} target="_blank" style={{background:"#25D366", color:"#fff", padding:"8px 14px", borderRadius:20, fontSize:12, fontWeight:800, textDecoration:"none"}}>WhatsApp Order</a><a href={`tel:${PHONE}`} style={{background:"#222", color:"#fff", padding:"8px 14px", borderRadius:20, fontSize:12, fontWeight:700, textDecoration:"none"}}>Call {PHONE_DISPLAY}</a></div>
          </div>
          <div><div style={{fontWeight:800, color:"#fff", fontSize:13, marginBottom:12}}>CUSTOMER CARE</div><div style={{display:"flex", flexDirection:"column", gap:8, fontSize:13}}><span>Track Order</span><span>Returns & Refunds</span><span>Warranty</span><span>Delivery Info</span></div></div>
          <div><div style={{fontWeight:800, color:"#fff", fontSize:13, marginBottom:12}}>SHOP</div><div style={{display:"flex", flexDirection:"column", gap:8, fontSize:13}}><span>Electronics</span><span>TVs & Woofers</span><span>Menswear</span><span>New Arrivals</span></div></div>
          <div>
            <div style={{fontWeight:800, color:"#fff", fontSize:13, marginBottom:12}}>PAY & CONTACT</div>
            <div style={{background:"#1a1a1a", borderRadius:12, padding:12, border:"1px solid #222"}}><div style={{fontSize:12, color:"#fff", fontWeight:800}}>M-Pesa Till</div><div style={{fontSize:22, fontWeight:900, color:"#FF6A00"}}>{TILL}</div><div style={{fontSize:11, marginTop:6}}>📞 {PHONE_ALT} / {PHONE_DISPLAY}<br/>✉️ samelis.store.ke@gmail.com<br/>📍 Chuka Town, Behind Coop Bank<br/>🕗 8AM - 8PM Everyday</div></div>
          </div>
        </div>
        <div style={{maxWidth:1400, margin:"30px auto 0", borderTop:"1px solid #222", paddingTop:16, display:"flex", justifyContent:"space-between", fontSize:11, opacity:0.6}}><span>© 2026 SAMELIS • Till {TILL} • {PHONE_DISPLAY}</span><span>Made in Chuka, Kenya 🇰🇪</span></div>
      </footer>

      {showCart && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:60, display:"flex", justifyContent:"flex-end"}} onClick={()=>setShowCart(false)}>
          <div style={{background:"#fff", width:380, padding:20, display:"flex", flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex", justifyContent:"space-between"}}><h3>Cart ({count})</h3><button onClick={()=>setShowCart(false)} style={{border:0, background:"#f2f2f2", width:32, height:32, borderRadius:16}}>✕</button></div>
            <div style={{fontSize:12, background:"#FFF7ED", padding:10, borderRadius:10, marginTop:10}}>Till: <b style={{color:"#FF6A00"}}>{TILL}</b> • {PHONE_DISPLAY}</div>
            <div style={{flex:1, overflow:"auto", marginTop:12}}>{cart.map(i=> <div key={i.id} style={{display:"flex", gap:10, padding:"12px 0", borderBottom:"1px solid #f0f0f0"}}><img src={i.img} style={{width:50, height:50, objectFit:"cover", borderRadius:8}}/><div style={{flex:1}}><div style={{fontSize:13, fontWeight:600}}>{i.name}</div><div style={{fontSize:12, opacity:0.6}}>KSh {i.price.toLocaleString()} x {i.qty}</div></div><div style={{fontWeight:800}}>KSh {(i.price*i.qty).toLocaleString()}</div></div>)}</div>
            <div style={{borderTop:"1px solid #eee", paddingTop:14}}><div style={{display:"flex", justifyContent:"space-between", fontWeight:900, fontSize:16}}><span>Total</span><span>KSh {total.toLocaleString()}</span></div><button onClick={()=> window.open(`${WHATSAPP}?text=${encodeURIComponent(`Hi SAMELIS Order Total KSh ${total} Till ${TILL}`)}`)} style={{width:"100%", background:"#25D366", color:"#fff", border:0, padding:14, borderRadius:12, fontWeight:900, marginTop:12}}>WhatsApp Checkout {PHONE_DISPLAY}</button></div>
          </div>
        </div>
      )}
      <a href={WHATSAPP} target="_blank" style={{position:"fixed", bottom:20, right:20, background:"#25D366", width:60, height:60, borderRadius:30, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, color:"#fff", textDecoration:"none", boxShadow:"0 6px 20px rgba(0,0,0,0.3)", zIndex:50}}>💬</a>
    </div>
  )
}
