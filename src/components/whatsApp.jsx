// src/components/WhatsApp.jsx — Real WhatsApp Icon
const PHONE = "254748440035";
const TILL = "6880156";

export default function WhatsApp({ phone = PHONE, cart = [], total = 0, variant = "float" }) {
  const getMessage = () => {
    if (cart.length > 0) {
      return `Hi SAMELIS 👋\n\nI want to order:\n${cart.map(c=>`• ${c.name} x${c.qty} = KSh ${c.price*c.qty}`).join('\n')}\n\nTotal: KSh ${total}\nTill: ${TILL}\n\nPlease confirm availability.`;
    }
    return `Hi SAMELIS, I want to order. Till ${TILL}`;
  };
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(getMessage())}`;
  const WhatsAppIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.05 4.91A9.81 9.81 0 0 0 12.04 2C6.58 2 2.1 6.47 2.1 11.93c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.82 9.82 0 0 0 4.79 1.22h.01c5.46 0 9.93-4.47 9.93-9.93a9.88 9.88 0 0 0-2.93-7zM12.05 20.43a8.18 8.18 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.01 2.58.12.17 1.75 2.67 4.24 3.75.59.25 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.11-.23-.17-.48-.29z"/>
    </svg>
  );
  if (variant === "float") {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ position:"fixed", bottom:20, right:20, background:"#25D366", width:60, height:60, borderRadius:30, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(37,211,102,0.4)", zIndex:100, textDecoration:"none" }}>
        <WhatsAppIcon size={32} />
      </a>
    )
  }
  if (variant === "button") {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ background:"#25D366", color:"#fff", padding:"12px 20px", borderRadius:12, fontWeight:700, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", gap:8, textDecoration:"none", width:"100%" }}>
        <WhatsAppIcon size={20} /> Order on WhatsApp
      </a>
    )
  }
  return null;
}
