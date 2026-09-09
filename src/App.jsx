import { useState, useMemo } from "react";
import Header from "./components/Header.jsx";
import Checkout from "./components/Checkout.jsx";
import Footer from "./components/Footer.jsx";
import WhatsApp from "./components/whatsapp.jsx";

const TILL = "6880156";
const PHONE = "0748440035";

const initialProducts = [
  {id:10, cat:"Menswear", brand:"SAMELIS", name:"Grey Leather Ankle Boots", price:5000, old:6500, disc:23, img:"https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500"},
];

export default function App(){
  const [view, setView] = useState("shop");
  const [cart, setCart] = useState([{...initialProducts[0], qty:1, brand:"SAMELIS"}]);
  const updateQty = (id, delta)=> setCart(c=> c.map(i=> i.id===id? {...i, qty: Math.max(1, i.qty+delta)} : i));
  const removeItem = (id)=> setCart(c=> c.filter(i=> i.id!==id));
  const clearCart = ()=> setCart([]);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);
  return (
    <div style={{fontFamily:"Inter, system-ui", background:"#f5f5f5", minHeight:"100vh"}}>
      <Header search="" setSearch={()=>{}} count={count} setView={setView} view={view} />
      <Checkout cart={cart} total={total} count={count} onQty={updateQty} onRemove={removeItem} onClear={clearCart} onContinue={()=>setView("shop")} />
      <Footer TILL={TILL} PHONE={PHONE} />
      <WhatsApp variant="float" cart={cart} total={total} />
    </div>
  )
}
