'use strict';
// Frozen test.4 source makes the regression suite reproducible in offline ZIPs.
// TEST4_BASELINE optionally selects another explicit checkout for investigation.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),zlib=require('node:zlib'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const external=process.env.TEST4_BASELINE&&path.resolve(process.env.TEST4_BASELINE);
const bundle=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(__dirname,'baseline-test4.json.gz'))));
for(const [name,source]of Object.entries(bundle.files))assert.equal(crypto.createHash('sha256').update(source).digest('hex'),bundle.sha256[name],'Frozen baseline corrupt: '+name);
function read(name){return external?fs.readFileSync(path.join(external,name),'utf8'):bundle.files[name];}
let temp;function materialize(){if(external)return external;if(!temp){temp=fs.mkdtempSync(path.join(os.tmpdir(),'battle-test4-baseline-'));for(const name of ['engine.js','skill-effects.js','parameters.json'])fs.writeFileSync(path.join(temp,name),read(name));process.on('exit',()=>fs.rmSync(temp,{recursive:true,force:true}));}return temp;}
module.exports={read,materialize,source:external?'explicit TEST4_BASELINE checkout':bundle.source,sha256:bundle.sha256};
