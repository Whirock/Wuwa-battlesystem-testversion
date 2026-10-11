'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),{boot}=require('../v07/ui_harness.cjs');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../..'));
(async()=>{const h=await boot(undefined,{root,deferArt:true}),checks=[];try{
 const doc=h.w.document;
 for(const card of doc.querySelectorAll('#partyCards .party-unit')){
  const labels=[...card.querySelectorAll('.base-stats dt')];assert.equal(labels.length,8);
  const original=labels.filter(n=>n.querySelector('img')).map(n=>n.textContent);
  assert.deepEqual(original,['HP','ATK','DEF','CR','CDMG','ER']);
  for(const key of ['SP','SPD'])assert.equal(labels.find(n=>n.textContent===key).querySelector('img'),null);
 }
 checks.push('Actual HUD shows original icons for exactly six of eight stats, without relabeling SP or SPD');
 h.click('#setupBtn');const cards=[...doc.querySelectorAll('#partyDialog [data-character]')];assert.equal(cards.length,4);
 for(const card of cards){const el=card.querySelector('.ui-icon--element');assert(el);assert(el.querySelector('img'));assert.equal(el.getAttribute('aria-hidden'),'true');}
 assert(doc.querySelector('#partyDialog .ui-icon--role[data-ui-icon-key="治疗"] img'));
 assert.equal(doc.querySelector('#partyDialog .ui-icon--role[data-ui-icon-key="归群"] img'),null);
 checks.push('Actual party cards consume the local element/role API and preserve the group fallback');
 h.click('#partyQuickSelect');for(const card of doc.querySelectorAll('#partyPickerDialog [data-pick]'))assert(card.querySelector('.ui-icon--element img'));
 checks.push('Actual dynamic quick picker uses original local element images for its authored roster');
 h.click('#partyPickerDialog [data-dismiss]');h.click('#partyDialog [data-dismiss]');
 const P=h.w.BATTLE_PARAMETERS,e=new h.w.BattleEngine(P,{team:['amy','lynae','mornye','denia'],level:20,encounter:'normal',mode:{amy:'rupture',denia:'fusion'}});e.start();
 e.shield(e.allies[0],e.allies[0],80,2,'barrier');e.shield(e.allies[1],e.allies[0],40,2,'chisa_shield');
 e.addStatus(e.allies[0],'guard',{owner:e.allies[0].id,slotBound:true});
 const snapshot=e.snapshot();h.w.BattleEngine.restore(P,snapshot);
 const project=h.w.BattleLabDiagnostics.getProject();project.battleConfig=e.options;project.battle=snapshot;
 h.click('#assetsBtn');h.click('[data-tab="project"]');await h.import('#importProject','icons-status-fixture.json',JSON.stringify(project));
 const first=doc.querySelector('#partyCards .party-unit');
 for(const key of ['barrier','chisa_shield']){
  const button=first.querySelector(`[data-status="${key}"]`);assert(button);assert(button.querySelector('.ui-icon--status[data-ui-icon-key="shield"] img'));assert(button.getAttribute('aria-label'));assert(button.dataset.tooltip);
 }
 const guard=first.querySelector('[data-status="guard"]');assert(guard);assert.equal(guard.querySelector('img'),null);assert.equal(guard.querySelector('.ui-icon__text').textContent,'◇');
 checks.push('A strict restored battle maps real barrier/chisa_shield absorption values, never the guard stance');
 const before=JSON.stringify(h.w.BattleLabDiagnostics.getSnapshot());
 for(const image of first.querySelectorAll('.ui-icon img')){image.dispatchEvent(new h.w.Event('error'));assert.equal(image.parentElement.dataset.uiState,'error');image.dispatchEvent(new h.w.Event('load'));assert.equal(image.parentElement.dataset.uiState,'loaded');}
 assert.equal(JSON.stringify(h.w.BattleLabDiagnostics.getSnapshot()),before);assert.deepEqual(h.errors,[]);
 checks.push('Icon load/failure events preserve the complete live battle snapshot and generate no runtime errors');
 console.log(JSON.stringify({suite:'test8-icons-actual-app-integration',passed:true,checks,limits:['Uses the actual app/engine/storage under jsdom; image event simulation is not a real decoder or rendered-layout test.','Large status capacity, artwork and end-to-end browser coverage are separate suites.']},null,2));
 }finally{h.close()}})().catch(e=>{console.error(e);process.exitCode=1});
