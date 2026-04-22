const {createApp,ref,computed,watch,nextTick,onMounted}=Vue;

const STORAGE_KEY = 'single_index_record';

function saveRecord(answersArr, resultData) {
  const record = {
    answers: answersArr,
    result: resultData,
    savedAt: Date.now()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

function loadRecord() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch(e) {
    return null;
  }
}

function generateRadarSVG(dimScores) {
  const dims = [
    { name: 'social', label: '社交' },
    { name: 'filter', label: '滤镜' },
    { name: 'heartbeat', label: '心动' },
    { name: 'alone', label: '独处' }
  ];
  
  const size = 200;
  const center = size / 2;
  const maxRadius = 70;
  
  // Calculate points
  const dataPoints = dims.map((dim, i) => {
    const score = (dimScores[dim.name]?.a || 0) / 4;
    const angle = (Math.PI * 2 * i / 4) - Math.PI / 2;
    return {
      x: center + Math.cos(angle) * maxRadius * score,
      y: center + Math.sin(angle) * maxRadius * score,
      labelX: center + Math.cos(angle) * (maxRadius + 25),
      labelY: center + Math.sin(angle) * (maxRadius + 25),
      label: dim.label,
      score: Math.round(score * 100) + '%'
    };
  });
  
  const polygonPoints = dataPoints.map(p => `${p.x},${p.y}`).join(' ');
  
  // Background circles
  const circles = [];
  for (let i = 1; i <= 4; i++) {
    circles.push(`<circle cx="${center}" cy="${center}" r="${maxRadius * i / 4}" fill="none" stroke="#e0e0e0" stroke-width="1"/>`);
  }
  
  // Axes
  const axes = dims.map((_, i) => {
    const angle = (Math.PI * 2 * i / 4) - Math.PI / 2;
    const x2 = center + Math.cos(angle) * maxRadius;
    const y2 = center + Math.sin(angle) * maxRadius;
    return `<line x1="${center}" y1="${center}" x2="${x2}" y2="${y2}" stroke="#e0e0e0" stroke-width="1"/>`;
  });
  
  return `
    <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="display:block;margin:0 auto;">
      ${circles.join('')}
      ${axes.join('')}
      <polygon points="${polygonPoints}" fill="rgba(0,122,255,0.3)" stroke="#007AFF" stroke-width="2"/>
      ${dataPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="5" fill="#007AFF"/>`).join('')}
      ${dataPoints.map(p => `
        <text x="${p.labelX}" y="${p.labelY}" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#333">
          ${p.label}:${p.score}
        </text>
      `).join('')}
    </svg>
  `;
}

function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = [];
  for(let i=0;i<120;i++){
    pieces.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height*0.5-50,
      vx:(Math.random()-0.5)*6,
      vy:Math.random()*4+2,
      color:['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#FF69B4','#FF9F43'][Math.floor(Math.random()*6)],
      size:Math.random()*8+4,
      rot:Math.random()*360,
      rotV:(Math.random()-0.5)*10,
    });
  }
  let frame=0;
  const animate=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.15; p.rot+=p.rotV;
      ctx.save();
      ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle=p.color;
      ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
      ctx.restore();
    });
    frame++;
    if(frame<120) requestAnimationFrame(animate);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  };
  animate();
}

const app=createApp({
  setup(){
    const phase=ref('splash');
    const currentQ=ref(0);
    const answers=ref(new Array(16).fill(null));
    const result=ref(null);
    const isDark=ref(false);
    const loadingProgress=ref(0);
    const loadingText=ref('正在初始化...');
    const hasRecord=ref(false);
    const savedRecord=ref(null);
    const showResult=ref(false);
    const radarHTML=ref('');

    const loadingSteps=[
      {p:15,t:'加载题目数据...'},
      {p:35,t:'初始化分析引擎...'},
      {p:55,t:'加载Emoji资源...'},
      {p:75,t:'准备结果图谱...'},
      {p:90,t:'即将完成...'},
      {p:100,t:'点击开始'}
    ];

    watch(()=>phase.value,(val)=>{
      if(val==='result' && result.value){
        nextTick(()=>{
          radarHTML.value = generateRadarSVG(result.value.dimScores);
          setTimeout(()=>{
            showResult.value = true;
          },300);
        });
      }
    });

    onMounted(()=>{
      let step=0;
      const interval=setInterval(()=>{
        if(step<loadingSteps.length){
          loadingProgress.value=loadingSteps[step].p;
          loadingText.value=loadingSteps[step].t;
          step++;
        } else {
          clearInterval(interval);
        }
      },200);
      
      const record = loadRecord();
      if (record) {
        hasRecord.value = true;
        savedRecord.value = record;
      }
    });

    const analysisSteps=computed(()=>[
      {icon:'🧬',label:'扫描社交基因序列…',bg:'rgba(255,107,53,.15)'},
      {icon:'🔍',label:'解码爱情滤镜参数…',bg:'rgba(253,121,168,.15)'},
      {icon:'💓',label:'测量心动阈值波动…',bg:'rgba(225,112,85,.15)'},
      {icon:'🔋',label:'检测独处电量指数…',bg:'rgba(0,184,148,.15)'},
    ]);

    const startQuiz=()=>{
      showResult.value = false;
      answers.value=new Array(16).fill(null);
      currentQ.value=0;
      phase.value='quiz';
    };

    const continueQuiz=()=>{
      if (savedRecord.value) {
        answers.value=[...savedRecord.value.answers];
        const firstUnanswered = answers.value.findIndex(a => a === null);
        currentQ.value=firstUnanswered >= 0 ? firstUnanswered : 0;
        phase.value='quiz';
      }
    };

    const selectOpt=(i)=>{
      answers.value[currentQ.value]=i;
      if(currentQ.value<15){
        setTimeout(()=>{currentQ.value++;},300);
      } else {
        setTimeout(()=>{
          phase.value='analysis';
          setTimeout(()=>{
            result.value=calcResult(answers.value);
            saveRecord(answers.value, result.value);
            phase.value='result';
            nextTick(()=>{
              triggerConfetti();
            });
          },3500);
        },300);
      }
    };

    const goBack=()=>{
      if(currentQ.value>0) currentQ.value--;
    };

    const retry=()=>{
      localStorage.removeItem(STORAGE_KEY);
      hasRecord.value=false;
      savedRecord.value=null;
      startQuiz();
    };

    const toggleTheme=()=>{
      isDark.value=!isDark.value;
      document.documentElement.setAttribute('data-theme',isDark.value?'dark':'light');
    };

    return{phase,currentQ,answers,result,isDark,questions,dimNames,analysisSteps,
      loadingProgress,loadingText,hasRecord,
      startQuiz,continueQuiz,selectOpt,goBack,retry,toggleTheme,showResult,radarHTML};
  }
});

app.mount('#app');
