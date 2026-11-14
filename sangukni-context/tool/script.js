const HEROES = /*HEROES*/[];
const V9 = /*V9*/[];
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const fmt = (n,d=0) => Number.isFinite(n) ? n.toLocaleString('ko-KR',{maximumFractionDigits:d,minimumFractionDigits:d}) : '–';
const GRADES=['C','N','R','SR','SSR'];
const GRADE_MUL={SSR:1,SR:.75,R:.55,N:.42,C:.33};
const v9ById = Object.fromEntries(V9.map(h=>[h.id,h]));
const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// ---------- 조정값 ----------
const S = {
  lv100: 60,
  starMul: [1,1.25,1.55,1.9,2.35,3.0],
  starCap: [30,40,55,70,85,100],
  starCost: [1,1,2,3,4,5],
  eqBase: {C:2,N:4,R:7,SR:11,SSR:16},
  eqMaxEnh: 15,
  eqMatch: {R:3,SR:6,SSR:10},
  eqCostMul: 1,
  other: 1.12,
  potBand: {SSR:[100,76],SR:[74,60],R:[58,46],N:[44,37],C:[35,28]},
  frag: {boss:54, mileage:200, mileageEvery:4, event:100, eventEvery:1, rep:100, repMonth:2, pullsPerDay:8},
  rep: {killsPerHour:300, hoursPerDay:1.5},
  profile: [
    {d:1,  cur:{lv:18,star:0,g:'N',e:0},  prop:{lv:28,star:0,g:'C',e:2}},
    {d:7,  cur:{lv:27,star:1,g:'R',e:3},  prop:{lv:40,star:1,g:'R',e:5}},
    {d:30, cur:{lv:50,star:2,g:'SR',e:7}, prop:{lv:55,star:2,g:'SR',e:10}},
    {d:90, cur:{lv:100,star:3,g:'SSR',e:10}, prop:{lv:85,star:4,g:'SSR',e:15}},
  ],
};
try{ const saved=JSON.parse(localStorage.getItem('sg-studio')||'null'); if(saved&&saved.v===3) Object.assign(S,saved.s) }catch{}
const save=()=>{ try{localStorage.setItem('sg-studio',JSON.stringify({v:3,s:S}))}catch{} };

// ---------- 공식 ----------
const lvCur = lv => Math.max(1+0.0707*(lv-1), Math.pow(1.0724, lv-1));
const lvProp = lv => { const r=Math.pow(S.lv100,1/99); return Math.max(1+(S.lv100-1)/99*(lv-1)*0.5, Math.pow(r,lv-1)); };
const starCur = s => 1+0.07*s;
const starProp = s => S.starMul[s];
const eqCurPct = (g,e) => { const rank={N:1,R:2,SR:3,SSR:4}[g]||0; return rank*3*(1+0.1*e)*2; };
const eqPropPct = (g,e) => S.eqBase[g]*(1+0.1*e) + (S.eqMatch[g]||0);
const factorsCur = p => ({레벨:lvCur(p.lv), 승급:starCur(p.star), 장비:1+eqCurPct(p.g,p.e)/100, 진영:S.other});
const factorsProp = p => ({레벨:lvProp(p.lv), 승급:starProp(p.star), 장비:1+eqPropPct(p.g,p.e)/100, 진영:S.other});
function shares(f){ const ln=Object.fromEntries(Object.entries(f).map(([k,v])=>[k,Math.log(Math.max(v,1))])); const t=Object.values(ln).reduce((a,b)=>a+b,0)||1; return Object.fromEntries(Object.entries(ln).map(([k,v])=>[k,v/t*100])); }

// ---------- SVG 차트 (외부 라이브러리 없음) ----------
const NS='http://www.w3.org/2000/svg';
function svgEl(tag,attrs={},parent){ const e=document.createElementNS(NS,tag); for(const [k,v] of Object.entries(attrs)) e.setAttribute(k,v); if(parent) parent.appendChild(e); return e; }
function frame(id,h){ const box=document.getElementById(id); box.innerHTML=''; const w=Math.max(280,box.clientWidth||600); const svg=svgEl('svg',{viewBox:`0 0 ${w} ${h}`,width:'100%',height:h,role:'img'},box); return {svg,w,h}; }
function niceTicks(min,max,n=5){ const span=max-min||1, step0=span/n, mag=Math.pow(10,Math.floor(Math.log10(step0))), r=step0/mag, step=(r>5?10:r>2?5:r>1?2:1)*mag; const out=[]; for(let v=Math.ceil(min/step)*step; v<=max+1e-9; v+=step) out.push(+v.toFixed(10)); return out; }
function text(svg,x,y,s,opt={}){ const t=svgEl('text',{x,y,fill:opt.fill||css('--muted'),'font-size':opt.size||11,'text-anchor':opt.anchor||'middle','dominant-baseline':opt.base||'middle','font-family':css('--body'),'font-weight':opt.weight||400},svg); t.textContent=s; return t; }

