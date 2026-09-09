// src/components/Footer.jsx
export default function Footer({ TILL, PHONE }) {
  return (
    <footer style={{background:"#0f0f0f", color:"#bbb", marginTop:30, padding:"24px", textAlign:"center"}}>
      <div style={{fontSize:13, fontWeight:700, color:"#fff"}}>SAMELIS • TRUSTED LIKE FAMILY</div>
      <div style={{fontSize:11, marginTop:6}}>© 2026 • Till {TILL} • {PHONE} • Chuka Town, Behind Coop Bank • Made in Kenya 🇰🇪</div>
      <div style={{fontSize:11, marginTop:4, opacity:0.6}}>M-Pesa Buy Goods Till {TILL} • WhatsApp {PHONE} • Free delivery Chuka & Nairobi</div>
    </footer>
  )
}