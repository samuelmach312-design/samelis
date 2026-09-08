import { useState, useMemo } from "react";

const TILL = "6880156";
const PHONE = "0748440035";
const PHONE_DISPLAY = "0748 440 035";
const WHATSAPP = "https://wa.me/254748440035";

const initialProducts = [
  {id:1, cat:"Electronics", brand:"Vitron", name:'Vitron 32" Smart Android TV', price:16500, old:19900, disc:17, img:"https://images.unsplash.com/photo-1593359677879-a4bb92f367d8?w=500"},
  {id:2, cat:"Electronics", brand:"Oraimo", name:"Oraimo 20000mAh Powerbank", price:2200, old:3000, disc:27, img:"https://images.unsplash.com/photo-1609592424308-83bcd3d15c3e?w=500"},
  {id:10, cat:"Menswear", brand:"SAMELIS", name:"Grey Leather Ankle Boots", price:5000, old:6500, disc:23, img:"https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500", variant:"Boots · SAMELIS"},
];

export default function App(){
  const [view, setView] = useState("shop"); // shop | cart
  const [activeCat, setActiveCat] = useState("ALL");
  const [search, setSearch] = useState("");
  const [priceMax, setPriceMax] = useState(30000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [cart, setCart] = useState([{...initialProducts[2], qty:1}]); // demo 1 item like your screenshot

  const toggleBrand = (b)=> setSelectedBrands(s=> s.includes(b)? s.filter(x=>x!==b): [...s,b]);

  const filtered = useMemo(()=> initialProducts.filter(p=>{
    const catOk = activeCat==="ALL" || p.cat.toUpperCase()===activeCat;
    const searchOk = p.name.toLowerCase().includes(search.toLowerCase());
    const priceOk = p.price <= priceMax;
    const brandOk = selectedBrands.length===0 || selectedBrands.includes(p.brand);
    return catOk && searchOk && priceOk && brandOk;
  }), [activeCat, search, priceMax, selectedBrands]);

  const addCart = (p)=>{ setCart(c=>{const f=c.find(x=>x.id===p.id); if(f) return c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x); return [...c,{...p,qty:1}]}); setView("cart"); }
  const updateQty = (id, delta)=> setCart(c=> c.map(i=> i.id===id ? {...i, qty: Math.max(1, i.qty+delta)} : i).filter(i=> i.qty>0));
  const removeItem = (id)=> setCart(c=> c.filter(i=> i.id!==id));
  const clearCart = ()=> setCart([]);

  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);

  // HEADER - matches Monique reference
  const Header = ()=> (
    <header style={{background:"#fff", padding:"12px 24px", display:"flex", alignItems:"center", gap:24, borderBottom:"1px solid #eee", position:"sticky", top:0, zIndex:20}}>
      <div onClick={()=>setView("shop")} style={{cursor:"pointer", display:"flex", alignItems:"center", gap:8}}>
        <div style={{fontWeight:900, lineHeight:1}}><div style={{fontSize:16, letterSpacing:-0.5}}>MONIQUE</div><div style={{fontSize:11, color:"#2563eb", letterSpacing:2, fontWeight:800}}>INVESTMENTS</div></div>
        <div style={{marginLeft:8, background:"#000", color:"#fff", width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14}}>S</div>
        <div><div style={{fontWeight:900, fontSize:14}}>SAMELIS</div><div style={{fontSize:8, opacity:0.6, fontWeight:700}}>TRUSTED LIKE FAMILY</div></div>
      </div>
      <div style={{flex:1, maxWidth:520, position:"relative", marginLeft:24}}>
        <span style={{position:"absolute", left:14, top:10, opacity:0.4}}>🔍</span>
        <input value={search} onChange={e=>{setSearch(e.target.value); setView("shop")}} placeholder="Search products..." style={{width:"100%", padding:"10px 16px 10px 40px", background:"#f7f7f8", border:"1px solid #eee", borderRadius:24, fontSize:14, outline:"none"}}/>
      </div>
      <div style={{display:"flex", gap:20, alignItems:"center", marginLeft:"auto", fontSize:13, fontWeight:600}}>
        <span onClick={()=>setView("shop")} style={{cursor:"pointer"}}>Home</span>
        <span style={{opacity:0.7}}>Hi, <b>samuel macharia</b></span>
        <button onClick={()=>setView("cart")} style={{background:"#111", color:"#fff", border:0, padding:"8px 16px", borderRadius:24, display:"flex", gap:8, fontWeight:700, cursor:"pointer"}}>🛒 Cart <span style={{background:"#2563eb", padding:"2px 7px", borderRadius:10, fontSize:11}}>{count}</span></button>
        <span style={{opacity:0.6, cursor:"pointer"}}>Logout</span>
        <button style={{background:"#2563eb", color:"#fff", border:0, padding:"8px 16px", borderRadius:24, fontWeight:700, display:"flex", gap:6}}>⬇ Install</button>
      </div>
    </header>
  );

  if(view==="cart"){
    return (
      <div style={{fontFamily:"Inter, system-ui, sans-serif", background:"#f6f6f7", minHeight:"100vh", color:"#111"}}>
        <Header/>
        <div style={{maxWidth:1200, margin:"0 auto", padding:"32px 24px"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <h1 style={{fontSize:28, fontWeight:800, margin:0}}>Shopping Cart ({count})</h1>
            {count>0 && <button onClick={clearCart} style={{background:"none", border:0, color:"#ef4444", fontSize:13, fontWeight:600, cursor:"pointer"}}>Clear Cart</button>}
          </div>

          <div style={{display:"grid", gridTemplateColumns:"1.8fr 0.9fr", gap:20, marginTop:24, alignItems:"start"}}>
            {/* LEFT - CART ITEMS */}
            <div style={{display:"flex", flexDirection:"column", gap:14}}>
              {cart.length===0 ? (
                <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:40, textAlign:"center"}}>
                  <div style={{fontSize:40}}>🛒</div><div style={{fontWeight:700, marginTop:8}}>Your cart is empty</div><button onClick={()=>setView("shop")} style={{marginTop:12, background:"#111", color:"#fff", border:0, padding:"10px 20px", borderRadius:24, fontWeight:700, cursor:"pointer"}}>Continue Shopping</button>
                </div>
              ) : cart.map(item=>(
                <div key={item.id} style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:14, padding:16, display:"flex", gap:16, alignItems:"center"}}>
                  <img src={item.img} alt={item.name} style={{width:84, height:84, objectFit:"cover", borderRadius:10, background:"#f9fafb"}}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700, fontSize:15}}>{item.name}</div>
                    <div style={{fontSize:13, color:"#6b7280", marginTop:2}}>{item.variant || `${item.cat} · ${item.brand}`}</div>
                    <div style={{display:"flex", gap:8, alignItems:"center", marginTop:10}}>
                      <button onClick={()=>updateQty(item.id, -1)} style={{width:32, height:32, borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", cursor:"pointer", fontSize:16}}>−</button>
                      <span style={{width:20, textAlign:"center", fontWeight:700, fontSize:14}}>{item.qty}</span>
                      <button onClick={()=>updateQty(item.id, 1)} style={{width:32, height:32, borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", cursor:"pointer", fontSize:16}}>+</button>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontWeight:800, fontSize:16}}>KSh {item.price.toLocaleString()}</div>
                    <div style={{fontSize:12, color:"#6b7280", marginTop:2}}>KSh {item.price.toLocaleString()} each</div>
                  </div>
                  <button onClick={()=>removeItem(item.id)} style={{marginLeft:12, background:"none", border:0, cursor:"pointer", color:"#9ca3af", fontSize:18}} title="Remove">🗑️</button>
                </div>
              ))}
              {cart.length>0 && (
                <div style={{background:"#fff", border:"1px dashed #e5e7eb", borderRadius:12, padding:12, fontSize:12}}>
                  💳 <b>Lipa na M-Pesa Till: {TILL}</b> • After payment call/WhatsApp <b>{PHONE}</b> • Free delivery Chuka & Nairobi
                </div>
              )}
            </div>

            {/* RIGHT - ORDER SUMMARY - EXACT LIKE REF */}
            <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:14, padding:20, position:"sticky", top:80}}>
              <div style={{fontWeight:800, fontSize:17}}>Order Summary</div>
              <div style={{marginTop:16, display:"flex", justifyContent:"space-between", fontSize:13, color:"#4b5563"}}><span>Subtotal ({count} item)</span><span style={{fontWeight:600, color:"#111"}}>KSh {total.toLocaleString()}</span></div>
              <div style={{marginTop:12, display:"flex", justifyContent:"space-between", fontSize:13, color:"#4b5563"}}><span>Shipping</span><span style={{color:"#16a34a", fontWeight:700}}>Free</span></div>
              <div style={{marginTop:12, display:"flex", justifyContent:"space-between", fontSize:13, color:"#4b5563"}}><span>Tax</span><span>Calculated at checkout</span></div>
              <div style={{marginTop:16, borderTop:"1px solid #f0f0f0", paddingTop:16, display:"flex", justifyContent:"space-between", fontWeight:900, fontSize:16}}><span>Total</span><span>KSh {total.toLocaleString()}</span></div>
              
              <button onClick={()=> window.open(`${WHATSAPP}?text=${encodeURIComponent(`Hi SAMELIS Order:%0A${cart.map(c=>`${c.name} x${c.qty} = KSh ${c.price*c.qty}`).join('%0A')}%0ATotal KSh ${total}%0ATill ${TILL}`)}`)} style={{marginTop:18, width:"100%", background:"#0f172a", color:"#fff", border:0, padding:"14px", borderRadius:12, fontWeight:800, fontSize:14, cursor:"pointer"}}>Proceed to Checkout</button>
              <button onClick={()=>setView("shop")} style={{marginTop:10, width:"100%", background:"none", border:0, color:"#6b7280", fontSize:13, fontWeight:600, cursor:"pointer", padding:8}}>Continue Shopping</button>

              <div style={{marginTop:16, background:"#f9fafb", borderRadius:10, padding:10, fontSize:11, color:"#6b7280", lineHeight:1.5}}>
                🔒 Secure checkout via WhatsApp<br/>M-Pesa Till <b style={{color:"#111"}}>{TILL}</b> • {PHONE} • samelis.store.ke
              </div>
            </div>
          </div>
        </div>
        <a href={WHATSAPP} target="_blank" style={{position:"fixed", bottom:20, right:20, background:"#25D366", width:52, height:52, borderRadius:26, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, color:"#fff", textDecoration:"none", boxShadow:"0 6px 18px rgba(0,0,0,0.2)"}}>💬</a>
      </div>
    )
  }

  // SHOP VIEW (same legit version)
  return (
    <div style={{fontFamily:"Inter, system-ui, sans-serif", background:"#f5f5f5", minHeight:"100vh", color:"#121212"}}>
      <Header/>
      <div style={{maxWidth:1400, margin:"0 auto", display:"flex", gap:14, padding:14}}>
        <aside style={{width:230, background:"#fff", borderRadius:14, padding:16, height:"fit-content", border:"1px solid #eee"}}>
          <div style={{display:"flex", justifyContent:"space-between", fontWeight:800, fontSize:13}}><span>FILTERS</span><span style={{color:"#FF6A00", cursor:"pointer", fontSize:11}} onClick={()=>{setPriceMax(30000); setSelectedBrands([]); setActiveCat("ALL")}}>CLEAR</span></div>
          <div style={{marginTop:14, fontSize:11, fontWeight:800, opacity:0.4}}>CATEGORY</div>
          <div style={{marginTop:8, display:"flex", flexDirection:"column", gap:6}}>{[{l:"All", v:"ALL"},{l:"Electronics", v:"ELECTRONICS"},{l:"Menswear", v:"MENSWEAR"}].map(x=><div key={x.v} onClick={()=>setActiveCat(x.v)} style={{padding:"6px 8px", borderRadius:8, background: activeCat===x.v ? "#f7f7f7":"transparent", cursor:"pointer", fontSize:13, fontWeight: activeCat===x.v?700:400}}>{x.l}</div>)}</div>
        </aside>
        <main style={{flex:1}}>
          <div style={{background:"#111", borderRadius:18, padding:"24px 28px", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div><div style={{background:"#FF6A00", display:"inline-block", padding:"4px 12px", borderRadius:20, fontSize:10, fontWeight:900}}>ELECTRONICS WEEK</div><h1 style={{margin:"10px 0 0", fontSize:26, fontWeight:900}}>Vitron TVs from <span style={{color:"#FF8A33"}}>KSh 16,500</span></h1><p style={{fontSize:12, opacity:0.7, marginTop:6}}>Free bracket + warranty. Till {TILL}</p></div>
            <button onClick={()=>setView("cart")} style={{background:"#fff", color:"#111", border:0, padding:"10px 18px", borderRadius:20, fontWeight:800}}>View Cart ({count}) →</button>
          </div>
          <div style={{marginTop:14, display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(190px,1fr))", gap:12}}>
            {filtered.map(p=>(<div key={p.id} style={{background:"#fff", borderRadius:14, padding:10, border:"1px solid #eee"}}><img src={p.img} style={{width:"100%", height:140, objectFit:"cover", borderRadius:10}}/><div style={{fontSize:13, fontWeight:600, marginTop:8}}>{p.name}</div><div style={{fontWeight:800, marginTop:6}}>KSh {p.price.toLocaleString()}</div><button onClick={()=>addCart(p)} style={{marginTop:8, width:"100%", background:"#111", color:"#fff", border:0, padding:"8px", borderRadius:8, fontWeight:700, cursor:"pointer"}}>Add to Cart</button></div>))}
          </div>
        </main>
      </div>
      <footer style={{background:"#0f0f0f", color:"#bbb", marginTop:30, padding:"24px", textAlign:"center", fontSize:11}}>© 2026 SAMELIS • Till {TILL} • {PHONE} • Made in Chuka 🇰🇪</footer>
      <a href={WHATSAPP} target="_blank" style={{position:"fixed", bottom:20, right:20, background:"#25D366", width:56, height:56, borderRadius:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, color:"#fff", textDecoration:"none"}}>💬</a>
    </div>
  )
}
