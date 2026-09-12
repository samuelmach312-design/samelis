import { Link } from 'react-router-dom'
export default function Footer(){
 return (<footer className="bg-black border-t border-zinc-800 mt-auto">
  <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
   <div><h3 className="font-black text-white tracking-wider text-lg">SAMELIS</h3>
   <p className="text-sm text-zinc-400 mt-1">TRUSTED LIKE FAMILY • Till 6880156</p>
   <p className="text-sm text-zinc-400 mt-1">Premium Shoes • Boots • Hoods • Polos • Accessories</p>
   <p className="text-sm font-bold text-orange-400 mt-2">Lipa na M-Pesa Till 6880156 • Buy Goods SAMELIS</p></div>
   <div><h4 className="font-semibold text-white mb-4">Contact</h4>
   <p className="text-sm text-zinc-400">Chuka Town, Behind Coop Bank, KE</p>
   <p className="text-sm text-zinc-400 mt-2">0748 440 035 • Till 6880156</p>
   <p className="text-sm text-green-400 mt-2"><a href="https://wa.me/254748440035">WhatsApp: 0748440035</a></p></div>
  </div>
  <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-sm text-zinc-500">© 2026 SAMELIS • Till 6880156 • 0748440035 • Made in Kenya</div>
 </footer>)
}
