'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {JSDOM}=require('../independent/v02/node_modules/jsdom');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../..'));
const script=fs.readFileSync(path.join(root,'ui-icons.js'),'utf8'),css=fs.readFileSync(path.join(root,'ui-icons.css'),'utf8');
const dom=new JSDOM('<!doctype html><body><div id="icons"></div></body>',{url:'https://qa.invalid/',runScripts:'outside-only'}),w=dom.window;
w.eval(script);const I=w.UiIcons,host=w.document.querySelector('#icons');
const out={suite:'test8-semantic-local-ui-icons',at:new Date().toISOString(),passed:[],failed:[],scope:'Source checks and actual DOM event paths in jsdom; image decode and visual/browser layout are separate evidence.'};
function test(name,fn){try{fn();out.passed.push(name)}catch(e){out.failed.push({name,error:e.message})}}
function icon(html){host.innerHTML=html;return host.firstElementChild}
const roles=['击破','伤害','保护','协同','范围','支援','治疗','归群','异常','连击','持续','控序','爆发','形态','转换','供SP'];
test('six semantic elements use one original family with fixed local src',()=>{
 const expected={glacio:'Ice',fusion:'Fire',electro:'Thunder',aero:'Wind',spectro:'Light',havoc:'Dark'};
 assert.deepEqual([...I.keys('element')].sort(),Object.keys(expected).sort());
 for(const [key,native]of Object.entries(expected)){
  const item=I.describe('element',key);assert.equal(item.src,`assets/ui-icons/T_IconElement${native}1_UI.webp`);
  assert.equal(item.renderer,'wuwa-original');assert(fs.existsSync(path.join(root,item.src)));
  const el=icon(I.element(key));assert.equal(el.getAttribute('role'),'img');assert.equal(el.getAttribute('aria-label'),item.label);assert.match(el.title,new RegExp(item.label));assert.match(el.querySelector('img').alt,new RegExp(item.label));
 }
});
test('healing is the only verified original among the sixteen project roles',()=>{
 assert.deepEqual([...I.keys('role')],['治疗']);
 for(const key of roles){const item=I.describe('role',key),el=icon(I.role(key));assert.equal(el.getAttribute('aria-label'),key);assert(el.querySelector('svg path'));assert.equal(!!el.querySelector('img'),key==='治疗');}
 assert.equal(I.describe('role','治疗').sourceName,'生存治疗');
});
test('verified stat semantics match original data and SP/SPD remain unclaimed',()=>{
 const map={HP:'greenlife',ATK:'redattack',DEF:'greendefense',CR:'redbaoji',CDMG:'redcrit',ER:'greenenergy'};
 assert.equal(I.keys('stat').length,6);
 for(const [key,file]of Object.entries(map)){const item=I.describe('stat',key);assert.equal(item.src,'assets/ui-icons/T_Iconproperty'+file+'_UI.webp');assert.equal(item.src,I.describe('stat',key.toLowerCase()).src);const el=icon(I.stat(key));assert(el.querySelector('img'));assert.equal(el.getAttribute('aria-label'),item.label);}
 for(const key of ['SP','SPD'])assert.equal(I.describe('stat',key).src,null);
 assert(!script.includes('redspeed'));
});
test('shield value icon is opt-in and does not stand in for guard/protection/abnormal statuses',()=>{
 assert.deepEqual([...I.keys('status')],['shield']);
 for(const key of ['guard','barrier','chisa_shield','taunt','fusion_burst','spectro_frazzle','havoc_bane','denia_group'])assert.equal(I.describe('status',key).src,null,key);
 const el=icon(I.status('shield',{label:'自建护盾',fallbackText:'⬡',decorative:true}));assert.equal(el.querySelector('img').getAttribute('src'),'assets/ui-icons/T_Iconpropertygreenprotect_UI.webp');el.querySelector('img').dispatchEvent(new w.Event('error'));assert.equal(el.dataset.uiState,'error');assert.equal(el.querySelector('.ui-icon__fallback').textContent,'⬡');
});
test('group is not mislabeled as pull and damage is not main-DPS',()=>{
 for(const key of ['归群','伤害','保护','协同','供SP'])assert.equal(I.describe('role',key).src,null,key);
 assert(!script.includes('SP_RoleLabelC1.webp'));assert(!script.includes('SP_RoleLabelA2.webp'));
});
test('original-pending markup has a same-semantics visible fallback',()=>{
 const el=icon(I.element('aero'));assert.equal(el.dataset.uiState,'loading');assert(el.querySelector('.ui-icon__fallback'));
 assert.match(css,/\.ui-icon>\.ui-icon__image\{visibility:hidden\}/);
 assert.match(css,/data-ui-state="loaded"[^}]+ui-icon__fallback\{visibility:hidden/);
});
test('load of dynamically inserted images selects original without changing semantics',()=>{
 const el=icon(I.element('spectro'));el.querySelector('img').dispatchEvent(new w.Event('load'));assert.equal(el.dataset.uiState,'loaded');assert.equal(el.dataset.uiRenderer,'wuwa-original');assert.equal(el.getAttribute('aria-label'),'衍射');
});
test('missing local element original uses fallback without retry or remote replacement',()=>{
 const el=icon(I.element('fusion')),im=el.querySelector('img'),src=im.getAttribute('src');
 im.dispatchEvent(new w.Event('error'));assert.equal(el.dataset.uiState,'error');assert.equal(el.dataset.uiRenderer,'project-fallback');assert.match(el.title,/原图加载失败/);assert.equal(im.getAttribute('src'),src);assert.equal(el.querySelectorAll('img').length,1);assert.equal(el.getAttribute('aria-label'),'热熔');
 im.dispatchEvent(new w.Event('error'));assert.equal(el.title.match(/原图加载失败/g).length,1);
});
test('missing local role original uses healing fallback',()=>{
 const el=icon(I.role('治疗'));el.querySelector('img').dispatchEvent(new w.Event('error'));assert.equal(el.dataset.uiState,'error');assert.equal(el.querySelector('path').getAttribute('d'),I.describe('role','治疗').fallbackPath);
});
test('a later successful load restores original and original tooltip',()=>{
 const el=icon(I.element('havoc')),im=el.querySelector('img');im.dispatchEvent(new w.Event('error'));im.dispatchEvent(new w.Event('load'));assert.equal(el.dataset.uiState,'loaded');assert.equal(el.title,el.dataset.uiTitle);
});
test('cached successful and failed images can be reconciled explicitly',()=>{
 host.innerHTML=I.element('glacio')+I.role('治疗');const images=host.querySelectorAll('img');
 for(const [i,im]of [...images].entries()){Object.defineProperty(im,'complete',{value:true});Object.defineProperty(im,'naturalWidth',{value:i===0?128:0});}
 I.hydrate(host);assert.equal(images[0].parentElement.dataset.uiState,'loaded');assert.equal(images[1].parentElement.dataset.uiState,'error');
});
test('unrelated image failure leaves icon states untouched',()=>{
 const el=icon(I.element('aero'));const other=w.document.createElement('img');host.append(other);other.dispatchEvent(new w.Event('error'));assert.equal(el.dataset.uiState,'loading');
});
test('unknown and prototype-like keys get local neutral fallbacks',()=>{
 for(const kind of ['element','role','constructor','__proto__'])for(const key of ['unknown','constructor','__proto__']){const el=icon(I.html(kind,key));assert.equal(el.querySelector('img'),null);assert(el.querySelector('path'));assert.equal(el.dataset.uiState,'fallback');}
});
test('untrusted key, label, title, class and fallback content remain inert',()=>{
 const attack='\"><img src=x onerror="window.pwned=1"><script>window.pwned=1</script>';
 const el=icon(I.html('role',attack,{label:attack,title:attack,className:'safe '+attack,fallbackText:attack}));
 assert.equal(el.querySelector('img,script'),null);assert.equal(el.getAttribute('aria-label'),attack);assert.equal(el.title,attack);assert.equal(w.pwned,undefined);assert(el.classList.contains('safe'));assert(!host.querySelector('[onerror]'));
});
test('caller-supplied src cannot override audited local mapping',()=>{
 const el=icon(I.element('fusion',{src:'https://invalid.example/spy.webp',style:'display:none',onerror:'alert(1)'}));assert.equal(el.querySelector('img').getAttribute('src'),'assets/ui-icons/T_IconElementFire1_UI.webp');assert.equal(el.getAttribute('style'),null);assert(!host.querySelector('[onerror]'));
});
test('decorative icons avoid duplicated accessible names beside existing labels',()=>{
 const el=icon(I.role('治疗',{decorative:true}));assert.equal(el.getAttribute('aria-hidden'),'true');assert.equal(el.getAttribute('role'),null);assert.equal(el.querySelector('img').alt,'');assert.match(el.title,/治疗/);
});
test('CSS preserves aspect, source colors and forced-colors fallback',()=>{
 assert.match(css,/object-fit:contain/);assert(!/filter:|scaleX|rotate\(|mix-blend-mode|object-fit:cover/.test(css));assert.match(css,/@media\(forced-colors:active\)/);
});
test('runtime has no network hotlink, fetch, inline handlers or image regeneration',()=>{
 assert(!/https?:\/\/|fetch\(|XMLHttpRequest|onerror=|onload=|canvas|toDataURL/.test(script));
});
test('index loads icon CSS and library once, before party and app consumers',()=>{
 const index=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.equal((index.match(/href="ui-icons.css"/g)||[]).length,1);assert.equal((index.match(/src="ui-icons.js"/g)||[]).length,1);assert(index.indexOf('src="ui-icons.js"')<index.indexOf('src="party-stage.js"'));assert(index.indexOf('src="party-stage.js"')<index.indexOf('src="app.js"'));
});
test('bundled originals are accounted for with unchanged hashes and rights notes',()=>{
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/ui-icons/SOURCES.json'),'utf8'));
 assert.match(manifest.rights,/未.*许可|不.*许可/);assert.equal(manifest.publication_authorized,false);
 const images=fs.readdirSync(path.join(root,'assets/ui-icons')).filter(n=>/\.(webp|png|svg)$/.test(n));
 assert.deepEqual(manifest.assets.map(a=>path.basename(a.local_path)).sort(),images.sort());
 for(const asset of manifest.assets){const bytes=fs.readFileSync(path.join(root,asset.local_path));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),asset.sha256);assert.match(asset.source_url,/^https:\/\//);assert.equal(asset.transform,'none');assert(asset.semantic);}
});
out.summary={passed:out.passed.length,failed:out.failed.length};out.ok=!out.failed.length;dom.window.close();console.log(JSON.stringify(out,null,2));process.exitCode=out.ok?0:1;
