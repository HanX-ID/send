export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()
  const { name, message } = req.body
  const text = `📥 pesan baru\n\n👤 ${name}\n💬 ${message}\n🕒 ${new Date().toLocaleString("id-ID",{timeZone:"Asia/Jakarta"})}`
  try {
    let r = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({chat_id:process.env.CHAT_ID,text})
    })
    if(r.ok) res.status(200).json({success:true})
    else res.status(500).json({success:false})
  } catch {
    res.status(500).json({success:false})
  }
}
