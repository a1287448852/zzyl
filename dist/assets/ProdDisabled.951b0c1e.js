import{d as C,r as l,C as m,e as D,o as t,f as B,w as n,h as c,q as o,n as v,_ as b,p as f,m as h}from"./index.c5b6faf2.js";const F=u=>(f("data-v-8b340a6a"),u=u(),h(),u),y={key:0},A={key:1},g=F(()=>o("p",null,"\u8BE5\u529F\u80FD\u9519\u8BEF\u64CD\u4F5C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u7CFB\u7EDF\u4E1A\u52A1\u6DF7\u4E71\uFF0C",-1)),k=F(()=>o("p",{class:"adjust"},"\u6682\u4E0D\u5F00\u653E\u54E6\uFF01",-1)),j=[g,k],w=C({__name:"ProdDisabled",props:{confirmVisible:{type:Boolean,default:!1},type:{type:String,default:"incomplete"}},emits:["handleClose","fetchData"],setup(u,{emit:i}){const p=l(),s=l(!1),e=u,d=i;m(e,()=>{s.value=e.confirmVisible,p.value=e.type==="incomplete"?"\u7A0B\u5E8F\u5458\u5C0F\u54E5\u54E5\u6B63\u5728\u52A0\u73ED\u642C\u7816\u4E2D\uFF0C\u656C\u8BF7\u671F\u5F85\uFF01":"\u8BE5\u529F\u80FD\u9519\u8BEF\u64CD\u4F5C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u7CFB\u7EDF\u4E1A\u52A1\u6DF7\u4E71\uFF0C\u6682\u4E0D\u5F00\u653E\u54E6\uFF01"});const r=()=>{d("handleClose")};return(x,a)=>{const _=D("t-dialog");return t(),B(_,{visible:s.value,"onUpdate:visible":a[0]||(a[0]=E=>s.value=E),theme:"success",header:"\u7981\u7528\u63D0\u793A",footer:!0,"cancel-btn":null,"close-btn":null,class:v(e.type!=="incomplete"?"twoLine":"")},{body:n(()=>[e.type==="incomplete"?(t(),c("p",y," \u7A0B\u5E8F\u5458\u5C0F\u54E5\u54E5\u6B63\u5728\u52A0\u73ED\u642C\u7816\u4E2D\uFF0C\u656C\u8BF7\u671F\u5F85\uFF01 ")):(t(),c("div",A,[...j]))]),confirmBtn:n(()=>[o("div",{class:"bt bt-grey btn-reset",onClick:r},"\u77E5\u9053\u4E86")]),_:1},8,["visible","class"])}}});var P=b(w,[["__scopeId","data-v-8b340a6a"],["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/components/Message/ProdDisabled.vue"]]);export{P};