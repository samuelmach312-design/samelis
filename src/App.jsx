import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import InstallPrompt from "./components/InstallPrompt";

const PRODUCTS = [
  { id: 1, name: "Air Runner Sneaker X", category: "Shoes", price: 2999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Leather Chelsea Boot", category: "Boots", price: 4500, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Classic Slide", category: "Slides", price: 1500, image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800&auto=format&fit=crop" },
];

function HomePage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('samelis_cart') || '[]'));
  const addToCart = (p) => {
    const newCart = [...cart, p];
    setCart(newCart);
    localStorage.setItem('samelis_cart', JSON.stringify(newCart));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10">
      <h1 className="text-3xl font-black">SAMELIS COLLECTION</h1>
      <p className="text-slate-600">Trusted Like Family - Till 6880156</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {PRODUCTS.map(p=> (
          <div key={p.id} className="border rounded-2xl p-4">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-xl"/>
            <div className="font-bold mt-2 text-sm">{p.name}</div>
            <div className="text-xs text-slate-500">{p.category}</div>
            <div className="font-black mt-1">KES {p.price}</div>
            <button onClick={()=>addToCart(p)} className="bg-slate-900 text-white w-full py-2.5 rounded-full mt-3 text-sm font-bold">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimplePage({ title }) {
  return <div className="max-w-7xl mx-auto p-10"><h1 className="text-2xl font-black">{title}</h1><p className="mt-2">SAMELIS - Till 6880156</p></div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/cart" element={<SimplePage title="Cart" />} />
        <Route path="/login" element={<SimplePage title="Login" />} />
        <Route path="/signup" element={<SimplePage title="Sign Up" />} />
        <Route path="/profile" element={<SimplePage title="Profile" />} />
        <Route path="/orders" element={<SimplePage title="My Orders" />} />
        <Route path="/contact" element={<SimplePage title="Contact Us - 0748440035" />} />
      </Routes>
      <InstallPrompt />
    </BrowserRouter>
  );
}
