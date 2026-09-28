import { Link } from 'react-router-dom'

const link = 'hover:text-white'

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-white">Samelis</p>
          <p className="mt-2 max-w-xs text-sm">Shoes, boots, hoods, polos and accessories, delivered in Nairobi.</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/products" className={link}>All products</Link></li>
            <li><Link to="/cart" className={link}>Cart</Link></li>
            <li><Link to="/orders" className={link}>Your orders</Link></li>
            <li><Link to="/contact" className={link}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <address className="mt-3 space-y-2 text-sm not-italic">
            <p>Chuka Town, behind Coop Bank</p>
            <p><a href="tel:+254748440035" className={link}>0748 440 035</a></p>
            <p><a href="https://wa.me/254748440035" target="_blank" rel="noopener noreferrer" className={link}>Chat on WhatsApp</a></p>
          </address>
          <p className="mt-4 text-sm">Pay by M-Pesa Buy Goods, Till 6880156</p>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Samelis. All rights reserved.
      </div>
    </footer>
  )
}
