const assert=require('node:assert/strict');
const root=require('node:path').resolve(__dirname,'../..');
const P=require(root+'/parameters.json'),E=require(root+'/engine.js');
let checked=0;
for(const key of Object.keys(P.characters)){
 const b=new E(P,{team:[key,...['amy','lynae'].filter(x=>x!==key)].slice(0,3),encounter:['bracer','snip']});b.start();const before=b.snapshot();
 for(let bp=0;bp<4;bp++)for(const choice of [undefined,'attack','healing','call','exile']){
  for(const a of b.availableActions(b.allies[0].id,bp,{choice})){
   assert.equal(typeof a.description,'string');assert(!/NaN|undefined/.test(a.description));checked++;
  }
 }
 assert.deepStrictEqual(b.snapshot(),before);
}
console.log(`PASS ${checked} description reads across BP/branches; no state mutation or invalid values.`);
const b=new E(P,{team:['amy'],encounter:['predator']});b.start();const enemy=b.enemies[0];b._prepareCharge(enemy,'charge');assert.equal(b.enemyIntent(enemy.id).description,'惊蛰猎手拉开长弓');console.log('PASS hunter exact short telegraph.');
