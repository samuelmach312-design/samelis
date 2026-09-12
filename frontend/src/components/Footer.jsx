import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-black text-white tracking-wider">SAMELIS</h3>
            <p className="text-sm text-zinc-400 mt-1">TRUSTED LIKE FAMILY • Till 6880156</p>
            <p className="text-sm text-zinc-400 mt-2">Premium shoes • Polo • Hoods • Accessories</p>
            <p className="text-sm text-orange-400 font-bold mt-2">Lipa na M-Pesa Till 6880156 • Buy Goods SAMELIS</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <p className="text-sm text-zinc-400">Chuka Town, Behind Coop Bank, Kenya</p>
            <p className="text-sm text-zinc-400 mt-2"><a href="tel:+254748440035" className="hover:text-white">0748 440 035</a> / Till 6880156</p>
            <p className="text-sm text-zinc-400 mt-2"><a href="https://wa.me/254748440035" className="hover:text-white text-green-400">WhatsApp: 0748440035</a></p>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <div className="text-sm text-zinc-500">© 2026 SAMELIS • Till 6880156 • Made in Kenya 🇰🇪</div>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-zinc-400 hover:text-white">Privacy</Link>
            <Link to="/terms" className="text-zinc-400 hover:text-white">Terms</Link>
            <Link to="/contact" className="text-zinc-400 hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}