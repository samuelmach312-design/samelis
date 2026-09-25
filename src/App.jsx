import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Header from "./components/Header"
import InstallPrompt from "./components/InstallPrompt"
import "./App.css"

const PRODUCTS = [
  { id: 1, name: "Nike Air Zoom Flyknit - Maroon", price: 3999, oldPrice: 5499, cat: "Sneakers", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop" },
  { id: 2, name: "Adidas UltraBoost - Black", price: 4499, oldPrice: 5999, cat: "Running", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80&auto=format&fit=crop" },
  { id: 3, name: "Official Leather Chelsea Boot", price: 5500, oldPrice: 7000, cat: "Boots", img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80&auto=format&fit=crop" },
  { id: 4, name: "Classic Slides - Comfort", price: 1499, oldPrice: 1999, cat: "Slides", img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80&auto=format&fit=crop" },
  { id: 5, name: "Leather Belt - Genuine", price: 999, oldPrice: 1499, cat: "Belts", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format&fit=crop" },
  { id: 6, name: "Air Max Sneaker - White", price: 3799, oldPrice: 4999, cat: "Sneakers", img: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&q=80&auto=format&fit=crop" },
]

function Home() {
  const addToCart = (p) => {
    const cart = JSON.parse(localStorage.getItem('samelis_cart') || '[]')
    localStorage.setItem('samelis_cart', JSON.stringify([...cart, p]))
    alert(`${p.name} added! Till 6880156 to pay`)
  }

  return (
    <div className="legit-page">
      {/* Hero */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">🔥 NEW DROP • SAMELIS VERIFIED</div>
            <h1 className="hero-title">SAMELIS<br/>COLLECTION</h1>
            <p className="hero-sub">Trusted Like Family - Till 6880156<br/>100% Genuine Shoes • Same-day Nairobi</p>
            <div className="hero-ctas">
              <Link to="/products" className="btn-black">Shop Now →</Link>
              <a href="https://wa.me/254748440035" className="btn-white">WhatsApp Us</a>
            </div>
            <div className="hero-trust">
              <span>✓ M-Pesa Till 6880156</span><span>✓ Free Delivery Nairobi</span><span>✓ Easy Returns</span>
            </div>
          </div>
          <div className="hero-right">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop" alt="Nike" />
            <div className="hero-float">Nike Verified • KES 3,999</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="section">
        <div className="section-head"><h2>Shop by Category</h2><span>100% Genuine</span></div>
        <div className="cat-grid">
          <div className="cat">👟 Sneakers</div><div className="cat">🥾 Boots</div><div className="cat">🩴 Slides</div><div className="cat">👔 Belts</div>
        </div>
      </div>

      {/* Products */}
      <div className="section">
        <div className="section-head"><h2>Best Sellers • SAMELIS Picks</h2><Link to="/products" className="view-all">View all →</Link></div>
        <div className="product-grid">
          {PRODUCTS.map(p => (
            <div key={p.id} className="product-card">
              <div className="p-img-wrap">
                <img src={p.img} alt={p.name} className="p-img" />
                <div className="p-badge">- {Math.round((1 - p.price/p.oldPrice)*100)}%</div>
                <div className="p-verified">✓ SAMELIS Verified</div>
              </div>
              <div className="p-info">
                <div className="p-cat">{p.cat} • Genuine</div>
                <div className="p-name">{p.name}</div>
                <div className="p-prices"><span className="p-price">KES {p.price.toLocaleString()}</span><span className="p-old">KES {p.oldPrice.toLocaleString()}</span></div>
                <button onClick={()=>addToCart(p)} className="p-btn">Add to Cart • Till 6880156</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Footer */}
      <div className="trust-footer">
        <div>🛡️ SAMELIS Verified • 100% Genuine</div>
        <div>📦 Free Delivery Nairobi • Same-day</div>
        <div>🔒 Lipa na M-Pesa • Till 6880156</div>
        <div>↩️ Easy Returns • WhatsApp 0748440035</div>
      </div>

      <footer className="main-footer">
        <div className="footer-inner">
          <div><b>SAMELIS</b><br/>Trusted Family Shop since 2020<br/>Till 6880156 • Buy Goods<br/>WhatsApp: 0748440035</div>
          <div>© 2026 SAMELIS • Trusted Like Family</div>
        </div>
      </footer>
    </div>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <InstallPrompt />
    </BrowserRouter>
  )
}
