/**
 * 打工人体质检测 - 数据文件
 * 基于四大社会学理论：
 * 1. 内卷指数 - 布迪厄场域理论（资本争夺）
 * 2. 摸鱼天赋 - 斯科特"弱者的武器"
 * 3. 表演人格 - 戈夫曼拟剧论（前台/后台）
 * 4. 异化程度 - 马克思异化理论
 */

// ==================== 题目库 ====================
const QUESTION_BANK = [
  // 维度1：内卷指数（资本争夺度）
  {
    id: 1,
    dimension: 'neijuan',
    text: '同事加班到很晚，你会怎么做？',
    options: [
      { text: '比他更晚走，展现工作态度', score: 3 },
      { text: '正常下班，但会焦虑', score: 2 },
      { text: '到点就走，不关心', score: 1 }
    ]
  },
  {
    id: 2,
    dimension: 'neijuan',
    text: '领导在群里表扬了别人的业绩，你的反应是？',
    options: [
      { text: '立刻研究对方做法，制定超越计划', score: 3 },
      { text: '默默记下，有点压力', score: 2 },
      { text: '划过去，继续摸鱼', score: 1 }
    ]
  },
  {
    id: 3,
    dimension: 'neijuan',
    text: '公司推出绩效考核排名，你的态度？',
    options: [
      { text: '全力冲刺，必须拿第一', score: 3 },
      { text: '努力保持中上游', score: 2 },
      { text: '无所谓，反正不垫底就行', score: 1 }
    ]
  },
  {
    id: 4,
    dimension: 'neijuan',
    text: '你如何看待职场竞争？',
    options: [
      { text: '竞争激发潜能，我喜欢挑战', score: 3 },
      { text: '有压力，但不得不参与', score: 2 },
      { text: '都是被迫的，谁爱卷谁卷', score: 1 }
    ]
  },

  // 维度2：摸鱼天赋（抵抗策略）
  {
    id: 5,
    dimension: 'moyu',
    text: '工作时间内，你有多常做私事？',
    options: [
      { text: '几乎不，专注工作', score: 1 },
      { text: '偶尔刷刷手机', score: 2 },
      { text: '老板不在 = 我的时间', score: 3 }
    ]
  },
  {
    id: 6,
    dimension: 'moyu',
    text: '你如何应对不必要的会议？',
    options: [
      { text: '认真参与，可能有收获', score: 1 },
      { text: '带着电脑假装记笔记', score: 2 },
      { text: '全程神游或做别的事', score: 3 }
    ]
  },
  {
    id: 7,
    dimension: 'moyu',
    text: '工作完成后距离下班还有1小时，你会？',
    options: [
      { text: '主动找新任务做', score: 1 },
      { text: '检查一遍工作，摸会儿鱼', score: 2 },
      { text: '立刻进入休闲模式', score: 3 }
    ]
  },
  {
    id: 8,
    dimension: 'moyu',
    text: '你有多少个"假装工作"的技巧？',
    options: [
      { text: '不需要，我一直真忙', score: 1 },
      { text: '会一两招应急', score: 2 },
      { text: '十八般武艺样样精通', score: 3 }
    ]
  },

  // 维度3：表演人格（拟剧管理）
  {
    id: 9,
    dimension: 'biaoyan',
    text: '在领导面前，你会刻意表现吗？',
    options: [
      { text: '完全不会，就做真实的自己', score: 1 },
      { text: '会稍微注意言行', score: 2 },
      { text: '进入演员模式，最佳状态', score: 3 }
    ]
  },
  {
    id: 10,
    dimension: 'biaoyan',
    text: '同事私下吐槽公司，你的反应？',
    options: [
      { text: '也跟着吐槽，释放压力', score: 1 },
      { text: '听听就好，不表态', score: 2 },
      { text: '假装附和，转头报告给领导', score: 3 }
    ]
  },
  {
    id: 11,
    dimension: 'biaoyan',
    text: '下班后的你和上班时差别大吗？',
    options: [
      { text: '基本一致，不做作', score: 1 },
      { text: '工作上会收敛一些', score: 2 },
      { text: '完全是两个人，精分现场', score: 3 }
    ]
  },
  {
    id: 12,
    dimension: 'biaoyan',
    text: '你如何看待"职场人设"？',
    options: [
      { text: '没必要，太累', score: 1 },
      { text: '适当维护，有利无害', score: 2 },
      { text: '精心打造，这是生存技能', score: 3 }
    ]
  },

  // 维度4：异化程度（意义感知）
  {
    id: 13,
    dimension: 'yihua',
    text: '你觉得现在的工作有意义吗？',
    options: [
      { text: '非常有意义，能实现价值', score: 1 },
      { text: '一般，主要是为了赚钱', score: 2 },
      { text: '毫无意义，纯纯工具人', score: 3 }
    ]
  },
  {
    id: 14,
    dimension: 'yihua',
    text: '工作成果被上级占功，你的感受？',
    options: [
      { text: '气愤但接受，职场常态', score: 2 },
      { text: '很受伤，觉得自己的价值被否定', score: 1 },
      { text: '无所谓，本来就不是我的', score: 3 }
    ]
  },
  {
    id: 15,
    dimension: 'yihua',
    text: '如果财务自由，你还会工作吗？',
    options: [
      { text: '会，工作是我的热情所在', score: 1 },
      { text: '可能找个轻松点的', score: 2 },
      { text: '立刻辞职，一秒都不多待', score: 3 }
    ]
  },
  {
    id: 16,
    dimension: 'yihua',
    text: '你如何形容自己与工作的关系？',
    options: [
      { text: '互相成就，共同成长', score: 1 },
      { text: '交易关系，各取所需', score: 2 },
      { text: '被剥削，被迫出卖劳动力', score: 3 }
    ]
  }
];

