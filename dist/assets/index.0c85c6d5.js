import{d as p,r as m,C as _,e as b,o as h,h as v,i as f,w as C,B as y,z as F,q as e,_ as g}from"./index.c5b6faf2.js";const x={class:"deleteDialog baseDialog"},B=e("span",null,"\u53D6\u6D88",-1),D=[B],E=e("span",null,"\u786E\u5B9A",-1),w=[E],z=p({__name:"index",props:{visible:{type:Boolean,default:!1},text:{type:String,default:""}},emits:["handleClose","handleSubmit"],setup(s,{emit:u}){const d=s,a=u,t=m(!1);_(()=>d.visible,(i,o)=>{t.value=i});const l=()=>{a("handleClose")},n=()=>{a("handleSubmit")};return(i,o)=>{const c=b("t-dialog");return h(),v("div",x,[f(c,{visible:t.value,"onUpdate:visible":o[0]||(o[0]=r=>t.value=r),header:"\u786E\u8BA4\u7981\u7528",footer:!1,"on-close":l,"on-confirm":n},{default:C(()=>[y(" \u6B64\u64CD\u4F5C\u5C06\u7981\u7528\u8BE5"+F(s.text)+"\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F ",1),e("div",{class:"dialog-footer"},[e("button",{theme:"primary",type:"submit",class:"bt-grey wt-60",onClick:l},[...D]),e("button",{theme:"primary",type:"submit",class:"bt wt-60",onClick:n},[...w])])]),_:1},8,["visible"])])}}});var V=g(z,[["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/components/Forbidden/index.vue"]]);export{V as F};