(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{22:function(t,n,e){},23:function(t,n,e){},43:function(t,n,e){"use strict";e.r(n);var c=e(2),o=e(17),r=e.n(o),i=(e(22),e(8)),u=e(3),a=(e(23),e(0)),s=function(t){var n=t.note,e=t.toggleImportance,c=n.important?"Do make no important?":"Do make important?";return Object(a.jsxs)("li",{children:[n.id,". ",n.content,Object(a.jsx)("p",{children:n.date}),Object(a.jsx)("p",{children:n.number}),Object(a.jsx)("button",{onClick:e,children:c})]})},l=function(t){var n=t.show,e=t.handlerClick;return Object(a.jsx)("div",{children:Object(a.jsxs)("button",{onClick:e,children:["show ",n?"important":"all"]})})},j=function(t){var n=t.newN,e=t.submitNotes,c=t.changeNotes;return Object(a.jsxs)("form",{onSubmit:e,children:[Object(a.jsx)("input",{onChange:c,value:n}),Object(a.jsx)("button",{type:"submit",children:"save"})]})},f=e(6),b=e.n(f),h="/api/notes",d=function(){return b.a.get(h).then((function(t){return t.data})).catch((function(t){return console.error(t)}))},p=function(t){return b.a.post(h,t).then((function(t){return t.data})).catch((function(t){return console.error(t)}))},O=function(t,n){return b.a.put("".concat(h,"/").concat(t),n).then((function(t){return t.data})).catch((function(t){return console.error(t)}))},m=function(){var t=Object(c.useState)([]),n=Object(u.a)(t,2),e=n[0],o=n[1],r=Object(c.useState)(""),f=Object(u.a)(r,2),b=f[0],h=f[1],m=Object(c.useState)(!0),g=Object(u.a)(m,2),x=g[0],v=g[1],k=Object(c.useState)(!0),w=Object(u.a)(k,2),N=w[0],S=w[1];Object(c.useEffect)((function(){console.log("effect");d().then((function(t){console.log("promise fulfilled"),v(!1),o(t)}))}),[]),console.log("render",e.length,"notes");var C=N?e:e.filter((function(t){return!0===t.important}));return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)("h1",{children:"Notes"}),Object(a.jsx)(l,{show:N,handlerClick:function(){return S(!N)}}),Object(a.jsx)(j,{submitNotes:function(t){t.preventDefault();var n={content:b,date:(new Date).toISOString(),important:Math.random()<.5,id:e.length+1};p(n).then((function(t){return console.log("succesfuly",t)})),o(e.concat(n)),h("")},changeNotes:function(t){return h(t.target.value)},newN:b}),x?"Cargando...":"",Object(a.jsx)("ul",{children:C.map((function(t){return Object(a.jsx)(s,{note:t,toggleImportance:function(){return function(t){var n=e.find((function(n){return n.id===t})),c=Object(i.a)(Object(i.a)({},n),{},{important:!n.important});v(!0),O(t,c).then((function(n){o(e.map((function(e){return e.id!==t?e:n}))),v(!1)}))}(t.id)}},t.id)}))})]})};r.a.render(Object(a.jsx)(m,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.04120892.chunk.js.map