/**
 * 单身狗基因测序 - 视觉设计系统 v6.0
 * 36种人格类型 × 专属配色方案
 * 设计理念：每种人格都有独特的"基因色彩"
 */

// ==================== 色彩理论基础 ====================
// 社交维度：决定主色调温度
//   A(活跃) → 暖色系 (红橙黄)
//   V(中立) → 中性系 (蓝紫青)
//   R(保守) → 冷色系 (青绿蓝)
//
// 择偶维度：决定色彩饱和度
//   P(完美) → 高饱和 (鲜明、纯粹)
//   F(中立) → 中饱和 (平衡、温和)
//   O(开放) → 低饱和 (柔和、随性)
//
// 心动维度：决定明度
//   S(敏感) → 高明度 (明亮、通透)
//   C(冷静) → 低明度 (沉稳、深邃)
//
// 独处维度：决定辅助色
//   I(独立) → 对比色 (强烈、鲜明)
//   D(依赖) → 邻近色 (和谐、统一)

const VISUAL_SYSTEM = {
  // ==================== 基础色板 ====================
  basePalette: {
    // 暖色系 - 活跃型
    warm: {
      primary: ['#FF6B6B', '#FF8E53', '#FF6B9D', '#FFA07A'],
      secondary: ['#FFE66D', '#FFD93D', '#FFC857', '#FFB347'],
      accent: ['#FF4757', '#FF6348', '#FF7675', '#FF9F43']
    },
    // 中性系 - 平衡型
    neutral: {
      primary: ['#A29BFE', '#6C5CE7', '#74B9FF', '#0984E3'],
      secondary: ['#FD79A8', '#E84393', '#FDCB6E', '#F39C12'],
      accent: ['#00B894', '#00CEC9', '#55EFC4', '#81ECEC']
    },
    // 冷色系 - 保守型
    cool: {
      primary: ['#74B9FF', '#0984E3', '#00CEC9', '#81ECEC'],
      secondary: ['#A29BFE', '#6C5CE7', '#BADC58', '#6AB04C'],
      accent: ['#30336B', '#130F40', '#535C68', '#95A5A6']
    }
  },

  // ==================== 36种人格配色方案 ====================
  // 格式：typeCode -> { name, theme, colors, emoji, description }
  personalityThemes: {
    // ===== 活跃-完美 系列 (APSx/APCx) =====
    'APSI': {
      name: '极光猎人',
      tagline: '在完美中寻找灵魂的共鸣',
      theme: 'aurora',
      colors: {
        primary: ['#00D9FF', '#00FFB3', '#0099FF'],
        secondary: ['#FF6B9D', '#C084FC'],
        bg: 'linear-gradient(135deg, #0A1628 0%, #1A3A52 50%, #0D2137 100%)',
        card: 'rgba(255,255,255,0.08)',
        text: '#E8F4F8',
        textMuted: '#8BA3B8',
        accent: '#00FFD1'
      },
      emoji: '🌌',
      mood: '神秘、浪漫、理想主义'
    },
    'APSD': {
      name: '温室花朵',
      tagline: '渴望被呵护的完美主义者',
      theme: 'greenhouse',
      colors: {
        primary: ['#FFB8D0', '#FFD6E8', '#FF9EB5'],
        secondary: ['#98D8C8', '#7FCDCD'],
        bg: 'linear-gradient(180deg, #FFF5F7 0%, #E8F5E9 100%)',
        card: 'rgba(255,255,255,0.9)',
        text: '#4A4A4A',
        textMuted: '#888888',
        accent: '#FF8FAB'
      },
      emoji: '🌸',
      mood: '温柔、细腻、需要安全感'
    },
    'APCI': {
      name: '理性诗人',
      tagline: '用逻辑编织浪漫的梦',
      theme: 'poet',
      colors: {
        primary: ['#667EEA', '#764BA2', '#6B8DD6'],
        secondary: ['#F093FB', '#F5576C'],
        bg: 'linear-gradient(135deg, #1A1F3C 0%, #2D3561 100%)',
        card: 'rgba(102,126,234,0.15)',
        text: '#E0E6F1',
        textMuted: '#8B92B4',
        accent: '#A78BFA'
      },
      emoji: '📜',
      mood: '理性、内敛、深沉'
    },
    'APCD': {
      name: '傲娇公主',
      tagline: '嘴上独立，心里渴望陪伴',
      theme: 'princess',
      colors: {
        primary: ['#FA709A', '#FEE140', '#FF9A9E'],
        secondary: ['#FECFEF', '#FFF5F7'],
        bg: 'linear-gradient(135deg, #FFF5F7 0%, #FFECF1 50%, #FFF0F3 100%)',
        card: 'rgba(255,255,255,0.95)',
        text: '#5D4E6D',
        textMuted: '#9B8AA5',
        accent: '#FA709A'
      },
      emoji: '👑',
      mood: '傲娇、可爱、口是心非'
    },

    // ===== 活跃-开放 系列 (AOSx/AOCx) =====
    'AOSI': {
      name: '自由灵魂',
      tagline: '不被定义，不受束缚',
      theme: 'free',
      colors: {
        primary: ['#F093FB', '#F5576C', '#FF6B6B'],
        secondary: ['#4ECDC4', '#44A3AA'],
        bg: 'linear-gradient(135deg, #2D1B4E 0%, #1A0F2E 100%)',
        card: 'rgba(240,147,251,0.12)',
        text: '#F0E6F5',
        textMuted: '#B8A9C6',
        accent: '#FF6B9B'
      },
      emoji: '🦋',
      mood: '自由、洒脱、不羁'
    },
    'AOSD': {
      name: '快乐小狗',
      tagline: '永远热情，永远相信爱',
      theme: 'puppy',
      colors: {
        primary: ['#FFE66D', '#FF6B6B', '#4ECDC4'],
        secondary: ['#95E1D3', '#F38181'],
        bg: 'linear-gradient(180deg, #FFFBE6 0%, #FFF5F5 50%, #F0FFF4 100%)',
        card: 'rgba(255,255,255,0.95)',
        text: '#5D4E37',
        textMuted: '#8B7D6B',
        accent: '#FFD93D'
      },
      emoji: '🐕',
      mood: '热情、忠诚、活力满满'
    },
    'AOCI': {
      name: '独行侠客',
      tagline: '一个人也能活得精彩',
      theme: 'wanderer',
      colors: {
        primary: ['#667EEA', '#764BA2', '#6B8DD6'],
        secondary: ['#11998E', '#38EF7D'],
        bg: 'linear-gradient(135deg, #0F0C29 0%, #302B63 50%, #24243E 100%)',
        card: 'rgba(102,126,234,0.1)',
        text: '#D0D4F0',
        textMuted: '#8B92B4',
        accent: '#64FFDA'
      },
      emoji: '🗡️',
      mood: '独立、冷静、神秘'
    },
    'AOCD': {
      name: '社交蝴蝶',
      tagline: '人见人爱，花见花开',
      theme: 'butterfly',
      colors: {
        primary: ['#FA709A', '#FEE140', '#F093FB'],
        secondary: ['#FFECD2', '#FCB69F'],
        bg: 'linear-gradient(135deg, #FFF5F7 0%, #FFECD2 100%)',
        card: 'rgba(255,255,255,0.95)',
        text: '#6B4E71',
        textMuted: '#9B8AA5',
        accent: '#FF9A9E'
      },
      emoji: '🦋',
      mood: '活泼、讨喜、人缘好'
    },

    // ===== 中立-完美 系列 (VPSx/VPCx) =====
    'VPSI': {
      name: '月光骑士',
      tagline: '在寂静中守护内心的秩序',
      theme: 'moonlight',
      colors: {
        primary: ['#A8C0FF', '#3F2B96', '#6B8DD6'],
        secondary: ['#E0C3FC', '#8EC5FC'],
        bg: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
        card: 'rgba(168,192,255,0.1)',
        text: '#E0E8F0',
        textMuted: '#8BA3B8',
        accent: '#64FFDA'
      },
      emoji: '🌙',
      mood: '冷静、理性、优雅'
    },
    'VPSD': {
      name: '精致生活家',
      tagline: '生活需要仪式感',
      theme: 'lifestyle',
      colors: {
        primary: ['#E0C3FC', '#8EC5FC', '#C2E9FB'],
        secondary: ['#FAD0C4', '#FBC2EB'],
        bg: 'linear-gradient(180deg, #F8F0FF 0%, #E8F4F8 100%)',
        card: 'rgba(255,255,255,0.95)',
        text: '#4A5568',
        textMuted: '#718096',
        accent: '#9F7AEA'
      },
      emoji: '☕',
      mood: '精致、品味、讲究'
    },
    'VPCI': {
      name: '冰山智者',
      tagline: '表面冷静，内心深邃',
      theme: 'iceberg',
      colors: {
        primary: ['#00C9FF', '#92FE9D', '#00D9FF'],
        secondary: ['#A8EDEA', '#FED6E3'],
        bg: 'linear-gradient(135deg, #0A1628 0%, #1A3A52 100%)',
        card: 'rgba(0,201,255,0.08)',
        text: '#E0F7FA',
        textMuted: '#80DEEA',
        accent: '#00E5FF'
      },
      emoji: '🧊',
      mood: '冷静、智慧、深不可测'
    },
    'VPCD': {
      name: '温柔守护',
      tagline: '用行动默默守护在乎的人',
      theme: 'guardian',
      colors: {
        primary: ['#A8E6CF', '#DCEDC1', '#FFD3B6'],
        secondary: ['#FFAAA5', '#FF8B94'],
        bg: 'linear-gradient(180deg, #F1F8E9 0%, #FFF3E0 100%)',
        card: 'rgba(255,255,255,0.95)',
        text: '#5D4037',
        textMuted: '#8D6E63',
        accent: '#81C784'
      },
      emoji: '🛡️',
      mood: '温柔、可靠、默默付出'
    },

    // ===== 中立-开放 系列 (VOSx/VOCx) =====
    'VOSI': {
      name: '星际旅人',
      tagline: '在浩瀚宇宙中寻找同类',
      theme: 'stellar',
      colors: {
        primary: ['#5E60CE', '#5390D9', '#48BFE3'],
        secondary: ['#64DFDF', '#72EFDD'],
        bg: 'linear-gradient(135deg, #0B0F19 0%, #1A1F3C 50%, #0D1B2A 100%)',
        card: 'rgba(94,96,206,0.12)',
        text: '#E0E6F1',
        textMuted: '#8B92B4',
        accent: '#64FFDA'
      },
      emoji: '🚀',
      mood: '探索、好奇、孤独'
    },
    'VOSD': {
      name: '邻家伙伴',
      tagline: '简单真诚，温暖贴心',
      theme: 'neighbor',
      colors: {
        primary: ['#FFB7B2', '#FFDAC1', '#E2F0CB'],
        secondary: ['#B5EAD7', '#C7CEEA'],
        bg: 'linear-gradient(180deg, #FFF8F0 0%, #F0FFF4 100%)',
        card: 'rgba(255,255,255,0.95)',
        text: '#5D4E37',
        textMuted: '#8B7D6B',
        accent: '#FFB7B2'
      },
      emoji: '🏠',
      mood: '亲切、随和、好相处'
    },
    'VOCI': {
      name: '隐形观察者',
      tagline: '静静观察，默默理解',
      theme: 'observer',
      colors: {
        primary: ['#667EEA', '#764BA2', '#6C5CE7'],
        secondary: ['#A29BFE', '#74B9FF'],
        bg: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
        card: 'rgba(102,126,234,0.1)',
        text: '#D0D4F0',
        textMuted: '#8B92B4',
        accent: '#A29BFE'
      },
      emoji: '👁️',
      mood: '安静、敏锐、洞察'
    },
    'VOCD': {
      name: '治愈系暖阳',
      tagline: '用温暖照亮身边的人',
      theme: 'sunshine',
      colors: {
        primary: ['#FFE66D', '#FFD93D', '#FF6B6B'],
        secondary: ['#95E1D3', '#F38181'],
        bg: 'linear-gradient(180deg, #FFFBE6 0%, #FFF5F5 100%)',
        card: 'rgba(255,255,255,0.95)',
        text: '#5D4E37',
        textMuted: '#8B7D6B',
        accent: '#FFD93D'
      },
      emoji: '☀️',
      mood: '温暖、治愈、正能量'
    },

    // ===== 保守-完美 系列 (RPSx/RPCx) =====
    'RPSI': {
      name: '古堡隐士',
      tagline: '在孤独中构建完美的精神世界',
      theme: 'castle',
      colors: {
        primary: ['#434343', '#000000', '#2C3E50'],
        secondary: ['#8E44AD', '#9B59B6'],
        bg: 'linear-gradient(135deg, #0C0C0C 0%, #1A1A2E 50%, #16213E 100%)',
        card: 'rgba(67,67,67,0.3)',
        text: '#E0E0E0',
        textMuted: '#808080',
        accent: '#9B59B6'
      },
      emoji: '🏰',
      mood: '神秘、孤傲、深邃'
    },
    'RPSD': {
      name: '乖巧学生',
      tagline: '听话懂事，渴望被认可',
      theme: 'student',
      colors: {
        primary: ['#E8D5B7', '#D4C4A8', '#C9B896'],
        secondary: ['#A8D8EA', '#AA96DA'],
        bg: 'linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 100%)',
        card: 'rgba(255,255,255,0.95)',
        text: '#5D4E37',
        textMuted: '#8B7355',
        accent: '#D4C4A8'
      },
      emoji: '📚',
      mood: '乖巧、认真、需要肯定'
    },
    'RPCI': {
      name: '冰山分析师',
      tagline: '用数据和逻辑理解爱情',
      theme: 'analyst',
      colors: {
        primary: ['#2C3E50', '#34495E', '#1A252F'],
        secondary: ['#3498DB', '#2980B9'],
        bg: 'linear-gradient(135deg, #0A0E17 0%, #1A1F2E 100%)',
        card: 'rgba(44,62,80,0.4)',
        text: '#BDC3C7',
        textMuted: '#7F8C8D',
        accent: '#3498DB'
      },
      emoji: '📊',
      mood: '理性、冷静、分析型'
    },
    'RPCD': {
      name: '贴心管家',
      tagline: '默默打理好一切',
      theme: 'butler',
      colors: {
        primary: ['#8B7355', '#A0826D', '#BCAAA4'],
        secondary: ['#D7CCC8', '#EFEBE9'],
        bg: 'linear-gradient(180deg, #EFEBE9 0%, #D7CCC8 100%)',
        card: 'rgba(255,255,255,0.95)',
        text: '#4E342E',
        textMuted: '#6D4C41',
        accent: '#8D6E63'
      },
      emoji: '🎩',
      mood: '可靠、细心、周到'
    },

    // ===== 保守-开放 系列 (ROSx/ROCx) =====
    'ROSI': {
      name: '独狼骑士',
      tagline: '独自前行，不求理解',
      theme: 'lone',
      colors: {
        primary: ['#2C3E50', '#1A252F', '#0F1519'],
        secondary: ['#7F8C8D', '#95A5A6'],
        bg: 'linear-gradient(135deg, #000000 0%, #1A1A2E 100%)',
        card: 'rgba(44,62,80,0.3)',
        text: '#ECF0F1',
        textMuted: '#7F8C8D',
        accent: '#95A5A6'
      },
      emoji: '🐺',
      mood: '孤傲、独立、强大'
    },
    'ROSD': {
      name: '慢热树懒',
      tagline: '需要时间，但值得等待',
      theme: 'sloth',
      colors: {
        primary: ['#A8E6CF', '#DCEDC1', '#FFD3B6'],
        secondary: ['#C5E99B', '#F6F4D2'],
        bg: 'linear-gradient(180deg, #F1F8E9 0%, #FFF8E1 100%)',
        card: 'rgba(255,255,255,0.95)',
        text: '#5D4037',
        textMuted: '#8D6E63',
        accent: '#A5D6A7'
      },
      emoji: '🦥',
      mood: '慢热、温和、长情'
    },
    'ROCI': {
      name: '深山道士',
      tagline: '远离尘嚣，修身养性',
      theme: 'taoist',
      colors: {
        primary: ['#5D4037', '#4E342E', '#3E2723'],
        secondary: ['#8D6E63', '#A1887F'],
        bg: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
        card: 'rgba(93,64,55,0.2)',
        text: '#D7CCC8',
        textMuted: '#BCAAA4',
        accent: '#A1887F'
      },
      emoji: '☯️',
      mood: '超脱、淡然、智慧'
    },
    'ROCD': {
      name: '佛系青年',
      tagline: '随缘不强求',
      theme: 'buddhist',
      colors: {
        primary: ['#BCAAA4', '#A1887F', '#8D6E63'],
        secondary: ['#D7CCC8', '#EFEBE9'],
        bg: 'linear-gradient(180deg, #EFEBE9 0%, #D7CCC8 100%)',
        card: 'rgba(255,255,255,0.95)',
        text: '#4E342E',
        textMuted: '#6D4C41',
        accent: '#A1887F'
      },
      emoji: '🧘',
      mood: '平和、随性、不执着'
    },

    // ===== 默认值（兼容旧数据） =====
    'default': {
      name: '神秘基因',
      tagline: '你的单身密码等待解锁',
      theme: 'default',
      colors: {
        primary: ['#FF6B9D', '#C084FC', '#60A5FA'],
        secondary: ['#FFB8D0', '#E9D5FF'],
        bg: 'linear-gradient(135deg, #FFE4EC 0%, #F3E8FF 50%, #E0F2FE 100%)',
        card: 'rgba(255,255,255,0.9)',
        text: '#1F2937',
        textMuted: '#6B7280',
        accent: '#FF6B9D'
      },
      emoji: '🔬',
      mood: '神秘、等待探索'
    }
  },

  // ==================== 辅助函数 ====================
  
  // 根据人格类型码获取配色方案
  getTheme(typeCode) {
    return this.personalityThemes[typeCode] || this.personalityThemes['default'];
  },

  // 根据分数范围生成渐变色
  generateGradient(score) {
    if (score >= 80) return 'linear-gradient(135deg, #FF6B6B, #FF8E53)';
    if (score >= 60) return 'linear-gradient(135deg, #F093FB, #F5576C)';
    if (score >= 40) return 'linear-gradient(135deg, #4ECDC4, #44A3AA)';
    return 'linear-gradient(135deg, #74B9FF, #0984E3)';
  },

  // 获取动画配置
  getAnimations() {
    return {
      pageTransition: {
        enter: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        leave: 'all 0.3s cubic-bezier(0.4, 0, 1, 1)'
      },
      cardHover: {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      },
      float: {
        animation: 'float 4s ease-in-out infinite'
      },
      pulse: {
        animation: 'pulse 2s ease-in-out infinite'
      }
    };
  },

  // 玻璃态效果配置
  getGlassEffect(opacity = 0.1, blur = 20) {
    return {
      background: `rgba(255,255,255,${opacity})`,
      backdropFilter: `blur(${blur}px)`,
      border: '1px solid rgba(255,255,255,0.3)',
      boxShadow: `0 8px 32px rgba(0,0,0,${opacity * 2})`
    };
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VISUAL_SYSTEM;
}
