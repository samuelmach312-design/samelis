export default async function handler(req, res) {
  // CORS for frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed. Use POST or GET" });
  }

  const message = req.body?.message || req.query?.message;

  if (!message || message.trim().length < 3) {
    return res.status(400).json({ error: "Missing message. Send { message: 'text' }" });
  }

  // Read both recipients - supports old single vars too
  const recipients = [
    { 
      phone: process.env.CALLMEBOT_PHONE_1 || process.env.CALLMEBOT_PHONE, 
      apikey: process.env.CALLMEBOT_APIKEY_1 || process.env.CALLMEBOT_APIKEY 
    },
    { 
      phone: process.env.CALLMEBOT_PHONE_2, 
      apikey: process.env.CALLMEBOT_APIKEY_2 
    },
  ].filter(r => r.phone && r.apikey);

  console.log(`[SAMELIS] Till 6880156 - Sending to ${recipients.length} recipient(s)`);

  if (recipients.length === 0) {
    return res.status(500).json({ 
      error: "Missing config in Vercel Env",
      hint: "Add CALLMEBOT_PHONE_1, CALLMEBOT_APIKEY_1, CALLMEBOT_PHONE_2=254748440035, CALLMEBOT_APIKEY_2=2032902 in Vercel > Settings > Environment Variables",
      debug: {
        hasPhone1: !!process.env.CALLMEBOT_PHONE_1,
        hasKey1: !!process.env.CALLMEBOT_APIKEY_1,
        hasPhone2: !!process.env.CALLMEBOT_PHONE_2,
        hasKey2: !!process.env.CALLMEBOT_APIKEY_2,
      }
    });
  }

  try {
    const results = [];
    
    for (const r of recipients) {
      const cleanPhone = r.phone.replace(/\D/g, ""); // remove + and spaces
      const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&apikey=${r.apikey}&text=${encodeURIComponent(message)}`;
      
      console.log(`Sending to ${cleanPhone}...`);
      const response = await fetch(url);
      const text = await response.text();
      
      console.log(`CallMeBot reply ${cleanPhone}:`, text.substring(0, 200));

      // CallMeBot returns "Message queued" on success, or "ERROR" on fail
      const isError = text.toLowerCase().includes("error") || text.toLowerCase().includes("not authorized") || text.includes("APIKey") ;
      const isSuccess = text.includes("Message queued") || text.includes("queued") || response.ok;

      results.push({ 
        phone: cleanPhone, 
        success: !isError && isSuccess, 
        response: text.substring(0, 300)
      });
    }

    const anySuccess = results.some(r => r.success);
    
    if (!anySuccess) {
      return res.status(400).json({ 
        error: "All CallMeBot calls failed. Check phone activated CallMeBot and apikey correct.",
        results,
        tip: "WhatsApp +34 644 10 55 84 message: I allow callmebot to send me messages"
      });
    }

    return res.status(200).json({ 
      success: true, 
      till: "6880156",
      sentTo: results.filter(r=>r.success).map(r=>r.phone),
      results 
    });

  } catch (error) {
    console.error("[SAMELIS] CallMeBot fatal:", error);
    return res.status(500).json({ error: "Failed: " + error.message });
  }
}