// ==================== 结果类型定义 ====================
// 四维度：内卷(N高/L低) 摸鱼(M高/Y低) 表演(B高/Y低) 异化(H高/D低)
const PERSONALITY_TYPES = {
  // NMBH - 卷王之王
  'NMBH': {
    name: '卷王之王',
    emoji: '🏆',
    subtitle: '工位是我家，老板是我妈',
    bg: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
    quote: '每天最早到公司，最晚离开。工资？不重要的，主要是热爱。',
    desc: '你是职场的永动机，资本家的梦中情员。\n你对竞争有着病态的追求，把加班当成勋章。\n但停下来想一想：你在为谁卷？\n\n布迪厄说你在争夺象征资本，\n但马克思看到你正在加速异化。',
    theory: '布迪厄场域理论：你正在疯狂积累"象征资本"——但这场游戏真的是你想要的吗？'
  },

  // NMBD - 精算型卷王
  'NMBD': {
    name: '精算型卷王',
    emoji: '📊',
    subtitle: '每一滴汗水都算得清回报',
    bg: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
    quote: '我不是卷，我是在 strategically positioning myself。',
    desc: '你深谙职场规则，每一分努力都指向明确目标。\n表演是为了晋升，内卷是为了跳槽资本。\n你是理性的职场投资者，\n从不做无用功。',
    theory: '理性选择理论：你是职场中的"理性经济人"，每个决策都经过成本收益分析。'
  },

  // NMYH - 矛盾型斗士
  'NMYH': {
    name: '矛盾型斗士',
    emoji: '⚔️',
    subtitle: '一边骂一边卷',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    quote: '我知道这没意义，但我停不下来。',
    desc: '你是职场最痛苦的一群人。\n清醒地知道自己在被剥削，\n却无力逃脱内卷的漩涡。\n每天都在自我厌恶中加班。',
    theory: '认知失调理论：你的行为与信念产生冲突，导致持续的心理不适。'
  },

  // NMYD - 事业型卷王
  'NMYD': {
    name: '事业型卷王',
    emoji: '🚀',
    subtitle: '真的相信努力会有回报',
    bg: 'linear-gradient(135deg, #f093fb, #f5576c)',
    quote: '趁年轻，多拼一点。',
    desc: '你还相信奋斗改变命运。\n不觉得被异化，因为你在"为自己打工"。\n你的热情是真实的，\n只是不知道能持续多久。',
    theory: '新教伦理与资本主义精神：你体现了韦伯所说的"天职观"——工作是神圣的召唤。'
  },

  // NYBH - 心机型躺平
  'NYBH': {
    name: '心机型躺平',
    emoji: '🎭',
    subtitle: '表面躺平，暗中观察',
    bg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    quote: '佛系是表，算计是里。',
    desc: '你是职场的老狐狸。\n表面上与世无争，\n实际上每一步都在布局。\n摸鱼是策略，表演是武器。',
    theory: '戈夫曼拟剧论：你是精密的"印象管理"大师，前台佛系后台算计。'
  },

  // NYBD - 明哲保身
  'NYBD': {
    name: '明哲保身',
    emoji: '🐢',
    subtitle: '缩在壳里看风云',
    bg: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    quote: '不求有功，但求无过。',
    desc: '你是职场的生存专家。\n不参与斗争，不承担责任，\n但也不被裁掉。\n在风暴中心找到了平静。',
    theory: '社会交换理论：你精确计算了投入产出比，选择了最低风险的生存策略。'
  },

  // NYYH - 犬儒主义者
  'NYYH': {
    name: '犬儒主义者',
    emoji: '🚬',
    subtitle: '看透一切，无所谓了',
    bg: 'linear-gradient(135deg, #fa709a, #fee140)',
    quote: '都是韭菜，谁比谁高贵。',
    desc: '你对职场规则了如指掌，\n也因此彻底失去了信念。\n摸鱼是反抗，也是自我保护。\n你已经不再相信任何宏大叙事。',
    theory: '犬儒主义：你经历了"认知启蒙"却未获得解放，陷入怀疑与虚无。'
  },

  // NYYD - 职场透明人
  'NYYD': {
    name: '职场透明人',
    emoji: '👻',
    subtitle: '存在感为0，但我很自在',
    bg: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    quote: '别找我，找就是不在。',
    desc: '你成功实现了职场隐身。\n不参与、不表现、不在乎，\n像办公室里的幽灵。\n好处是没人管你，\n坏处是升职加薪也没你。',
    theory: '社会原子化：你是高度个体化的存在，与组织保持着最大距离。'
  },

  // LMBH - 被迫营业
  'LMBH': {
    name: '被迫营业',
    emoji: '😰',
    subtitle: '想躺平，被环境推着卷',
    bg: 'linear-gradient(135deg, #ff9a9e, #fecfef)',
    quote: '我也不想演，但不演就会被淘汰。',
    desc: '你是环境的受害者。\n内心渴望简单工作，\n却被迫加入表演大赛。\n每天都在透支能量。',
    theory: '结构功能主义：个体被社会结构所塑造，你的"表演"是被制度逼出来的。'
  },

  // LMBD - 老实打工人
  'LMBD': {
    name: '老实打工人',
    emoji: '🐂',
    subtitle: '勤勤恳恳，安分守己',
    bg: 'linear-gradient(135deg, #d299c2, #fef9d7)',
    quote: '做好分内事，其他不多想。',
    desc: '你是职场的基石。\n不卷也不躺，不演也不藏，\n认真完成本职工作。\n在这个疯狂的时代，\n你的正常反而显得珍贵。',
    theory: '社会角色理论：你清晰认知并践行着自己的"职业角色"，是稳定的社会原子。'
  },

  // LMYH - 觉醒的韭菜
  'LMYH': {
    name: '觉醒的韭菜',
    emoji: '🌱',
    subtitle: '知道自己被割，但还抱有希望',
    bg: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
    quote: '我知道这没意义，但暂时没找到出路。',
    desc: '你已经意识到了异化的存在，\n只是还没找到反抗的方式。\n摸鱼是你无声的抗议，\n内心仍在寻找真正的出路。',
    theory: '阶级意识觉醒：你正处于从"自在阶级"向"自为阶级"转变的过程中。'
  },

  // LMYD - 职场理想主义者
  'LMYD': {
    name: '职场理想主义者',
    emoji: '✨',
    subtitle: '相信工作应该有意义',
    bg: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
    quote: '我想做有价值的事，而不是当螺丝钉。',
    desc: '你还保留着对工作的理想期待。\n不愿意参与无意义的内卷，\n也不愿意彻底躺平。\n在这个异化的世界里，\n你的坚持很珍贵，也很孤独。',
    theory: '人本主义：你拒绝将人工具化，坚持工作的内在价值而非仅看外在回报。'
  },

  // LYBH - 老好人
  'LYBH': {
    name: '职场老好人',
    emoji: '😊',
    subtitle: '和稀泥大师，谁也不得罪',
    bg: 'linear-gradient(135deg, #c1dfc4, #deecdd)',
    quote: '大家好才是真的好。',
    desc: '你是办公室的和事佬。\n不参与斗争，谁都不得罪，\n靠好人缘换取生存空间。\n但你的善意，\n在丛林法则中显得脆弱。',
    theory: '社会资本理论：你通过积累"关系资本"在组织中生存，而非依赖正式权力。'
  },

  // LYBD - 本分打工人
  'LYBD': {
    name: '本分打工人',
    emoji: '📋',
    subtitle: '该做的做，不该问的不问',
    bg: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
    quote: '拿多少钱，办多少事。',
    desc: '你有清晰的边界感。\n工作是工作，生活是生活，\n不在工作中寻找意义，\n也不在工作中表演人格。\n你是理性且健康的。',
    theory: '劳动契约论：你将工作视为纯粹的契约关系，实现了理性祛魅。'
  },

  // LYYH - 佛系摸鱼王
  'LYYH': {
    name: '佛系摸鱼王',
    emoji: '🧘',
    subtitle: '万物皆空，工资到账就行',
    bg: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
    quote: '放下执念，享受当下。',
    desc: '你达到了职场的大自在境界。\n不追求晋升，不在意评价，\n工作只是换取生活资金的手段。\n你在精神上已经提前退休。',
    theory: '斯多葛主义：你区分了可控与不可控之事，选择在可控范围内追求内心平静。'
  },

  // LYYD - 职场道家
  'LYYD': {
    name: '职场道家',
    emoji: '☯️',
    subtitle: '无为而治，顺其自然',
    bg: 'linear-gradient(135deg, #e6b980, #eacda3)',
    quote: '夫唯不争，故天下莫能与之争。',
    desc: '你是职场中的隐士。\n不参与纷争，不刻意表现，\n但也不完全放弃。\n你在等待时机，\n或者只是享受当下的平静。',
    theory: '道家哲学：你实践着"无为"的智慧，以柔克刚，以退为进。'
  }
};

