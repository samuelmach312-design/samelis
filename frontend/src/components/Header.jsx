// frontend/src/components/Header.jsx - FIXED Home + Cart
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header({ q, setQ }) {
  const navigate = useNavigate();
  const { cart } = useCart();
  const count = cart.reduce((a,c)=>a+c.qty,0);

  return (
    <div style={{background:"#111", color:"#fff", padding:"12px 16px", position:"sticky", top:0, zIndex:99, display:"flex", alignItems:"center", gap:10}}>
      
      {/* LOGO -> Home */}
      <div onClick={()=>navigate("/")} style={{fontWeight:900, fontSize:20, cursor:"pointer"}}>SAMELIS</div>
      
      {/* HOME BUTTON - FIXED */}
      <div onClick={()=>navigate("/")} style={{background:"#fff", color:"#000", padding:"6px 14px", borderRadius:20, fontWeight:700, fontSize:13, cursor:"pointer"}}>
        Home
      </div>

      <input 
        value={q||""} 
        onChange={e=>setQ&&setQ(e.target.value)} 
        placeholder="Search products..." 
        style={{flex:1, padding:"8px 14px", borderRadius:20, border:"none", background:"#232323", color:"#fff", outline:"none"}} 
      />

      {/* CART BUTTON - FIXED */}
      <div onClick={()=>navigate("/cart")} style={{background:"#fff", color:"#000", padding:"8px 16px", borderRadius:20, fontWeight:900, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:6}}>
        🛒 Cart {count>0 && <span style={{background:"#ff6a00", color:"#fff", borderRadius:10, padding:"2px 6px", fontSize:11}}>{count}</span>}
      </div>

    </div>
  )
}