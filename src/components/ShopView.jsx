// src/components/ShopView.jsx
import Filter from "./Filter.jsx";
import ProductCard from "./ProductCard.jsx";

export default function ShopView({ filtered, activeCat, setActiveCat, priceMax, setPriceMax, selectedBrands, setSelectedBrands, onAdd, count, setView, TILL }) {
  return (
    <div style={{maxWidth:1400, margin:"0 auto", display:"flex", gap:14, padding:14}}>
      <aside style={{width:240}}>
        <Filter
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          productsCount={filtered.length}
        />
      </aside>

      <main style={{flex:1}}>
        <div style={{background:"#111", borderRadius:18, padding:"24px 28px", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <div style={{background:"#FF6A00", display:"inline-block", padding:"4px 12px", borderRadius:20, fontSize:10, fontWeight:900}}>ELECTRONICS WEEK</div>
            <h1 style={{margin:"10px 0 0", fontSize:26, fontWeight:900}}>Vitron TVs from <span style={{color:"#FF8A33"}}>KSh 16,500</span></h1>
            <p style={{fontSize:12, opacity:0.7, marginTop:6}}>Free bracket + warranty. Till {TILL}</p>
          </div>
          <button onClick={()=>setView("cart")} style={{background:"#fff", color:"#111", border:0, padding:"10px 18px", borderRadius:20, fontWeight:800, cursor:"pointer"}}>View Cart ({count}) →</button>
        </div>

        <div style={{marginTop:14, display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(190px,1fr))", gap:12}}>
          {filtered.map(p=> <ProductCard key={p.id} p={p} onAdd={onAdd} />)}
        </div>
      </main>
    </div>
  )
}
