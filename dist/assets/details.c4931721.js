import{_ as p,d as E,r as d,c as b,b as B,y as D,e as A,o as a,h as o,q as s,g as u,i as C,w as r,z as e,A as n,B as h,f as k,F as g}from"./index.c5b6faf2.js";import{g as i}from"./date.a9e2d8fb.js";import{b as w}from"./liveIn.c94c5d2b.js";const y={class:"detail-base"},N={class:"info-block"},x={class:"info-item"},V=s("h1",null,"\u5408\u540C\u7F16\u53F7\uFF1A",-1),z={class:"info-item"},P=s("h1",{class:"label-wt"},"\u5408\u540C\u540D\u79F0\uFF1A",-1),j={class:"info-item"},U=s("h1",null,"\u8001\u4EBA\u59D3\u540D\uFF1A",-1),I={class:"info-item"},R=s("h1",{class:"label-wt"},"\u8001\u4EBA\u8EAB\u4EFD\u8BC1\u53F7\uFF1A",-1),S={class:"info-item"},T=s("h1",null,"\u5408\u540C\u671F\u9650\uFF1A",-1),q={class:"info-item"},M=s("h1",{class:"label-wt"},"\u5408\u540C\u72B6\u6001\uFF1A",-1),G={key:0,class:"status-dot status-dot-0"},H={key:1,class:"status-dot status-dot-1"},J={key:2,class:"status-dot status-dot-2"},K={key:3,class:"status-dot status-dot-3"},L={class:"info-item"},O=s("h1",null,"\u7B7E\u7EA6\u65E5\u671F\uFF1A",-1),Q={key:0,class:"info-item"},W=s("h1",{class:"label-wt"},"\u4E19\u65B9\u59D3\u540D\uFF1A",-1),X={key:1,class:"info-item"},Y=s("h1",{class:"label-wt"},"\u4E19\u65B9\u8054\u7CFB\u65B9\u5F0F\uFF1A",-1),Z={class:"info-item"},$=s("h1",{class:"label-wt"},"\u5408\u540C\u6587\u4EF6\uFF1A",-1),ss={class:"font-bt"},ts=["href"],es={class:"info-block"},us={class:"info-item"},as=s("h1",null,"\u63D0\u4EA4\u4EBA\uFF1A",-1),os={class:"info-item"},ls=s("h1",null,"\u89E3\u9664\u65E5\u671F\uFF1A",-1),ns={class:"info-item"},is=s("h1",null,"\u89E3\u9664\u534F\u8BAE\uFF1A",-1),cs={class:"font-bt"},ds=["href"],_s=E({__name:"details",setup(rs){const t=d({}),l=d({}),F=b(),v=B();d("application/pdf"),D(()=>{m()});const m=async()=>{const c=await w(F.query.id);c.code===200&&(t.value=c.data,l.value=t.value.elderVo)},f=()=>{v.push({path:"/liveIn/trackAfter"})};return(c,hs)=>{const _=A("t-card");return a(),o(g,null,[s("div",y,[u(" \u5408\u540C\u8BE6\u60C5 "),C(_,{title:"\u5408\u540C\u8BE6\u60C5"},{default:r(()=>[s("div",N,[s("div",x,[V,s("span",null,e(t.value.contractNo),1)]),s("div",z,[P,s("span",null,e(t.value.name),1)]),s("div",j,[U,s("span",null,e(l.value.name),1)]),s("div",I,[R,s("span",null,e(l.value.idCardNo),1)]),s("div",S,[T,s("span",null,e(n(i)(t.value.startTime))+" - "+e(n(i)(t.value.endTime)),1)]),s("div",q,[M,t.value.status===0?(a(),o("span",G,"\u672A\u751F\u6548")):t.value.status===1?(a(),o("span",H,"\u751F\u6548\u4E2D")):t.value.status===2?(a(),o("span",J,"\u5DF2\u8FC7\u671F")):(a(),o("span",K,"\u5DF2\u5931\u6548"))]),s("div",L,[O,s("span",null,e(n(i)(t.value.signDate)),1)]),t.value.memberName&&t.value.memberPhone?(a(),o("div",Q,[W,s("span",null,e(t.value.memberName),1)])):u("v-if",!0),t.value.memberName&&t.value.memberPhone?(a(),o("div",X,[Y,s("span",null,e(t.value.memberPhone),1)])):u("v-if",!0),s("div",Z,[$,s("span",null,[h(e(l.value.name)+"\u7684\u5165\u4F4F\u5408\u540C.pdf",1),s("i",ss,[s("a",{class:"font-bt",href:t.value.pdfUrl,target:"black"},"\u67E5\u770B",8,ts)]),u(` <i\r
              class="font-bt"\r
              @click="handleDown(baseData.pdfUrl, '\u7B7E\u7EA6\u5408\u540C\u6587\u4EF6')"\r
              >\u4E0B\u8F7D</i\r
            > `)])])])]),_:1}),u(" end "),u(" \u89E3\u9664\u8BB0\u5F55 "),t.value.releaseSubmitter&&t.value.status===3?(a(),k(_,{key:0,title:"\u89E3\u9664\u8BB0\u5F55",class:"container-base-margin-top"},{default:r(()=>[s("div",es,[s("div",us,[as,s("span",null,e(t.value.releaseSubmitter),1)]),s("div",os,[ls,s("span",null,e(n(i)(t.value.releaseDate)),1)]),s("div",ns,[is,s("span",null,[s("span",null,[h(e(l.value.name)+"\u7684\u89E3\u9664\u534F\u8BAE.pdf",1),s("i",cs,[s("a",{class:"font-bt",href:t.value.releasePdfUrl,target:"black"},"\u67E5\u770B",8,ds)]),u(` <i\r
                class="font-bt"\r
                @click="handleDown(baseData.releasePdfUrl, '\u89E3\u9664\u534F\u8BAE\u6587\u4EF6')"\r
                >\u4E0B\u8F7D</i\r
              > `)])])])])]),_:1})):u("v-if",!0),u(" end ")]),s("div",{class:"boxBottom fx fx-ct bg-wt"},[s("div",{class:"bt wt-88",onClick:f},"\u8FD4\u56DE")])],64)}}});var fs=p(_s,[["__file","D:/project/2023/project-zzyl-v2.1/project-zzyl-admin-vue3-java/src/pages/liveIn/contract/details.vue"]]);export{fs as default};