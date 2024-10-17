import{_ as Z,d as $,c as ee,b as ue,r as c,y as ae,e as v,o,h as m,q as B,g as _,i as r,w as l,F as p,E as f,f as F,B as g,z as b,A as E,ah as le,M as q}from"./index.c5b6faf2.js";import{p as te,g as re,h as oe,a as ne,q as de,r as ie}from"./intelligence.a10604ee.js";import{A as se,B as ce,C as ve,D as me}from"./commonData.8892e613.js";const pe={class:"apply detail-base intelligenc"},fe={ref:"mainHeight",class:"bg-wt min-steph height"},Fe={class:"dialog-form"},ge=$({__name:"details",setup(be){const k=ee(),y=ue(),D=c(null),e=c({alertEffectivePeriod:["00:00:00","23:59:59"],status:1}),P=c([]);c(["00:00:00","23:59:59"]);const w=c(null),N=c([]),A=c([]),C=c();c({});const h=c({});c({pageSize:100,currentPage:1});const S={productKey:[{required:!0,message:"\u6240\u5C5E\u4EA7\u54C1\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u6240\u5C5E\u4EA7\u54C1",type:"error",trigger:"change"}],moduleId:[{required:!0,message:"\u6A21\u5757\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u6A21\u5757",type:"error",trigger:"change"}],functionId:[{required:!0,message:"\u529F\u80FD\u540D\u79F0\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u529F\u80FD\u540D\u79F0",type:"error",trigger:"change"}],iotId:[{required:!0,message:"\u5173\u8054\u8BBE\u5907\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u5173\u8054\u8BBE\u5907",type:"error",trigger:"change"}],alertRuleName:[{required:!0,message:"\u62A5\u8B66\u89C4\u5219\u540D\u79F0\u4E3A\u7A7A\uFF0C\u8BF7\u8F93\u5165\u62A5\u8B66\u89C4\u5219\u540D\u79F0",type:"error",trigger:"blur"}],operator:[{required:!0,message:"\u8FD0\u7B97\u7B26\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u8FD0\u7B97\u7B26",type:"error",trigger:"change"}],value:[{required:!0,message:"\u9608\u503C\u4E3A\u7A7A\uFF0C\u8BF7\u8F93\u5165\u9608\u503C",type:"error",trigger:"change"}],duration:[{required:!0,message:"\u6301\u7EED\u5468\u671F\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u6301\u7EED\u5468\u671F",type:"error",trigger:"change"}],alertDataType:[{required:!0,message:"\u6570\u636E\u805A\u5408\u5468\u671F\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u6570\u636E\u805A\u5408\u5468\u671F",type:"error",trigger:"change"}],alertEffectivePeriod:[{required:!0,message:"\u62A5\u8B66\u751F\u6548\u65F6\u6BB5\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u62A5\u8B66\u751F\u6548\u65F6\u6BB5",type:"error",trigger:"change"}],alertSilentPeriod:[{required:!0,message:"\u62A5\u8B66\u6C89\u9ED8\u5468\u671F\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u62A5\u8B66\u6C89\u9ED8\u5468\u671F",type:"error",trigger:"change"}]};ae(()=>{k.query.id&&(D.value=k.query.id,K()),R()});const K=async()=>{const t=await te(D.value);t.code===200&&(e.value=t.data,e.value.duration=String(e.value.duration),console.log(e.value.alertEffectivePeriod),e.value.alertEffectivePeriod=e.value.alertEffectivePeriod.split("~"),V(e.value.productKey),I(e.value.productKey))},x=()=>{console.log(e.value),w.value.validate().then(async t=>{if(t===!0){const a=e.value.alertSilentPeriod;typeof a=="number"?e.value.alertSilentPeriod=a:e.value.alertSilentPeriod=Number(le(a)),e.value.alertEffectivePeriod=e.value.alertEffectivePeriod.join("~"),e.value={...e.value,alertSilentPeriod:e.value.alertSilentPeriod,alertDataType:Number(e.value.alertDataType),duration:typeof a=="number"?e.value.duration:Number(e.value.duration),value:Number(e.value.value)},D.value?(await de(e.value)).code===200&&(q.success("\u7F16\u8F91\u6210\u529F"),y.push({path:"/intelligence/rule"})):(await ie(e.value)).code===200&&(q.success("\u6DFB\u52A0\u6210\u529F"),y.push({path:"/intelligence/rule"}))}})},R=async()=>{const t=await re();t.code===200&&(P.value=t.data)},V=async t=>{const a={...h.value,productKey:t},n=await oe(a);if(n.code===200&&n.data!==void 0){const i=JSON.parse(n.data.thingModelJson);A.value=[];const s={functionBlockId:"-1",functionBlockName:"\u9ED8\u8BA4\u6A21\u5757"};i.functionBlocks!==void 0&&(A.value=i.functionBlocks),N.value=i.properties,A.value.unshift(s)}},I=async t=>{const n=await ne({pageSize:100,pageNum:1,productKey:t});if(n.data){C.value=n.data.records;const i={id:"-1",iotId:"-1",deviceName:"\u5168\u90E8\u8BBE\u5907"};C.value.unshift(i)}},O=(t,a)=>{e.value.productName=a.selectedOptions[0].label,e.value.productKey=t,V(t),I(t),delete e.value.functionId},U=(t,a)=>{e.value.moduleName=a.selectedOptions[0].label,t!=="-1"?h.value.functionBlockId=a.selectedOptions[0].value:delete h.value.functionBlockId,V(e.value.productKey)},T=(t,a)=>{e.value.functionName=a.selectedOptions[0].label},j=(t,a)=>{e.value.deviceName=a.selectedOptions[0].label},z=(t,a)=>{a.selectedOptions[0].key>4?e.value.remark=a.selectedOptions[0].value*60:e.value.remark=a.selectedOptions[0].value},L=t=>{e.value.alertEffectivePeriod=t},M=()=>{y.go(-1)};return(t,a)=>{const n=v("t-option"),i=v("t-select"),s=v("t-form-item"),H=v("t-radio"),J=v("t-radio-group"),G=v("t-input"),Q=v("t-input-number"),W=v("t-time-range-picker"),X=v("t-card"),Y=v("t-form");return o(),m(p,null,[B("div",pe,[_(" end "),B("div",fe,[B("div",Fe,[_(" \u57FA\u672C\u4FE1\u606F "),r(Y,{ref_key:"form",ref:w,data:e.value,rules:S,"label-width":108},{default:l(()=>[r(X,{title:"\u62A5\u8B66\u89C4\u5219"},{default:l(()=>[r(s,{label:"\u6240\u5C5E\u4EA7\u54C1\uFF1A",name:"productKey"},{default:l(()=>[r(i,{modelValue:e.value.productKey,"onUpdate:modelValue":a[0]||(a[0]=u=>e.value.productKey=u),clearable:"",filterable:"",placeholder:"\u8BF7\u9009\u62E9",class:"wt-300",onChange:O},{default:l(()=>[(o(!0),m(p,null,f(P.value,(u,d)=>(o(),F(n,{key:d,value:u.productKey,label:u.productName,title:""},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1}),r(s,{label:"\u6A21\u5757\uFF1A",name:"moduleId"},{default:l(()=>[r(i,{modelValue:e.value.moduleId,"onUpdate:modelValue":a[1]||(a[1]=u=>e.value.moduleId=u),clearable:"",filterable:"",placeholder:"\u8BF7\u9009\u62E9",class:"wt-300",disabled:e.value.productKey===void 0,onChange:U},{default:l(()=>[(o(!0),m(p,null,f(A.value,(u,d)=>(o(),F(n,{key:d,value:u.functionBlockId,label:u.functionBlockName,title:""},{default:l(()=>[g(b(u.functionBlockName),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1}),r(s,{label:"\u529F\u80FD\u540D\u79F0\uFF1A",name:"functionId"},{default:l(()=>[r(i,{modelValue:e.value.functionId,"onUpdate:modelValue":a[2]||(a[2]=u=>e.value.functionId=u),clearable:"",filterable:"",placeholder:"\u8BF7\u9009\u62E9",class:"wt-300",disabled:e.value.moduleId===void 0,onChange:T},{default:l(()=>[(o(!0),m(p,null,f(N.value,(u,d)=>(o(),F(n,{key:d,value:u.identifier,label:u.name,title:""},{default:l(()=>[g(b(u.name),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1}),r(s,{label:"\u5173\u8054\u8BBE\u5907\uFF1A",name:"iotId"},{default:l(()=>[r(i,{modelValue:e.value.iotId,"onUpdate:modelValue":a[3]||(a[3]=u=>e.value.iotId=u),clearable:"",filterable:"",placeholder:"\u8BF7\u9009\u62E9",class:"wt-300",disabled:e.value.productKey===void 0,onChange:j},{default:l(()=>[(o(!0),m(p,null,f(C.value,(u,d)=>(o(),F(n,{key:d,value:u.iotId,label:u.deviceName,title:""},{default:l(()=>[g(b(u.deviceName),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1}),r(s,{label:"\u62A5\u8B66\u6570\u636E\u7C7B\u578B\uFF1A",name:"alertDataType"},{default:l(()=>[r(J,{modelValue:e.value.alertDataType,"onUpdate:modelValue":a[4]||(a[4]=u=>e.value.alertDataType=u),onChange:t.handleRadio},{default:l(()=>[(o(!0),m(p,null,f(E(se),(u,d)=>(o(),F(H,{key:d,value:u.id},{default:l(()=>[g(b(u.value),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue","onChange"])]),_:1}),r(s,{label:"\u62A5\u8B66\u89C4\u5219\u540D\u79F0\uFF1A",name:"alertRuleName"},{default:l(()=>[r(G,{modelValue:e.value.alertRuleName,"onUpdate:modelValue":a[5]||(a[5]=u=>e.value.alertRuleName=u),placeholder:"\u8BF7\u8F93\u5165",class:"wt-300","show-limit-number":"",maxlength:20},null,8,["modelValue"])]),_:1}),r(s,{label:"\u6301\u7EED\u5468\u671F\uFF1A",name:"duration"},{default:l(()=>[r(i,{modelValue:e.value.duration,"onUpdate:modelValue":a[6]||(a[6]=u=>e.value.duration=u),clearable:"",filterable:"",placeholder:"\u8BF7\u9009\u62E9",class:"wt-300"},{default:l(()=>[(o(!0),m(p,null,f(E(ce),(u,d)=>(o(),F(n,{key:d,value:u.value,label:u.label,title:""},{default:l(()=>[g(b(u.label),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1}),_(" TODO \u6682\u65F6\u5E72\u6389"),_(` <t-form-item label="\u7EDF\u8BA1\u5B57\u6BB5\uFF1A" name="statisticField">\r
              <t-select\r
                v-model="formData.statisticField"\r
                clearable\r
                filterable\r
                placeholder="\u8BF7\u9009\u62E9"\r
                class="wt-300"\r
              >\r
                <t-option\r
                  v-for="(item, index) in statistFicalData"\r
                  :key="index"\r
                  :value="item.value"\r
                  :label="item.value"\r
                  title=""\r
                >\r
                  {{ item.value }}\r
                </t-option>\r
              </t-select>\r
            </t-form-item> `),r(s,{label:"\u8FD0\u7B97\u7B26\uFF1A",name:"operator"},{default:l(()=>[r(i,{modelValue:e.value.operator,"onUpdate:modelValue":a[7]||(a[7]=u=>e.value.operator=u),clearable:"",filterable:"",placeholder:"\u8BF7\u9009\u62E9",class:"wt-300"},{default:l(()=>[(o(!0),m(p,null,f(E(ve),(u,d)=>(o(),F(n,{key:d,value:u.value,label:u.value,title:""},{default:l(()=>[g(b(u.value),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1}),r(s,{label:"\u9608\u503C\uFF1A",name:"value"},{default:l(()=>[r(Q,{modelValue:e.value.value,"onUpdate:modelValue":a[8]||(a[8]=u=>e.value.value=u),step:1,placeholder:"0.0","decimal-places":1},null,8,["modelValue"])]),_:1}),r(s,{label:"\u62A5\u8B66\u751F\u6548\u65F6\u6BB5\uFF1A",name:"alertEffectivePeriod"},{default:l(()=>[r(W,{modelValue:e.value.alertEffectivePeriod,"onUpdate:modelValue":a[9]||(a[9]=u=>e.value.alertEffectivePeriod=u),class:"wt-300",clearable:"",format:"HH:mm:ss","allow-input":"",onPick:L},null,8,["modelValue"])]),_:1}),r(s,{label:"\u62A5\u8B66\u6C89\u9ED8\u5468\u671F\uFF1A",name:"alertSilentPeriod"},{default:l(()=>[r(i,{modelValue:e.value.alertSilentPeriod,"onUpdate:modelValue":a[10]||(a[10]=u=>e.value.alertSilentPeriod=u),clearable:"",filterable:"",placeholder:"\u8BF7\u9009\u62E9",class:"wt-300",onChange:z},{default:l(()=>[(o(!0),m(p,null,f(E(me),(u,d)=>(o(),F(n,{key:d,value:u.value,label:u.id>=4?u.value+"\u5C0F\u65F6":u.value+"\u5206\u949F",title:""},{default:l(()=>[g(b(u.id>=4?u.value+"\u5C0F\u65F6":u.value+"\u5206\u949F"),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["data"]),_(" end ")])],512)]),B("div",{class:"boxBottom fx fx-ct bg-wt"},[B("button",{class:"bt-grey wt-60",onClick:M},"\u8FD4\u56DE"),B("button",{class:"bt wt-60",theme:"primary",onClick:x},"\u63D0\u4EA4")])],64)}}});var Ee=Z(ge,[["__scopeId","data-v-89f27296"],["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/intelligence/warn/details.vue"]]);export{Ee as default};