function lineChart(id,{xs,series,logY=false,yFmt=v=>fmt(v),h=320,xEvery=10,yLabel=''}){
  const {svg,w}=frame(id,h), L=56,R=12,T=12,B=30, iw=w-L-R, ih=h-T-B;
  const vals=series.flatMap(s=>s.data.filter(v=>v!=null&&isFinite(v)&&(!logY||v>0)));
  let lo=Math.min(...vals), hi=Math.max(...vals); if(!logY){lo=Math.min(0,lo);} if(lo===hi){hi=lo+1}
  const f=logY?(v=>Math.log10(v)):(v=>v); const a=f(lo), b=f(hi);
  const X=i=>L+iw*(i/(xs.length-1)), Y=v=>T+ih*(1-(f(v)-a)/(b-a||1));
  const ticks=logY?(()=>{const t=[];for(let p=Math.floor(a);p<=Math.ceil(b);p++)[1,3].forEach(m=>{const v=m*Math.pow(10,p);if(v>=lo&&v<=hi)t.push(v)});return t})():niceTicks(lo,hi);
  ticks.forEach(v=>{ svgEl('line',{x1:L,x2:w-R,y1:Y(v),y2:Y(v),stroke:css('--line')},svg); text(svg,L-6,Y(v),yFmt(v),{anchor:'end'}); });
  xs.forEach((x,i)=>{ if(i%xEvery===0||i===xs.length-1) text(svg,X(i),h-12,x); });
  if(yLabel) text(svg,12,T+ih/2,yLabel,{anchor:'middle'}).setAttribute('transform',`rotate(-90 12 ${T+ih/2})`);
  for(const s of series){ let d=''; s.data.forEach((v,i)=>{ if(v==null||!isFinite(v)||(logY&&v<=0)){return} d+=(d&&s.data[i-1]!=null?'L':'M')+X(i).toFixed(1)+','+Y(v).toFixed(1); });
    if(s.fill){ const pts=s.data.map((v,i)=>[X(i),Y(v)]); svgEl('path',{d:`M${L},${T+ih} `+pts.map(p=>`L${p[0]},${p[1]}`).join(' ')+` L${X(xs.length-1)},${T+ih} Z`,fill:s.fill,opacity:.35},svg); }
    svgEl('path',{d,fill:'none',stroke:s.color,'stroke-width':s.width||1.6,'stroke-dasharray':s.dash||'','stroke-linejoin':'round'},svg);
    if(s.endLabel){ let li=s.data.length-1; while(li>0&&s.data[li]==null) li--; text(svg,Math.min(X(li)+4,w-R-2),Y(s.data[li]),s.endLabel,{anchor:'start',fill:s.color,size:10}); } }
}
function stackChart(id,{labels,stacks,h=300}){
  const {svg,w}=frame(id,h), L=40,R=8,T=10,B=28, iw=w-L-R, ih=h-T-B, bw=iw/labels.length*.58;
  [0,25,50,75,100].forEach(v=>{ const y=T+ih*(1-v/100); svgEl('line',{x1:L,x2:w-R,y1:y,y2:y,stroke:css('--line')},svg); text(svg,L-6,y,v+'%',{anchor:'end'}); });
  labels.forEach((lab,i)=>{ const cx=L+iw*(i+.5)/labels.length; let acc=0;
    stacks.forEach(s=>{ const v=s.data[i]; const y0=T+ih*(1-acc/100), y1=T+ih*(1-(acc+v)/100); const r=svgEl('rect',{x:cx-bw/2,y:y1,width:bw,height:Math.max(0,y0-y1),fill:s.color},svg); svgEl('title',{},r).textContent=`${s.label} ${fmt(v,1)}%`;
      if(v>=7) text(svg,cx,(y0+y1)/2,fmt(v,0)+'%',{fill:'#fff',size:10,weight:600}); acc+=v; });
    text(svg,cx,h-12,lab); });
}
function radarChart(id,{labels,values,color,h=300}){
  const {svg,w}=frame(id,h), cx=w/2, cy=h/2+4, r=Math.min(w,h)/2-34, n=labels.length, P=(i,k)=>[cx+r*k*Math.sin(2*Math.PI*i/n), cy-r*k*Math.cos(2*Math.PI*i/n)];
  [.25,.5,.75,1].forEach(k=>svgEl('polygon',{points:labels.map((_,i)=>P(i,k).join(',')).join(' '),fill:'none',stroke:css('--line')},svg));
  labels.forEach((lab,i)=>{ const [x,y]=P(i,1); svgEl('line',{x1:cx,y1:cy,x2:x,y2:y,stroke:css('--line')},svg); const [lx,ly]=P(i,1.16); text(svg,lx,ly,`${lab} ${fmt(values[i],0)}`,{fill:css('--ink'),size:11}); });
  svgEl('polygon',{points:values.map((v,i)=>P(i,Math.max(0,Math.min(1,v/100))).join(',')).join(' '),fill:color,'fill-opacity':.25,stroke:color,'stroke-width':2},svg);
}
function barChart(id,{labels,series,h=300}){
  const {svg,w}=frame(id,h), L=56,R=8,T=10,B=28, iw=w-L-R, ih=h-T-B; const max=Math.max(...series.flatMap(s=>s.data))*1.1||1;
  niceTicks(0,max).forEach(v=>{ const y=T+ih*(1-v/max); svgEl('line',{x1:L,x2:w-R,y1:y,y2:y,stroke:css('--line')},svg); text(svg,L-6,y,fmt(v),{anchor:'end'}); });
  const gw=iw/labels.length, bw=gw*.7/series.length;
  labels.forEach((lab,i)=>{ series.forEach((s,j)=>{ const v=s.data[i], x=L+gw*i+gw*.15+bw*j, y=T+ih*(1-v/max); const r=svgEl('rect',{x,y,width:bw-2,height:T+ih-y,fill:s.color},svg); svgEl('title',{},r).textContent=`${lab} ${s.label} ${fmt(v)}`; }); text(svg,L+gw*(i+.5),h-12,lab); });
}
const legend = items => items.map(([c,l,dash])=>`<span><i style="background:${c};${dash?'opacity:.6':''}"></i>${l}</span>`).join('');
const SEG = () => ({레벨:css('--r'), 승급:css('--accent'), 장비:css('--ssr'), 진영:css('--n')});

