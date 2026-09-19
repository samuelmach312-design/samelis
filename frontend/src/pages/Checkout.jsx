import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout(){
  const {cart,cartTotal,clearCart}=useCart();
  const navigate=useNavigate();
  const [form,setForm]=useState({name:"",phone:"",email:"",address:"",city:"Kangema",notes:""});
  const [done,setDone]=useState(false);
  const [copied,setCopied]=useState(false);
  const [orderNo,setOrderNo]=useState("");
  const total=cartTotal||cart.reduce((s,i)=>s+i.price*(i.qty||1),0);
  const TILL="6880156";
  const AMOUNT=total;

  const sendToCallMeBot = async (msg)=>{
    try{
      await fetch("/api/callmebot",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({message:msg})
      });
    }catch{}
  };

  const handlePlace=async(e)=>{
    e.preventDefault();
    const oid="ORD-"+Date.now();
    setOrderNo(oid);
    setDone(true);

    // 1. WhatsApp YOU new order
    const items = cart.map(c=>`${c.name} x${c.qty||1} = KSh ${c.price*(c.qty||1)}`).join(", ");
    const orderMsg = `🛒 NEW ORDER SAMELIS Till ${TILL}\nOrder: ${oid}\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nAddress: ${form.address}\nTotal: KSh ${total}\nItems: ${items}\nCustomer will pay Till ${TILL} - Call ${form.phone} ASAP`;
    sendToCallMeBot(orderMsg);

    clearCart();
  };

  const handlePaid=()=>{
    const paidMsg = `✅ PAID CLAIM SAMELIS\nOrder ${orderNo} clicked I've Paid\nAmount KSh ${AMOUNT}\nTill ${TILL}\nCustomer: ${form.name} ${form.phone}\nCheck M-Pesa Till ${TILL} and confirm delivery`;
    sendToCallMeBot(paidMsg);
    window.open(`https://wa.me/254748440035?text=Hi%20SAMELIS%20Order%20${orderNo}%20Paid%20Till%20${TILL}%20KSh%20${AMOUNT}%20-%20${form.name}`);
  };

  const copyTill=()=>{ navigator.clipboard.writeText(TILL); setCopied(true); setTimeout(()=>setCopied(false),1500); };

  if(done){
    return (
      <div className="min-h- bg-[#121212] text-white flex flex-col items-center pt-10 p-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#22c55e] flex items-center justify-center mb-3 text-xl">✓</div>
        <h1 className="text- font-black">Order Placed!</h1>
        <p className="text- text-white/60 mt-1">Order #{orderNo} confirmed</p>
        <div className="w-full max-w- bg-[#1e1e1e] rounded-2xl mt-6 p-5 border border-white/10">
          <p className="text-center text- text-white/60">Pay via M-Pesa Buy Goods</p>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="text- font-black tracking-tight">{TILL}</span>
            <button onClick={copyTill} className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">⎙</button>
          </div>
          {copied && <p className="text-center text- text-green-400 mt-1">Copied!</p>}
          <div className="mt-5 space-y-2 text-">
            <div className="flex justify-between"><span className="text-white/60">Till No:</span><span className="font-bold">{TILL}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Business:</span><span className="font-bold">SAMELIS</span></div>
            <div className="flex justify-between"><span className="text-white/60">Amount:</span><span className="font-bold">KSh {AMOUNT.toLocaleString()}</span></div>
          </div>
          <p className="text- text-white/50 text-center mt-5">Go to M-Pesa &gt; Lipa Na M-Pesa &gt; Buy Goods &gt; Till {TILL} &gt; Amount {AMOUNT.toLocaleString()} &gt; PIN</p>
        </div>
        <button onClick={handlePaid} className="w-full max-w- bg-[#22c55e] hover:bg-[#16a34a] text-white py-3.5 rounded-xl font-bold mt-4">I've Paid</button>
        <p className="text- text-[#facc15] mt-3 text-center max-w-">We'll confirm your payment and ship your order. Delivery in 1-3 days.</p>
        <button onClick={()=>navigate("/")} className="w-full max-w- bg-black border border-white/10 text-white py-3.5 rounded-xl font-bold mt-4">Continue Shopping</button>
      </div>
    )
  }

  return (
    <div className="max-w- mx-auto p-4 grid md:grid-cols-[1fr_360px] gap-4">
      <div className="bg-white p-5 rounded-xl">
        <h2 className="font-bold">Checkout</h2>
        <p className="text- opacity-60">{cart.length} Items • KSh {total.toLocaleString()}</p>
        <form onSubmit={handlePlace} className="mt-4 grid gap-3">
          <input required placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border p-2.5 rounded-lg"/>
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Phone 07..." value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="border p-2.5 rounded-lg"/>
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="border p-2.5 rounded-lg"/>
          </div>
          <input required placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className="border p-2.5 rounded-lg"/>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} className="border p-2.5 rounded-lg"/>
            <input placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className="border p-2.5 rounded-lg"/>
          </div>
          <button type="submit" className="bg-black text-white py-3 rounded-xl font-bold">Place Order - KSh {total.toLocaleString()}</button>
          <div className="bg-[#fff7ed] text-center py-2 rounded-lg text-">💳 Buy Goods Till <b className="text-[#f68b1e]">{TILL}</b> SAMELIS</div>
        </form>
      </div>
      <div className="bg-white p-4 rounded-xl h-fit">
        <b>Order Summary</b>
        {cart.map((c,i)=><div key={i} className="flex justify-between text- mt-2"><span>{c.name} x{c.qty||1}</span><span>KSh {Number(c.price).toLocaleString()}</span></div>)}
        <div className="border-t my-3"></div>
        <div className="flex justify-between font-black"><span>Total</span><span>KSh {total.toLocaleString()}</span></div>
      </div>
    </div>
  )
}