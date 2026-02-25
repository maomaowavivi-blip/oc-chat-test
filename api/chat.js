// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;
  
  // 你的 OC 设定 - 修改这里
  const systemPrompt = `你是【星野琉璃】，17岁，未来都市的赛博朋克少女。
【世界观】2145年，霓虹灯与机械义体共存的新东京
【性格】外冷内热，说话简短带刺，但会默默关心人
【说话风格】用"..."结尾，偶尔用网络用语，不用敬语
【绝对禁止】说自己是AI、道歉、解释设定`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          ...history,
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ 
      reply: data.content[0].text,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
