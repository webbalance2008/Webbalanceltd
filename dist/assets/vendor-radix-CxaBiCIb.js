import{a as v,b as y}from"./vendor-react-C__hCORV.js";var i={exports:{}},t={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _;function E(){if(_)return t;_=1;var m=v(),R=Symbol.for("react.element"),c=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,l=m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function s(o,r,a){var e,n={},u=null,p=null;a!==void 0&&(u=""+a),r.key!==void 0&&(u=""+r.key),r.ref!==void 0&&(p=r.ref);for(e in r)x.call(r,e)&&!d.hasOwnProperty(e)&&(n[e]=r[e]);if(o&&o.defaultProps)for(e in r=o.defaultProps,r)n[e]===void 0&&(n[e]=r[e]);return{$$typeof:R,type:o,key:u,ref:p,props:n,_owner:l.current}}return t.Fragment=c,t.jsx=s,t.jsxs=s,t}var f;function O(){return f||(f=1,i.exports=E()),i.exports}var j=O(),b=y();export{j,b as r};
