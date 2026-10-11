'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {JSDOM}=require('../independent/v02/node_modules/jsdom');const dom=new JSDOM('<div id="host"></div>',{url:'http://localhost',runScripts:'outside-only'}),w=dom.window;
w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
for(const f of ['creation-data.js','creation-core.js','creation-ui.js'])w.eval(fs.readFileSync(path.join(__dirname,'../..',f),'utf8'));
let calls=0,resolve,checks=0;const saved=w.PlayerCreation.createDraft(),ui=w.PlayerCreation.mount(w.document.querySelector('#host'),{characters:[saved],onChange:()=>{calls++;return new Promise(r=>{resolve=r;});}});
function test(x){assert.ok(x);checks++;}function click(label){const b=[...w.document.querySelectorAll('button')].find(b=>b.textContent===label);assert.ok(b);b.click();}function rename(value){const input=w.document.querySelector('.creation-content input[type=text]');input.value=value;input.dispatchEvent(new w.Event('input'));}
(async()=>{
 ui.setDraft(saved);click('删除此角色');rename('确认之后新编辑');click('确认更改');test(calls===0);test(w.document.body.textContent.includes('草稿已更改，请重新确认'));test(ui.getDraft().name==='确认之后新编辑');
 click('删除此角色');click('确认更改');test(calls===1);rename('删除等待期间的新编辑');await ui.save();test(calls===1);resolve({persisted:false});await Promise.resolve();await Promise.resolve();test(ui.getDraft().id===saved.id);test(ui.getDraft().name==='删除等待期间的新编辑');test(w.document.body.textContent.includes('本机保存失败'));test(w.document.querySelector('.creation-content input[type=text]').value==='删除等待期间的新编辑');
 ui.requestClose();test(!w.document.querySelector('.creation-confirm').hidden);ui.destroy();dom.window.close();console.log(JSON.stringify({passed:checks,scope:'Stale confirmation and asynchronous delete preserve later draft edits.'}));
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
