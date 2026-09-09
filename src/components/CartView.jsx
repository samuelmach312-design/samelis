// src/components/CartView.jsx
import CartItem from "./CartItem.jsx";
import OrderSummary from "./OrderSummary.jsx";

export default function CartView({ cart, count, total, onQty, onRemove, onClear, onContinue, TILL, PHONE, WHATSAPP }) {
  return (
    <div style={{maxWidth:1200, margin:"0 auto", padding:"32px 24px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h1 style={{fontSize:28, fontWeight:800, margin:0}}>Shopping Cart ({count})</h1>
        {count>0 && <button onClick={onClear} style={{background:"none", border:0, color:"#ef4444", fontSize:13, fontWeight:600, cursor:"pointer"}}>Clear Cart</button>}
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1.8fr 0.9fr", gap:20, marginTop:24, alignItems:"start"}}>
        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          {cart.length===0 ? (
            <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:40, textAlign:"center"}}>
              <div style={{fontSize:40}}>🛒</div><div style={{fontWeight:700, marginTop:8}}>Your cart is empty</div>
              <button onClick={onContinue} style={{marginTop:12, background:"#111", color:"#fff", border:0, padding:"10px 20px", borderRadius:24, fontWeight:700, cursor:"pointer"}}>Continue Shopping</button>
            </div>
          ) : cart.map(item=> <CartItem key={item.id} item={item} onQty={onQty} onRemove={onRemove} />)}

          {cart.length>0 && (
            <div style={{background:"#fff", border:"1px dashed #e5e7eb", borderRadius:12, padding:12, fontSize:12}}>
              💳 <b>Lipa na M-Pesa Till: {TILL}</b> • After payment call/WhatsApp <b>{PHONE}</b> • Free delivery Chuka & Nairobi
            </div>
          )}
        </div>

        <OrderSummary count={count} total={total} cart={cart} onContinue={onContinue} TILL={TILL} PHONE={PHONE} WHATSAPP={WHATSAPP} />
      </div>
    </div>
  )
}
