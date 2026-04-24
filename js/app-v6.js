/**
 * 单身狗基因测序 - Vue App v6.0
 * 集成视觉系统 + 动态主题 + 证书式结果页
 */

// ==================== 全局状态 ====================
const AppState = {
  currentTheme: null,
  shareCardReady: false
};

// ==================== 主题管理器 ====================
const ThemeManager = {
  // 应用主题到DOM
  applyTheme(typeCode) {
    const theme = VISUAL_SYSTEM.getTheme(typeCode);
    AppState.currentTheme = theme;
    
    // 创建CSS变量
    const root = document.documentElement;
    root.style.setProperty('--v6-bg', theme.colors.bg);
    root.style.setProperty('--v6-card', theme.colors.card);
    root.style.setProperty('--v6-text', theme.colors.text);
    root.style.setProperty('--v6-text-muted', theme.colors.textMuted);
    root.style.setProperty('--v6-accent', theme.colors.accent);
    root.style.setProperty('--v6-primary', theme.colors.primary[0]);
    root.style.setProperty('--v6-secondary', theme.colors.secondary[0]);
    
    // 应用到body背景
    document.body.style.background = theme.colors.bg;
    document.body.style.color = theme.colors.text;
    
    return theme;
  },
  
  // 重置为默认主题
  resetTheme() {
    document.body.style.background = '';
    document.body.style.color = '';
  }
};