// ---------- 전투력 구성 ----------
function renderPower(){
  const seg=SEG(), keys=['레벨','승급','장비','진영'];
  const shC=S.profile.map(p=>shares(factorsCur(p.cur))), shP=S.profile.map(p=>shares(factorsProp(p.prop)));
  const labels=S.profile.map(p=>p.d+'일차');
  stackChart('cPowCur',{labels,stacks:keys.map(k=>({label:k,color:seg[k],data:shC.map(s=>s[k])}))});
  stackChart('cPowProp',{labels,stacks:keys.map(k=>({label:k,color:seg[k],data:shP.map(s=>s[k])}))});
  document.querySelectorAll('.powLegend').forEach(el=>el.innerHTML=legend(keys.map(k=>[seg[k],k])));
  const i30=S.profile.findIndex(p=>p.d===30), c30=S.profile[i30], tot=f=>Object.values(f).reduce((a,b)=>a*b,1);
  document.getElementById('powerKpis').innerHTML=[
    ['30일차 승급 비중 · 현재',fmt(shC[i30]['승급'],0)+'%'],['30일차 승급 비중 · 제안',fmt(shP[i30]['승급'],0)+'%'],
    ['30일차 총 배율 · 현재','×'+fmt(tot(factorsCur(c30.cur)),1)],['30일차 총 배율 · 제안','×'+fmt(tot(factorsProp(c30.prop)),1)],
  ].map(([a,b])=>`<div class="kpi"><b>${b}</b><span>${a}</span></div>`).join('');
  const t=document.getElementById('profileTbl');
  const sel=(v,arr,attr)=>`<select data-k="${attr}">${arr.map(g=>`<option${g===v?' selected':''}>${g}</option>`).join('')}</select>`;
  t.innerHTML=`<thead><tr><th class="l">시점</th><th>현재 Lv</th><th>현재 승급</th><th>현재 장비</th><th>강화</th><th>제안 Lv</th><th>제안 승급</th><th>제안 장비</th><th>강화</th><th class="l">상태</th></tr></thead><tbody>`+
   S.profile.map((p,i)=>{ const cap=S.starCap[p.prop.star], over=p.prop.lv>cap;
    return `<tr data-i="${i}"><td class="l">${p.d}일차</td>
    <td><input type="number" min="1" max="100" data-k="cur.lv" value="${p.cur.lv}"></td><td><input type="number" min="0" max="5" data-k="cur.star" value="${p.cur.star}"></td>
    <td>${sel(p.cur.g,['N','R','SR','SSR'],'cur.g')}</td><td><input type="number" min="0" max="10" data-k="cur.e" value="${p.cur.e}"></td>
    <td><input type="number" min="1" max="100" data-k="prop.lv" value="${p.prop.lv}"></td><td><input type="number" min="0" max="5" data-k="prop.star" value="${p.prop.star}"></td>
    <td>${sel(p.prop.g,GRADES,'prop.g')}</td><td><input type="number" min="0" max="${S.eqMaxEnh}" data-k="prop.e" value="${p.prop.e}"></td>
    <td class="l"><span class="status ${over?'s-bad':'s-ok'}">${over?`레벨이 상한 ${cap} 초과`:`상한 ${cap} 이내`}</span></td></tr>`}).join('')+'</tbody>';
  t.querySelectorAll('input,select').forEach(el=>el.addEventListener('change',e=>{ const i=+e.target.closest('tr').dataset.i,[a,b]=e.target.dataset.k.split('.'); S.profile[i][a][b]=e.target.tagName==='SELECT'?e.target.value:+e.target.value; save(); renderPower(); renderExport(); }));
  const target=[[1,60,25,10,5],[7,40,35,20,5],[30,30,40,25,5],[90,25,45,25,5]];
  document.getElementById('targetTbl').innerHTML=`<thead><tr><th class="l">시점</th><th>레벨</th><th>승급</th><th>장비</th><th>기타</th><th class="l">제안 구조의 승급 비중 (목표 대비)</th></tr></thead><tbody>`+
   target.map(r=>{ const i=S.profile.findIndex(p=>p.d===r[0]), got=i>=0?shP[i]['승급']:NaN, diff=got-r[2], cls=Math.abs(diff)<=5?'s-ok':Math.abs(diff)<=12?'s-warn':'s-bad';
     return `<tr><td class="l">${r[0]}일차</td><td>${r[1]}%</td><td>${r[2]}%</td><td>${r[3]}%</td><td>${r[4]}%</td><td class="l"><span class="status ${cls}">${fmt(got,0)}% (${diff>=0?'+':''}${fmt(diff,0)})</span></td></tr>` }).join('')+'</tbody>';
}

