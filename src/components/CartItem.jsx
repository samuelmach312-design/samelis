// src/components/CartItem.jsx
export default function CartItem({ item, onQty, onRemove }) {
  return (
    <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:14, padding:16, display:"flex", gap:16, alignItems:"center"}}>
      <img src={item.img} alt={item.name} style={{width:84, height:84, objectFit:"cover", borderRadius:10, background:"#f9fafb"}}/>
      <div style={{flex:1}}>
        <div style={{fontWeight:700, fontSize:15}}>{item.name}</div>
        <div style={{fontSize:13, color:"#6b7280", marginTop:2}}>{item.variant || `${item.cat} · ${item.brand}`}</div>
        <div style={{display:"flex", gap:8, alignItems:"center", marginTop:10}}>
          <button onClick={()=>onQty(item.id, -1)} style={{width:32, height:32, borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", cursor:"pointer", fontSize:16}}>−</button>
          <span style={{width:20, textAlign:"center", fontWeight:700, fontSize:14}}>{item.qty}</span>
          <button onClick={()=>onQty(item.id, 1)} style={{width:32, height:32, borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", cursor:"pointer", fontSize:16}}>+</button>
        </div>
      </div>
      <div style={{textAlign:"right"}}>
        <div style={{fontWeight:800, fontSize:16}}>KSh {item.price.toLocaleString()}</div>
        <div style={{fontSize:12, color:"#6b7280", marginTop:2}}>KSh {item.price.toLocaleString()} each</div>
      </div>
      <button onClick={()=>onRemove(item.id)} style={{marginLeft:12, background:"none", border:0, cursor:"pointer", color:"#9ca3af", fontSize:18}}>🗑️</button>
    </div>
  )
}