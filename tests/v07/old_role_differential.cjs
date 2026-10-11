'use strict';
// Actual engine-v-engine differential, using frozen test.6 runtime and current test.7.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const oldRoot=require('./baseline_test6.cjs').materialize(),newRoot=path.resolve(process.argv[2]||path.join(__dirname,'../..'));
const Old=require(oldRoot+'/engine.js'),New=require(newRoot+'/engine.js');
const oldP=JSON.parse(fs.readFileSync(oldRoot+'/parameters.json')),newP=JSON.parse(fs.readFileSync(newRoot+'/parameters.json'));
const normalize=x=>Array.isArray(x)?x.map(normalize):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).filter(([k])=>!['description','message'].includes(k)).map(([k,v])=>[k,normalize(v)])):x;
const result={suite:'test7-authored-roles-differential',at:new Date().toISOString(),scenarios:0,pairedActions:0,errors:[],sourceHashes:{},scope:'Actual frozen test.6 versus test.7 deterministic battles for original profiles; not custom creation or browser verification.'};
for(const root of [oldRoot,newRoot])for(const file of ['parameters.json','engine.js','skill-effects.js'])result.sourceHashes[path.basename(root)+'/'+file]=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
for(const profile of Object.keys(oldP.characters))for(const encounter of Object.keys(oldP.encounters))for(const level of [1,20,90]){
 const team=[profile,...['amy','lynae','mornye'].filter(x=>x!==profile)].slice(0,4),opts={team,encounter,level,stochastic:true,seed:result.scenarios+1};
 const a=new Old(oldP,opts),b=new New(newP,opts);a.start();b.start();
 try{for(let step=0;step<200&&!a.result;step++){
  assert.equal(a.currentId,b.currentId,`actor at step ${step}`);
  const ar=a.current?.side==='enemy'?a.stepEnemy():a.autoAction(),br=b.current?.side==='enemy'?b.stepEnemy():b.autoAction();
  assert.equal(ar.ok,br.ok,`result at step ${step}`);a.validate();b.validate();result.pairedActions++;
 }
 assert.deepEqual(a.summary(),b.summary(),'summary');assert.deepEqual(normalize(a.log),normalize(b.log),'event log');}
 catch(e){result.errors.push({profile,encounter,level,error:e.message});}
 result.scenarios++;
}
result.passed=!result.errors.length;console.log(JSON.stringify(result,null,2));process.exitCode=result.passed?0:1;