// ---------- 성장 곡선 ----------
const heroAtkCur=(h,lv,s)=>h.baseAtk*lvCur(lv)*starCur(s)*(h.id==='yeo'&&s===5?1.25:1);
const heroAtkProp=(h,lv,s)=>20*GRADE_MUL[h.rarity]*lvProp(lv)*starProp(s)*(h.id==='yeo'&&s===5?1.25:1);
function curveSeries(h,mode){ const lvs=Array.from({length:100},(_,i)=>i+1), out=[], acc=css('--accent'), cur=css('--cur');
  for(let s=0;s<=5;s++){
    if(mode!=='prop') out.push({data:lvs.map(l=>heroAtkCur(h,l,s)),color:cur,dash:'4 3',width:s===5?2.2:1,endLabel:s===5&&mode==='cur'?'★5':''});
    if(mode!=='cur') out.push({data:lvs.map(l=>l<=S.starCap[s]?heroAtkProp(h,l,s):null),color:acc,width:s===5?2.6:1.3,endLabel:'★'+s}); }
  return {lvs,out}; }
function renderCurve(){
  const sel=document.getElementById('curveHero');
  if(!sel.options.length){ const order=[...HEROES].sort((a,b)=>GRADES.indexOf(b.rarity)-GRADES.indexOf(a.rarity)||a.name.localeCompare(b.name,'ko'));
    sel.innerHTML=order.map(h=>`<option value="${h.id}">${esc(h.name)} · ${h.rarity}</option>`).join(''); sel.value='yeo'; sel.onchange=renderCurve; }
  document.getElementById('lv100').value=S.lv100; document.getElementById('lv100v').textContent='×'+S.lv100;
  const h=HEROES.find(x=>x.id===sel.value), mode=document.getElementById('curveMode').value, {lvs,out}=curveSeries(h,mode);
  lineChart('cCurve',{xs:lvs,series:out,logY:true,h:380,xEvery:10,yLabel:'공격력 (로그)'});
  document.getElementById('curveLegend').innerHTML=legend([[css('--cur'),'현재 (점선 ★0~★5)',1],[css('--accent'),'제안 (실선, 승급 상한에서 끝남)']]);
  const rows=[1,2,3,4,5].map(s=>{ const gC=starCur(s)/starCur(s-1), gP=starProp(s)/starProp(s-1);
    const lvEq=(g,fn,base)=>{ let l=base; while(l<100&&fn(l)/fn(base)<g) l++; return l-base; };
    return [s,gC,lvEq(gC,lvCur,50),gP,lvEq(gP,lvProp,Math.min(50,S.starCap[s-1]))]; });
  document.getElementById('starWorthTbl').innerHTML='<thead><tr><th class="l">승급</th><th>현재 배율 증가</th><th>현재: Lv50에서 레벨 환산</th><th>제안 배율 증가</th><th>제안: 레벨 환산</th></tr></thead><tbody>'+
    rows.map(r=>`<tr><td class="l">★${r[0]-1} → ★${r[0]}</td><td>×${fmt(r[1],3)}</td><td>${r[2]}레벨</td><td>×${fmt(r[3],3)}</td><td><b>${r[4]}레벨</b></td></tr>`).join('')+'</tbody>';
}
document.getElementById('lv100').addEventListener('input',e=>{S.lv100=+e.target.value;save();renderCurve();renderPower();renderExport();});
document.getElementById('curveMode').addEventListener('change',renderCurve);

