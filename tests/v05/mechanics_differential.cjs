const fs=require('fs'),assert=require('assert');
const path=require('node:path');const root=path.resolve(__dirname,'../..');const baseline=require('./baseline.cjs').materialize();
const Old=require(path.join(baseline,'engine.js')),New=require(root+'/engine.js');
const oldP=JSON.parse(fs.readFileSync(path.join(baseline,'parameters.json'))),newP=JSON.parse(fs.readFileSync(root+'/parameters.json'));
const normalize=x=>Array.isArray(x)?x.map(normalize):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).filter(([k])=>!['description','message'].includes(k)).map(([k,v])=>[k,normalize(v)])):x;
let scenarios=0,actions=0;
for(const profile of Object.keys(oldP.characters))for(const encounter of Object.keys(oldP.encounters)){
 const team=[profile,...['amy','lynae','mornye'].filter(x=>x!==profile)].slice(0,4),opts={team,encounter,level:40,stochastic:true,seed:scenarios+1};
 const a=new Old(oldP,opts),b=new New(newP,opts);a.start();b.start();
 for(let step=0;step<120&&!a.result;step++){
  assert.equal(a.currentId,b.currentId);
  const ar=a.current?.side==='enemy'?a.stepEnemy():a.autoAction(),br=b.current?.side==='enemy'?b.stepEnemy():b.autoAction();
  assert.equal(ar.ok,br.ok,`${profile}/${encounter}/${step}`);actions++;
 }
 assert.deepStrictEqual(a.summary(),b.summary(),`summary ${profile}/${encounter}`);
 assert.deepStrictEqual(normalize(a.log),normalize(b.log),`combat events ${profile}/${encounter}`);
 scenarios++;
}
console.log(`PASS ${scenarios} deterministic old/new scenarios; ${actions} paired actions; identical combat event payloads and summaries after removing display text.`);
