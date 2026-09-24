import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-[#0f0f0f] text-white border-t border-white/10 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-black">S</div>
              <span className="font-black text-sm">SAMELIS</span>
            </div>
            <p className="text-xs opacity-60 max-w-xs">Trusted Like Family - Quality products at Chuka, Behind Coop Bank</p>
          </div>
          <div className="text-xs">
            <div className="font-bold mb-2">Pay Via Mpesa</div>
            <div className="bg-[#ffcc00] text-black px-4 py-2 rounded-md font-black inline-block">
              Till Number: 6880156
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-6 pt-4 text- opacity-50 text-center">
          © {new Date().getFullYear()} SAMELIS. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
