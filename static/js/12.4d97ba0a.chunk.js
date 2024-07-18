(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[12],{411:function(e,t,a){"use strict";var i=a(3),c=a(4),r=a(15),n=a(14),s=a(0),l=a.n(s),j=a(1),d=a.n(j),o=a(8),b=a.n(o),u=a(9),p={children:d.a.node,inline:d.a.bool,tag:u.o,innerRef:d.a.oneOfType([d.a.object,d.a.func,d.a.string]),className:d.a.string,cssModule:d.a.object},O=function(e){function t(t){var a;return(a=e.call(this,t)||this).getRef=a.getRef.bind(Object(r.a)(a)),a.submit=a.submit.bind(Object(r.a)(a)),a}Object(n.a)(t,e);var a=t.prototype;return a.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},a.submit=function(){this.ref&&this.ref.submit()},a.render=function(){var e=this.props,t=e.className,a=e.cssModule,r=e.inline,n=e.tag,s=e.innerRef,j=Object(c.a)(e,["className","cssModule","inline","tag","innerRef"]),d=Object(u.k)(b()(t,!!r&&"form-inline"),a);return l.a.createElement(n,Object(i.a)({},j,{ref:s,className:d}))},t}(s.Component);O.propTypes=p,O.defaultProps={tag:"form"},t.a=O},730:function(e,t,a){"use strict";a.r(t);var i=a(0),c=a(405),r=a(406),n=a(209),s=a(44),l=a(407),j=a(408),d=a(697),o=a(728),b=a(710),u=a(711),p=a(680),O=a(409),h=a(410),m=a(712),x=a(2);var y=e=>{let{isOpen:t,toggle:a}=e;return Object(x.jsxs)(o.a,{isOpen:t,toggle:a,children:[Object(x.jsx)(b.a,{toggle:a,children:"Create New Plan"}),Object(x.jsxs)(u.a,{children:[Object(x.jsxs)(p.a,{children:[Object(x.jsx)(O.a,{for:"itemName",children:"Item Name"}),Object(x.jsx)(h.a,{type:"text",name:"itemName",id:"itemName"})]}),Object(x.jsxs)(p.a,{children:[Object(x.jsx)(O.a,{for:"quantity",children:"Quantity"}),Object(x.jsx)(h.a,{type:"number",name:"quantity",id:"quantity"})]}),Object(x.jsxs)(p.a,{children:[Object(x.jsx)(O.a,{for:"emplyeeName",children:"Emplyee Name"}),Object(x.jsx)(h.a,{type:"text",name:"emplyeeName",id:"emplyeeName"})]}),Object(x.jsxs)(p.a,{children:[Object(x.jsx)(O.a,{for:"date",children:"Date"}),Object(x.jsx)(h.a,{type:"date",name:"date",id:"date"})]}),Object(x.jsx)("h4",{children:"Desired Output"}),Object(x.jsxs)(p.a,{children:[Object(x.jsx)(O.a,{for:"articleNo",children:"Article No"}),Object(x.jsx)(h.a,{type:"text",name:"articleNo",id:"articleNo"})]}),Object(x.jsxs)(p.a,{children:[Object(x.jsx)(O.a,{for:"color",children:"Color"}),Object(x.jsx)(h.a,{type:"text",name:"color",id:"color"})]})]}),Object(x.jsxs)(m.a,{children:[Object(x.jsx)(s.a,{color:"primary",onClick:a,children:"Add Plan"}),Object(x.jsx)(s.a,{color:"secondary",onClick:a,children:"Cancel"})]})]})},f=a(411);var N=e=>{let{isOpen:t,toggle:a}=e;const[c,r]=Object(i.useState)({itemName:"",quantity:"",supplier:"",date:""}),n=e=>{const{name:t,value:a}=e.target;r({...c,[t]:a})};return Object(x.jsxs)(o.a,{isOpen:t,toggle:a,children:[Object(x.jsx)(b.a,{toggle:a,children:"Add New Material"}),Object(x.jsxs)(f.a,{onSubmit:e=>{e.preventDefault(),console.log("New material added:",c),a()},children:[Object(x.jsxs)(u.a,{children:[Object(x.jsxs)(p.a,{children:[Object(x.jsx)(O.a,{for:"itemName",children:"Item Name"}),Object(x.jsx)(h.a,{type:"text",name:"itemName",id:"itemName",value:c.itemName,onChange:n,required:!0})]}),Object(x.jsxs)(p.a,{children:[Object(x.jsx)(O.a,{for:"quantity",children:"Quantity"}),Object(x.jsx)(h.a,{type:"text",name:"quantity",id:"quantity",value:c.quantity,onChange:n,required:!0})]}),Object(x.jsxs)(p.a,{children:[Object(x.jsx)(O.a,{for:"supplier",children:"Supplier"}),Object(x.jsx)(h.a,{type:"text",name:"supplier",id:"supplier",value:c.supplier,onChange:n,required:!0})]}),Object(x.jsxs)(p.a,{children:[Object(x.jsx)(O.a,{for:"date",children:"Date"}),Object(x.jsx)(h.a,{type:"date",name:"date",id:"date",value:c.date,onChange:n,required:!0})]})]}),Object(x.jsxs)(m.a,{children:[Object(x.jsx)(s.a,{type:"submit",color:"primary",children:"Add Material"}),Object(x.jsx)(s.a,{color:"secondary",onClick:a,children:"Cancel"})]})]})]})};t.default=()=>{const[e,t]=Object(i.useState)([{itemName:"Insole",quantity:100,supplier:"Supplier 1",date:"2024-07-01"},{itemName:"Heel",quantity:200,supplier:"Supplier 2",date:"2024-07-02"},{itemName:"Vamp",quantity:50,supplier:"Supplier 3",date:"2024-07-03"},{itemName:"Sole",quantity:75,supplier:"Supplier 4",date:"2024-07-04"},{itemName:"Counter",quantity:30,supplier:"Supplier 5",date:"2024-07-05"},{itemName:"Glue",quantity:"60L",supplier:"Supplier 6",date:"2024-07-05"}]),[a,o]=Object(i.useState)(!1),[b,u]=Object(i.useState)(!1),p=()=>o(!a),O=()=>u(!b);return Object(x.jsxs)("div",{className:"stock-container",children:[Object(x.jsxs)(c.a,{children:[Object(x.jsxs)(r.a,{children:[Object(x.jsxs)(n.a,{tag:"h5",children:[Object(x.jsx)(d.a,{})," Materials Stock"]}),Object(x.jsx)(s.a,{color:"primary",onClick:p,style:{float:"right"},children:"Create New Plan"})]}),Object(x.jsx)(l.a,{children:Object(x.jsxs)(j.a,{bordered:!0,children:[Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Item Name"}),Object(x.jsx)("th",{children:"Quantity"}),Object(x.jsx)("th",{children:"Supplier"}),Object(x.jsx)("th",{children:"Date"}),Object(x.jsx)("th",{children:"Add Material"})]})}),Object(x.jsx)("tbody",{children:e.map(((e,t)=>Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:e.itemName}),Object(x.jsx)("td",{children:e.quantity}),Object(x.jsx)("td",{children:e.supplier}),Object(x.jsx)("td",{children:e.date}),Object(x.jsx)("td",{children:Object(x.jsx)(s.a,{color:"success",onClick:O,children:"Add Material"})})]},t)))})]})})]}),Object(x.jsx)(y,{isOpen:a,toggle:p}),Object(x.jsx)(N,{isOpen:b,toggle:O})]})}}}]);
//# sourceMappingURL=12.4d97ba0a.chunk.js.map