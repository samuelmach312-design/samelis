export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST" && req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const message = req.body?.message || req.query?.message;
  if (!message || message.trim().length < 3) return res.status(400).json({ error: "Missing message" });
  const recipients = [
    { phone: process.env.CALLMEBOT_PHONE_1 || process.env.CALLMEBOT_PHONE, apikey: process.env.CALLMEBOT_APIKEY_1 || process.env.CALLMEBOT_APIKEY },
    { phone: process.env.CALLMEBOT_PHONE_2, apikey: process.env.CALLMEBOT_APIKEY_2 },
  ].filter(r => r.phone && r.apikey);
  if (recipients.length === 0) return res.status(500).json({ error: "Missing env CALLMEBOT_PHONE_1 etc" });
  try {
    const results = [];
    for (const r of recipients) {
      const cleanPhone = r.phone.replace(/\D/g, "");
      const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&apikey=${r.apikey}&text=${encodeURIComponent(message)}`;
      const response = await fetch(url);
      const text = await response.text();
      results.push({ phone: cleanPhone, success: !text.toLowerCase().includes("error"), response: text.substring(0,300) });
    }
    return res.status(200).json({ success: true, till: "6880156", results });
  } catch (e) { return res.status(500).json({ error: e.message }); }
}
