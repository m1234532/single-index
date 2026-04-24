/**
 * 单身狗基因测序 - 结果页渲染器 v6.0
 * 基因检测证书风格 + SVG雷达图 + 动态主题
 */

// ==================== SVG雷达图生成器 ====================
const RadarChart = {
  // 生成雷达图SVG
  generate(dimScores, theme) {
    const size = 280;
    const center = size / 2;
    const radius = 100;
    const levels = 5;
    
    // 安全检查 dimScores
    const scores = dimScores || {};
    
    // 维度标签和角度
    const dims = [
      { key: 'social', label: '社交', angle: -Math.PI / 2 },
      { key: 'filter', label: '择偶', angle: -Math.PI / 2 + Math.PI * 2 / 4 },
      { key: 'heart', label: '心动', angle: -Math.PI / 2 + Math.PI * 2 / 4 * 2 },
      { key: 'alone', label: '独处', angle: -Math.PI / 2 + Math.PI * 2 / 4 * 3 }
    ];
    
    // 计算得分点坐标
    const points = dims.map((dim, i) => {
      const score = typeof scores[dim.key] === 'number' ? scores[dim.key] : 50;
      const safeScore = Math.max(0, Math.min(100, score)); // 限制在0-100范围内
      const r = (safeScore / 100) * radius;
      const x = center + r * Math.cos(dim.angle);
      const y = center + r * Math.sin(dim.angle);
      return { x: x.toFixed(1), y: y.toFixed(1), score: safeScore, ...dim };
    });
    
    // 生成网格线
    let gridLines = '';
    for (let i = 1; i <= levels; i++) {
      const r = (radius / levels) * i;
      const polygonPoints = dims.map(dim => {
        const x = center + r * Math.cos(dim.angle);
        const y = center + r * Math.sin(dim.angle);
        return `${x},${y}`;
      }).join(' ');
      gridLines += `<polygon points="${polygonPoints}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`;
    }
    
    // 生成轴线
    let axes = '';
    dims.forEach(dim => {
      const x = center + radius * Math.cos(dim.angle);
      const y = center + radius * Math.sin(dim.angle);
      axes += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>`;
    });
    
    // 生成数据区域
    const dataPoints = points.map(p => `${p.x},${p.y}`).join(' ');
    const primaryColor = theme.colors.primary[0];
    
    // 生成标签
    let labels = '';
    points.forEach(p => {
      const labelR = radius + 25;
      const lx = center + labelR * Math.cos(p.angle);
      const ly = center + labelR * Math.sin(p.angle);
      labels += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" 
        fill="${theme.colors.text}" font-size="13" font-weight="600">${p.label}</text>
        <text x="${lx}" y="${ly + 14}" text-anchor="middle" dominant-baseline="middle" 
        fill="${theme.colors.accent}" font-size="11" font-weight="700">${Math.round(p.score)}%</text>`;
    });
    
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="overflow: visible;">
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:0.4" />
            <stop offset="100%" style="stop-color:${primaryColor};stop-opacity:0.1" />
          </radialGradient>
        </defs>
        ${gridLines}
        ${axes}
        <polygon points="${dataPoints}" fill="url(#radarGradient)" stroke="${primaryColor}" stroke-width="2.5"/>
        ${points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="5" fill="${theme.colors.accent}" stroke="white" stroke-width="2"/>`).join('')}
        ${labels}
      </svg>
    `;
  }
};

// ==================== 证书装饰元素 ====================
const CertificateDecorations = {
  // 生成证书边框SVG
  border(width, height, color) {
    const padding = 20;
    const w = width - padding * 2;
    const h = height - padding * 2;
    const corner = 30;
    
    return `
      <svg width="${width}" height="${height}" style="position: absolute; top: 0; left: 0; pointer-events: none;">
        <defs>
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
            <stop offset="50%" style="stop-color:${color};stop-opacity:0.4" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
          </linearGradient>
        </defs>
        <!-- 外边框 -->
        <rect x="${padding}" y="${padding}" width="${w}" height="${h}" rx="${corner}" 
          fill="none" stroke="url(#borderGradient)" stroke-width="2"/>
        <!-- 装饰角 -->
        <path d="M${padding + corner},${padding} L${padding + 8},${padding} L${padding},${padding + 8} L${padding},${padding + corner}" 
          fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <path d="M${width - padding - corner},${padding} L${width - padding - 8},${padding} L${width - padding},${padding + 8} L${width - padding},${padding + corner}" 
          fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <path d="M${padding + corner},${height - padding} L${padding + 8},${height - padding} L${padding},${height - padding - 8} L${padding},${height - padding - corner}" 
          fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <path d="M${width - padding - corner},${height - padding} L${width - padding - 8},${height - padding} L${width - padding},${height - padding - 8} L${width - padding},${height - padding - corner}" 
          fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
  },
  
  // 生成印章SVG
  seal(text, color) {
    return `
      <svg width="80" height="80" viewBox="0 0 80 80" style="filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));">
        <defs>
          <radialGradient id="sealGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="36" fill="url(#sealGradient)" stroke="white" stroke-width="2"/>
        <circle cx="40" cy="40" r="28" fill="none" stroke="white" stroke-width="1.5"/>
        <text x="40" y="38" text-anchor="middle" fill="white" font-size="11" font-weight="700">${text}</text>
        <text x="40" y="52" text-anchor="middle" fill="white" font-size="8">认证</text>
      </svg>
    `;
  },
  
  // 生成DNA装饰线
  dnaLine(width, color) {
    const segments = 20;
    const segmentWidth = width / segments;
    let path = '';
    
    for (let i = 0; i < segments; i++) {
      const x = i * segmentWidth;
      const y1 = Math.sin(i * 0.5) * 3;
      const y2 = Math.sin(i * 0.5 + Math.PI) * 3;
      path += `M${x},${10 + y1} L${x + segmentWidth},${10 + y1} `;
      path += `M${x},${10 + y2} L${x + segmentWidth},${10 + y2} `;
    }
    
    return `
      <svg width="${width}" height="20" style="opacity: 0.5;">
        <path d="${path}" fill="none" stroke="${color}" stroke-width="1.5"/>
      </svg>
    `;
  }
};

// ==================== 分享卡生成器 ====================
const ShareCardGenerator = {
  // 生成分享卡HTML（用于html2canvas）
  generate(result, theme) {
    const { type, name, dims, index, quote, visual } = result;
    const dimText = dims ? dims.join(' · ') : '';
    
    return `
      <div id="share-card" style="
        width: 375px;
        height: 667px;
        background: ${theme.colors.bg};
        padding: 40px 30px;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        position: relative;
        overflow: hidden;
      ">
        <!-- 装饰背景 -->
        <div style="
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: ${theme.colors.primary[0]}20;
          border-radius: 50%;
          filter: blur(60px);
        "></div>
        <div style="
          position: absolute;
          bottom: -80px;
          left: -80px;
          width: 250px;
          height: 250px;
          background: ${theme.colors.secondary[0]}20;
          border-radius: 50%;
          filter: blur(50px);
        "></div>
        
        <!-- 头部 -->
        <div style="text-align: center; position: relative; z-index: 1;">
          <div style="
            font-size: 14px;
            color: ${theme.colors.textMuted};
            letter-spacing: 4px;
            margin-bottom: 8px;
          ">GENE LAB</div>
          <div style="
            font-size: 32px;
            font-weight: 800;
            background: linear-gradient(135deg, ${theme.colors.primary[0]}, ${theme.colors.secondary[0]});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          ">${type}</div>
        </div>
        
        <!-- 主内容 -->
        <div style="
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 30px;
          margin-top: 24px;
          position: relative;
          z-index: 1;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        ">
          <!-- Emoji和名称 -->
          <div style="text-align: center;">
            <div style="font-size: 72px; margin-bottom: 12px;">${visual?.emoji || '🔬'}</div>
            <div style="
              font-size: 24px;
              font-weight: 700;
              color: ${theme.colors.text};
              margin-bottom: 4px;
            ">${name}</div>
            <div style="
              font-size: 13px;
              color: ${theme.colors.textMuted};
            ">${dimText}</div>
          </div>
          
          <!-- 单身指数 -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            margin-top: 24px;
            padding: 20px;
            background: linear-gradient(135deg, ${theme.colors.primary[0]}15, ${theme.colors.secondary[0]}15);
            border-radius: 16px;
          ">
            <div>
              <div style="
                font-size: 42px;
                font-weight: 800;
                background: linear-gradient(135deg, ${theme.colors.primary[0]}, ${theme.colors.secondary[0]});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                line-height: 1;
              ">${index}%</div>
              <div style="
                font-size: 12px;
                color: ${theme.colors.textMuted};
                margin-top: 4px;
              ">单身指数</div>
            </div>
          </div>
          
          <!-- 引言 -->
          <div style="
            margin-top: 20px;
            padding: 16px;
            background: ${theme.colors.accent}10;
            border-radius: 12px;
            border-left: 3px solid ${theme.colors.accent};
          ">
            <div style="
              font-size: 15px;
              color: ${theme.colors.text};
              line-height: 1.6;
              font-style: italic;
            ">"${quote}"</div>
          </div>
        </div>
        
        <!-- 底部 -->
        <div style="
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
          text-align: center;
          z-index: 1;
        ">
          <div style="
            font-size: 13px;
            color: ${theme.colors.textMuted};
            margin-bottom: 12px;
          ">扫码测测你的单身基因</div>
          <div style="
            width: 80px;
            height: 80px;
            background: white;
            border-radius: 12px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          ">
            <div style="font-size: 40px;">📱</div>
          </div>
        </div>
      </div>
    `;
  }
};

// ==================== 结果页模板 ====================
const ResultTemplates = {
  // 生成完整结果页HTML
  render(result, theme) {
    const { type, name, dims, index, quote, desc, tips, avoid, tags, dimScores } = result;
    const radarSvg = RadarChart.generate(dimScores || {}, theme);
    const borderSvg = CertificateDecorations.border(340, 200, theme.colors.accent);
    const sealSvg = CertificateDecorations.seal(type, theme.colors.accent);
    
    return `
      <div class="result-certificate" style="
        background: ${theme.colors.bg};
        min-height: 100vh;
        padding: 20px 16px 40px;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
      ">
        <!-- 证书头部 -->
        <div style="
          text-align: center;
          padding: 32px 24px;
          position: relative;
        ">
          ${borderSvg}
          <div style="
            font-size: 12px;
            color: ${theme.colors.textMuted};
            letter-spacing: 6px;
            margin-bottom: 12px;
            text-transform: uppercase;
          ">Single Dog Gene Lab</div>
          <div style="
            font-size: 42px;
            font-weight: 800;
            letter-spacing: 8px;
            background: linear-gradient(135deg, ${theme.colors.primary[0]}, ${theme.colors.secondary[0]});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          ">${type}</div>
          <div style="position: absolute; top: 20px; right: 20px;">${sealSvg}</div>
        </div>
        
        <!-- 主卡片 -->
        <div style="
          background: ${theme.colors.card};
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 28px;
          margin: 0 8px 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border: 1px solid rgba(255,255,255,0.3);
        ">
          <!-- 人格名称 -->
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 64px; margin-bottom: 8px;">${result.visual?.emoji || '🔬'}</div>
            <div style="
              font-size: 28px;
              font-weight: 800;
              color: ${theme.colors.text};
              margin-bottom: 6px;
            ">${name}</div>
            <div style="
              font-size: 14px;
              color: ${theme.colors.textMuted};
            ">${dims ? dims.join(' · ') : ''}</div>
          </div>
          
          <!-- 单身指数 -->
          <div style="
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
          ">
            <div style="
              flex: 1;
              background: linear-gradient(135deg, ${theme.colors.primary[0]}20, ${theme.colors.secondary[0]}20);
              border-radius: 16px;
              padding: 20px;
              text-align: center;
              border: 1px solid rgba(255,255,255,0.2);
            ">
              <div style="
                font-size: 36px;
                font-weight: 800;
                background: linear-gradient(135deg, ${theme.colors.primary[0]}, ${theme.colors.secondary[0]});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              ">${index}%</div>
              <div style="
                font-size: 13px;
                color: ${theme.colors.textMuted};
                margin-top: 4px;
              ">单身指数</div>
            </div>
            <div style="
              flex: 1;
              background: ${theme.colors.accent}15;
              border-radius: 16px;
              padding: 20px;
              text-align: center;
              border: 1px solid rgba(255,255,255,0.2);
            ">
              <div style="
                font-size: 14px;
                color: ${theme.colors.text};
                line-height: 1.5;
                font-weight: 500;
              ">${theme.mood}</div>
              <div style="
                font-size: 12px;
                color: ${theme.colors.textMuted};
                margin-top: 4px;
              ">性格特征</div>
            </div>
          </div>
          
          <!-- 雷达图 -->
          <div style="
            background: rgba(0,0,0,0.2);
            border-radius: 20px;
            padding: 20px;
            text-align: center;
            margin-bottom: 20px;
          ">
            <div style="
              font-size: 16px;
              font-weight: 700;
              color: ${theme.colors.text};
              margin-bottom: 16px;
            ">基因四维图谱</div>
            ${radarSvg}
          </div>
          
          <!-- 引言 -->
          <div style="
            padding: 20px;
            background: ${theme.colors.accent}10;
            border-radius: 16px;
            border-left: 4px solid ${theme.colors.accent};
          ">
            <div style="
              font-size: 16px;
              color: ${theme.colors.text};
              line-height: 1.7;
              font-style: italic;
              font-weight: 500;
            ">"${quote}"</div>
          </div>
        </div>
        
        <!-- 详细解析 -->
        ${desc ? `
        <div style="
          background: ${theme.colors.card};
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 24px;
          margin: 0 8px 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        ">
          <div style="
            font-size: 18px;
            font-weight: 700;
            color: ${theme.colors.text};
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          ">
            <span>📋</span> 详细解析
          </div>
          <div style="
            font-size: 15px;
            color: ${theme.colors.text2 || theme.colors.textMuted};
            line-height: 1.8;
          ">${desc.replace(/\n/g, '<br>')}</div>
        </div>
        ` : ''}
        
        <!-- 行动建议 -->
        ${tips && tips.length ? `
        <div style="
          background: ${theme.colors.card};
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 24px;
          margin: 0 8px 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        ">
          <div style="
            font-size: 18px;
            font-weight: 700;
            color: ${theme.colors.text};
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          ">
            <span>💡</span> 行动建议
          </div>
          <ul style="
            margin: 0;
            padding-left: 20px;
            font-size: 15px;
            color: ${theme.colors.text2 || theme.colors.textMuted};
            line-height: 2;
          ">
            ${tips.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        
        <!-- 避坑指南 -->
        ${avoid && avoid.length ? `
        <div style="
          background: ${theme.colors.card};
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 24px;
          margin: 0 8px 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        ">
          <div style="
            font-size: 18px;
            font-weight: 700;
            color: ${theme.colors.text};
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          ">
            <span>⚠️</span> 避坑指南
          </div>
          <ul style="
            margin: 0;
            padding-left: 20px;
            font-size: 15px;
            color: ${theme.colors.text2 || theme.colors.textMuted};
            line-height: 2;
          ">
            ${avoid.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        
        <!-- 标签 -->
        ${tags && tags.length ? `
        <div style="
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0 8px 20px;
        ">
          ${tags.map(tag => `
            <span style="
              background: ${theme.colors.primary[0]}15;
              color: ${theme.colors.primary[0]};
              font-size: 13px;
              font-weight: 600;
              padding: 8px 16px;
              border-radius: 20px;
              border: 1px solid ${theme.colors.primary[0]}30;
            ">${tag}</span>
          `).join('')}
        </div>
        ` : ''}
        
        <!-- 按钮区 -->
        <div style="padding: 0 8px;">
          <button onclick="generateShareCard()" style="
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, ${theme.colors.primary[0]}, ${theme.colors.secondary[0]});
            color: white;
            font-size: 17px;
            font-weight: 700;
            border: none;
            border-radius: 16px;
            cursor: pointer;
            box-shadow: 0 8px 24px ${theme.colors.primary[0]}40;
            margin-bottom: 12px;
          ">📸 生成分享卡</button>
          <button onclick="retakeTest()" style="
            width: 100%;
            padding: 18px;
            background: ${theme.colors.card};
            color: ${theme.colors.text};
            font-size: 17px;
            font-weight: 600;
            border: 2px solid ${theme.colors.accent}40;
            border-radius: 16px;
            cursor: pointer;
          ">🔄 重新测试</button>
        </div>
        
        <!-- 底部版权 -->
        <div style="
          text-align: center;
          padding: 24px 0;
          font-size: 12px;
          color: ${theme.colors.textMuted};
        ">
          Single Dog Gene Lab © 2025
        </div>
      </div>
    `;
  }
};

// ==================== 导出 ====================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RadarChart,
    CertificateDecorations,
    ShareCardGenerator,
    ResultTemplates
  };
}
