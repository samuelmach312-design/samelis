import { useState, useMemo } from "react";
import Header from "./components/Header.jsx";
import ShopView from "./components/ShopView.jsx";
import CartView from "./components/CartView.jsx";
import Footer from "./components/Footer.jsx";
import WhatsApp from "./components/whatsApp.jsx"
import Checkout from "./components/Checkout.jsx"

const TILL = "6880156";
const PHONE = "0748440035";

const initialProducts = [
  {id:1, cat:"Electronics", brand:"Vitron", name:"Vitron 32 Smart Android TV", price:16500, old:19900, disc:17, img:"https://images.unsplash.com/photo-1593359677879-a4bb92f367d8?w=500"},
  {id:2, cat:"Electronics", brand:"Oraimo", name:"Oraimo 20000mAh Powerbank", price:2200, old:3000, disc:27, img:"https://images.unsplash.com/photo-1609592424308-83bcd3d15c3e?w=500"},
  {id:10, cat:"Menswear", brand:"SAMELIS", name:"Grey Leather Ankle Boots", price:5000, old:6500, disc:23, img:"https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500", variant:"Boots · SAMELIS"},
];

export default function App(){
  const [view, setView] = useState("shop");
  const [activeCat, setActiveCat] = useState("ALL");
  const [search, setSearch] = useState("");
  const [priceMax, setPriceMax] = useState(30000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [cart, setCart] = useState([{...initialProducts[2], qty:1}]);

  const filtered = useMemo(()=> initialProducts.filter(p=>{
    const catOk = activeCat==="ALL" || p.cat.toUpperCase()===activeCat;
    const searchOk = p.name.toLowerCase().includes(search.toLowerCase());
    const priceOk = p.price <= priceMax;
    const brandOk = selectedBrands.length===0 || selectedBrands.includes(p.brand);
    return catOk && searchOk && priceOk && brandOk;
  }), [activeCat, search, priceMax, selectedBrands]);

  const addCart = (p)=>{ setCart(c=>{const f=c.find(x=>x.id===p.id); if(f) return c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x); return [...c,{...p,qty:1}]}); setView("cart"); }
  const updateQty = (id, delta)=> setCart(c=> c.map(i=> i.id===id? {...i, qty: Math.max(1, i.qty+delta)} : i));
  const removeItem = (id)=> setCart(c=> c.filter(i=> i.id!==id));
  const clearCart = ()=> setCart([]);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);

  return (
    <div style={{fontFamily:"Inter, system-ui, sans-serif", background: view==="cart"? "#f6f6f7" : "#f5f5f5", minHeight:"100vh", color:"#111"}}>
      <Header search={search} setSearch={setSearch} count={count} setView={setView} view={view} />
      {view==="cart"? (
        <CartView cart={cart} count={count} total={total} onQty={updateQty} onRemove={removeItem} onClear={clearCart} onContinue={()=>setView("shop")} TILL={TILL} PHONE={PHONE} WHATSAPP={`https://wa.me/254748440035`} />
      ) : (
        <ShopView filtered={filtered} activeCat={activeCat} setActiveCat={setActiveCat} priceMax={priceMax} setPriceMax={setPriceMax} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} onAdd={addCart} count={count} setView={setView} TILL={TILL} />
      )}
      <Footer TILL={TILL} PHONE={PHONE} />
      {/* REAL WHATSAPP ICON - LEGIT */}
      <WhatsApp variant="float" cart={cart} total={total} />
    </div>
  )
}
