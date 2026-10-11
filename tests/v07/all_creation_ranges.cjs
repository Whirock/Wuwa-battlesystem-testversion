'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../..')),C=require(root+'/creation-core.js');
const source=JSON.parse(require('node:zlib').gunzipSync(fs.readFileSync(path.join(__dirname,'baseline-creation-attributes.json.gz'))));
let assertions=0,records=0;const errors=[];
const check=(label,fn)=>{try{fn();assertions++}catch(e){errors.push({label,error:e.message})}};
for(const t of C.TEMPLATES)for(let level=1;level<=90;level++){
 const d=C.createDraft(t.id,level);check(`${t.id}/${level} executable default`,()=>{const v=C.validateCharacter(d);assert(v.ok,v.errors.join(';'))});
 for(const key of C.ATTRS){const r=C.attributeRange(t.id,level,key),expected=source.templates[t.id].levels[level][key];records++;check(`${t.id}/${level}/${key} equals frozen numeric source`,()=>assert.deepEqual(r,expected));for(const [raw,want]of [[r.min,r.min],[r.default,r.default],[r.max,r.max],[r.min-100,r.min],[r.max+100,r.max]])check(`${t.id}/${level}/${key} normal commit ${raw}`,()=>{const c=C.commitValue(String(raw),r,false);assert(c.ok,c.message);assert.equal(c.value,want)});}
 for(const side of ['min','max'])check(`${t.id}/${level} all-${side} build remains executable without forced budget`,()=>{const x=C.copy(d);for(const key of C.ATTRS)x.attributes[key]=source.templates[t.id].levels[level][key][side];const v=C.validateCharacter(x);assert(v.ok,v.errors.join(';'));assert.equal(v.range_status,'recommended')});
}
const r={suite:'test7-all-creation-range-contract',timestamp:new Date().toISOString(),source:'tests/v07/baseline-creation-attributes.json.gz',records,assertions,errors,passed:!errors.length,hashes:{core:crypto.createHash('sha256').update(fs.readFileSync(root+'/creation-core.js')).digest('hex'),data:crypto.createHash('sha256').update(fs.readFileSync(root+'/creation-data.js')).digest('hex')},scope:'All template/level/attribute ranges and actual editor numeric commits. Full growth validation, not rendered editor or combat balance.'};console.log(JSON.stringify(r,null,2));process.exitCode=r.passed?0:1;