// ---------- 포텐셜 ----------
// 1) 클래스별 '스킬 가치' 원값 → 2) 같은 등급·같은 클래스 1위 대비 비율 → 3) 등급 구간(SSR 100, SR 78, R 60, N 47, C 38)의 75~100%에 배치
function skillValue(h){ const e=h.est||{}, c=h.classKo;
  if(c==='탱커') return (e.survival||0)+0.5*(e.support||0)+0.15*(e.multi5||0)/5;
  if(c==='지원형') return (e.support||0)+(e.heal||0)+0.3*(e.survival||0);
  return 0.5*(e.single||0)+0.5*(e.multi5||0)/5; }
function potentials(){ if(!V9.length) return {}; const raw={}, best={}, axisMax={}, out={};
  for(const h of V9){ raw[h.id]=skillValue(h); const k=h.rarity+'|'+h.classKo; best[k]=Math.max(best[k]||0,raw[h.id]); }
  const axisRaw=h=>{ const e=h.est||{}; return {단일:e.single||0,광역:(e.multi5||0)/5,생존:e.survival||0,지원:e.support||0,회복:e.heal||0}; };
  for(const h of V9){ for(const [k,v] of Object.entries(axisRaw(h))){ const key=h.classKo+'|'+k; axisMax[key]=Math.max(axisMax[key]||0,v*GRADE_MUL[h.rarity]); } }
  // 포텐셜 = 설계 서열(v9 1장)을 등급 구간 안에 선형 배치. 스킬 수치는 검증용으로 따로 표시
  const byGrade={}; V9.forEach(h=>(byGrade[h.rarity]??=[]).push(h)); Object.values(byGrade).forEach(g=>g.sort((a,b)=>a.overallRank-b.overallRank));
  for(const [grade,list] of Object.entries(byGrade)){ const [hi,lo]=S.potBand[grade]; list.forEach((h,i)=>{ const score=list.length>1?hi-(hi-lo)*i/(list.length-1):hi;
    const a=axisRaw(h), axes=Object.fromEntries(Object.entries(a).map(([k,v])=>[k,axisMax[h.classKo+'|'+k]?v*GRADE_MUL[h.rarity]/axisMax[h.classKo+'|'+k]*100:0]));
    out[h.id]={score,raw:raw[h.id],skillPct:best[h.rarity+'|'+h.classKo]?raw[h.id]/best[h.rarity+'|'+h.classKo]*100:0,axes}; }); }
  return out; }
