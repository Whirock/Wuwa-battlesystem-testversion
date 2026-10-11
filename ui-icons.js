/* Local, semantically audited UI icons. Original pixels are never redrawn or hotlinked.
 * Source and non-mapping decisions: assets/ui-icons/SOURCES.json and ICON_USAGE.md.
 * New originals must be added to this fixed registry after semantic/source review.
 * Project fallback vectors are retained from test.7; they are not official assets.
 */
(function(root){'use strict';
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ELEMENT_LABELS=Object.freeze({glacio:'冷凝',fusion:'热熔',electro:'导电',aero:'气动',spectro:'衍射',havoc:'湮灭'});
const ELEMENT_PATHS=Object.freeze({
 glacio:'M12 2v20M3.34 7l17.32 10M3.34 17L20.66 7M8.5 4.5L12 8l3.5-3.5M8.5 19.5L12 16l3.5 3.5M3.8 11.3l4.8-1.2-1.2-4.8M20.2 12.7l-4.8 1.2 1.2 4.8M3.8 12.7l4.8 1.2-1.2 4.8M20.2 11.3l-4.8-1.2 1.2-4.8',
 fusion:'M13 2c1 5-4 5-3 9 1-1 3-2 4-4 4 4 6 8 3 12-2 3-8 3-11 0-4-5 0-10 3-13-1 4 1 4 1 4M12 13c-3 3-4 5-1 7 3 1 5-2 3-4',
 electro:'M14 2L5 13h6l-1 9 9-13h-6zM3 6h4M18 19h3',
 aero:'M3 9h11c5 0 5-7 1-7-2 0-3 1-3 3M2 13h17c4 0 4 6 0 6-2 0-2-1-2-2M5 17h5c4 0 4 5 1 5',
 spectro:'M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3zM12 7v10M7 12h10',
 havoc:'M18 4a10 10 0 1 0 3 13c-4 2-9 1-11-2-3-4 1-9 5-7 3 1 3 5 0 6-2 0-3-2-1-3M17 2l1 4 4 1'
});
const ROLE_PATHS=Object.freeze({
 '击破':'M12 2l8 4-2 11-6 5-6-5L4 6zM15 4l-6 7 6 1-6 8',
 '伤害':'M4 3l12 12M3 7l4-4M14 14l7 7M3 21L21 3M17 3h4v4',
 '保护':'M12 2l9 4-2 11-7 5-7-5L3 6zM12 7v10M7 12h10',
 '协同':'M9 8L6 5a4 4 0 0 0-5 6l7 7a4 4 0 0 0 6-5M15 16l3 3a4 4 0 0 0 5-6l-7-7a4 4 0 0 0-6 5M8 8l8 8',
 '范围':'M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5M8 8l-5-5M16 8l5-5M8 16l-5 5M16 16l5 5',
 '支援':'M8 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM18 12v10M13 17h10',
 '治疗':'M9 3h6v6h6v6h-6v6H9v-6H3V9h6z',
 '归群':'M2 2l6 6M2 6V2h4M22 2l-6 6M18 2h4v4M2 22l6-6M2 18v4h4M22 22l-6-6M18 22h4v-4M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0',
 '异常':'M12 2l8 5v10l-8 5-8-5V7zM8 9l2 2-2 2M16 9l-2 2 2 2M9 17h6',
 '连击':'M2 4l7 8-7 8M9 4l7 8-7 8M16 4l7 8-7 8',
 '持续':'M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9M12 6v6l5 3',
 '控序':'M7 3v18M3 7l4-4 4 4M17 21V3M13 17l4 4 4-4',
 '爆发':'M12 1l2 7 6-4-3 7 6 1-6 3 4 6-7-4-2 6-2-7-7 4 4-7-6-1 7-2-4-6 7 3z',
 '形态':'M12 2l10 10-10 10L2 12zM12 2v20M7 12h10',
 '转换':'M3 10a9 9 0 0 1 15-6l3 3M21 2v5h-5M21 14a9 9 0 0 1-15 6l-3-3M3 22v-5h5',
 '供SP':'M8 3h8v3h4v15H4V6h4zM13 8l-5 6h4l-1 5 5-7h-4z'
});

const ORIGINALS=Object.freeze({
 element:Object.freeze({
  glacio:Object.freeze({src:'assets/ui-icons/T_IconElementIce1_UI.webp',sourceName:'冷凝属性'}),
  fusion:Object.freeze({src:'assets/ui-icons/T_IconElementFire1_UI.webp',sourceName:'热熔属性'}),
  electro:Object.freeze({src:'assets/ui-icons/T_IconElementThunder1_UI.webp',sourceName:'导电属性'}),
  aero:Object.freeze({src:'assets/ui-icons/T_IconElementWind1_UI.webp',sourceName:'气动属性'}),
  spectro:Object.freeze({src:'assets/ui-icons/T_IconElementLight1_UI.webp',sourceName:'衍射属性'}),
  havoc:Object.freeze({src:'assets/ui-icons/T_IconElementDark1_UI.webp',sourceName:'湮灭属性'})
 }),
 role:Object.freeze({'治疗':Object.freeze({src:'assets/ui-icons/SP_RoleLabelA1.webp',sourceName:'生存治疗'})}),
 // A role label or a character-specific skill is not automatically a status icon.
 stat:Object.freeze({
  hp:Object.freeze({src:'assets/ui-icons/T_Iconpropertygreenlife_UI.webp',sourceName:'生命值'}),
  atk:Object.freeze({src:'assets/ui-icons/T_Iconpropertyredattack_UI.webp',sourceName:'攻击力'}),
  def:Object.freeze({src:'assets/ui-icons/T_Iconpropertygreendefense_UI.webp',sourceName:'防御力'}),
  cr:Object.freeze({src:'assets/ui-icons/T_Iconpropertyredbaoji_UI.webp',sourceName:'暴击率'}),
  cdmg:Object.freeze({src:'assets/ui-icons/T_Iconpropertyredcrit_UI.webp',sourceName:'暴击伤害'}),
  er:Object.freeze({src:'assets/ui-icons/T_Iconpropertygreenenergy_UI.webp',sourceName:'共鸣效率'})
 }),
 status:Object.freeze({shield:Object.freeze({src:'assets/ui-icons/T_Iconpropertygreenprotect_UI.webp',sourceName:'护盾值'})}),
 weapon:Object.freeze({}),control:Object.freeze({})
});
const STAT_LABELS=Object.freeze({hp:'生命值',sp:'SP',atk:'攻击力',def:'防御力',spd:'SPD',cr:'暴击率',cdmg:'暴击伤害',er:'共鸣效率'});
const STATUS_LABELS=Object.freeze({shield:'护盾',guard:'防御',barrier:'护盾',fusion_burst:'聚爆',spectro_frazzle:'光噪',aero_erosion:'风蚀',electro_flare:'电磁',havoc_bane:'虚湮',denia_group:'归群',charge:'蓄力',aim:'瞄准'});
const NEUTRAL='M12 3l9 9-9 9-9-9zM12 8v5M12 17h.01';
function describe(kind,key){
 kind=String(kind||'');key=String(key??'');if(kind==='stat')key=key.toLowerCase();
 const group=own(ORIGINALS,kind)?ORIGINALS[kind]:null,original=group&&own(group,key)?group[key]:null;
 const label=kind==='element'&&own(ELEMENT_LABELS,key)?ELEMENT_LABELS[key]:kind==='stat'&&own(STAT_LABELS,key)?STAT_LABELS[key]:kind==='status'&&own(STATUS_LABELS,key)?STATUS_LABELS[key]:key||'未指定图标';
 const paths=kind==='element'?ELEMENT_PATHS:kind==='role'?ROLE_PATHS:null;
 return Object.freeze({kind,key,label,src:original?.src||null,sourceName:original?.sourceName||null,renderer:original?'wuwa-original':'project-fallback',fallbackPath:paths&&own(paths,key)?paths[key]:NEUTRAL,fallbackReason:original?'原图加载失败时使用同语义项目备用图标':'未核实同语义原作图标，保留项目备用图标'});
}
function html(kind,key,options={}){
 if(!options||typeof options!=='object')options={};
 const item=describe(kind,key),label=String(options.label??item.label),title=String(options.title??(item.sourceName?label+' · 鸣潮原图：'+item.sourceName:label));
 const classes=String(options.className||'').split(/\s+/).filter(x=>/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(x)).join(' ');
 const safeKind=own(ORIGINALS,item.kind)?item.kind:'unknown',a11y=options.decorative?' aria-hidden="true"':` role="img" aria-label="${esc(label)}"`;
 const fallback=options.fallbackText!==undefined?`<span class="ui-icon__fallback ui-icon__text" aria-hidden="true">${esc(String(options.fallbackText).slice(0,16))}</span>`:`<svg class="ui-icon__fallback" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${item.fallbackPath}"></path></svg>`;
 const picture=item.src?`<img class="ui-icon__image" data-ui-original="true" src="${item.src}" alt="${options.decorative?'':esc(label+'（'+item.sourceName+'）')}" aria-hidden="true" width="128" height="128" decoding="async" draggable="false">`:'';
 return `<span class="ui-icon ui-icon--${safeKind}${classes?' '+classes:''}" data-ui-icon-kind="${safeKind}" data-ui-icon-key="${esc(item.key)}" data-ui-renderer="${item.renderer}" data-ui-state="${item.src?'loading':'fallback'}" data-ui-title="${esc(title)}" title="${esc(title)}"${a11y}>${fallback}${picture}</span>`;
}
function imageState(image,loaded){
 if(!image?.matches?.('img.ui-icon__image[data-ui-original="true"]'))return;
 const host=image.parentElement;if(!host?.classList.contains('ui-icon'))return;
 host.dataset.uiState=loaded?'loaded':'error';
 host.dataset.uiRenderer=loaded?'wuwa-original':'project-fallback';
 host.title=host.dataset.uiTitle+(loaded?'':'（原图加载失败，使用备用图标）');
}
function hydrate(container=root.document){
 if(!container?.querySelectorAll)return;
 for(const image of container.querySelectorAll('img.ui-icon__image[data-ui-original="true"]')){
  if(image.complete)imageState(image,image.naturalWidth>0);
 }
}
// Capture works for non-bubbling image events and dynamically replaced dialog HTML.
if(root.document){
 root.document.addEventListener('load',e=>imageState(e.target,true),true);
 root.document.addEventListener('error',e=>imageState(e.target,false),true);
 if(root.document.readyState==='loading')root.document.addEventListener('DOMContentLoaded',()=>hydrate(),{once:true});else hydrate();
}
const api=Object.freeze({html,describe,hydrate,keys:kind=>Object.freeze(Object.keys(own(ORIGINALS,kind)?ORIGINALS[kind]:{})),element:(key,options)=>html('element',key,options),role:(key,options)=>html('role',key,options),stat:(key,options)=>html('stat',key,options),status:(key,options)=>html('status',key,options)});
root.UiIcons=api;if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
