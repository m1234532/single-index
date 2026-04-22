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
    const answers=ref([]);
    const result=ref(null);

    const isDark=ref(false);
    const confettiCanvas=ref(null);
    const loadingProgress=ref(0);
    const loadingText=ref('正在初始化...');
    const hasRecord=ref(false);
    const savedRecord=ref(null);
    const showChangelog=ref(false);

    const loadingSteps=[
      {p:15,t:'加载题目数据...'},
      {p:35,t:'随机抽取题目...'},
      {p:55,t:'初始化分析引擎...'},
      {p:75,t:'准备结果图谱...'},
      {p:90,t:'即将完成...'},
      {p:100,t:'点击开始'}
    ];

    watch(()=>phase.value,(val)=>{
      if(val==='result' && result.value){
        nextTick(()=>triggerConfetti());
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
      answers.value=new Array(questions.length).fill(null);
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

    const isTransitioning=ref(false);

    const selectOpt=(i)=>{
      if(isTransitioning.value) return;
      answers.value[currentQ.value]=i;
      if(currentQ.value < questions.length - 1){
        isTransitioning.value=true;
        setTimeout(()=>{currentQ.value++;isTransitioning.value=false;},300);
      } else {
        isTransitioning.value=true;
        setTimeout(()=>{
          phase.value='analysis';
          setTimeout(()=>{
            try {
              result.value=calcResult(answers.value);
              if(!result.value || !result.value.type) {
                // 兜底：如果计算失败，生成一个默认结果
                result.value={
                  name:'神秘型单身者',
                  subtitle:'数据异常 · 使用默认结果',
                  index:50,
                  type:'MMMM',
                  desc:'数据计算出现异常，请重新测试。',
                  quote:'无论结果如何，你都是独一无二的存在。',
                  tips:['重新开始测试','刷新页面重试'],
                  avoid:[],
                  tags:[],
                  dims:[],
                  dimScores:{social:{a:2,b:2},filter:{a:2,b:2},heartbeat:{a:2,b:2},alone:{a:2,b:2}}
                };
              }
              saveRecord(answers.value, result.value);
            } catch(e) {
              console.error('calcResult error:', e);
              result.value={
                name:'神秘型单身者',
                subtitle:'计算出错 · 请重新测试',
                index:50,
                type:'MMMM',
                desc:'结果计算出错，请重新测试。',
                quote:'没关系，再试一次吧。',
                tips:['重新开始测试'],
                avoid:[],
                tags:[],
                dims:[],
                dimScores:{social:{a:2,b:2},filter:{a:2,b:2},heartbeat:{a:2,b:2},alone:{a:2,b:2}}
              };
            }
            phase.value='result';
            isTransitioning.value=false;
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

    return{phase,currentQ,answers,result,isDark,questions,dimNames,analysisSteps,typeEmojis,
      confettiCanvas,loadingProgress,loadingText,hasRecord,showChangelog,
      startQuiz,continueQuiz,selectOpt,goBack,retry,toggleTheme};
  }
});

app.mount('#app');