let POT={};
function renderHeroes(){
  POT=potentials();
  document.getElementById('heroLead').innerHTML = V9.length ? '<b>포텐셜(100점)</b>은 설계 서열(v9 1장)을 등급 구간에 그대로 펼친 값입니다: SSR 100~76, SR 74~60, R 58~46, N 44~37, C 35~28. 같은 등급 안에서는 서열이 높을수록 점수가 높습니다. <b>스킬 수치</b>는 v9 스킬 숫자로 계산한 값을 같은 등급·클래스 1위 대비 %로 보여줍니다. 시트 순위와 계산 순위가 다르면 설계 서열과 스킬 숫자가 어긋난다는 뜻이라 색으로 표시합니다. 스킬 수치는 추정치이고 조건부 효과·군중 제어는 빠져 있습니다.' : 'v9 데이터를 불러오지 못했습니다.';
  const cls=document.getElementById('fClass'); if(cls.options.length===1){ cls.innerHTML+=[...new Set(V9.map(h=>h.classKo))].map(c=>`<option>${c}</option>`).join(''); }
  const fg=document.getElementById('fGrade').value, ff=document.getElementById('fFaction').value, fc=cls.value, fs=document.getElementById('fSort').value;
  // 같은 등급·클래스 안에서 스킬 가치 순위
  const inRank={}; const groups={}; V9.forEach(h=>{(groups[h.rarity+'|'+h.classKo]??=[]).push(h)}); Object.values(groups).forEach(g=>g.sort((a,b)=>(POT[b.id]?.raw||0)-(POT[a.id]?.raw||0)).forEach((h,i)=>inRank[h.id]=i+1));
  let rows=HEROES.map(h=>({h,v:v9ById[h.id],p:POT[h.id]})).filter(r=>(!fg||r.h.rarity===fg)&&(!ff||(r.v?.faction||r.h.faction)===ff)&&(!fc||r.v?.classKo===fc));
  rows.sort((a,b)=> fs==='pot' ? (b.p?.score||0)-(a.p?.score||0) : (a.v?.overallRank||999)-(b.v?.overallRank||999));
  document.getElementById('heroTbl').innerHTML='<thead><tr><th>서열</th><th class="l">캐릭터</th><th class="l">등급</th><th class="l">진영</th><th class="l">클래스</th><th class="l">평타</th><th>포텐셜</th><th>스킬 수치</th><th>시트 순위</th><th>계산 순위</th><th class="l">특화</th></tr></thead><tbody>'+
    rows.map(r=>{ const sheet=r.v?.classRank, calc=inRank[r.h.id], st=sheet&&calc&&sheet!==calc?(Math.abs(sheet-calc)>=2?'s-bad':'s-warn'):'';
      return `<tr data-id="${r.h.id}" style="cursor:pointer"><td>${r.v?.overallRank??'–'}</td><td class="l">${esc(r.h.name)}</td><td class="l"><span class="pill g-${r.h.rarity}">${r.h.rarity}</span></td><td class="l">${esc(r.v?.faction||r.h.faction)}</td><td class="l">${esc(r.v?.classKo||r.h.role)}</td><td class="l">${esc(r.v?.basic||'–')}</td>
      <td><span class="potbar"><i style="width:${r.p?r.p.score:0}%"></i></span> ${r.p?fmt(r.p.score,0):'–'}</td><td>${r.p?fmt(r.p.skillPct,0)+'%':'–'}</td><td>${sheet??'–'}</td><td class="status ${st}">${calc??'–'}</td><td class="l">${(r.v?.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</td></tr>`}).join('')+'</tbody>';
  document.querySelectorAll('#heroTbl tbody tr').forEach(tr=>tr.addEventListener('click',()=>showHero(tr.dataset.id)));
  showHero(showHero.cur||'yeo');
}
function showHero(id){ showHero.cur=id; const h=HEROES.find(x=>x.id===id), v=v9ById[id], p=POT[id];
  document.getElementById('radarTitle').textContent=`포텐셜 구성 · ${h.name}${p?` (${fmt(p.score,0)}점)`:''}`;
  const labs=['단일','광역','생존','지원','회복'];
  radarChart('cRadar',{labels:labs,values:p?labs.map(k=>p.axes[k]):[0,0,0,0,0],color:css('--accent')});
  const {lvs,out}=curveSeries(h,'prop'); lineChart('cHeroCurve',{xs:lvs,series:out,logY:true,h:300,xEvery:10,yLabel:'공격력 (로그)'});
  document.getElementById('heroCurveTitle').textContent=`성장 곡선 · ${h.name} (제안 구조, ★0~★5)`;
  document.getElementById('skillBox').innerHTML = v ? `<p><b>0성</b> ${esc(v.s0)}</p><p><b>3성</b> ${esc(v.s3)}</p><p><b>5성</b> ${esc(v.s5)}</p>${v.life?`<p class="note">생활: ${esc(v.life)}</p>`:''}${v.note?`<p class="note">추정 메모: ${esc(v.note)}</p>`:''}` : '<span class="note">v9 데이터 없음</span>';
}
['fGrade','fFaction','fClass','fSort'].forEach(id=>document.getElementById(id).addEventListener('change',renderHeroes));

// ---------- 승급 · 조각 ----------
function ctlRow(container,items,onchange){ container.innerHTML=items.map(([key,label,min,max,step,val,unit])=>
  `<label class="ctl">${label} <span class="val" id="${key}-v">${fmt(val,step<1?1:0)}${unit||''}</span><input type="range" id="${key}" min="${min}" max="${max}" step="${step}" value="${val}"></label>`).join('');
  items.forEach(([key,,,,step,,unit])=>document.getElementById(key).addEventListener('input',e=>{ document.getElementById(key+'-v').textContent=fmt(+e.target.value,step<1?1:0)+(unit||''); onchange(key,+e.target.value); })); }
