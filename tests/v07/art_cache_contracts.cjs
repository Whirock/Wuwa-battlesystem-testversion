// Independent rerun of creation implementation worker synthetic lifecycle contracts.
/* Synthetic 2px fixtures test cache/lifecycle only; never stand in for character artwork. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../..'));
let checks=0,loads=0;const callbacks=[];
class FakeImage{constructor(){this.width=2;this.height=2;}set src(value){loads++;callbacks.push(()=>this.onload());}}
function makeCanvas(){const c={width:2,height:2};c.getContext=()=>({imageSmoothingEnabled:false,drawImage(){},getImageData(){return {width:c.width,height:c.height,data:new Uint8ClampedArray(c.width*c.height*4)};},createImageData(w,h){return {width:w,height:h,data:new Uint8ClampedArray(w*h*4)};},putImageData(){}});return c;}
const context=vm.createContext({Image:FakeImage,document:{createElement:makeCanvas},Uint8ClampedArray,Map,Set,Promise,JSON,Error,Math,Number});
vm.runInContext(fs.readFileSync(path.join(root,'creation-art.js'),'utf8'),context);const art=context.CreationArt;
function bundle(version){const layer={source:'component.png',mask:'mask.png'},poses={};for(const pose of ['idle','cast','guard','critical','down'])poses[pose]={layers:[layer],meta:{head_origin:[1,1],root_ground:[1,2],body_reference_height:2,closed_eyes:true}};return {manifest:{version,canvas:[2,2],bodies:{male_basic:{poses}},hair:{short:{poses:{upright:{head_origin:[1,1],layers:[{...layer,z:'hair_front'}]},down:{head_origin:[1,1],layers:[{...layer,z:'hair_front'}]}}}},irises:{round:{battle:layer,portrait:layer}}},images:{'component.png':'data:image/png;base64,AA==','mask.png':'data:image/png;base64,AA=='}};}
function appearance(n=0){return {body_outfit_set_id:'male_basic',hair_id:'short',iris_pattern_id:'round',skin_color:'#eec09c',hair_color:'#'+n.toString(16).padStart(6,'0'),iris_color:'#6688cc',color_space:'srgb',ramp_version:1};}
async function settle(p){for(let i=0;i<20;i++){while(callbacks.length)callbacks.shift()();await Promise.resolve();}return p;}
function test(condition){assert.ok(condition);checks++;}
(async()=>{
 art.configure(bundle('one'));test(art.available());
 const p1=art.render(appearance()),p2=art.render(appearance());test(art.stats().pending===1);const [r1,r2]=await settle(Promise.all([p1,p2]));test(r1===r2);test(loads===2);test(art.getCached(appearance())===r1);
 for(let n=1;n<=70;n++)await settle(art.render(appearance(n)));
 test(art.stats().outputs===48);test(art.getCached(appearance(0))===null);test(art.stats().sources===2);test(art.stats().pending===0);
 for(let n=0;n<20;n++)await settle(art.portrait(appearance(n)));
 test(art.stats().portraits===12);test(art.stats().outputs===48);
 art.clear();test(art.stats().sources===0&&art.stats().outputs===0&&art.stats().portraits===0);
 const old=art.render(appearance(1)).then(()=>({accepted:true}),e=>({error:e.message}));art.configure(bundle('two'));
 const fresh=art.render(appearance(1));const result=await settle(old);test(!result.accepted);const output=await settle(fresh);test(output.meta.art_version==='two');test(art.stats().sources===2&&art.stats().outputs===1);test(art.getCached(appearance(1))===output);
 art.clear();const clearing=art.render(appearance(2)).then(()=>true,()=>false);art.clear();test(!(await settle(clearing)));test(art.stats().pending===0&&art.stats().outputs===0&&art.stats().sources===0);
 await assert.rejects(art.render(appearance(),'hurt'),/未定义/);checks++;
 const invalid={...appearance(),hair_color:'rgb(0,0,0)'};await assert.rejects(art.render(invalid),/颜色/);checks++;
 console.log(JSON.stringify({passed:checks,scope:'Synthetic canvas cache and lifecycle contracts only; not visual certification.'}));
})().catch(e=>{console.error(e);process.exitCode=1;});
