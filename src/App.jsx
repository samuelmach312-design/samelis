import { useState, useMemo, useEffect } from "react";

const PRODUCTS = [
  { id: 1, name: "Air Runner Sneaker X", category: "Shoes", price: 2999, oldPrice: 3999, discount: 25, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Leather Chelsea Boot Pro", category: "Boots", price: 4500, oldPrice: 6200, discount: 27, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Cloud Slide Comfort", category: "Slides", price: 1200, oldPrice: 1800, discount: 33, rating: 4.7, reviews: 210, image: "https://images.unsplash.com/photo-1603808033587-9359428479d6?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Executive Genuine Belt", category: "Belts", price: 1500, oldPrice: 2000, discount: 25, rating: 4.6, reviews: 76, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Trail Hiker Waterproof", category: "Boots", price: 4999, oldPrice: 6500, discount: 23, rating: 4.8, reviews: 54, image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Urban Loafer Premium", category: "Shoes", price: 3200, oldPrice: 4200, discount: 24, rating: 4.7, reviews: 102, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" },
  { id: 7, name: "Sport Slide Pro Max", category: "Slides", price: 1450, oldPrice: 2100, discount: 31, rating: 4.6, reviews: 98, image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=800&auto=format&fit=crop" },
  { id: 8, name: "Woven Leather Belt", category: "Belts", price: 1800, oldPrice: 2500, discount: 28, rating: 4.9, reviews: 41, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop" },
  { id: 9, name: "Velocity Sneaker Knit", category: "Shoes", price: 2800, oldPrice: 3800, discount: 26, rating: 4.8, reviews: 167, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop" },
  { id: 10, name: "Desert Chukka Suede", category: "Boots", price: 3800, oldPrice: 5200, discount: 27, rating: 4.7, reviews: 63, image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=800&auto=format&fit=crop" },
  { id: 11, name: "Minimal Cross Pouch", category: "Accessories", price: 1650, oldPrice: 2200, discount: 25, rating: 4.5, reviews: 88, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop" },
  { id: 12, name: "Canvas Runner Light", category: "Shoes", price: 2599, oldPrice: 3599, discount: 28, rating: 4.6, reviews: 131, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop" },
];

const CATEGORIES = ["All", "Shoes", "Boots", "Slides", "Accessories", "Belts"];
const TILL = "6880156";
const WHATSAPP = "254748440035";

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCat === "All" || p.category === activeCat;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCat]);

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => a + c.product.price * c.qty, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.product.id === product.id);
      if (exists) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.product.id === id) {
        const nq = i.qty + delta;
        return nq <= 0 ? null : { ...i, qty: nq };
      }
      return i;
    }).filter(Boolean));
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo" style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <img src="/logo.png" alt="SAMELIS - Trusted Family Shop" style={{height:'44px', width:'auto', objectFit:'contain'}} />
          </div>
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input className="search-input" placeholder="Search shoes, boots, slides, belts..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="header-actions">
            <div className="till-badge"><span className="till-dot" /> TILL {TILL}</div>
            <button className="icon-btn" onClick={() => setIsCartOpen(true)}>🛒 {cartCount > 0 && <span className="cart-count">{cartCount}</span>}</button>
          </div>
        </div>
      </header>

      <div className="trust-bar">
        <div className="trust-item">🚚 Free Delivery Nairobi • Same-day</div>
        <div className="trust-item">🛡 100% Genuine • SAMELIS Verified</div>
        <div className="trust-item">🔒 Secure M-Pesa • Till {TILL}</div>
      </div>

      <main className="main-content">
        <div className="page-header">
          <div className="page-header-inner">
            <h1>SAMELIS COLLECTION</h1>
            <div className="page-header-row">
              <h2>Premium Footwear & Fashion • Nairobi, Kenya</h2>
              <span className="product-count">{PRODUCTS.length} Products • Till {TILL}</span>
            </div>
          </div>
        </div>

        <div className="category-wrap">
          <div className="category-scroller">
            {CATEGORIES.map(cat => (
              <button key={cat} className={`cat-pill ${activeCat === cat ? 'active' : ''}`} onClick={() => setActiveCat(cat)}>{cat}</button>
            ))}
            <div style={{ marginLeft: 'auto', fontSize: 12, color: '#64748b', fontWeight: 600 }}>💬 WhatsApp: 0748440035</div>
          </div>
        </div>

        <div className="products-grid">
          {loading ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card"><div className="skeleton-img" /><div className="skeleton-line" style={{ width: '60%' }} /><div className="skeleton-line" style={{ width: '80%' }} /></div>
          )) : filtered.map(p => (
            <div key={p.id} className="product-card">
              <div className="img-wrap">
                <img src={p.image} alt={p.name} loading="lazy" />
                <span className="badge-brand">SAMELIS</span>
                <span className="badge-discount">-{p.discount}%</span>
              </div>
              <div className="card-body">
                <div className="card-category">{p.category}</div>
                <div className="card-name">{p.name}</div>
                <div className="card-price-row"><span className="price">KES {p.price.toLocaleString()}</span><span className="old-price">KES {p.oldPrice.toLocaleString()}</span></div>
                <div className="rating">⭐ {p.rating} <span style={{ color: '#94a3b8' }}>({p.reviews})</span></div>
                <button className="add-btn" onClick={() => addToCart(p)}>🛒 Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className={`overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)} />
      <div className={`drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="drawer-header"><div className="drawer-title">Cart • {cartCount} items</div><button className="icon-btn" style={{ width: 36, height: 36 }} onClick={() => setIsCartOpen(false)}>✕</button></div>
        <div className="drawer-body">
          {cart.length === 0 ? <div style={{ textAlign: 'center', padding: 40 }}>🛒<br /><b>Cart empty</b><br /><small>Add SAMELIS products</small></div> : cart.map(item => (
            <div key={item.product.id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{item.product.name}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>KES {item.product.price.toLocaleString()}</div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => updateQty(item.product.id, -1)}>−</button>
                  <span style={{ fontWeight: 700 }}>{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.product.id, 1)}>+</button>
                  <span style={{ marginLeft: 'auto', fontWeight: 800 }}>KES {(item.product.price * item.qty).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="total-row"><span>Total</span><span>KES {cartTotal.toLocaleString()}</span></div>
            <button className="checkout-btn" onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}>🔒 Checkout Till {TILL}</button>
            <div style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 10 }}>Till: {TILL} • Secure • Same-day Nairobi</div>
          </div>
        )}
      </div>

      {isCheckoutOpen && (
        <div className="modal-overlay" onClick={() => !orderSuccess && setIsCheckoutOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {!orderSuccess ? (
              <>
                <div className="modal-header">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><b>Lipa na M-Pesa</b><button onClick={() => setIsCheckoutOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', width: 32, height: 32, borderRadius: 9999, cursor: 'pointer' }}>✕</button></div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 6 }}>SAMELIS • Till Checkout</div>
                </div>
                <div className="mpesa-box"><div style={{ fontSize: 11, fontWeight: 800, color: '#3b82f6' }}>M-PESA TILL NUMBER</div><div className="mpesa-till">{TILL}</div><div style={{ fontSize: 12, color: '#475569' }}>Total: <b>KES {cartTotal.toLocaleString()}</b> • {cartCount} items</div></div>
                <div className="steps">
                  <div className="step"><div className="step-num">1</div><div>M-Pesa → Lipa na M-Pesa → Buy Goods</div></div>
                  <div className="step"><div className="step-num">2</div><div>Enter Till: <b>{TILL}</b></div></div>
                  <div className="step"><div className="step-num">3</div><div>Amount: <b>KES {cartTotal.toLocaleString()}</b> → PIN → Confirm</div></div>
                  <div className="step"><div className="step-num">4</div><div>Send confirmation to WhatsApp 0748440035</div></div>
                </div>
                <div style={{ padding: '0 18px 18px', display: 'grid', gap: 10 }}>
                  <button className="checkout-btn" style={{ height: 46 }} onClick={() => setOrderSuccess(true)}>✓ I have paid</button>
                  <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener" style={{ height: 46, borderRadius: 9999, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 700, fontSize: 13, color: '#0f172a', background: 'white', textDecoration: 'none' }}>💬 Share on WhatsApp</a>
                </div>
              </>
            ) : (
              <div style={{ padding: 28, textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, background: '#dcfce7', color: '#16a34a', borderRadius: 9999, display: 'grid', placeItems: 'center', margin: '0 auto 14px', fontSize: 32 }}>✓</div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>Order Received!</div>
                <div style={{ fontSize: 13, color: '#475569', marginTop: 6 }}>Asante! KES {cartTotal.toLocaleString()} confirmed. Send M-Pesa SMS to 0748440035</div>
                <div style={{ marginTop: 16, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 12, fontSize: 12 }}>Till: {TILL} • WhatsApp: wa.me/{WHATSAPP} • 0748440035</div>
                <button className="checkout-btn" style={{ marginTop: 18, background: '#0f172a' }} onClick={() => { setCart([]); setIsCheckoutOpen(false); setOrderSuccess(false); }}>Continue Shopping</button>
              </div>
            )}
          </div>
        </div>
      )}
      <InstallPrompt />

      

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="logo" style={{ color: 'white', marginBottom: 10, display:'flex', alignItems:'center', gap:'10px' }}>
              <img src="/logo.png" alt="SAMELIS" style={{height:'38px', filter:'brightness(0) invert(1)'}} />
              <span>SAMELIS</span>
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>Premium footwear Nairobi. Genuine leather. Till {TILL} • Lipa na M-Pesa<br/>Trusted Family Shop</div>
          </div>
          <div><h4>Pay With</h4><div style={{ fontSize: 13 }}>M-Pesa Till: <b style={{ color: 'white' }}>{TILL}</b><br />Buy Goods • No extra charge</div><h4 style={{ marginTop: 18 }}>Contact</h4><div>📞 0748440035<br /><a href={`https://wa.me/${WHATSAPP}`} target="_blank" style={{ color: '#94a3b8' }}>💬 WhatsApp</a></div></div>
          <div><h4>Store</h4><div style={{ fontSize: 13 }}>Nairobi, Kenya • Free CBD Delivery<br />Mon-Sat 8am-8pm • Sun 10am-6pm<br /><span style={{ fontSize: 11, color: '#64748b' }}>© 2026 SAMELIS Till {TILL}</span></div></div>
        </div>
      </footer>
    </div>
  );
}