function renderStar(init){
  const F=S.frag;
  if(init) ctlRow(document.getElementById('fragCtl'),[
    ['boss','보스 상점 (고정 영웅, 월)',0,200,2,F.boss,'개'],['mileage','마일리지 상점 (걸린 4주 동안)',0,400,10,F.mileage,'개'],
    ['mileageEvery','마일리지에 다시 걸리는 주기',1,12,1,F.mileageEvery,'개월'],['event','이벤트 교환소 (대상일 때)',0,100,10,F.event,'개'],
    ['eventEvery','이벤트 대상 주기',1,12,1,F.eventEvery,'개월'],['rep','평판 확고 (1회)',0,100,100,F.rep,'개'],
    ['repMonth','평판 확고 도달',1,12,1,F.repMonth,'개월'],['pullsPerDay','하루 소환 횟수',0,30,1,F.pullsPerDay,'회'],
  ],(k,v)=>{F[k]=v;save();renderStar();renderExport();});
  const months=24, perPull=0.03/24*100; let acc=0; const series=[];
  for(let m=1;m<=months;m++){ acc+=F.boss+((m-1)%F.mileageEvery===0?F.mileage:0)+(m%F.eventEvery===0?F.event:0)+(m===F.repMonth?F.rep:0)+F.pullsPerDay*30*perPull; series.push(acc); }
  const need=[]; let c=0; S.starCost.forEach(n=>{c+=n*100;need.push(c)}); const label=['해금','★1','★2','★3','★4','★5'];
  const reach=need.map(t=>{const i=series.findIndex(v=>v>=t);return i<0?null:i+1});
  lineChart('cFrag',{xs:series.map((_,i)=>i+1),series:[{data:series,color:css('--accent'),fill:css('--accent-soft'),width:2.2},...need.map((t,i)=>({data:series.map(()=>t),color:css('--muted'),dash:'3 4',width:1,endLabel:label[i]}))],h:300,xEvery:3,yLabel:'누적 조각'});
  document.getElementById('fragTbl').innerHTML='<thead><tr><th class="l">단계</th><th>누적 필요 조각</th><th>도달</th></tr></thead><tbody>'+need.map((t,i)=>`<tr><td class="l">${label[i]}</td><td>${fmt(t)}</td><td>${reach[i]?reach[i]+'개월':'24개월 넘음'}</td></tr>`).join('')+'</tbody>';
  document.getElementById('fragNote').textContent=`가로축은 개월. 소환 중복: 특정 SSR 1명 확률 3%÷24명 기준 월 ${fmt(F.pullsPerDay*30*perPull,0)}개. 목표는 ★5 약 10개월.`;
}

// ---------- 장비 ----------
function renderEquip(init){
  if(init) ctlRow(document.getElementById('eqCtl'),[
    ['eqC','C 기본값',0,10,.5,S.eqBase.C,'%'],['eqN','N 기본값',0,15,.5,S.eqBase.N,'%'],['eqR','R 기본값',0,20,.5,S.eqBase.R,'%'],
    ['eqSR','SR 기본값',0,30,.5,S.eqBase.SR,'%'],['eqSSR','SSR 기본값',0,40,.5,S.eqBase.SSR,'%'],['eqCost','강화 비용 배율',0.5,5,.5,S.eqCostMul,'×'],
  ],(k,v)=>{ if(k==='eqCost') S.eqCostMul=v; else S.eqBase[k.slice(2)]=v; save(); renderEquip(); renderPower(); renderExport(); });
  const enh=Array.from({length:16},(_,i)=>i), col={C:css('--c'),N:css('--n'),R:css('--r'),SR:css('--sr'),SSR:css('--ssr')};
  lineChart('cEquip',{xs:enh.map(e=>'+'+e),xEvery:3,h:300,yFmt:v=>fmt(v)+'%',series:[...GRADES.map(g=>({data:enh.map(e=>S.eqBase[g]*(1+.1*e)),color:col[g],width:2,endLabel:g})),...['N','R','SR','SSR'].map(g=>({data:enh.map(e=>e<=10?eqCurPct(g,e)/2:null),color:col[g],dash:'4 3',width:1}))]});
  document.getElementById('equipLegend').innerHTML=legend([[css('--muted'),'실선 = 제안 (C~SSR, +15)'],[css('--muted'),'점선 = 현재 (N~SSR, +10)',1]]);
  const rank={C:1,N:2,R:3,SR:4,SSR:5}, cum=(g,k)=>{let s=0;for(let l=0;l<15;l++)s+=(k==='gold'?100:5)*(l+1)*rank[g]*S.eqCostMul;return s};
  barChart('cEqCost',{labels:GRADES,series:[{label:'금화',color:css('--ssr'),data:GRADES.map(g=>cum(g,'gold'))},{label:'재료×20',color:css('--r'),data:GRADES.map(g=>cum(g,'mat')*20)}]});
  document.getElementById('eqCostLegend').innerHTML=legend([[css('--ssr'),'금화 (+0→+15 누적)'],[css('--r'),'강화 재료 ×20 (같은 눈금으로 보기 위해)']]);
  document.getElementById('eqTbl').innerHTML='<thead><tr><th class="l">등급</th><th>현재 최대 (+10, 무기)</th><th>제안 +15 무기</th><th>등급 맞춤 보너스</th><th>제안 합계</th></tr></thead><tbody>'+
    GRADES.map(g=>`<tr><td class="l"><span class="pill g-${g}">${g}</span></td><td>${g==='C'?'–':fmt(eqCurPct(g,10)/2,1)+'%'}</td><td>${fmt(S.eqBase[g]*2.5,1)}%</td><td>${S.eqMatch[g]?S.eqMatch[g]+'%':'–'}</td><td><b>${fmt(eqPropPct(g,15),1)}%</b></td></tr>`).join('')+'</tbody>';
}