// ==================== 结果页渲染器（Vue方法） ====================
const ResultRenderer = {
  // 渲染证书式结果页
  renderCertificate(result) {
    if (!result || !result.type) return '';
    
    const theme = ThemeManager.applyTheme(result.type);
    const { RadarChart, CertificateDecorations } = window.RendererModules || {};
    
    // 如果没有加载渲染器模块，使用简化版
    if (!RadarChart) {
      return this.renderSimpleResult(result, theme);
    }
    
    const radarSvg = RadarChart.generate(result.dimScores || {}, theme);
    const sealSvg = CertificateDecorations.seal(result.type, theme.colors.accent);
    
    return `
      <div class="result-certificate-v6">
        <div class="cert-header">
          <div class="cert-label">Single Dog Gene Lab</div>
          <div class="cert-code">${result.type}</div>
          <div class="cert-seal">${sealSvg}</div>
        </div>
        
        <div class="cert-main-card">
          <div class="cert-identity">
            <div class="cert-emoji">${result.visual?.emoji || '🔬'}</div>
            <div class="cert-name">${result.name}</div>
            <div class="cert-dims">${result.dims ? result.dims.join(' · ') : ''}</div>
          </div>
          
          <div class="cert-stats">
            <div class="stat-box primary">
              <div class="stat-num">${result.index}%</div>
              <div class="stat-label">单身指数</div>
            </div>
            <div class="stat-box secondary">
              <div class="stat-desc">${theme.mood}</div>
              <div class="stat-label">性格特征</div>
            </div>
          </div>
          
          <div class="cert-radar">
            <div class="radar-title">基因四维图谱</div>
            ${radarSvg}
          </div>
          
          <div class="cert-quote">
            "${result.quote}"
          </div>
        </div>
        
        ${result.desc ? `
        <div class="cert-section">
          <h3><span>📋</span> 详细解析</h3>
          <p>${result.desc.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}
        
        ${result.tips && result.tips.length ? `
        <div class="cert-section">
          <h3><span>💡</span> 行动建议</h3>
          <ul>${result.tips.map(t => `<li>${t}</li>`).join('')}</ul>
        </div>
        ` : ''}
        
        ${result.avoid && result.avoid.length ? `
        <div class="cert-section">
          <h3><span>⚠️</span> 避坑指南</h3>
          <ul>${result.avoid.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>
        ` : ''}
        
        ${result.tags && result.tags.length ? `
        <div class="cert-tags">
          ${result.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        ` : ''}
        
        <div class="cert-actions">
          <button class="btn-primary" onclick="app.generateShareCard()">📸 生成分享卡</button>
          <button class="btn-secondary" onclick="app.retakeTest()">🔄 重新测试</button>
        </div>
        
        <div class="cert-footer">Single Dog Gene Lab © 2025</div>
      </div>
    `;
  },
  
  // 简化版结果（备用）
  renderSimpleResult(result, theme) {
    return `
      <div class="result-certificate-v6" style="background: ${theme.colors.bg}; padding: 20px;">
        <div style="text-align: center; padding: 30px;">
          <div style="font-size: 48px; font-weight: 800; color: ${theme.colors.primary[0]};">${result.type}</div>
          <div style="font-size: 64px; margin: 20px 0;">${result.visual?.emoji || '🔬'}</div>
          <div style="font-size: 28px; font-weight: 700; color: ${theme.colors.text};">${result.name}</div>
          <div style="font-size: 48px; font-weight: 800; margin: 20px 0; color: ${theme.colors.accent};">${result.index}%</div>
          <div style="font-size: 16px; color: ${theme.colors.textMuted}; font-style: italic; padding: 20px; background: ${theme.colors.card}; border-radius: 16px; margin: 20px 0;">"${result.quote}"</div>
        </div>
        <button onclick="app.retakeTest()" style="width: 100%; padding: 18px; background: ${theme.colors.primary[0]}; color: white; border: none; border-radius: 16px; font-size: 17px; font-weight: 700; cursor: pointer;">重新测试</button>
      </div>
    `;
  }
};

// ==================== 分享卡生成器 ====================
const ShareCard = {
  // 生成并下载分享卡
  async generate(result) {
    const theme = AppState.currentTheme || VISUAL_SYSTEM.getTheme(result.type);
    
    // 创建临时容器
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 375px;
      height: 667px;
      z-index: -1;
    `;
    
    // 生成分享卡HTML
    container.innerHTML = `
      <div style="
        width: 375px;
        height: 667px;
        background: ${theme.colors.bg};
        padding: 40px 30px;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        position: relative;
        overflow: hidden;
      ">
        <!-- 背景装饰 -->
        <div style="
          position: absolute;
          top: -80px;
          right: -80px;
          width: 250px;
          height: 250px;
          background: ${theme.colors.primary[0]}25;
          border-radius: 50%;
          filter: blur(50px);
        "></div>
        <div style="
          position: absolute;
          bottom: -60px;
          left: -60px;
          width: 200px;
          height: 200px;
          background: ${theme.colors.secondary[0]}20;
          border-radius: 50%;
          filter: blur(40px);
        "></div>
        
        <!-- 头部 -->
        <div style="text-align: center; position: relative; z-index: 1;">
          <div style="font-size: 13px; color: ${theme.colors.textMuted}; letter-spacing: 3px; margin-bottom: 8px;">GENE LAB</div>
          <div style="font-size: 36px; font-weight: 800; background: linear-gradient(135deg, ${theme.colors.primary[0]}, ${theme.colors.secondary[0]}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${result.type}</div>
        </div>
        
        <!-- 主卡片 -->
        <div style="
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 28px;
          margin-top: 20px;
          position: relative;
          z-index: 1;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        ">
          <div style="text-align: center;">
            <div style="font-size: 72px; margin-bottom: 8px;">${result.visual?.emoji || '🔬'}</div>
            <div style="font-size: 24px; font-weight: 700; color: ${theme.colors.text}; margin-bottom: 4px;">${result.name}</div>
            <div style="font-size: 13px; color: ${theme.colors.textMuted};">${result.dims ? result.dims.join(' · ') : ''}</div>
          </div>
          
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: 20px;
            padding: 16px;
            background: linear-gradient(135deg, ${theme.colors.primary[0]}12, ${theme.colors.secondary[0]}12);
            border-radius: 16px;
          ">
            <div style="font-size: 40px; font-weight: 800; background: linear-gradient(135deg, ${theme.colors.primary[0]}, ${theme.colors.secondary[0]}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1;">${result.index}%</div>
            <div style="font-size: 12px; color: ${theme.colors.textMuted};">单身指数</div>
          </div>
          
          <div style="
            margin-top: 16px;
            padding: 14px;
            background: ${theme.colors.accent}08;
            border-radius: 12px;
            border-left: 3px solid ${theme.colors.accent};
          ">
            <div style="font-size: 14px; color: ${theme.colors.text}; line-height: 1.6; font-style: italic;">"${result.quote}"</div>
          </div>
        </div>
        
        <!-- 底部 -->
        <div style="position: absolute; bottom: 30px; left: 30px; right: 30px; text-align: center; z-index: 1;">
          <div style="font-size: 12px; color: ${theme.colors.textMuted}; margin-bottom: 12px;">扫码测测你的单身基因</div>
          <div style="width: 70px; height: 70px; background: white; border-radius: 12px; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.1); font-size: 36px;">📱</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
    
    // 使用html2canvas截图（如果可用）
    if (typeof html2canvas !== 'undefined') {
      try {
        const canvas = await html2canvas(container.firstElementChild, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null
        });
        
        // 下载图片
        const link = document.createElement('a');
        link.download = `单身基因报告_${result.type}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        alert('分享卡已生成并下载！');
      } catch (err) {
        console.error('生成分享卡失败:', err);
        alert('生成分享卡失败，请截图保存结果页');
      }
    } else {
      // 如果没有html2canvas，提示用户截图
      alert('请长按结果页截图保存！');
    }
    
    document.body.removeChild(container);
  }
};

// ==================== 导出 ====================
window.AppV6 = {
  State: AppState,
  ThemeManager,
  ResultRenderer,
  ShareCard,
  VISUAL_SYSTEM
};
