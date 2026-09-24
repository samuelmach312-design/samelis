import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function Cart(){
  const { cart, updateQuantity, removeFromCart, updateQty, removeItem, cartTotal } = useCart()
  const navigate = useNavigate()

  // support both naming styles in your context
  const qtyFn = updateQuantity || updateQty || ((id,d)=>{})
  const remFn = removeFromCart || removeItem || ((id)=>{})

  const safeCart = Array.isArray(cart)? cart : []
  const total = cartTotal || safeCart.reduce((s,i)=> s + (Number(i.price)||0)*(i.qty||1), 0)
  const count = safeCart.reduce((s,i)=> s + (i.qty||1), 0)

  if(safeCart.length===0){
    return <div className="max-w- mx-auto p-10 text-center py-20"><p className="text-6xl mb-4">🛒</p><h2 className="font-black">Cart empty</h2><Link to="/" className="mt-4 inline-block bg-black text-white px-6 py-2.5 rounded-full font-bold">Continue Shopping</Link></div>
  }

  return (
    <div className="max-w- mx-auto p-4 md:p-6 grid md:grid-cols-[1fr_360px] gap-4 bg-[#f6f6f7] min-h-">
      <div className="space-y-3">
        {safeCart.map((item,i)=>(
          <div key={item.id||i} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 items-center">
            <img src={item.image_url||item.image||'/images/monique-logo.png'} alt={item.name} className="w- h- object-contain rounded-lg" />
            <div className="flex-1">
              <h3 className="font-semibold text- leading-tight">{item.name}</h3>
              <p className="text- text-gray-500 mt-1">Lifestyle · {item.brand||'Monique'}</p>
              <div className="flex items-center gap-2 mt-3">
                <button onClick={()=>qtyFn(item.id||item._id, (item.qty||1)-1)} className="w-8 h-8 rounded-lg border flex items-center justify-center">−</button>
                <span className="w-6 text-center text-">{item.qty||1}</span>
                <button onClick={()=>qtyFn(item.id||item._id, (item.qty||1)+1)} className="w-8 h-8 rounded-lg border flex items-center justify-center">+</button>
              </div>
            </div>
            <div className="text-right">
              <button onClick={()=>remFn(item.id||item._id)} className="text-gray-400 hover:text-red-500 ml-auto block mb-2">🗑️</button>
              <div className="font-bold text-">KSh {(item.price*(item.qty||1)).toLocaleString()}</div>
              <div className="text- text-gray-500">KSh {Number(item.price).toLocaleString()} each</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border p-5 h-fit sticky top-">
        <h3 className="font-black text- mb-4">Order Summary</h3>
        <div className="space-y-3 text-">
          <div className="flex justify-between text-gray-600"><span>Subtotal ({count} item)</span><span className="text-black font-medium">KSh {total.toLocaleString()}</span></div>
          <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-green-600 font-medium">Free</span></div>
          <div className="flex justify-between text-gray-600"><span>Tax</span><span>Calculated at checkout</span></div>
        </div>
        <div className="border-t my-4"></div>
        <div className="flex justify-between font-black text- mb-5"><span>Total</span><span>KSh {total.toLocaleString()}</span></div>
        <button onClick={()=>navigate('/checkout')} className="w-full bg-[#111827] text-white py-3.5 rounded-xl font-bold text-">Proceed to Checkout</button>
        <Link to="/" className="block text-center mt-3 text- text-gray-600">Continue Shopping</Link>
        <div className="mt-4 bg-[#fff7ed] text-center py-2 rounded-lg text-">💳 Till <b className="text-[#f68b1e]">6880156</b> SAMELIS</div>
      </div>
    </div>
  )
}