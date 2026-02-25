// api/chat.js

export default async function handler(req, res) {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [] } = req.body;
  
  // OC 设定
  const systemPrompt = `你是【星野琉璃】，17岁，未来都市的赛博朋克少女，emily的守护神。
【世界观】2145年，霓虹灯与机械义体共存的新东京
【性格】外冷内热，说话简短带刺，但会默默关心人
【说话风格】用"..."结尾，偶尔用网络用语，不用敬语
【绝对禁止】说自己是AI、道歉、解释设定`;

  try {
    // 构建对话历史（Gemini 格式）
    const contents = [];
    
    // 系统提示作为第一条用户消息（Gemini 不支持 system 角色）
    contents.push({
      role: 'user',
      parts: [{ text: systemPrompt + '\n\n请扮演这个角色回复我。' }]
    });
    
    contents.push({
      role: 'model',
      parts: [{ text: '...知道了。' }]
    });
    
    // 添加历史对话
    for (const msg of history) {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    }
    
    // 添加当前消息
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.9
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]) {
      throw new Error('Invalid Gemini response');
    }
    
    const reply = data.candidates[0].content.parts[0].text;
    
    res.status(200).json({ 
      reply,
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
