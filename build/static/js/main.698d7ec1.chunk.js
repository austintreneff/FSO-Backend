(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(15),c=t.n(r),s=t(3),o=t(1),u=t(0),a=function(e){var n=e.newFilter,t=e.setNewFilter;return Object(u.jsxs)("div",{children:["Filter: ",Object(u.jsx)("input",{value:n,onChange:function(e){return function(e){console.log(e.target.value),t(e.target.value)}(e)}})]})},i=t(6),l=t(4),d=t.n(l),j="/api/persons",b=function(){return d.a.get(j).then((function(e){return e.data}))},f=function(e){return d.a.post(j,e).then((function(e){return e.data}))},m=function(e){return d.a.delete("".concat(j,"/").concat(e)).then((function(e){return e.data}))},O=function(e,n){return d.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){var n=e.newName,t=e.setNewName,r=e.newNumber,c=e.setNewNumber,s=e.persons,o=e.setPersons,a=e.setAddedMessage,l=function(e){return s.find((function(n){return n.name.toLowerCase()===e.toLowerCase()}))};return Object(u.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),l(n)){var u=l(n);window.confirm("".concat(n," is already added to phonebook, replace the old number with a new one?"))&&O(u.id,Object(i.a)(Object(i.a)({},u),{},{number:r})).then((function(e){o(s.map((function(n){return n.id===e.id?e:n})))}))}else f({name:n,number:r}).then((function(e){o(s.concat(e)),a("Added ".concat(e.name)),setTimeout((function(){return a(null)}),5e3)}));t(""),c("")},children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:n,onChange:function(e){return function(e){console.log(e.target.value),t(e.target.value)}(e)}})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{value:r,onChange:function(e){return function(e){console.log(e.target.value),c(e.target.value)}(e)}})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},v=function(e){var n=e.person,t=e.persons,r=e.setPersons,c=e.setErrorMessage;return Object(u.jsx)("button",{onClick:function(){return function(e,n,t){window.confirm("Delete ".concat(e.name))&&(console.log("Delete ".concat(e.name)),m(e.id).then((function(){return t(n.filter((function(n){return n.id!==e.id})))})).catch((function(r){c("Information of ".concat(e.name," has already been removed from server")),setTimeout((function(){return c(null)}),5e3),t(n.filter((function(n){return n.id!==e.id})))})))}(n,t,r)},children:"delete"})},p=function(e){var n=e.persons,t=e.setPersons,r=e.newFilter,c=e.setErrorMessage;return Object(u.jsx)("div",{children:n.filter((function(e){return e.name.toLowerCase().includes(r.toLowerCase())})).map((function(e){return Object(u.jsxs)("div",{children:[e.name," ",e.number," ",Object(u.jsx)(v,{person:e,persons:n,setPersons:t,setErrorMessage:c})]},e.id)}))})},w=function(e){var n=e.message;return null===n?null:Object(u.jsx)("div",{className:"addedNotification",children:n})},g=function(e){var n=e.message;return null===n?null:Object(u.jsx)("div",{className:"errorNotification",children:n})},x=function(){var e=Object(o.useState)([]),n=Object(s.a)(e,2),t=n[0],r=n[1],c=Object(o.useState)(""),i=Object(s.a)(c,2),l=i[0],d=i[1],j=Object(o.useState)(""),f=Object(s.a)(j,2),m=f[0],O=f[1],v=Object(o.useState)(""),x=Object(s.a)(v,2),N=x[0],C=x[1],F=Object(o.useState)(null),P=Object(s.a)(F,2),S=P[0],E=P[1],M=Object(o.useState)(null),k=Object(s.a)(M,2),y=k[0],A=k[1];return Object(o.useEffect)((function(){b().then((function(e){console.log(e),r(e)}))}),[]),Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(w,{message:S}),Object(u.jsx)(g,{message:y}),Object(u.jsx)(a,{newFilter:l,setNewFilter:d}),Object(u.jsx)("h2",{children:"Add new:"}),Object(u.jsx)(h,{persons:t,setPersons:r,newName:m,newNumber:N,setNewName:O,setNewNumber:C,setAddedMessage:E}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(p,{persons:t,setPersons:r,newFilter:l,setErrorMessage:A})]})};t(39);c.a.render(Object(u.jsx)(x,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.698d7ec1.chunk.js.map