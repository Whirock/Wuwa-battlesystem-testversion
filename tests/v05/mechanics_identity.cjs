#!/usr/bin/env node
'use strict';
// Presentation-only regression gate. Numeric leaves and mechanical identifiers
// must match test.4; a separate syntax-tree gate ignores string copy only.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),cp=require('node:child_process');
const root=path.resolve(__dirname,'../..'),frozen=require('./baseline.cjs');
const baselineRead=frozen.read;
const digest=x=>crypto.createHash('sha256').update(typeof x==='string'?x:JSON.stringify(x)).digest('hex');
const checks=[],failures=[];function test(name,f){try{f();checks.push(name);}catch(e){failures.push({name,error:e.message.slice(0,4000)});}}
const oldP=JSON.parse(baselineRead('parameters.json')),P=JSON.parse(fs.readFileSync(path.join(root,'parameters.json'),'utf8'));
const presentationKeys=new Set(['description','effect','condition','conditions','hp_effect_formula','status_effect_and_duration','targetText','status','release_tag','date']);
const stringOnly=x=>typeof x==='string'||Array.isArray(x)&&x.every(stringOnly);
function mechanicalProjection(x){if(Array.isArray(x))return x.map(mechanicalProjection);if(x&&typeof x==='object')return Object.fromEntries(Object.entries(x).filter(([k,v])=>!(presentationKeys.has(k)&&stringOnly(v))).map(([k,v])=>[k,mechanicalProjection(v)]));return x;}
function numericLeaves(x,p='',out={}){if(x===null||typeof x==='number'||typeof x==='boolean')out[p]=x;else if(x&&typeof x==='object')for(const [k,v]of Object.entries(x))numericLeaves(v,p+'/'+k,out);return out;}
test('every numeric, boolean and null parameter leaf equals test.4',()=>assert.deepEqual(numericLeaves(P),numericLeaves(oldP)));
test('all non-presentation parameters and mechanical string identifiers equal test.4',()=>assert.deepEqual(mechanicalProjection(P),mechanicalProjection(oldP)));
test('JSON and browser parameters are byte-equivalent data',()=>{const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'parameters.js'),'utf8'),c);assert.deepEqual(JSON.parse(JSON.stringify(c.window.BATTLE_PARAMETERS)),P);});
// Node distributes Acorn for its own JS tooling; prefer a normal installation,
// then use that bundled parser. No network, install or source execution needed.
let acorn;try{acorn=require('acorn');}catch{const src=process.binding('natives')['internal/deps/acorn/acorn/dist/acorn'];assert(src,'Acorn parser unavailable in this Node build');const c={};vm.runInNewContext(src,c);acorn=c.acorn;}
function ast(source){
 const tree=acorn.parse(source,{ecmaVersion:'latest',sourceType:'script'});
 function clean(v){
  if(Array.isArray(v))return v.map(clean).filter(x=>x!==undefined);
  if(v&&typeof v==='object'){
   if(v.type==='VariableDeclaration'&&v.declarations.length===1&&v.declarations[0].id.name==='targetLabels')return undefined;
   if(v.type==='FunctionDeclaration'&&v.id?.name==='describeSkill')return undefined;
   if(v.type==='Property'&&['describeSkill','description'].includes(v.key?.name))return undefined;
   if(v.type==='FunctionDeclaration'&&v.id?.name==='describeStatus')return {type:'FunctionDeclaration',id:clean(v.id),params:clean(v.params),body:'<display-only status descriptions>'};
   const o={};
   for(const [k,x]of Object.entries(v)){
    if(['start','end','loc','raw'].includes(k))continue;
    if(k==='value'&&v.type==='Property'&&['targetText','bodyText','description'].includes(v.key?.name)){o[k]='<display-only property>';continue;}
    if(k==='arguments'&&v.type==='CallExpression'&&v.callee?.property?.name==='_record'){o[k]=x.map((a,i)=>i===2?'<display-only log message>':clean(a));continue;}
    if(k==='value'&&v.type==='Literal'&&typeof x==='string'&&/[\u3400-\u9fff]/.test(x)){o[k]='<localized string copy>';continue;}
    if(k==='value'&&v.type==='TemplateElement'){o[k]={raw:'<template copy>',cooked:'<template copy>'};continue;}
    o[k]=clean(x);
   }
   return o;
  }
  return v;
 }
 return clean(tree);
}
for(const file of ['engine.js','skill-effects.js'])test(file+' mechanics AST equals test.4 outside explicit display-only fields/functions',()=>assert.deepEqual(ast(fs.readFileSync(path.join(root,file),'utf8')),ast(baselineRead(file))));
// Assets are immutable presentation inputs: no reinterpretation can silently
// replace art, change recorded facing, native dimensions or body references.
test('all asset mapping metadata remain exactly identical to test.4',()=>assert.equal(fs.readFileSync(path.join(root,'assets.js'),'utf8'),baselineRead('assets.js')));
const report={suite:'test5-mechanics-identity',at:new Date().toISOString(),baseline:frozen.source,baselineSHA256:frozen.sha256,checks,failed:failures,numericLeafCount:Object.keys(numericLeaves(P)).length,mechanicalParameterSHA256:digest(mechanicalProjection(P)),numericSHA256:digest(numericLeaves(P)),parser:acorn.version,limits:['AST comparison excludes localized literal text, targetLabels, targetText/bodyText/description properties, describeStatus body, describeSkill function/export and log-message arguments only. Presentation purity and frozen numerical/runtime oracles are checked separately.']};console.log(JSON.stringify(report,null,2));process.exitCode=failures.length?1:0;
