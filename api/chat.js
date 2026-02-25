// api/chat.js
export default async function handler(req, res) {
  // CORS 头 - 必须在最前面
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // 只接受 POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { message, history = [] } = req.body;
  
  // OC 设定
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
        'HTTP-Referer': 'https://oc-chat-test.vercel.app',
        'X-Title': 'OC Chat Test'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history,
          { role: 'user', content: message }
        ],
        max_tokens: 1024
      })
    });

    // 检查 OpenRouter 是否返回错误
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid response from OpenRouter');
    }
    
    res.status(200).json({ 
      reply: data.choices[0].message.content,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