// ==================== 职场搭子匹配表 ====================
// 定义每种人格最适合的职场搭档（按匹配度排序）
const WORK_BUDDY_MATCHES = {
  // 卷系
  'NMBH': ['LYYD', 'LYYH', 'NYYD'],  // 卷王需要道家/佛系来平衡
  'NMBD': ['NYBH', 'LYBD', 'LMBD'],  // 精算型配心机/本分人
  'NMYH': ['LYYH', 'NYYH', 'LYYD'],  // 矛盾斗士需要佛系安抚
  'NMYD': ['LMBD', 'LYBD', 'LMYD'],  // 事业型配老实/理想主义者
  
  // 躺平系
  'NYBH': ['NMBD', 'LYBD', 'LMBD'],  // 心机躺平配精算/本分人
  'NYBD': ['LYBD', 'LMBD', 'LYYH'],  // 明哲保身配同类或佛系
  'NYYH': ['NMYH', 'LYYH', 'LYYD'],  // 犬儒配矛盾斗士或佛系
  'NYYD': ['NMBH', 'LYYH', 'LYYD'],  // 透明人配卷王（需要存在感）
  
  // 低卷系
  'LMBH': ['LYYH', 'LYYD', 'LMYD'],  // 被迫营业需要佛系/理想主义治愈
  'LMBD': ['NMYD', 'LYBD', 'NYBD'],  // 老实人配事业型/本分人
  'LMYH': ['LMYD', 'LYYH', 'LYYD'],  // 觉醒韭菜配理想主义/佛系
  'LMYD': ['LMYH', 'LMBD', 'LYBD'],  // 理想主义者配觉醒韭菜/老实人
  
  // 低卷躺平系
  'LYBH': ['LYBD', 'NYBD', 'LMBD'],  // 老好人配本分/明哲保身
  'LYBD': ['LYBH', 'LMBD', 'NYBD'],  // 本分人配老好人/明哲保身
  'LYYH': ['LYYD', 'NYYH', 'LMBH'],  // 佛系配道家/犬儒/被迫营业
  'LYYD': ['LYYH', 'NYYD', 'NMBH']   // 道家配佛系/透明人/卷王
};

