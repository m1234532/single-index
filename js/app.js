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

function drawEmojiAvatar(canvas, typeCode) {
  const ctx = canvas.getContext('2d');
  const size = 140;
  canvas.width = size;
  canvas.height = size;
  const t = typeEmojis[typeCode] || typeEmojis.HRTI;
  const grad = ctx.createLinearGradient(0, 0, size, size);
  const colors = t.bg.match(/#[0-9A-Fa-f]{6}/g) || ['#007AFF', '#5856D6'];
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(1, colors[1]);
  ctx.fillStyle = grad;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(0, 0, size, size, 28);
  else { ctx.rect(0, 0, size, size); }
  ctx.fill();
  ctx.font = '80px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(t.emoji, size/2, size/2+4);
}

function drawDimRadar(canvas, dimScores) {
  const ctx = canvas.getContext('2d');
  const size = 160;
  canvas.width = size;
  canvas.height = size;
  
  const dims = [
    { name: 'social', label: '社交' },
    { name: 'filter', label: '滤镜' },
    { name: 'heartbeat', label: '心动' },
    { name: 'alone', label: '独处' }
  ];
  
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = 60;
  
  // Draw background circles
  ctx.strokeStyle = 'rgba(150,150,150,0.2)';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * i / 4, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  // Draw axes
  dims.forEach((_, i) => {
    const angle = (Math.PI * 2 * i / 4) - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
    ctx.stroke();
  });
  
  // Draw data polygon with animation
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  gradient.addColorStop(0, 'rgba(0,122,255,0.6)');
  gradient.addColorStop(1, 'rgba(88,86,214,0.3)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  
  dims.forEach((dim, i) => {
    const score = dimScores[dim.name].a / 4; // 0-1
    const angle = (Math.PI * 2 * i / 4) - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius * score;
    const y = centerY + Math.sin(angle) * radius * score;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fill();
  
  // Draw dots
  ctx.fillStyle = '#007AFF';
  dims.forEach((dim, i) => {
    const score = dimScores[dim.name].a / 4;
    const angle = (Math.PI * 2 * i / 4) - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius * score;
    const y = centerY + Math.sin(angle) * radius * score;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
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
    const avatarCanvas=ref(null);
    const radarCanvas=ref(null);
    const confettiCanvas=ref(null);
    const loadingProgress=ref(0);
    const loadingText=ref('正在初始化...');
    const hasRecord=ref(false);
    const savedRecord=ref(null);
    const showResult=ref(false);

    const loadingSteps=[
      {p:15,t:'加载题目数据...'},
      {p:35,t:'初始化分析引擎...'},
      {p:55,t:'加载Emoji资源...'},
      {p:75,t:'准备结果图谱...'},
      {p:90,t:'即将完成...'},
      {p:100,t:'点击开始'}
    ];

    watch(()=>phase.value,(val)=>{
      if(val==='result' && avatarCanvas.value && result.value){
        nextTick(()=>{
          drawEmojiAvatar(avatarCanvas.value,result.value.type);
          if(radarCanvas.value) {
            setTimeout(()=>{
              drawDimRadar(radarCanvas.value,result.value.dimScores);
            },500);
          }
          setTimeout(()=>{
            showResult.value = true;
          },800);
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
              if(avatarCanvas.value) drawEmojiAvatar(avatarCanvas.value,result.value.type);
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
      avatarCanvas,radarCanvas,confettiCanvas,loadingProgress,loadingText,hasRecord,
      startQuiz,continueQuiz,selectOpt,goBack,retry,toggleTheme,showResult};
  }
});

app.mount('#app');
