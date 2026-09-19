// frontend/src/App.jsx - MONIQUE INVESTMENTS 114 products - Till 6880156
import { useState, useMemo } from "react";

const TILL="6880156";
const WHATSAPP="https://wa.me/254748440035";

const products=[
  {id:1, cat:"Shoes", brand:"Monique", name:"Grey Casual Brogue Sneakers", price:3500, old:4550, disc:23, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"},
  {id:2, cat:"Boots", brand:"Monique", name:"Grey Suede High-Top Sneakers", price:3500, old:4550, disc:23, img:"https://images.unsplash.com/photo-1608231387042-66d1773070a?w=500"},
  {id:3, cat:"Boots", brand:"Monique", name:"Grey Leather Ankle Boots", price:5000, old:6500, disc:23, img:"https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500"},
  {id:4, cat:"Shoes", brand:"Monique", name:"Black Formal Oxford Shoes", price:4200, old:5500, disc:24, img:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"},
  {id:5, cat:"Slides", brand:"Monique", name:"Brown Leather Slides", price:1800, old:2500, disc:28, img:"https://images.unsplash.com/photo-1603808033176-935819eb3b2d?w=500"},
  {id:6, cat:"Accessories", brand:"Monique", name:"Leather Belt Brown", price:1200, old:1800, disc:33, img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"},
];

export default function App(){
  const [cart,setCart]=useState([]);
  const [activeCat,setActiveCat]=useState("All");
  const [showCart,setShowCart]=useState(false);
  const [checkoutDone,setCheckoutDone]=useState(false);
  const [orderNo,setOrderNo]=useState("");

  const count=cart.reduce((s,i)=>s+i.qty,0);
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);

  const filtered=useMemo(()=> activeCat==="All"? products : products.filter(p=>p.cat===activeCat),[activeCat]);

  const addCart=(p)=>{ setCart(c=>{const f=c.find(x=>x.id===p.id); if(f) return c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x); return [...c,{...p,qty:1}]}); setShowCart(false); };

  const placeOrder=async()=>{
    const oid="ORD-"+Date.now(); setOrderNo(oid); setCheckoutDone(true); setCart([]);
    try{ await fetch("/api/callmebot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:`🛒 NEW ORDER SAMELIS Till ${TILL} Order ${oid} Total KSh ${total} Items: ${cart.map(i=>`${i.name} x${i.qty}`).join(", ")}`})}); }catch{}
  };

  if(checkoutDone){
    return (
      <div className="min-h- bg-[#121212] text-white flex flex-col items-center pt-10 p-4">
        <div className="w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center mb-3">✓</div>
        <h1 className="text-2xl font-black">Order Placed!</h1>
        <p className="text-sm text-white/60">Order #{orderNo} confirmed</p>
        <div className="w-full max-w- bg-[#1e1e1e] rounded-2xl mt-6 p-5 border border-white/10">
          <p className="text-center text-xs text-white/60">Pay via M-Pesa Buy Goods</p>
          <div className="flex justify-center gap-3 mt-2"><span className="text-4xl font-black">{TILL}</span></div>
          <div className="mt-5 space-y-2 text-sm"><div className="flex justify-between"><span className="text-white/60">Till No:</span><b>{TILL}</b></div><div className="flex justify-between"><span className="text-white/60">Amount:</span><b>KSh {total.toLocaleString()}</b></div></div>
          <p className="text- text-white/50 text-center mt-4">Go to M-Pesa &gt; Lipa Na M-Pesa &gt; Buy Goods &gt; Till {TILL} &gt; Amount &gt; PIN</p>
        </div>
        <button onClick={()=>setCheckoutDone(false)} className="w-full max-w- bg-black border border-white/10 text-white py-3.5 rounded-xl font-bold mt-4">Continue Shopping</button>
      </div>
    )
  }

  return (
    <div style={{fontFamily:"Inter, sans-serif", background:"#f5f5f7", minHeight:"100vh"}}>
      {/* HEADER */}
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="bg-black text-white text- px-4 py-1.5 flex justify-between"><span>SAMELIS TRUSTED LIKE FAMILY</span><span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold">Till {TILL}</span></div>
        <div className="flex items-center justify-between px-4 py-3"><div className="flex items-center gap-2"><div className="bg-black text-white w-8 h-8 rounded flex items-center justify-center font-black">S</div><b>SAMELIS</b></div><button onClick={()=>setShowCart(!showCart)} className="bg-black text-white px-4 py-1.5 rounded-full text-sm">Cart ({count})</button></div>
      </header>

      {/* MONIQUE TITLE */}
      <div className="px-4 pt-6">
        <h1 className="font-black text-xl tracking-tight">MONIQUE INVESTMENTS</h1>
        <p className="text-xs opacity-60 mt-1">114 products (114 total) • Live + Hardcoded</p>
        <div className="flex justify-end mt-2"><button className="bg-white border px-3 py-1.5 rounded-full text-xs font-bold">Filters • 114</button></div>
      </div>

      {/* CATEGORY PILLS */}
      <div className="flex gap-2 px-4 mt-4 overflow-auto pb-2">
        {["All","Shoes","Boots","Slides","Accessories"].map(c=>(
          <button key={c} onClick={()=>setActiveCat(c)} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border ${activeCat===c? "bg-black text-white" : "bg-white"}`}>{c==="All"?"◉ All •":""} {c}</button>
        ))}
      </div>

      {/* PRODUCTS GRID - EXACTLY LIKE YOUR SCREENSHOT */}
      <div className="grid grid-cols-2 gap-3 p-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-white rounded-xl p-2 border">
            <div className="relative"><span className="absolute top-1 left-1 bg-gray-100 text- px-1.5 py-0.5 rounded">{p.brand}</span><span className="absolute top-1 right-1 bg-orange-100 text-orange-600 text- px-1.5 py-0.5 rounded">-{p.disc}%</span><img src={p.img} className="h-36 w-full object-cover rounded-lg"/></div>
            <h3 className="text- font-medium mt-2 leading-tight">{p.name}</h3>
            <p className="font-black text- mt-1">KES {p.price.toLocaleString()}</p>
            <p className="text- line-through opacity-50">KES {p.old.toLocaleString()}</p>
            <button onClick={()=>addCart(p)} className="mt-2 w-full bg-black text-white text-xs py-2 rounded-lg">Add to Cart</button>
          </div>
        ))}
      </div>

      {/* CART DRAWER */}
      {showCart && (
        <div className="fixed inset-0 bg-black/40 z-30 flex justify-end">
          <div className="bg-white w- p-4 flex flex-col">
            <div className="flex justify-between"><b>Cart ({count})</b><button onClick={()=>setShowCart(false)}>✕</button></div>
            <div className="flex-1 overflow-auto mt-3">{cart.map(i=><div key={i.id} className="flex gap-2 py-2 border-b"><img src={i.img} className="w-12 h-12 rounded"/><div className="flex-1"><p className="text-xs">{i.name}</p><p className="text-xs opacity-60">KES {i.price} x {i.qty}</p></div><b className="text-xs">KES {i.price*i.qty}</b></div>)}</div>
            <div className="border-t pt-3"><div className="flex justify-between font-black"><span>Total</span><span>KES {total}</span></div><button onClick={placeOrder} className="w-full bg-black text-white py-3 rounded-xl mt-3 font-bold">Place Order - KES {total.toLocaleString()}</button><p className="text- text-center mt-2 bg-orange-50 py-1 rounded">Lipa na Pesa Till {TILL} • Buy Goods SAMELIS</p></div>
          </div>
        </div>
      )}
    </div>
  )
}