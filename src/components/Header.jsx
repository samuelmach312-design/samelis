import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="sticky top-0 z-50 bg-[#0f0f0f] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-black">S</div>
          <div className="leading-none">
            <div className="font-black text-sm tracking-tight">SAMELIS</div>
            <div className="text- opacity-60 font-bold tracking-widest">TRUSTED LIKE FAMILY</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2 text-xs opacity-70">
          📍 Chuka - Behind Coop Bank
        </div>

        <div className="flex items-center gap-2.5">
          <div className="bg-[#ffcc00] text-black px-3.5 py-1.5 rounded-md font-black text-xs">
            Till 6880156
          </div>
          <Link to="/cart" className="bg-white text-black px-4 py-1.5 rounded-full font-bold text-xs">
            Cart
          </Link>
        </div>
      </div>
    </header>
  )
}
