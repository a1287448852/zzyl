import{d as h,e as i,o,h as g,g as u,i as c,w as d,q as e,z as s,A as B,a2 as E,F,_ as b,p,m as f,n as k,c as C,b as z,r as $,y as x,P as I,f as y}from"./index.c5b6faf2.js";import{A as N}from"./serve.04eebc9f.js";const _=a=>(p("data-v-0c858a12"),a=a(),f(),a),S={class:"info-block"},T={class:"info-item"},P=_(()=>e("h1",{class:"label-wt-long"},"\u8001\u4EBA\u59D3\u540D\uFF1A",-1)),R={class:"info-item"},O=_(()=>e("h1",{class:"label-wt-long"},"\u62A4\u7406\u7B49\u7EA7\uFF1A",-1)),V={class:"info-item"},q=_(()=>e("h1",{class:"label-wt-long"},"\u6027\u522B\uFF1A",-1)),L={class:"info-item"},M=_(()=>e("h1",{class:"label-wt-long"},"\u5E74\u9F84\uFF1A",-1)),G={class:"info-item"},H=_(()=>e("h1",{class:"label-wt-long"},"\u5E8A\u4F4D\u53F7\uFF1A",-1)),J={class:"info-item"},K=_(()=>e("h1",{class:"label-wt-long"},"\u62A4\u7406\u5458\u59D3\u540D\uFF1A",-1)),Q={class:"info-item headImg"},U={class:"img"},W={class:"tdesign-demo-image-viewer__ui-image"},X=["src"],Y=["onClick"],Z=h({__name:"BaseInfo",props:{baseData:{type:Object,default:()=>({})}},setup(a){return(r,v)=>{const t=i("t-image-viewer"),l=i("t-card");return o(),g(F,null,[u(" \u57FA\u672C\u4FE1\u606F "),c(l,{title:"\u57FA\u672C\u4FE1\u606F"},{default:d(()=>[e("div",S,[e("div",T,[P,e("span",null,s(a.baseData.elderName||"--"),1)]),e("div",R,[O,e("span",null,s(a.baseData.lname||"--"),1)]),e("div",V,[q,e("span",null,s(a.baseData.sex?"\u5973":"\u7537"),1)]),e("div",L,[M,e("span",null,s(a.baseData.age||"--"),1)]),e("div",G,[H,e("span",null,s(a.baseData.bedNumber),1)]),e("div",J,[K,e("span",null,s(a.baseData.nursingName?a.baseData.nursingName.join(","):"--"),1)]),e("div",Q,[e("span",U,[c(t,{images:[a.baseData.image||"https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/61032c27-43eb-49cc-86df-ba8cbeb2c27d.png"]},{trigger:d(({open:m})=>[e("div",W,[e("img",{alt:"test",src:a.baseData.image||"https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/61032c27-43eb-49cc-86df-ba8cbeb2c27d.png",class:"tdesign-demo-image-viewer__ui-image--img"},null,8,X),e("div",{class:"tdesign-demo-image-viewer__ui-image--hover",onClick:m},[e("span",null,[c(B(E),{size:"1.8em"})])],8,Y)])]),_:1},8,["images"])])])])]),_:1})],2112)}}});var ee=b(Z,[["__scopeId","data-v-0c858a12"],["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/serve/task/components/BaseInfo.vue"]]);const n=a=>(p("data-v-16c25646"),a=a(),f(),a),ae={class:"info-block"},se={class:"info-item"},te=n(()=>e("h1",{class:"label-wt-long"},"\u62A4\u7406\u9879\u76EE\u540D\u79F0\uFF1A",-1)),ue={class:"info-item"},ce=n(()=>e("h1",{class:"label-wt-long"},"\u5173\u8054\u5355\u636E\uFF1A",-1)),ne={class:"info-item"},oe=n(()=>e("h1",{class:"label-wt-long"},"\u6267\u884C\u72B6\u6001\uFF1A",-1)),le={class:"info-item"},ie=n(()=>e("h1",{class:"label-wt-long"},"\u9879\u76EE\u7C7B\u578B\uFF1A",-1)),de={class:"info-item"},_e=n(()=>e("h1",{class:"label-wt-long"},"\u521B\u5EFA\u4EBA\uFF1A",-1)),re={class:"info-item"},ve=n(()=>e("h1",{class:"label-wt-long"},"\u521B\u5EFA\u65F6\u95F4\uFF1A",-1)),me={class:"info-item"},he=n(()=>e("h1",{class:"label-wt-long"},"\u671F\u671B\u670D\u52A1\u65F6\u95F4\uFF1A",-1)),ge={class:"info-item"},Fe=n(()=>e("h1",{class:"label-wt-long"},"\u5907\u6CE8\u4FE1\u606F\uFF1A",-1)),be=h({__name:"serveProject",props:{baseData:{type:Object,default:()=>({})}},setup(a){return(r,v)=>{const t=i("t-card");return o(),g(F,null,[u(" \u62A4\u7406\u9879\u76EE "),c(t,{title:"\u62A4\u7406\u9879\u76EE",class:k(a.baseData.status===1?"noBottomLine":"")},{default:d(()=>[e("div",ae,[e("div",se,[te,e("span",null,s(a.baseData.projectName),1)]),e("div",ue,[ce,e("span",null,s(a.baseData.relNo),1)]),e("div",ne,[oe,e("span",null,s(a.baseData.status===1?"\u5F85\u6267\u884C":a.baseData.status===2?"\u5DF2\u6267\u884C":"\u5DF2\u53D6\u6D88"),1)]),e("div",le,[ie,e("span",null,s(a.baseData.taskType===2?"\u62A4\u7406\u8BA1\u5212\u5185":"\u62A4\u7406\u8BA1\u5212\u5916"),1)]),e("div",de,[_e,e("span",null,s(a.baseData.taskType===2?"\u7CFB\u7EDF":a.baseData.creator),1)]),e("div",re,[ve,e("span",null,s(a.baseData.createTime),1)]),e("div",me,[he,e("span",null,s(a.baseData.estimatedServerTime),1)]),e("div",ge,[Fe,e("span",null,s(a.baseData.remark||"--"),1)])])]),_:1},8,["class"])],2112)}}});var pe=b(be,[["__scopeId","data-v-16c25646"],["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/serve/task/components/serveProject.vue"]]);const D=a=>(p("data-v-66e08dc9"),a=a(),f(),a),fe={class:"info-block"},De={class:"info-item"},Ae=D(()=>e("h1",{class:"label-wt-long"},"\u6267\u884C\u4EBA\uFF1A",-1)),$e={class:"info-item"},we=D(()=>e("h1",{class:"label-wt-long"},"\u6267\u884C\u65F6\u95F4\uFF1A",-1)),ye={class:"info-item"},Be=D(()=>e("h1",{class:"label-wt-long"},"\u6267\u884C\u56FE\u7247\uFF1A",-1)),Ee={class:"img"},je={class:"tdesign-demo-image-viewer__ui-image"},ke=["src"],Ce=["onClick"],ze={class:"info-item"},xe=D(()=>e("h1",{class:"label-wt-long"},"\u6267\u884C\u8BB0\u5F55\uFF1A",-1)),Ie=h({__name:"excuteAccord",props:{baseData:{type:Object,default:()=>({})}},setup(a){return(r,v)=>{const t=i("t-image-viewer"),l=i("t-card");return o(),g(F,null,[u(" \u6267\u884C\u8BB0\u5F55s\u4FE1\u606F "),c(l,{title:"\u6267\u884C\u8BB0\u5F55"},{default:d(()=>[e("div",fe,[e("div",De,[Ae,e("span",null,s(a.baseData.updater),1)]),e("div",$e,[we,e("span",null,s(a.baseData.realServerTime||"--"),1)]),e("div",ye,[Be,e("span",Ee,[c(t,{images:[a.baseData.taskImage]},{trigger:d(({open:m})=>[e("div",je,[e("img",{alt:"test",src:a.baseData.taskImage,class:"tdesign-demo-image-viewer__ui-image--img"},null,8,ke),e("div",{class:"tdesign-demo-image-viewer__ui-image--hover",onClick:m},[e("span",null,[c(B(E),{size:"1.8em"})])],8,Ce)])]),_:1},8,["images"])])]),e("div",ze,[xe,e("span",null,s(a.baseData.mark),1)])])]),_:1})],2112)}}});var Ne=b(Ie,[["__scopeId","data-v-66e08dc9"],["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/serve/task/components/excuteAccord.vue"]]);const w=a=>(p("data-v-1f2fadad"),a=a(),f(),a),Se={class:"info-block"},Te={class:"info-item"},Pe=w(()=>e("h1",{class:"label-wt-long"},"\u53D6\u6D88\u4EBA\uFF1A",-1)),Re={class:"info-item"},Oe=w(()=>e("h1",{class:"label-wt-long"},"\u53D6\u6D88\u65F6\u95F4\uFF1A",-1)),Ve={class:"info-item"},qe=w(()=>e("h1",{class:"label-wt-long"},"\u53D6\u6D88\u539F\u56E0\uFF1A",-1)),Le=h({__name:"cancelAccord",props:{baseData:{type:Object,default:()=>({})}},setup(a){return(r,v)=>{const t=i("t-card");return o(),g(F,null,[u(" \u53D6\u6D88\u4FE1\u606F "),c(t,{title:"\u53D6\u6D88\u8BB0\u5F55"},{default:d(()=>[e("div",Se,[e("div",Te,[Pe,e("span",null,s(a.baseData.updater),1)]),e("div",Re,[Oe,e("span",null,s(a.baseData.updateTime),1)]),e("div",Ve,[qe,e("span",null,s(a.baseData.cancelReason),1)])])]),_:1})],2112)}}});var Me=b(Le,[["__scopeId","data-v-1f2fadad"],["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/serve/task/components/cancelAccord.vue"]]);const Ge={class:"detail-base"},He={class:"bg-wt min-steph"},Je=h({__name:"details",setup(a){const r=C(),v=z();$(0);const t=$({}),l=$("");x(()=>{l.value=r.query.id,m()});const m=async()=>{const A=await N({taskId:l.value});A.code===200&&(t.value=A.data,t.value.age=I(t.value.idCardNo).age)},j=()=>{v.push("/serve/arrange")};return(A,Ke)=>(o(),g(F,null,[e("div",Ge,[e("div",He,[u(" \u57FA\u672C\u4FE1\u606F "),c(ee,{"base-data":t.value},null,8,["base-data"]),u(" end "),u(" \u62A4\u7406\u9879\u76EE "),c(pe,{"base-data":t.value},null,8,["base-data"]),u(" end "),u(" \u6267\u884C\u8BB0\u5F55 "),e("div",null,[t.value.status===2?(o(),y(Ne,{key:0,"base-data":t.value},null,8,["base-data"])):u("v-if",!0)]),u(" end "),u(" end "),u(" \u53D6\u6D88\u8BB0\u5F55 "),e("div",null,[t.value.cancelReason?(o(),y(Me,{key:0,"base-data":t.value},null,8,["base-data"])):u("v-if",!0)]),u(" end ")])]),e("div",{class:"boxBottom fx fx-ct bg-wt"},[e("button",{class:"bt-grey wt-60",onClick:j},"\u8FD4\u56DE")])],64))}});var We=b(Je,[["__scopeId","data-v-33d91f88"],["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/serve/task/details.vue"]]);export{We as default};