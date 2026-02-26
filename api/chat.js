<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>星野琉璃 | 2145</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans SC', sans-serif;
            background: #0a0a0f;
            color: #fff;
            height: 100vh;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        /* 手机外框 */
        .phone-frame {
            width: 100%;
            max-width: 414px;
            height: 100vh;
            max-height: 896px;
            background: #1a1a24;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 50px rgba(233, 69, 96, 0.3);
        }
        
        @media (min-width: 415px) {
            .phone-frame {
                height: 90vh;
                border-radius: 40px;
                border: 8px solid #2a2a35;
            }
        }
        
        /* 状态栏 */
        .status-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 20px;
            background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            font-size: 14px;
            font-weight: 500;
        }
        
        .status-left {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .rec-dot {
            width: 8px;
            height: 8px;
            background: #e94560;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        
        .status-right {
            text-align: right;
        }
        
        .time {
            font-size: 24px;
            font-weight: 300;
            letter-spacing: 2px;
        }
        
        .date {
            font-size: 12px;
            color: #888;
            text-transform: uppercase;
        }
        
        /* 左侧图标栏 */
        .side-icons {
            position: absolute;
            left: 15px;
            top: 80px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            z-index: 50;
        }
        
        .icon-btn {
            width: 44px;
            height: 44px;
            background: rgba(233, 69, 96, 0.15);
            border: 1px solid rgba(233, 69, 96, 0.3);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .icon-btn:hover, .icon-btn.active {
            background: rgba(233, 69, 96, 0.4);
            border-color: #e94560;
            transform: scale(1.05);
        }
        
        /* 主内容区 */
        .main-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        
        /* 角色展示区 */
        .character-display {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px 20px 20px;
            position: relative;
        }
        
        /* 背景装饰 */
        .bg-decoration {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.1;
            background: 
                radial-gradient(circle at 20% 80%, #e94560 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, #16213e 0%, transparent 50%);
            pointer-events: none;
        }
        
        /* 角色立绘容器 */
        .character-frame {
            width: 280px;
            height: 380px;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 20px;
            border: 2px solid rgba(233, 69, 96, 0.3);
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        
        /* 角色占位（可用图片替换） */
        .character-image {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 120px;
            background: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%);
            position: relative;
        }
        
        .character-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, transparent 60%, rgba(233, 69, 96, 0.1) 100%);
        }
        
        /* 角色信息 */
        .character-info {
            text-align: center;
            margin-top: 20px;
        }
        
        .character-name {
            font-size: 24px;
            font-weight: 700;
            color: #e94560;
            text-shadow: 0 0 20px rgba(233, 69, 96, 0.5);
            letter-spacing: 4px;
        }
        
        .character-title {
            font-size: 12px;
            color: #888;
            margin-top: 5px;
            letter-spacing: 2px;
        }
        
        /* 对话区域 */
        .chat-section {
            background: linear-gradient(180deg, transparent 0%, rgba(26,26,36,0.95) 20%);
            padding: 20px;
            position: relative;
        }
        
        /* 对话气泡 */
        .dialogue-box {
            background: rgba(22, 33, 62, 0.9);
            border: 1px solid rgba(233, 69, 96, 0.2);
            border-radius: 16px;
            padding: 16px 20px;
            margin-bottom: 15px;
            min-height: 60px;
            position: relative;
            backdrop-filter: blur(10px);
        }
        
        .dialogue-box::before {
            content: '...';
            position: absolute;
            top: -10px;
            left: 20px;
            color: #e94560;
            font-size: 20px;
            font-weight: bold;
        }
        
        .dialogue-text {
            font-size: 15px;
            line-height: 1.6;
            color: #eee;
        }
        
        .dialogue-text.typing::after {
            content: '|';
            animation: blink 1s infinite;
            color: #e94560;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        /* 输入区域（音乐播放器风格） */
        .input-section {
            background: rgba(15, 15, 26, 0.95);
            border-top: 1px solid rgba(233, 69, 96, 0.2);
            padding: 20px;
        }
        
        .player-container {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 20px;
            padding: 15px;
            border: 1px solid rgba(233, 69, 96, 0.2);
        }
        
        .progress-bar {
            height: 4px;
            background: rgba(255,255,255,0.1);
            border-radius: 2px;
            margin-bottom: 15px;
            position: relative;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #e94560, #ff6b6b);
            border-radius: 2px;
            transition: width 0.3s ease;
        }
        
        .input-controls {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .input-field {
            flex: 1;
            background: rgba(0,0,0,0.3);
            border: 1px solid rgba(233, 69, 96, 0.2);
            border-radius: 25px;
            padding: 12px 20px;
            color: #fff;
            font-size: 14px;
            outline: none;
            transition: all 0.3s ease;
        }
        
        .input-field:focus {
            border-color: #e94560;
            box-shadow: 0 0 10px rgba(233, 69, 96, 0.2);
        }
        
        .input-field::placeholder {
            color: #666;
        }
        
        .send-btn {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #e94560 0%, #c73e54 100%);
            border: none;
            border-radius: 50%;
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(233, 69, 96, 0.4);
        }
        
        .send-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(233, 69, 96, 0.6);
        }
        
        .send-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        /* 底部装饰线 */
        .bottom-line {
            height: 5px;
            background: linear-gradient(90deg, transparent, #e94560, transparent);
            margin-top: 10px;
            opacity: 0.5;
        }
        
        /* 滚动条美化 */
        ::-webkit-scrollbar {
            width: 6px;
        }
        
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
            background: rgba(233, 69, 96, 0.3);
            border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(233, 69, 96, 0.5);
        }
    </style>
</head>
<body>
    <div class="phone-frame">
        <!-- 状态栏 -->
        <div class="status-bar">
            <div class="status-left">
                <div class="rec-dot"></div>
                <span>REC</span>
            </div>
            <div class="status-right">
                <div class="time" id="clock">09:04</div>
                <div class="date">WEDNESDAY</div>
            </div>
        </div>
        
        <!-- 左侧图标栏 -->
        <div class="side-icons">
            <div class="icon-btn active" title="对话">💬</div>
            <div class="icon-btn" title="档案">📋</div>
            <div class="icon-btn" title="音乐">🎵</div>
            <div class="icon-btn" title="设置">⚙️</div>
        </div>
        
        <!-- 主内容 -->
        <div class="main-content">
            <div class="bg-decoration"></div>
            
            <!-- 角色展示 -->
            <div class="character-display">
                <div class="character-frame">
                    <div class="character-image">
                        🤖
                    </div>
                </div>
                <div class="character-info">
                    <div class="character-name">星野琉璃</div>
                    <div class="character-title">2145 · 新东京 · 赛博朋克少女</div>
                </div>
            </div>
            
            <!-- 对话区域 -->
            <div class="chat-section">
                <div class="dialogue-box" id="dialogueBox">
                    <div class="dialogue-text" id="dialogueText">
                        ...你是谁？怎么突然出现在我的频道里。
                    </div>
                </div>
                
                <!-- 输入区域（播放器风格） -->
                <div class="input-section">
                    <div class="player-container">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressBar"></div>
                        </div>
                        <div class="input-controls">
                            <input 
                                type="text" 
                                class="input-field" 
                                id="inputField"
                                placeholder="输入消息..." 
                                onkeypress="if(event.key==='Enter')sendMessage()"
                            >
                            <button class="send-btn" id="sendBtn" onclick="sendMessage()">
                                ▶
                            </button>
                        </div>
                    </div>
                    <div class="bottom-line"></div>
                </div>
            </div>
        </div>
    </div>
// api/chat.js

    <script>
        // API 配置
        const API_URL = 'https://oc-chat-test.vercel.app/api/chat';
        
        // 状态
        let history = [];
        let isTyping = false;
        
        // 时钟更新
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            document.getElementById('clock').textContent = `${hours}:${minutes}`;
        }
        setInterval(updateClock, 1000);
        updateClock();
        
        // 添加消息到对话框
        function showMessage(text, isUser = false) {
            const dialogueText = document.getElementById('dialogueText');
            dialogueText.textContent = text;
            dialogueText.classList.remove('typing');
            
            // 添加动画效果
            dialogueText.style.opacity = '0';
            setTimeout(() => {
                dialogueText.style.transition = 'opacity 0.3s ease';
                dialogueText.style.opacity = '1';
            }, 50);
        }
        
        // 显示输入中
        function showTyping() {
            const dialogueText = document.getElementById('dialogueText');
            dialogueText.textContent = '...';
            dialogueText.classList.add('typing');
        }
        
        // 更新进度条
        function setProgress(percent) {
            document.getElementById('progressBar').style.width = percent + '%';
        }
        
        // 发送消息
        async function sendMessage() {
            const input = document.getElementById('inputField');
            const btn = document.getElementById('sendBtn');
            const text = input.value.trim();
            
            if (!text || isTyping) return;
            
            // 显示用户消息
            showMessage(text, true);
            input.value = '';
            btn.disabled = true;
            isTyping = true;
            setProgress(30);
            
            // 延迟显示输入中
            setTimeout(() => {
                showTyping();
                setProgress(60);
            }, 300);
            
            try {
                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        message: text, 
                        history 
                    })
                });
                
                setProgress(80);
                const data = await res.json();
                setProgress(100);
                
                if (data.reply) {
                    // 模拟打字效果
                    await typeWriter(data.reply);
                    
                    // 更新历史
                    history.push(
                        { role: 'user', content: text },
                        { role: 'assistant', content: data.reply }
                    );
                    
                    // 只保留最近20轮
                    if (history.length > 40) {
                        history = history.slice(-40);
                    }
                } else {
                    showMessage('...连接中断。');
                }
            } catch (err) {
                showMessage('...错误：' + err.message);
            }
            
            isTyping = false;
            btn.disabled = false;
            setTimeout(() => setProgress(0), 500);
        }
        
        // 打字机效果
        async function typeWriter(text) {
            const dialogueText = document.getElementById('dialogueText');
            dialogueText.classList.remove('typing');
            dialogueText.textContent = '';
            
            for (let i = 0; i < text.length; i++) {
                dialogueText.textContent += text[i];
                await new Promise(r => setTimeout(r, 30));
            }
        }
        
        // 开场白动画
        window.onload = () => {
            const opening = "...你是谁？怎么突然出现在我的频道里。";
            document.getElementById('dialogueText').textContent = '';
            setTimeout(() => typeWriter(opening), 500);
        };
    </script>
</body>
</html>
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
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history,
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Kimi error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid Kimi response');
    }
    
    const reply = data.choices[0].message.content;
    
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
