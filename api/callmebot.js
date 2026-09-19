export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  const message = req.body?.message || req.query?.message;
  if (!message) return res.status(400).json({ error: "Missing message" });
  const recipients = [
    { phone: process.env.CALLMEBOT_PHONE_1, apikey: process.env.CALLMEBOT_APIKEY_1 },
    { phone: process.env.CALLMEBOT_PHONE_2, apikey: process.env.CALLMEBOT_APIKEY_2 }
  ].filter(r=>r.phone && r.apikey);
  try {
    const results=[];
    for(const r of recipients){
      const url=`https://api.callmebot.com/whatsapp.php?phone=${r.phone.replace(/\D/g,"")}&apikey=${r.apikey}&text=${encodeURIComponent(message)}`;
      const resp=await fetch(url); const txt=await resp.text();
      results.push({phone:r.phone, ok:!txt.toLowerCase().includes("error"), txt:txt.slice(0,200)});
    }
    return res.status(200).json({success:true, till:"6880156", results});
  }catch(e){ return res.status(500).json({error:e.message}); }
}
