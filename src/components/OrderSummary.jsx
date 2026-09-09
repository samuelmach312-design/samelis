// src/components/OrderSummary.jsx
export default function OrderSummary({ count, total, cart, onContinue, TILL, PHONE, WHATSAPP }) {
  return (
    <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:14, padding:20, position:"sticky", top:80}}>
      <div style={{fontWeight:800, fontSize:17}}>Order Summary</div>
      <div style={{marginTop:16, display:"flex", justifyContent:"space-between", fontSize:13, color:"#4b5563"}}>
        <span>Subtotal ({count} item)</span><span style={{fontWeight:600, color:"#111"}}>KSh {total.toLocaleString()}</span>
      </div>
      <div style={{marginTop:12, display:"flex", justifyContent:"space-between", fontSize:13, color:"#4b5563"}}>
        <span>Shipping</span><span style={{color:"#16a34a", fontWeight:700}}>Free</span>
      </div>
      <div style={{marginTop:12, display:"flex", justifyContent:"space-between", fontSize:13, color:"#4b5563"}}>
        <span>Tax</span><span>Calculated at checkout</span>
      </div>
      <div style={{marginTop:16, borderTop:"1px solid #f0f0f0", paddingTop:16, display:"flex", justifyContent:"space-between", fontWeight:900, fontSize:16}}>
        <span>Total</span><span>KSh {total.toLocaleString()}</span>
      </div>
      
      <button onClick={()=> window.open(`${WHATSAPP}?text=${encodeURIComponent(`Hi SAMELIS Order:%0A${cart.map(c=>`${c.name} x${c.qty} = KSh ${c.price*c.qty}`).join('%0A')}%0ATotal KSh ${total}%0ATill ${TILL}`)}`)} 
        style={{marginTop:18, width:"100%", background:"#0f172a", color:"#fff", border:0, padding:"14px", borderRadius:12, fontWeight:800, fontSize:14, cursor:"pointer"}}>
        Proceed to Checkout
      </button>
      <button onClick={onContinue} style={{marginTop:10, width:"100%", background:"none", border:0, color:"#6b7280", fontSize:13, fontWeight:600, cursor:"pointer", padding:8}}>
        Continue Shopping
      </button>

      <div style={{marginTop:16, background:"#f9fafb", borderRadius:10, padding:10, fontSize:11, color:"#6b7280", lineHeight:1.5}}>
        🔒 Secure checkout via WhatsApp<br/>M-Pesa Till <b style={{color:"#111"}}>{TILL}</b> • {PHONE} • samelis.store.ke
      </div>
    </div>
  )
}
