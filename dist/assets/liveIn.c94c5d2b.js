import{I as e}from"./index.c5b6faf2.js";function u(){return e.get({url:"/floor/getAllFloorsWithDevice"})}function n(t){return e.get({url:`/room/getRoomsWithDeviceByFloorId/${t}`})}function l(){return e.get({url:"/floor/getAllFloorsWithNur"})}function a(t){return e.get({url:`/room/getRoomsWithNurByFloorId/${t}`})}function s(){return e.get({url:"/floor/getAll"})}function d(){return e.get({url:"/floor/getAllWithRoomAndBed"})}function i(t){return e.get({url:`/floor/getRoomAndBedByBedStatus/${t}`})}function f(t){return e.get({url:`/room/getRoomsByFloorId/${t}`})}function g(t){return e.get({url:`/floor/get/${t}`})}function c(t){return e.get({url:`/room/get/${t}`})}function m(t){return e.get({url:`/bed/read/${t}`})}function p(t){return e.post({url:"/floor/add",data:t})}function y(t){return e.put({url:"/floor/update",data:t})}function B(t){return e.delete({url:`/floor/delete/${t}`})}function A(t){return e.post({url:"/room/add",data:t})}function $(t){return e.put({url:"/room/update",data:t})}function T(t){return e.delete({url:`/room/delete/${t}`})}function D(t){return e.post({url:"/bed/create",data:t})}function F(t){return e.put({url:"/bed/update",data:t})}function R(t){return e.delete({url:`/bed/delete/${t}`})}function b(){return e.get({url:"/roomTypes"})}function h(t){return e.get({url:`/roomTypes/${t}`})}function L(t){return e.put({url:`/roomTypes/${t.id}/status/${t.status}`})}function S(t){return e.post({url:"/roomTypes",data:t})}function W(t,o){return e.put({url:`/roomTypes/${t}`,data:o})}function I(t){return e.delete({url:`/roomTypes/${t}`})}function v(t){return e.get({url:"/contract/list",params:t})}function U(t){return e.get({url:`/contract/${t}`})}export{a as A,d as B,v as a,U as b,s as c,b as d,f as e,p as f,i as g,y as h,$ as i,D as j,F as k,g as l,B as m,c as n,T as o,m as p,R as q,A as r,L as s,S as t,W as u,I as v,h as w,u as x,n as y,l as z};
