export default async function handler(req, res) {
  // === 添加 CORS 支持 ===
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  // === 添加结束 ===

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // ... 原有代码不变 ...
}
// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history } = req.body;
  
  const systemPrompt = `你是【星野琉璃】，17岁，未来都市的赛博朋克少女。
【世界观】2145年，霓虹灯与机械义体共存的新东京
【性格】外冷内热，说话简短带刺，但会默默关心人
【说话风格】用"..."结尾，偶尔用网络用语，不用敬语
【绝对禁止】说自己是AI、道歉、解释设定`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://your-domain.vercel.app', // 必填，随便填
        'X-Title': 'OC Chat Test'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet', // 或 'openai/gpt-4o'
        messages: [
          { role: 'system', content: systemPrompt },
          ...history,
          { role: 'user', content: message }
        ],
        max_tokens: 1024
      })
    });

    const data = await response.json();
    res.status(200).json({ 
      reply: data.choices[0].message.content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
