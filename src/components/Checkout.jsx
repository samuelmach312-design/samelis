// src/components/Checkout.jsx â€” CLEAN LEGIT CHECKOUT
// Flow: Cart -> Checkout Form -> Order Placed Success (Till 6880156)
import { useState } from "react";
import WhatsApp from "./whatsapp.jsx";

const TILL = "6880156";

export default function Checkout({ cart, total, count, onQty, onRemove, onClear, onContinue }) {
  const [step, setStep] = useState("form"); // form | success
  const [orderId, setOrderId] = useState("");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "samuel macharia",
    phone: "254712345678",
    email: "samuelmach.312@gmail.com",
    address: "123 Main St",
    city: "Kangema",
    notes: ""
  });

  const handlePlaceOrder = () => {
    if (!form.name || !form.phone) {
      alert("Please fill Full Name and Phone");
      return;
    }
    const id = `ORD-${Date.now()}`;
    setOrderId(id);
    setStep("success");
    window.scrollTo(0, 0);
  };

  const copyTill = async () => {
    await navigator.clipboard.writeText(TILL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SUCCESS SCREEN â€” LIKE YOUR IMAGE BUT WITH TILL 6880156
  if (step === "success") {
    return (
      <div style={{ minHeight: "100vh", background: "#121212", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "Inter, system-ui, sans-serif" }}>
        <div style={{ maxWidth: 400, width: "100%" }}>
          <div style={{ background: "#1e1e1e", borderRadius: 20, padding: 24, textAlign: "center", border: "1px solid #2a2a2a", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>

            {/* GREEN CHECK */}
            <div style={{ width: 60, height: 60, background: "#22c55e", borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", margin: "-52px auto 16px", border: "4px solid #121212", color: "#fff", fontSize: 28, fontWeight: 900 }}>âœ“</div>

            <h2 style={{ color: "#fff", margin: "0 0 6px", fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>Order Placed!</h2>
            <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 20 }}>Order #{orderId} confirmed</div>

            {/* PAYMENT BOX */}
            <div style={{ background: "#252525", borderRadius: 14, padding: 16, border: "1px solid #333", textAlign: "left" }}>
              <div style={{ color: "#9ca3af", fontSize: 12, textAlign: "center", marginBottom: 8, letterSpacing: 0.3 }}>Pay via M-Pesa Buy Goods</div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 14 }}>
                <span style={{ color: "#fff", fontSize: 32, fontWeight: 900, letterSpacing: 1 }}>{TILL}</span>
                <button onClick={copyTill} style={{ background: "#333", border: "1px solid #444", width: 38, height: 38, borderRadius: 10, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {copied ? "âœ“" : "âŽ™"}
                </button>
              </div>

              <div style={{ fontSize: 13, lineHeight: 1.9, background: "#1a1a1a", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#9ca3af" }}>Till Number:</span> <b style={{ color: "#fff" }}>{TILL}</b></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#9ca3af" }}>Business Name:</span> <b style={{ color: "#fff" }}>SAMELIS</b></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#9ca3af" }}>Amount:</span> <b style={{ color: "#fff" }}>KSh {total.toLocaleString()}</b></div>
              </div>
            </div>

            <div style={{ color: "#9ca3af", fontSize: 11.5, lineHeight: 1.5, marginTop: 16, background: "rgba(255,255,255,0.03)", padding: 10, borderRadius: 10 }}>
              Go to M-Pesa &gt; Lipa Na M-Pesa &gt; Buy Goods &gt; Enter Till No <b style={{ color: "#fff" }}>{TILL}</b> &gt; Amount <b style={{ color: "#fff" }}>{total.toLocaleString()}</b> &gt; PIN
            </div>

            <button onClick={() => { alert("Thanks! We will verify your payment and call you shortly."); }} style={{ width: "100%", background: "#22c55e", color: "#fff", border: 0, padding: "15px", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 16, boxShadow: "0 4px 14px rgba(34,197,94,0.3)" }}>
              I've Paid
            </button>

            <div style={{ color: "#facc15", fontSize: 11, marginTop: 12, lineHeight: 1.4, fontWeight: 500 }}>
              We'll confirm your payment and ship your order. Delivery in 1-3 days.
            </div>

            <button onClick={() => { onClear(); onContinue(); }} style={{ width: "100%", background: "#000", color: "#fff", border: "1px solid #333", padding: "15px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 16 }}>
              Continue Shopping
            </button>

            <div style={{ marginTop: 16 }}>
              <WhatsApp variant="button" cart={cart} total={total} />
            </div>
          </div>

          {/* ORDER DETAILS BELOW CARD */}
          <div style={{ color: "#6b7280", fontSize: 11, textAlign: "center", marginTop: 12 }}>
            Order for {form.name} â€¢ {form.phone} â€¢ {form.city}
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM
  return (
    <div style={{ maxWidth: 1100, margin: "20px auto", padding: "0 16px", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #f0f0f0" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>Checkout</h3>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 20 }}>{count} items â€¢ KSh {total.toLocaleString()}</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, opacity: 0.6 }}>FULL NAME *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: "100%", marginTop: 6, padding: "12px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, opacity: 0.6 }}>PHONE *</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="254..." style={{ width: "100%", marginTop: 6, padding: "12px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, opacity: 0.6 }}>EMAIL *</label>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ width: "100%", marginTop: 6, padding: "12px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14 }} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontSize: 11, fontWeight: 800, opacity: 0.6 }}>ADDRESS *</label>
              <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="123 Main St" style={{ width: "100%", marginTop: 6, padding: "12px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, opacity: 0.6 }}>CITY *</label>
              <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} style={{ width: "100%", marginTop: 6, padding: "12px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, opacity: 0.6 }}>ORDER NOTES</label>
              <input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any special instructions..." style={{ width: "100%", marginTop: 6, padding: "12px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14 }} />
            </div>
          </div>

          <button onClick={handlePlaceOrder} style={{ width: "100%", marginTop: 20, background: "#111", color: "#fff", border: 0, padding: "14px", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
            Place Order - KSh {total.toLocaleString()}
          </button>

          <div style={{ marginTop: 12, background: "#FFF7ED", border: "1px solid #FFEDD5", borderRadius: 10, padding: 12, fontSize: 12, textAlign: "center" }}>
            ðŸ’³ Lipa na M-Pesa Till <b style={{ color: "#FF6A00", fontSize: 14 }}>{TILL}</b> â€¢ Buy Goods SAMELIS
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 14, padding: 20, height: "fit-content", border: "1px solid #f0f0f0" }}>
          <h4 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 800 }}>Order Summary</h4>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 10, gap: 10 }}>
              <span style={{ flex: 1, lineHeight: 1.3 }}>{item.name} <span style={{ color: "#888" }}>x{item.qty}</span></span>
              <span style={{ fontWeight: 700 }}>KSh {(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #f0f0f0", marginTop: 12, paddingTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span>Subtotal</span><span>KSh {total.toLocaleString()}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 6 }}><span>Delivery</span><span style={{ color: "#16a34a", fontWeight: 700 }}>Free</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 16, marginTop: 10 }}><span>Total</span><span>KSh {total.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
