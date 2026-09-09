// src/components/ProductCard.jsx
export default function ProductCard({ p, onAdd }) {
  return (
    <div style={{background:"#fff", borderRadius:14, padding:10, border:"1px solid #eee", display:"flex", flexDirection:"column"}}>
      <div style={{position:"relative"}}>
        <img src={p.img} alt={p.name} style={{width:"100%", height:140, objectFit:"cover", borderRadius:10, background:"#fafafa"}} />
        <span style={{position:"absolute", top:6, left:6, background:"#FF6A00", color:"#fff", fontSize:10, padding:"3px 7px", borderRadius:10, fontWeight:800}}>-{p.disc}%</span>
      </div>
      <div style={{fontSize:10, opacity:0.5, marginTop:8, fontWeight:700}}>{p.brand} • {p.cat}</div>
      <div style={{fontSize:13, fontWeight:600, marginTop:4, lineHeight:1.3, minHeight:34}}>{p.name}</div>
      <div style={{fontSize:14, fontWeight:800, marginTop:6}}>KSh {p.price.toLocaleString()} <span style={{fontSize:11, fontWeight:400, textDecoration:"line-through", opacity:0.5}}>KSh {p.old.toLocaleString()}</span></div>
      <button onClick={()=>onAdd(p)} style={{marginTop:"auto", width:"100%", background:"#111", color:"#fff", border:0, padding:"9px", borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer", marginTop:10}}>
        Add to Cart
      </button>
    </div>
  )
}