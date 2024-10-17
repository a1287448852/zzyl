import{d as q,r as l,C as L,o as b,h as y,q as o,F as Z,E as ee,n as $,Y as fe,B as H,z as T,g as d,_ as U,Z as Oe,e as I,i as v,f as pe,u as be,w as k,x as Je,A as se,b as Me,c as Ke,y as Pe,$ as Ge,a0 as Ye,M as P}from"./index.c5b6faf2.js";import{c as Ze,d as Qe,e as We,f as Xe,h as et,r as tt,i as lt,j as ot,k as at,l as ut,m as nt,n as st,o as dt,p as it,q as ct}from"./liveIn.c94c5d2b.js";import{N as de}from"./index.ea73f821.js";import{g as me}from"./date.a9e2d8fb.js";const rt={class:"headBox"},vt=["onClick"],ft=["onClick"],mt={key:0,class:"value"},pt=q({__name:"SwitchBartop",props:{data:{type:Array,default:[]},routeType:{type:String,default:null},floorIndex:{type:Number,default:0},bedSelectData:{type:Object,default:()=>({})}},emits:["changeId","handleFloorEdit","handleAdd"],setup(s,{expose:V,emit:E}){const u=s,F=E,_=l(0),h=l(!1);L(()=>u.floorIndex,C=>{h.value||u.routeType==="config"&&(_.value=C)});const g=(C,D)=>{h.value=!0,_.value=D,F("changeId",C,D,!0)},c=(C,D)=>{F("handleFloorEdit",C,D)},t=()=>{F("handleAdd")};return V({currentId:_}),(C,D)=>(b(),y("div",rt,[o("div",{class:$(["sw-box",s.routeType==="config"?"configTpye":""])},[(b(!0),y(Z,null,ee(s.data,(A,a)=>(b(),y("span",{key:a,class:$({title:!0,line:_.value==a}),onClick:fe(r=>g(A.id,a),["stop"])},[H(T(A.name),1),o("i",{class:"edit",onClick:fe(r=>c(A.id,a),["stop"])},null,8,ft),A.value?(b(),y("span",mt,T(A.value),1)):d("v-if",!0)],10,vt))),128)),s.routeType!=="config"?(b(),y("div",{key:0,class:"rText",onClick:t}," \u65B0\u589E\u697C\u5C42 ")):d("v-if",!0)],2)]))}});var bt=U(pt,[["__scopeId","data-v-c82b689c"],["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/liveIn/bed/houseType/components/SwitchBartop.vue"]]);const ht={class:"floorInfo"},yt=Oe('<ul><li class="bedIcon"><span class="leisureIcon"></span>\u7A7A\u95F2\u4E2D</li><li class="bedIcon"><span class="checkInIcon"></span>\u5DF2\u5165\u4F4F</li><li class="bedIcon"><span class="goOutIcon"></span>\u8BF7\u5047\u4E2D</li></ul>',1),Ft=q({__name:"FloorInfo",props:{routeType:{type:String,default:null}},emits:["handleAdd"],setup(s,{emit:V}){const E=V,u=()=>{E("handleAdd")};return(F,_)=>(b(),y("div",ht,[yt,s.routeType!=="config"?(b(),y("button",{key:0,class:"bt wt-88",onClick:u}," \u65B0\u589E\u623F\u95F4 ")):d("v-if",!0)]))}});var _t=U(Ft,[["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/liveIn/bed/houseType/components/FloorInfo.vue"]]);const gt={key:0},Ct={key:0,class:"houseList"},At={class:"title"},Bt={class:"lText"},Dt={class:"name"},kt={class:"num"},Et={key:0,class:"icon"},It=["onClick"],Vt=["onClick"],Nt=["onClick"],St=["onClick"],Tt={class:"bedList"},wt={key:0},jt={class:"bedIcon"},xt={class:"bedText"},Rt={key:0},$t={key:1},Lt=["onClick"],zt=["onClick"],Ht={key:1,class:"noData"},qt={key:1},Ut=q({__name:"List",props:{roomVoList:{type:Array},floorData:{type:Array},routeType:{type:String,default:null},bedSelectData:{type:Object,default:()=>({})}},emits:["handleEdit","handleDelete","handleAdd","handleBedEdit","handleCheck","handleRoomAdd","getBedInfo"],setup(s,{emit:V}){const E=s,u=V,F=l(""),_=l("");L(()=>E.roomVoList,a=>{if(E.routeType==="config"){const r=E.bedSelectData;console.log(r),a.length>0&&r&&a.forEach(f=>{f.floorId===r.floorId&&f.id===r.roomId&&(_.value=f.id,f.bedVoList.length>0&&f.bedVoList.forEach(n=>{n.id===r.bedId&&(F.value=n.id)}))})}});const h=(a,r)=>{(r.bedVoList&&r.bedVoList.length===0||r.bedStatus===0)&&u("handleDelete",a,r)},g=()=>{u("handleRoomAdd")},c=a=>{u("handleEdit",a)},t=a=>{u("handleCheck",a)},C=a=>{u("handleAdd",a)},D=a=>{a.bedStatus===0&&u("handleBedEdit",a.id)},A=(a,r)=>{F.value=r.id,_.value=r.roomId;const f={...a,...r,roomId:a.id,bedId:r.id};u("getBedInfo",f)};return(a,r)=>{const f=I("t-radio");return s.floorData.length?(b(),y("div",gt,[d(" \u5E8A\u4F4D\u63D0\u793A\u65B0\u589E\u623F\u95F4 "),v(_t,{routeType:s.routeType,onHandleAdd:g},null,8,["routeType"]),d(" end "),d(" \u623F\u95F4\u5217\u8868 "),s.roomVoList&&s.roomVoList.length?(b(),y("div",Ct,[(b(!0),y(Z,null,ee(s.roomVoList,(n,m)=>(b(),y("div",{key:m,class:"item"},[d(" \u623F\u95F4\u6807\u9898 "),o("div",At,[o("div",Bt,[o("span",Dt,T(n.code),1),o("span",kt,T(n.typeName),1),s.routeType!=="config"?(b(),y("div",Et,[o("span",{class:"edit",onClick:i=>c(n.id)},null,8,It),o("span",{class:$(["delect",n.bedVoList&&n.bedVoList.length>0?"forbidDelect":""]),onClick:i=>h(2,n)},null,10,Vt),o("span",{class:"check",onClick:i=>t(n.id)},null,8,Nt)])):d("v-if",!0)]),s.routeType!=="config"?(b(),y("span",{key:0,class:"add",onClick:i=>C(n.id)},null,8,St)):d("v-if",!0)]),d("  "),d(" \u5E8A\u4F4D\u5217\u8868 "),o("div",Tt,[n.bedVoList&&n.bedVoList.length?(b(),y("div",wt,[o("ul",null,[(b(!0),y(Z,null,ee(n.bedVoList,(i,w)=>(b(),y("li",{key:w,class:"leisure"},[o("div",jt,[o("span",{class:$(i.name?"checkInIcon":"leisureIcon")},null,2)]),o("div",xt,[o("p",null,"\u5E8A\u4F4D\u53F7\uFF1A"+T(i.bedNumber),1),s.routeType==="config"&&i.bedStatus===2||i.bedStatus===1&&i.name?(b(),y("p",Rt,T(i.name?i.name:"\u7A7A\u95F2"),1)):(b(),y("p",$t,"\u7A7A\u95F2"))]),o("div",{class:$(["bedHover",s.routeType!=="config"?"":"bedNoHover"])},[o("span",{class:$(["edit",i.bedStatus!==0?"forbidDelect":""]),onClick:S=>D(i)},null,10,Lt),d(" \u7B49\u8001\u4EBA\u529F\u80FD\u597D\u4E86\u540E\u518D\u52A0 "),d(" "),o("span",{class:$(["delect",i.bedStatus!==0?"forbidDelect":""]),onClick:S=>h(3,i)},null,10,zt)],2),d(" \u5E8A\u4F4D\u9009\u62E9\uFF0C\u7533\u8BF7\u5165\u4F4F\u914D\u7F6E\u9700\u8981\u9009\u62E9\u5E8A\u4F4D "),s.routeType==="config"?(b(),pe(f,{key:0,checked:F.value===i.id&&_.value===n.id,disabled:i.bedStatus!==0,class:"radio",onClick:S=>A(n,i)},null,8,["checked","disabled","onClick"])):d("v-if",!0),d(" end ")]))),128))])])):(b(),y("div",Ht,"\u5F53\u524D\u623F\u95F4\u6CA1\u6709\u5B89\u6392\u5E8A\u4F4D"))]),d(" end ")]))),128))])):(b(),y(Z,{key:1},[d(" end "),o("div",null,[v(de)])],2112))])):(b(),y("div",qt,[v(de)]))}}});var Ot=U(Ut,[["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/liveIn/bed/houseType/components/List.vue"]]);const Jt={class:"dialog-form"},Mt={class:"dialogCenter"},Kt=o("button",{class:"bt bt-grey wt-60",type:"reset"},"\u53D6\u6D88",-1),Pt=o("span",null,"\u5220\u9664",-1),Gt=[Pt],Yt=o("button",{theme:"primary",type:"submit",class:"bt wt-60"},[o("span",null,"\u786E\u5B9A")],-1),Zt=q({__name:"AddFloor",props:{visible:{type:Boolean,default:!1},roomVoList:{type:Array,default:()=>[]},data:{type:Object,default:()=>({})},minNumber:{type:Number,default:1},title:{type:String,default:"\u65B0\u589E"}},emits:["handleClose","fetchData","handleAdd","handleEdit","handleDelete"],setup(s,{expose:V,emit:E}){const u=s,F=E,_=be(),h=l("empty"),g=l(),c=l(!1),t=l({code:1}),C={name:[{required:!0,message:"\u697C\u5C42\u540D\u79F0\u4E3A\u7A7A\uFF0C\u8BF7\u8F93\u5165\u697C\u5C42\u540D\u79F0",type:"error",trigger:"blur"}],code:[{required:!0,message:"\u6392\u5E8F\u4E3A\u7A7A\uFF0C\u8BF7\u8F93\u5165\u6392\u5E8F",type:"error",trigger:"blur"}]},D=l();L(()=>u.visible,()=>{c.value=u.visible,D.value=u.title}),L(()=>u.data,m=>{t.value.id=m.id,t.value.name=m.name,t.value.code=m.code});const A=m=>{m.validateResult===!0&&(u.title==="\u65B0\u589E"?(t.value.id="",F("handleAdd",t.value)):F("handleEdit",t.value),_.setFloorInfo(JSON.parse(JSON.stringify(t.value))))},a=()=>{g.value.reset(),t.value.code=1},r=()=>{a(),F("handleClose")},f=()=>{Number(t.value.code)<=1&&(t.value.code=1)},n=m=>{u.roomVoList.length===0&&F("handleDelete",m)};return V({handleClear:a}),(m,i)=>{const w=I("t-input"),S=I("t-form-item"),z=I("t-input-number"),R=I("t-form"),x=I("t-dialog");return b(),y("div",Jt,[v(x,{visible:c.value,"onUpdate:visible":i[3]||(i[3]=B=>c.value=B),header:D.value+"\u697C\u5C42",footer:!1,"on-close":r},{body:k(()=>[d(" \u8868\u5355\u5185\u5BB9 "),o("div",Mt,[v(R,{ref_key:"form",ref:g,data:t.value,rules:C,"label-width":80,"on-cancel":"onClickCloseBtn","reset-type":h.value,onReset:r,onSubmit:A},{default:k(()=>[v(S,{label:"\u697C\u5C42\u540D\u79F0\uFF1A",name:"name"},{default:k(()=>[v(w,{modelValue:t.value.name,"onUpdate:modelValue":i[0]||(i[0]=B=>t.value.name=B),class:"wt-400",placeholder:"\u8BF7\u8F93\u5165",clearable:"","show-limit-number":"",maxlength:5},null,8,["modelValue"])]),_:1}),v(S,{label:"\u6392\u5E8F\uFF1A",name:"code"},{default:k(()=>[v(z,{modelValue:t.value.code,"onUpdate:modelValue":i[1]||(i[1]=B=>t.value.code=B),min:s.minNumber,"decimal-places":0,onBlur:f,onChange:f},null,8,["modelValue","min"])]),_:1}),v(S,{class:"dialog-footer"},{default:k(()=>[Kt,t.value.id?(b(),y("button",{key:0,class:$(["bt-red wt-60",s.roomVoList.length>0?"bt-forbid":""]),type:"button",onClick:i[2]||(i[2]=B=>n(t.value.id))},[...Gt],2)):d("v-if",!0),Yt]),_:1})]),_:1},8,["data","reset-type"])])]),_:1},8,["visible","header"])])}}});var Qt=U(Zt,[["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/liveIn/bed/houseType/components/AddFloor.vue"]]);const Wt={class:"dialog-form"},Xt={class:"dialogCenter"},el=o("div",null,[o("button",{class:"bt bt-grey wt-60",type:"reset"},"\u53D6\u6D88"),o("button",{theme:"primary",type:"submit",class:"bt wt-60"},[o("span",null,"\u786E\u5B9A")])],-1),tl=q({__name:"AddRoom",props:{visible:{type:Boolean,default:!1},houseTypeData:{type:Array,default:()=>[]},data:{type:Object,default:()=>({})},minNumber:{type:Number,default:1},title:{type:String,default:"\u65B0\u589E"},roomTypeData:{type:Array,default:()=>[]}},emits:["handleClose","fetchData","handleAdd","handleEdit"],setup(s,{expose:V,emit:E}){const u=s,F=E,_=l("empty"),h=l(),g=l(!1),c=l({code:"",sort:1,typeName:""}),t={code:[{required:!0,message:"\u623F\u95F4\u53F7\u4E3A\u7A7A\uFF0C\u8BF7\u8F93\u5165\u623F\u95F4\u53F7",type:"error",trigger:"blur"}],typeName:[{required:!0,message:"\u623F\u95F4\u7C7B\u578B\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u623F\u95F4\u7C7B\u578B",type:"error",trigger:"change"}],sort:[{required:!0,message:"\u6392\u5E8F\u4E3A\u7A7A\uFF0C\u8BF7\u8F93\u5165\u6392\u5E8F",type:"error",trigger:"blur"}]},C=l();L(u,f=>{g.value=f.visible,C.value=f.title}),L(()=>u.data,f=>{c.value.id=f.id,c.value.typeName=f.typeName,c.value.sort=f.sort,c.value.code=f.code});const D=f=>{f.validateResult===!0&&(u.title==="\u65B0\u589E"?F("handleAdd",c.value):F("handleEdit",c.value))},A=()=>{h.value.reset(),c.value.sort=1},a=()=>{A(),F("handleClose")},r=()=>{Number(c.value.sort)<=1&&(c.value.sort=1)};return V({handleClear:A}),(f,n)=>{const m=I("t-input"),i=I("t-form-item"),w=I("t-option"),S=I("t-select"),z=I("t-input-number"),R=I("t-form"),x=I("t-dialog");return b(),y("div",Wt,[v(x,{visible:g.value,"onUpdate:visible":n[3]||(n[3]=B=>g.value=B),header:C.value+"\u623F\u95F4",footer:!1,"on-close":a},{body:k(()=>[d(" \u8868\u5355\u5185\u5BB9 "),o("div",Xt,[v(R,{ref_key:"form",ref:h,data:c.value,rules:t,"label-width":80,"on-cancel":"onClickCloseBtn","reset-type":_.value,onReset:a,onSubmit:D},{default:k(()=>[v(i,{label:"\u623F\u95F4\u53F7\uFF1A",name:"code"},{default:k(()=>[v(m,{modelValue:c.value.code,"onUpdate:modelValue":n[0]||(n[0]=B=>c.value.code=B),class:"wt-400",placeholder:"\u8BF7\u8F93\u5165",clearable:"","show-limit-number":"",maxlength:5},null,8,["modelValue"])]),_:1}),v(i,{label:"\u623F\u95F4\u7C7B\u578B\uFF1A",name:"typeName"},{default:k(()=>[v(S,{modelValue:c.value.typeName,"onUpdate:modelValue":n[1]||(n[1]=B=>c.value.typeName=B),clearable:"",filterable:"",placeholder:"\u8BF7\u9009\u62E9"},{default:k(()=>[(b(!0),y(Z,null,ee(s.roomTypeData,(B,G)=>(b(),pe(w,{key:G,value:B.name,label:B.name,title:""},{default:k(()=>[H(T(B.name),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1}),v(i,{label:"\u6392\u5E8F\uFF1A",name:"sort"},{default:k(()=>[v(z,{modelValue:c.value.sort,"onUpdate:modelValue":n[2]||(n[2]=B=>c.value.sort=B),min:s.minNumber,"decimal-places":0,onBlur:r,onChange:r},null,8,["modelValue","min"])]),_:1}),v(i,{class:"dialog-footer"},{default:k(()=>[el]),_:1})]),_:1},8,["data","reset-type"])])]),_:1},8,["visible","header"])])}}});var ll=U(tl,[["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/liveIn/bed/houseType/components/AddRoom.vue"]]);const ol=[{title:"\u5E8A\u4F4D\u53F7",colKey:"bedNumber"},{title:"\u8001\u4EBA\u59D3\u540D",colKey:"name"},{title:"\u62A4\u7406\u7B49\u7EA7",colKey:"lname"},{title:"\u5165\u4F4F\u671F\u9650",width:210,colKey:"checkInConfigVo"}],al={class:"dialogBox dialogTable roomDialog"},ul={class:"roomDetails"},nl={class:"font-bt5"},sl={key:0,class:"footInfo"},dl=q({__name:"CheckRoom",props:{data:{type:Object,default:()=>({})},dialogVisible:{type:Boolean,default:!1}},emits:["handleClose"],setup(s,{emit:V}){const E=s,u=V,F=l(null),_=l(!1),h=l(!1),g=l(!1),c=l("loading-custom"),t=a=>"\u5DF2\u7ECF\u5230\u5E95\u4E86",C=Je(()=>c.value==="loading-custom"?t:c.value);L(()=>E.dialogVisible,a=>{_.value=E.dialogVisible});const D=a=>{const{scrollTop:r,clientHeight:f,scrollHeight:n}=a.e.target;r+f===n?(c.value="loading-custom",g.value=!0,h.value=!0):(g.value=!1,h.value=!1)},A=()=>{_.value=!1,u("handleClose")};return(a,r)=>{const f=I("t-table"),n=I("t-dialog");return b(),y("div",al,[v(n,{visible:_.value,"onUpdate:visible":r[1]||(r[1]=m=>_.value=m),header:"\u623F\u95F4\u8BE6\u60C5","on-close":A,footer:!1,onCloseBtnClick:A},{default:k(()=>[o("div",null,[o("div",ul,[o("ul",null,[o("li",null,[H(" \u623F\u95F4\u53F7\uFF1A"),o("label",null,T(s.data.code),1)]),o("li",null,[H(" \u623F\u95F4\u7C7B\u578B\uFF1A"),o("label",null,T(s.data.typeName),1)]),o("li",null,[H(" \u603B\u5E8A\u4F4D\u6570\uFF1A"),o("label",null,T(s.data.totalBeds),1)]),o("li",null,[H(" \u5165\u4F4F\u5E8A\u4F4D\u6570\uFF1A"),o("label",null,T(s.data.occupiedBeds),1)]),o("li",null,[H(" \u5165\u4F4F\u7387\uFF1A"),o("label",nl,T(s.data.occupancyRate===0?0:(s.data.occupancyRate*100).toFixed(2))+"%",1)])])]),d(" table \u6570\u636E "),o("div",{class:$(["scrollTable",g.value?"heighta":"dialogHeight"])},[v(f,{id:"app",ref_key:"tableRef",ref:F,"row-key":"id",data:s.data.bedVoList?s.data.bedVoList:[],columns:se(ol),hover:!0,scroll:{type:"virtual",rowHeight:48,bufferSize:10},height:400,"async-loading":s.data.bedVoList>0?C.value:"",onScroll:r[0]||(r[0]=m=>D(m))},{checkInConfigVo:k(({row:m})=>[H(T(se(me)(m.checkInConfigVo.checkInStartTime))+"~"+T(se(me)(m.checkInConfigVo.checkInEndTime)),1)]),empty:k(()=>[v(de)]),_:1},8,["data","columns","async-loading"])],2),g.value?(b(),y("div",sl,"\u5DF2\u7ECF\u5230\u5E95\u4E86~")):d("v-if",!0),d(' <div class="footTip"></div> '),d(" end ")])]),_:1},8,["visible"])])}}});var il=U(dl,[["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/liveIn/bed/houseType/components/CheckRoom.vue"]]);const cl={class:"dialog-form"},rl={class:"dialogCenter"},vl=o("div",null,[o("button",{class:"bt bt-grey wt-60",type:"reset"},"\u53D6\u6D88"),o("button",{theme:"primary",type:"submit",class:"bt wt-60"},[o("span",null,"\u786E\u5B9A")])],-1),fl=q({__name:"AddBed",props:{visible:{type:Boolean,default:!1},data:{type:Object,default:()=>({})},minNumber:{type:Number,default:1},title:{type:String,default:""}},emits:["handleClose","fetchData","handleAdd","handleEdit"],setup(s,{expose:V,emit:E}){const u=s,F=E,_=l("empty"),h=l(),g=l(!1),c=l(!1),t=l({bedNumber:"",sort:1}),C={bedNumber:[{required:!0,message:"\u5E8A\u4F4D\u53F7\u4E3A\u7A7A\uFF0C\u8BF7\u8F93\u5165\u5E8A\u4F4D\u53F7",type:"error",trigger:"blur"}]},D=l();L(()=>u.visible,()=>{g.value=u.visible,D.value=u.title}),L(()=>u.data,n=>{n.id&&(t.value.id=n.id),t.value.bedNumber=n.bedNumber,t.value.sort=n.sort});const A=n=>{n.validateResult===!0&&(c.value||(c.value=!0,u.title==="\u65B0\u589E"?F("handleAdd",t.value):F("handleEdit",t.value),setTimeout(()=>{c.value=!1,clearTimeout()},3e3)))},a=()=>{h.value.reset(),t.value.sort=1},r=()=>{a(),F("handleClose")},f=()=>{t.value.sort<=1&&(t.value.sort=1)};return V({handleClear:a}),(n,m)=>{const i=I("t-input"),w=I("t-form-item"),S=I("t-input-number"),z=I("t-form"),R=I("t-dialog");return b(),y("div",cl,[v(R,{visible:g.value,"onUpdate:visible":m[2]||(m[2]=x=>g.value=x),header:D.value+"\u5E8A\u4F4D",footer:!1,"on-close":r},{body:k(()=>[d(" \u8868\u5355\u5185\u5BB9 "),o("div",rl,[v(z,{ref_key:"form",ref:h,data:t.value,rules:C,"label-width":80,"on-cancel":"onClickCloseBtn","reset-type":_.value,onReset:r,onSubmit:A},{default:k(()=>[v(w,{label:"\u5E8A\u4F4D\u53F7\uFF1A",name:"bedNumber"},{default:k(()=>[v(i,{modelValue:t.value.bedNumber,"onUpdate:modelValue":m[0]||(m[0]=x=>t.value.bedNumber=x),class:"wt-400",placeholder:"\u8BF7\u8F93\u5165",clearable:"","show-limit-number":"",maxlength:10},null,8,["modelValue"])]),_:1}),v(w,{label:"\u6392\u5E8F\uFF1A",name:"sort"},{default:k(()=>[v(S,{modelValue:t.value.sort,"onUpdate:modelValue":m[1]||(m[1]=x=>t.value.sort=x),min:s.minNumber,"decimal-places":0,onBlur:f,onChange:f},null,8,["modelValue","min"])]),_:1}),v(w,{class:"dialog-footer"},{default:k(()=>[vl]),_:1})]),_:1},8,["data","reset-type"])])]),_:1},8,["visible","header"])])}}});var ml=U(fl,[["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/liveIn/bed/houseType/components/AddBed.vue"]]);const pl={class:"min-h bg-wt pd-main br-2"},bl={key:0,class:"boxBottom fx fx-ct bg-wt"},hl=q({__name:"index",setup(s){const V=be(),E=Me(),u=Ke(),F=l(""),_=l(null),h=l([]),g=l([]),c=l({}),t=l(""),C=l(!1),D=l(null),A=l(!1),a=l(null),r=l(!1),f=l(""),n=l(null),m=l(""),i=l(!1),w=l(!1),S=l({}),z=l([]),R=l(null),x=l(!1),B=l(null),G=l(""),Q=l(!1),ie=l({}),N=l({}),M=l(!1),te=l(!1),W=l(""),ce=l(null),K=l(null);Pe(()=>{u.query.type!==void 0&&(K.value=u.query.type),Y(),he()});const Y=async()=>{const e=await Ze();if(e.code===200){h.value=e.data;const p=V.floorInfo;h.value.length>0&&h.value.forEach((j,J)=>{p.code?p.code>j.code?(_.value.currentId=J+1,t.value=h.value[J+1].id):(p.code===j.code&&p.name===j.name||p.id===j.id)&&(_.value.currentId=J,t.value=h.value[J].id):(J===a.value&&(t.value=h.value[a.value].id),A.value&&t.value!==j.id&&(_.value.currentId=a.value,h.value.length===a.value&&(_.value.currentId=a.value-1,t.value=h.value[a.value-1].id),J===a.value&&(t.value=h.value[a.value].id),A.value=!1)),u.query.obj!==void 0&&(N.value=JSON.parse(decodeURIComponent(u.query.obj))),K.value==="config"&&!M.value&&N.value&&N.value.floorId&&j.id===N.value.floorId&&(a.value=J,t.value=j.id)}),t.value===""&&(t.value=h.value[0].id),O()}},he=async()=>{const e=await Qe();e.code===200&&(z.value=e.data.filter(p=>p.status===1))},O=async()=>{x.value=!0;try{const e=await We(t.value);e.code===200&&(g.value=e.data)}finally{x.value=!1}},ye=async e=>{(await Xe(e)).code===200&&(Y(),le(),n.value.handleClear(),P.success("\u65B0\u589E\u6210\u529F"))},Fe=async e=>{const p=await ut(e);p.code===200&&(c.value=p.data)},_e=async e=>{const p={id:c.value.id,code:e.code,name:e.name};(await et(p)).code===200&&(Y(),le(),n.value.handleClear(),P.success("\u7F16\u8F91\u6210\u529F"))},ge=async()=>{A.value=!1,(await nt(f.value)).code===200&&(V.setFloorInfo({}),A.value=!0,n.value.handleClear(),Y(),C.value=!1,X())},Ce=async e=>{const p={...e,floorId:t.value};(await tt(p)).code===200&&(O(),oe(),R.value.handleClear(),P.success("\u65B0\u589E\u6210\u529F"))},re=async e=>{const p=await st(e);p.code===200&&(S.value=p.data)},Ae=async e=>{(await lt(e)).code===200&&(O(),oe(),R.value.handleClear(),P.success("\u7F16\u8F91\u6210\u529F"))},Be=async()=>{(await dt(m.value)).code===200&&(O(),X())},De=async e=>{const p={...e,roomId:m.value};(await ot(p)).code===200&&(O(),ae(),B.value.handleClear(),P.success("\u65B0\u589E\u6210\u529F"))},ke=async e=>{const p={...e,roomId:m.value};(await at(p)).code===200&&(O(),ae(),B.value.handleClear(),P.success("\u7F16\u8F91\u6210\u529F"))},Ee=async e=>{const p=await it(e);p.code===200&&(ie.value=p.data)},Ie=async()=>{(await ct(G.value)).code===200&&(O(),X())},Ve=()=>{const e=ce.value;e===2?Be():e===3?Ie():ge()},Ne=(e,p)=>{a.value=p,t.value=e,C.value=!0,Fe(t.value),V.setFloorInfo({}),ne()},Se=()=>{c.value={code:1},ue(),C.value=!0},le=()=>{C.value=!1},Te=e=>{t.value="",f.value=e,ve()},we=(e,p,j)=>{a.value=p,t.value=e,N.value&&N.value.floorId&&(e===N.value.floorId?M.value=!1:M.value=j),Y(),V.setFloorInfo({})},je=()=>{ue(),i.value=!0},xe=e=>{ne(),m.value=e,re(e),i.value=!0},Re=e=>{re(e),w.value=!0},$e=()=>{R.value.handleClear(),w.value=!1},oe=()=>{i.value=!1},Le=e=>{m.value=e,ue(),Q.value=!0},ze=e=>{ne(),G.value=e,Ee(e),Q.value=!0},ae=()=>{Q.value=!1},ue=()=>{F.value="\u65B0\u589E"},ne=()=>{F.value="\u7F16\u8F91"},ve=(e,p)=>{ce.value=e,e===2?(m.value=p.id,W.value="\u623F\u95F4"):e===3?(G.value=p.id,W.value="\u5E8A\u4F4D"):W.value="\u697C\u5C42",te.value=!0},X=()=>{te.value=!1},He=e=>{N.value={...N.value,bedId:e.id,bedNumber:e.bedNumber,roomId:e.roomId,code:e.code,floorId:e.floorId,floorName:e.floorName,bedCost:e.price,floorIndex:a.value},e.id&&(M.value=!1)},qe=()=>{u.query.obj!==void 0&&(N.value=JSON.parse(decodeURIComponent(u.query.obj)),N.value.bedId!==void 0?E.push({path:"/active/checkDetails",query:{code:u.query.code,assigneeId:u.query.assigneeId,taskId:u.query.taskId,obj:encodeURIComponent(JSON.stringify(N.value))}}):E.push({path:"/active/checkDetails",query:{code:u.query.code,assigneeId:u.query.assigneeId,taskId:u.query.taskId}}))},Ue=()=>{M.value||E.push({path:"/active/checkDetails",query:{code:u.query.code,assigneeId:u.query.assigneeId,taskId:u.query.taskId,obj:encodeURIComponent(JSON.stringify(N.value))}})};return(e,p)=>(b(),y("div",pl,[d(" \u697C\u5C42tab\u5BFC\u822A "),v(bt,{ref_key:"tabBar",ref:_,data:h.value,"route-type":K.value,"bed-select-data":N.value,floorIndex:a.value,onHandleFloorEdit:Ne,onHandleAdd:Se,onChangeId:we},null,8,["data","route-type","bed-select-data","floorIndex"]),d(" end "),d(" \u623F\u578B\u5217\u8868 "),o("div",{style:Ge(K.value==="config"?"padding-bottom: 86px":"")},[v(Ot,{"room-voList":g.value,"floor-data":h.value,"route-type":K.value,"bed-select-data":N.value,onHandleEdit:xe,onHandleDelete:ve,onHandleRoomAdd:je,onHandleAdd:Le,onHandleBedEdit:ze,onHandleCheck:Re,onGetBedInfo:He},null,8,["room-voList","floor-data","route-type","bed-select-data"])],4),d(" end "),K.value==="config"&&h.value.length>0?(b(),y("div",bl,[o("button",{theme:"primary",class:"bt bt-grey wt-60",onClick:qe}," \u8FD4\u56DE "),o("button",{theme:"primary",class:$(["bt wt-60",M.value?"bt-forbid":""]),onClick:Ue}," \u4FDD\u5B58 ",2)])):d("v-if",!0),d(" \u697C\u5C42\u6DFB\u52A0\u3001\u7F16\u8F91 "),v(Qt,{ref_key:"floor",ref:n,visible:C.value,title:F.value,"min-num":D.value,data:c.value,"room-voList":g.value,"is-room-delete":r.value,onHandleDelete:Te,onHandleClose:le,onHandleAdd:ye,onHandleEdit:_e},null,8,["visible","title","min-num","data","room-voList","is-room-delete"]),d(" end "),d(" \u623F\u95F4\u6DFB\u52A0\u3001\u7F16\u8F91 "),v(ll,{ref_key:"room",ref:R,visible:i.value,title:F.value,"min-num":D.value,data:S.value,"room-type-data":z.value,onHandleClose:oe,onHandleAdd:Ce,onHandleEdit:Ae},null,8,["visible","title","min-num","data","room-type-data"]),d(" end "),d(" \u67E5\u770B\u623F\u95F4 "),v(il,{"dialog-visible":w.value,data:S.value,onHandleClose:$e},null,8,["dialog-visible","data"]),d(" end "),d(" \u5E8A\u4F4D\u6DFB\u52A0\u3001\u7F16\u8F91 "),v(ml,{ref_key:"bed",ref:B,visible:Q.value,title:F.value,"min-num":D.value,data:ie.value,onHandleClose:ae,onHandleAdd:De,onHandleEdit:ke},null,8,["visible","title","min-num","data"]),d(" end "),d(" \u6DFB\u52A0\u3001\u7F16\u8F91\u623F\u95F4 "),v(Ye,{visible:te.value,"delete-text":W.value,onHandleClose:X,onHandleDelete:Ve},null,8,["visible","delete-text"]),d(" end ")]))}});var Cl=U(hl,[["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/liveIn/bed/houseType/index.vue"]]);export{Cl as default};