// ---------- 평판 ----------
function renderRep(init){
  const R=S.rep;
  if(init) ctlRow(document.getElementById('repCtl'),[['killsPerHour','시간당 처치 (추정)',100,1200,20,R.killsPerHour,'마리'],['hoursPerDay','그 지역 사냥 시간 (하루)',.5,6,.5,R.hoursPerDay,'시간']],(k,v)=>{R[k]=v;save();renderRep();renderExport();});
  const tiers=['매우 적대적','적대적','보통','우호','매우 우호','확고'];
  document.getElementById('repTbl').innerHTML='<thead><tr><th class="l">등급</th><th>점수</th><th>누적 처치</th><th>사냥 시간</th><th>일수</th></tr></thead><tbody>'+
    tiers.map((t,i)=>{ const pts=i*2000, kills=pts/50*100, hrs=kills/R.killsPerHour; return `<tr><td class="l">${t}</td><td>${fmt(pts)}</td><td>${fmt(kills)}</td><td>${fmt(hrs,1)}시간</td><td>${i?fmt(hrs/R.hoursPerDay,0)+'일':'시작'}</td></tr>`}).join('')+'</tbody>';
  document.getElementById('repShop').innerHTML='<thead><tr><th class="l">등급</th><th class="l">상품</th></tr></thead><tbody>'+
    [['보통','사료 상자, 강화 재료 상자'],['우호','장비 상자'],['매우 우호','소환권 10장 (1회) · 소환권 월 5장 · 칭호 "○○의 친구"'],['확고','지역 SSR 조각 100개 (1회) · 칭호 "○○의 대장"']].map(r=>`<tr><td class="l">${r[0]}</td><td class="l">${r[1]}</td></tr>`).join('')+'</tbody>';
}

// ---------- 내보내기 ----------
function renderExport(){ const out={schema:'sg-balance-v1',level:{lv100Multiplier:S.lv100},promotion:{statMultiplier:S.starMul,levelCap:S.starCap,cardCost:{unlock:S.starCost[0],stars:S.starCost.slice(1)},fragmentsPerCard:100},
  equipment:{grades:GRADES,mainStatBasePct:S.eqBase,maxEnhance:S.eqMaxEnh,perLevel:0.1,gradeMatchBonusPct:S.eqMatch,costMultiplier:S.eqCostMul},
  reputation:{tiers:['매우 적대적','적대적','보통','우호','매우 우호','확고'],step:2000,requestKills:100,requestPoints:50},
  assumptions:{fragmentSupply:S.frag,huntRate:S.rep,profile:S.profile,potentialBand:S.potBand}};
  document.getElementById('exportOut').textContent=JSON.stringify(out,null,2); }
document.getElementById('copyBtn').addEventListener('click',()=>{ const t=document.getElementById('exportOut').textContent, m=document.getElementById('copyMsg');
  navigator.clipboard.writeText(t).then(()=>m.textContent='복사했습니다.').catch(()=>{ const r=document.createRange(); r.selectNodeContents(document.getElementById('exportOut')); const s=getSelection(); s.removeAllRanges(); s.addRange(r); m.textContent='자동 복사가 막혀서 내용을 선택해 두었습니다. 직접 복사해 주세요.'; }); });

// ---------- 탭 ----------
const rendered={}; let current='power';
function openTab(name){ current=name; document.querySelectorAll('nav.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===name));
  document.querySelectorAll('section.view').forEach(s=>s.hidden=s.id!=='v-'+name);
  const fn={power:renderPower,curve:renderCurve,heroes:renderHeroes,star:()=>renderStar(!rendered.star),equip:()=>renderEquip(!rendered.equip),rep:()=>renderRep(!rendered.rep),export:renderExport}[name];
  try{ fn&&fn(); }catch(err){ const sec=document.getElementById('v-'+name); const box=document.createElement('div'); box.className='card'; box.innerHTML=`<b>이 화면을 그리지 못했습니다.</b> <span class="note">${esc(err.message)}</span>`; sec.prepend(box); }
  rendered[name]=true; try{localStorage.setItem('sg-studio-tab',name)}catch{} }
document.querySelectorAll('nav.tabs button').forEach(b=>b.addEventListener('click',()=>openTab(b.dataset.tab)));
let rz; addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>openTab(current),200)});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>openTab(current));
const start=(location.hash||'').slice(1)||(()=>{try{return localStorage.getItem('sg-studio-tab')}catch{return null}})()||'power';
renderExport(); openTab(['power','curve','heroes','star','equip','rep','export'].includes(start)?start:'power');
