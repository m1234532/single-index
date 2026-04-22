const {createApp,ref,computed,watch,nextTick,onMounted}=Vue;

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

function drawPosterEmoji(canvas, typeCode) {
  const ctx = canvas.getContext('2d');
  const size = 98;
  canvas.width = size;
  canvas.height = size;
  const t = typeEmojis[typeCode] || typeEmojis.HRTI;
  const grad = ctx.createLinearGradient(0, 0, size, size);
  const colors = t.bg.match(/#[0-9A-Fa-f]{6}/g) || ['#007AFF', '#5856D6'];
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(1, colors[1]);
  ctx.fillStyle = grad;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(0, 0, size, size, 20);
  else { ctx.rect(0, 0, size, size); }
  ctx.fill();
  ctx.font = '56px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(t.emoji, size/2, size/2+3);
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
    const posterCanvas=ref(null);
    const confettiCanvas=ref(null);
    const loadingProgress=ref(0);
    const loadingText=ref('正在初始化...');

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
        nextTick(()=>drawEmojiAvatar(avatarCanvas.value,result.value.type));
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
    });

    const analysisSteps=computed(()=>[
      {icon:'🧬',label:'扫描社交基因序列…',bg:'rgba(255,107,53,.15)'},
      {icon:'🔍',label:'解码爱情滤镜参数…',bg:'rgba(253,121,168,.15)'},
      {icon:'💓',label:'测量心动阈值波动…',bg:'rgba(225,112,85,.15)'},
      {icon:'🔋',label:'检测独处电量指数…',bg:'rgba(0,184,148,.15)'},
    ]);

    const startQuiz=()=>{
      answers.value=new Array(16).fill(null);
      currentQ.value=0;
      phase.value='quiz';
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
      startQuiz();
    };

    const generatePoster=async ()=>{
      phase.value='poster';
      await nextTick();
      if(posterCanvas.value && result.value) {
        const c=posterCanvas.value.getContext('2d');
        const W=332, H=440;
        c.clearRect(0,0,W,H);
        const typeColors={
          EPSC:['#FF6B6B','#FF69B4'],EPST:['#FF8C42','#FF4500'],EPSI:['#FFD700','#FFA500'],
          EPTI:['#FF4500','#FF0000'],ERSC:['#FF6347','#FF1493'],ERST:['#FF7F50','#FF8C00'],
          ERSI:['#FFA500','#FF4500'],ERTI:['#FFB347','#FFA500'],HPSC:['#9370DB','#BA55D3'],
          HPST:['#8A2BE2','#9932CC'],HPSI:['#BA55D3','#DA70D6'],HPTI:['#663399','#483D8B'],
          HRSC:['#6A5ACD','#7B68EE'],HRST:['#4682B4','#4169E1'],HRSI:['#5F9EA0','#20B2AA'],
          HRTI:['#2F4F4F','#2E8B57'],
        };
        const cols=typeColors[result.value.type]||['#007AFF','#5856D6'];
        const g2=c.createLinearGradient(0,0,W,300);
        g2.addColorStop(0,cols[0]); g2.addColorStop(1,cols[1]);
        c.fillStyle=g2;
        c.beginPath();
        c.roundRect(0,0,W,300,24);
        c.fill();
        c.fillStyle='#fff'; c.font='bold 14px -apple-system,BlinkMacSystemFont,sans-serif';
        c.textAlign='center'; c.fillText('你的单身指数',W/2,32);
        const tmpC = document.createElement('canvas');
        tmpC.width = 98; tmpC.height = 98;
        drawPosterEmoji(tmpC, result.value.type);
        c.drawImage(tmpC, W/2-55, 45, 110, 110);
                        c.fillStyle='#FFFFFF'; c.font='bold 13px -apple-system,BlinkMacSystemFont,sans-serif';
        c.fillText(result.value.type,W/2,178);
        c.fillStyle='#fff'; c.font='bold 22px -apple-system,BlinkMacSystemFont,sans-serif';
        c.fillText(result.value.name,W/2,204);
        c.font='bold 48px -apple-system,BlinkMacSystemFont,sans-serif';
        c.fillText(result.value.index+'%',W/2,262);
        c.font='14px -apple-system,BlinkMacSystemFont,sans-serif'; c.fillStyle='#fff';
        c.fillText('单身指数',W/2,282);
        c.fillStyle='rgba(255,255,255,.95)'; c.font='12px -apple-system,BlinkMacSystemFont,sans-serif';
        const q=result.value.quote.replace(/沈奕斐说：/g,'沈奕斐：');
        const lines=[];
        let line='';
        for(const ch of q){
          line+=ch;
          if(c.measureText(line).width>W-48){lines.push(line.slice(0,-1));line=ch;}
        } lines.push(line);
        lines.slice(0,3).forEach((l,i)=>c.fillText(l,W/2,318+i*18));
        const tagY=390;
        c.font='11px -apple-system,BlinkMacSystemFont,sans-serif';
        result.value.tags.forEach((t,i)=>{
          const tx=40+i*80;
          c.fillStyle='rgba(255,255,255,.2)';
          c.beginPath(); c.roundRect(tx,tagY,72,22,11); c.fill();
          c.fillStyle='#fff'; c.fillText(t,tx+36,tagY+15);
        });
      }
    };

    const downloadPoster=async ()=>{
      const el=document.getElementById('poster-target');
      if(!el||!window.html2canvas) return;
      try {
        const canvas=await html2canvas(el,{scale:2,useCORS:true,backgroundColor:null});
        const url=canvas.toDataURL('image/png');
        const a=document.createElement('a');
        a.download='你的单身指数_'+result.value.type+'.png';
        a.href=url; a.click();
      } catch(e){alert('生成失败，请重试');}
    };

    const toggleTheme=()=>{
      isDark.value=!isDark.value;
      document.documentElement.setAttribute('data-theme',isDark.value?'dark':'light');
    };

    return{phase,currentQ,answers,result,isDark,questions,dimNames,analysisSteps,
      avatarCanvas,posterCanvas,confettiCanvas,loadingProgress,loadingText,
      startQuiz,selectOpt,goBack,retry,generatePoster,downloadPoster,toggleTheme};
  }
});

app.mount('#app');