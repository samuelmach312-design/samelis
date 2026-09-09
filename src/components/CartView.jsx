// src/components/CartView.jsx â€” LEGIT CHECKOUT
import { useState } from "react";
import WhatsApp from "./whatsapp.jsx";

export default function CartView({ cart, count, total, onQty, onRemove, onClear, onContinue, TILL, PHONE, WHATSAPP }) {
  const [step, setStep] = useState("cart"); // cart | checkout
  const [form, setForm] = useState({ name:"samuel macharia", phone:"254712345678", email:"samuelmach.312@gmail.com", address:"123 Main St", city:"Kangema", notes:"" });

  if (cart.length === 0) {
    return (
      <div style={{maxWidth:700, margin:"40px auto", background:"#fff", padding:40, borderRadius:16, textAlign:"center"}}>
        <div style={{fontSize:48}}>ðŸ›’</div>
        <h3>Your cart is empty</h3>
        <button onClick={onContinue} style={{marginTop:16, background:"#111", color:"#fff", border:0, padding:"10px 20px", borderRadius:24, cursor:"pointer"}}>Continue Shopping</button>
      </div>
    )
  }

  if (step === "cart") {
    return (
      <div style={{maxWidth:1100, margin:"20px auto", display:"grid", gridTemplateColumns:"1fr 380px", gap:20, padding:"0 16px"}}>
        <div style={{background:"#fff", borderRadius:14, padding:20}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16}}>
            <h3 style={{margin:0}}>Cart ({count})</h3>
            <button onClick={onContinue} style={{background:"none", border:0, color:"#2563eb", fontWeight:600, cursor:"pointer"}}>â† Continue Shopping</button>
          </div>
          {cart.map(item=>(
            <div key={item.id} style={{display:"flex", gap:16, padding:"16px 0", borderBottom:"1px solid #f0f0f0"}}>
              <img src={item.img} style={{width:80, height:80, borderRadius:10, objectFit:"cover"}} />
              <div style={{flex:1}}>
                <div style={{fontWeight:700, fontSize:14}}>{item.name}</div>
                <div style={{fontSize:12, color:"#888", marginTop:2}}>{item.brand} â€¢ KSh {item.price.toLocaleString()}</div>
                <div style={{display:"flex", alignItems:"center", gap:10, marginTop:10}}>
                  <button onClick={()=>onQty(item.id,-1)} style={{width:28, height:28, borderRadius:14, border:"1px solid #eee", background:"#fff", cursor:"pointer"}}>âˆ’</button>
                  <span style={{fontWeight:700, minWidth:20, textAlign:"center"}}>{item.qty}</span>
                  <button onClick={()=>onQty(item.id,1)} style={{width:28, height:28, borderRadius:14, border:"1px solid #eee", background:"#fff", cursor:"pointer"}}>+</button>
                  <span onClick={()=>onRemove(item.id)} style={{marginLeft:16, color:"#ef4444", fontSize:12, cursor:"pointer", fontWeight:600}}>Remove</span>
                </div>
              </div>
              <div style={{fontWeight:800}}>KSh {(item.price*item.qty).toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div style={{background:"#fff", borderRadius:14, padding:20, height:"fit-content", position:"sticky", top:80}}>
          <h4 style={{margin:"0 0 16px"}}>Order Summary</h4>
          <div style={{display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:8}}><span>Subtotal</span><span>KSh {total.toLocaleString()}</span></div>
          <div style={{display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:12}}><span>Delivery</span><span style={{color:"#16a34a", fontWeight:700}}>Free</span></div>
          <div style={{display:"flex", justifyContent:"space-between", fontWeight:900, fontSize:16, borderTop:"1px solid #eee", paddingTop:12, marginBottom:16}}><span>Total</span><span>KSh {total.toLocaleString()}</span></div>
          <button onClick={()=>setStep("checkout")} style={{width:"100%", background:"#111", color:"#fff", border:0, padding:"14px", borderRadius:12, fontWeight:800, cursor:"pointer", fontSize:14}}>Proceed to Checkout</button>
          <div style={{marginTop:12}}><WhatsApp variant="button" cart={cart} total={total} /></div>
        </div>
      </div>
    )
  }

  // CHECKOUT STEP â€” THIS IS WHAT YOU ASKED FOR
  return (
    <div style={{maxWidth:1100, margin:"20px auto", padding:"0 16px"}}>
      <button onClick={()=>setStep("cart")} style={{background:"none", border:0, fontWeight:600, marginBottom:16, cursor:"pointer"}}>â† Back to Cart</button>
      <div style={{display:"grid", gridTemplateColumns:"1fr 380px", gap:20}}>
        
        {/* LEFT FORM */}
        <div style={{background:"#fff", borderRadius:14, padding:24}}>
          <h3 style={{margin:"0 0 20px"}}>Checkout</h3>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
            <div style={{gridColumn:"1 / -1"}}>
              <label style={{fontSize:11, fontWeight:800, letterSpacing:1, opacity:0.6}}>FULL NAME *</label>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{width:"100%", marginTop:6, padding:"12px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:14}} />
            </div>
            <div>
              <label style={{fontSize:11, fontWeight:800, letterSpacing:1, opacity:0.6}}>PHONE *</label>
              <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={{width:"100%", marginTop:6, padding:"12px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:14}} />
            </div>
            <div>
              <label style={{fontSize:11, fontWeight:800, letterSpacing:1, opacity:0.6}}>EMAIL *</label>
              <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{width:"100%", marginTop:6, padding:"12px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:14}} />
            </div>
            <div style={{gridColumn:"1 / -1"}}>
              <label style={{fontSize:11, fontWeight:800, letterSpacing:1, opacity:0.6}}>ADDRESS *</label>
              <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="123 Main St" style={{width:"100%", marginTop:6, padding:"12px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:14}} />
            </div>
            <div>
              <label style={{fontSize:11, fontWeight:800, letterSpacing:1, opacity:0.6}}>CITY *</label>
              <input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} style={{width:"100%", marginTop:6, padding:"12px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:14}} />
            </div>
            <div>
              <label style={{fontSize:11, fontWeight:800, letterSpacing:1, opacity:0.6}}>ORDER NOTES</label>
              <input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Any special instructions..." style={{width:"100%", marginTop:6, padding:"12px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:14}} />
            </div>
          </div>
          <button onClick={()=>{alert(`Order placed!\n${form.name}\nTotal KSh ${total}\nTill ${TILL}\nWe will call ${form.phone}`); onClear();}} style={{width:"100%", marginTop:20, background:"#111", color:"#fff", border:0, padding:"14px", borderRadius:12, fontWeight:800, fontSize:15, cursor:"pointer"}}>Place Order - KSh {total.toLocaleString()}</button>
          <div style={{marginTop:12, background:"#FFF7ED", border:"1px solid #FFEDD5", borderRadius:10, padding:12, fontSize:12, textAlign:"center"}}>ðŸ’³ Lipa na M-Pesa Till <b style={{color:"#FF6A00", fontSize:14}}>{TILL}</b> â€¢ Buy Goods SAMELIS â€¢ {PHONE}</div>
        </div>

        {/* RIGHT SUMMARY â€” FIXED */}
        <div style={{background:"#fff", borderRadius:14, padding:20, height:"fit-content"}}>
          <h4 style={{margin:"0 0 16px"}}>Order Summary</h4>
          {cart.map(item=>(
            <div key={item.id} style={{display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:8}}>
              <span style={{flex:1}}>{item.name} <span style={{color:"#888"}}>x{item.qty}</span></span>
              <span style={{fontWeight:700}}>KSh {(item.price*item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div style={{borderTop:"1px solid #f0f0f0", marginTop:12, paddingTop:12}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:6}}><span>Subtotal</span><span>KSh {total.toLocaleString()}</span></div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:10}}><span>Delivery</span><span style={{color:"#16a34a", fontWeight:700}}>Free</span></div>
            <div style={{display:"flex", justifyContent:"space-between", fontWeight:900, fontSize:16}}><span>Total</span><span>KSh {total.toLocaleString()}</span></div>
          </div>
          <div style={{marginTop:16}}><WhatsApp variant="button" cart={cart} total={total} /></div>
        </div>
      </div>
    </div>
  )
}