// ==================== 核心计算函数 ====================
function calcResult(answers, questions) {
  // 计算四维度得分
  const scores = { neijuan: 0, moyu: 0, biaoyan: 0, yihua: 0 };
  const counts = { neijuan: 0, moyu: 0, biaoyan: 0, yihua: 0 };
  
  answers.forEach((ansIdx, qIdx) => {
    const q = questions[qIdx];
    if (q && ansIdx !== undefined) {
      const opt = q.options[ansIdx];
      if (opt) {
        scores[q.dimension] += opt.score;
        counts[q.dimension]++;
      }
    }
  });

  // 标准化到 0-100
  const normalize = (dim) => {
    const max = counts[dim] * 3;
    const min = counts[dim] * 1;
    if (max === min) return 50;
    return Math.round(((scores[dim] - min) / (max - min)) * 100);
  };

  const finalScores = {
    neijuan: normalize('neijuan'),
    moyu: normalize('moyu'),
    biaoyan: normalize('biaoyan'),
    yihua: normalize('yihua')
  };

  // 判档（50%为界）
  const getLevel = (score) => score >= 50 ? 'H' : 'L';
  const typeCode = 
    (finalScores.neijuan >= 50 ? 'N' : 'L') +
    (finalScores.moyu >= 50 ? 'M' : 'Y') +
    (finalScores.biaoyan >= 50 ? 'B' : 'Y') +
    (finalScores.yihua >= 50 ? 'H' : 'D');

  const typeData = PERSONALITY_TYPES[typeCode] || PERSONALITY_TYPES['LYBD'];

  return {
    type: typeCode,
    name: typeData.name,
    subtitle: typeData.subtitle,
    emoji: typeData.emoji,
    quote: typeData.quote,
    desc: typeData.desc,
    theory: typeData.theory,
    scores: finalScores,
    visual: {
      emoji: typeData.emoji,
      bg: typeData.bg
    }
  };
}
