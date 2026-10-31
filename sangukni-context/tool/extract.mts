const m=new Map();(globalThis as any).localStorage={getItem:(k:string)=>m.get(k)??null,setItem:(k:string,v:string)=>m.set(k,String(v)),removeItem:(k:string)=>m.delete(k)}
const root='/home/user/sg-1007/ait-app/src'
const {GameStore,ROSTER}=await import(root+'/state/gameState.ts')
const {V3_CHARACTER_BY_ID}=await import(root+'/data/v3Characters.ts')
const g:any=new GameStore()
const out=ROSTER.map((h:any)=>{const v:any=V3_CHARACTER_BY_ID[h.id]||{};const st=g.heroes[h.id]
 st.owned=true
 const atk=(lv:number,star:number)=>{st.level=lv;st.star=star;return g.heroAtk(h.id)}
 const hp=(lv:number,star:number)=>{st.level=lv;st.star=star;return g.heroHP?g.heroHP(h.id):0}
 return {id:h.id,name:h.name,faction:v.faction??h.faction,role:v.role,style:v.attackStyle??'',rarity:g.heroRarity(h.id),baseAtk:h.baseAtk,
  atk1:atk(1,1),atk30:atk(30,1),atk100:atk(100,1),atk100s6:atk(100,6),hp1:hp(1,1),hp100s6:hp(100,6)}})
console.log(JSON.stringify(out))
