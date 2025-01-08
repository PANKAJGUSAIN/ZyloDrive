"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[254],{164:(e,s,r)=>{r.d(s,{A:()=>t});var a=r(181),i=r(548),l=r(848);const t=()=>{const e=(0,a.Zp)();return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:"logo",style:{cursor:"pointer"},onClick:()=>e("/"),children:[(0,l.jsx)(i.A,{}),(0,l.jsx)("p",{children:"ZyloDrive"})]})})}},404:(e,s,r)=>{r.d(s,{A:()=>t});const a="zr69Ky4MwXAl2OyUo0Bm",i="hPF7HRfQ5XbXiRO317jI";var l=r(848);const t=e=>{const{type:s,children:r,...t}=e;return(0,l.jsx)("div",{className:`${a}`,children:(0,l.jsx)("button",{className:i,type:s,...t,children:r})})}},548:(e,s,r)=>{r.d(s,{A:()=>i});var a=r(848);const i=()=>(0,a.jsxs)("svg",{version:"1.1",id:"Uploaded to svgrepo.com",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"40px",height:"40px",viewBox:"0 0 32 32",xmlSpace:"preserve",children:[(0,a.jsx)("style",{type:"text/css",children:"\n        .afiado_een { fill: #0B1719; }\n      "}),(0,a.jsx)("path",{className:"afiado_een",d:"M24,12V4H8v8H4v12h4v4h4v-4h8v4h4v-4h4V12H24z M12,20H8v-4h4V20z M12,12V8h8v4H12z M24,20h-4v-4h4V20z"})]})},254:(e,s,r)=>{r.r(s),r.d(s,{default:()=>h});var a=r(555),i=r(404),l=r(181),t=r(164),n=r(540),d=r(83),o=r(364),c=r(848);const h=()=>{const{changeData:e}=(0,n.useContext)(o.R),s=(0,l.Zp)(),[r,h]=(0,n.useState)(""),[m,p]=(0,n.useState)(""),[u,x]=(0,n.useState)(""),[v,j]=(0,n.useState)(""),[f,N]=(0,n.useState)({}),[A,g]=(0,n.useState)(!1),y=e=>/^[a-zA-Z\s]+$/.test(e);return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("div",{className:a.A.UserLoginwrapper,children:[(0,c.jsx)(t.A,{}),(0,c.jsx)("div",{className:a.A.loginForm,children:(0,c.jsxs)("form",{onSubmit:async a=>{a.preventDefault();let i={};if(r?y(r)?r.length>40&&(i.firstName="First name cannot be more than 40 characters"):i.firstName="First name cannot contain special characters":i.firstName="First name is required",m.length>0?y(m)||(i.lastName="Last name cannot contain special characters"):m>40&&(i.lastName="Last name cannot be more than 40 characters"),u?(e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e).toLowerCase()))(u)?u.length>100&&(i.email="email cannot be more than 40 characters"):i.email="Invalid Email":i.email="Email is required",v?(e=>e.length>=6)(v)||(i.password="Password must be at least 6 characters"):i.password="Password is required",N(i),0===Object.keys(i).length){g(!0);const a={fullname:{firstname:r,lastname:m},email:u,password:v};d.A.post("https://zylo-drive.vercel.app/users/register",a).then((r=>{delete a.password,e(a),g(!1),sessionStorage.setItem("zylotoken",r.data.token),s("/home")})).catch((e=>{400===e.status&&alert(e.response.data.message),g(!1)}))}},noValidate:!0,children:[(0,c.jsxs)("div",{className:a.A.inputfieldContainer,children:[(0,c.jsxs)("label",{htmlFor:"zyloDriverFirstName",children:[(0,c.jsx)("div",{className:a.A.inputfieldLabelContainer,children:(0,c.jsx)("div",{title:"required field",children:(0,c.jsxs)("h3",{children:["First Name ",(0,c.jsx)("sup",{style:{color:"red"},children:"*"})]})})}),(0,c.jsx)("input",{id:"zyloDriverFirstName",className:a.A.inputfield,style:f.firstName?{border:"2px solid red"}:{},type:"text",value:r,onChange:e=>h(e.target.value),required:!0,placeholder:"First Name"})]}),f.firstName&&(0,c.jsx)("div",{className:a.A.inputfielderror,children:f.firstName})]}),(0,c.jsxs)("div",{className:a.A.inputfieldContainer,children:[(0,c.jsxs)("label",{htmlFor:"zyloDriverLastName",children:[(0,c.jsx)("div",{className:a.A.inputfieldLabelContainer,children:(0,c.jsx)("div",{children:(0,c.jsx)("h3",{children:"Last Name"})})}),(0,c.jsx)("input",{id:"zyloDriverLastName",className:a.A.inputfield,style:f.lastName?{border:"2px solid red"}:{},type:"text",value:m,onChange:e=>p(e.target.value),required:!0,placeholder:"Last Name"})]}),f.lastName&&(0,c.jsx)("div",{className:a.A.inputfielderror,children:f.lastName})]}),(0,c.jsxs)("div",{className:a.A.inputfieldContainer,children:[(0,c.jsxs)("label",{htmlFor:"zyloDriverUserEmail",children:[(0,c.jsx)("div",{className:a.A.inputfieldLabelContainer,children:(0,c.jsx)("div",{children:(0,c.jsxs)("h3",{title:"required field",children:["Email id ",(0,c.jsx)("sup",{style:{color:"red"},children:"*"})]})})}),(0,c.jsx)("input",{id:"zyloDriverUserEmail",className:a.A.inputfield,style:f.email?{border:"2px solid red"}:{},type:"email",value:u,onChange:e=>x(e.target.value),required:!0,placeholder:"email@example.com"})]}),f.email&&(0,c.jsx)("div",{className:a.A.inputfielderror,children:f.email})]}),(0,c.jsxs)("div",{className:a.A.inputfieldContainer,children:[(0,c.jsxs)("label",{htmlFor:"zyloDriverUserPassword",children:[(0,c.jsx)("div",{className:a.A.inputfieldLabelContainer,children:(0,c.jsx)("div",{children:(0,c.jsxs)("h3",{title:"required field",children:["Enter Password ",(0,c.jsx)("sup",{style:{color:"red"},children:"*"})," "]})})}),(0,c.jsx)("input",{id:"zyloDriverUserPassword",className:a.A.inputfield,value:v,onChange:e=>j(e.target.value),style:f.password?{border:"2px solid red"}:{},type:"password",required:!0})]}),f.password&&(0,c.jsx)("div",{className:a.A.inputfielderror,children:f.password})]}),(0,c.jsxs)("div",{className:a.A.UsernotAvaliable,children:["Already have an account? ",(0,c.jsx)(l.N_,{to:"/login",children:"Login"})]}),(0,c.jsx)(i.A,{type:"submit",disabled:A,children:A?"Creating Account...":"Create Account"})]})})]})})}},555:(e,s,r)=>{r.d(s,{A:()=>a});const a={UserLoginwrapper:"Ilr2sDTxcX6iN4oEhfPK",loginForm:"FGp0hyWKrGXQiF1JdGTG",inputfieldContainer:"qEfPOULVv1zTG4_yyTrB",multipleinputfieldwrapper:"T1n6SAbD7e3LJN_6FbwE",inputfieldLabelContainer:"qAEQVS1yl72RbrDYtolZ",inputfield:"VU3diMWWYxG9wxC3MHwJ",loginImage:"yUXAZUQPDsuF2Xn1SrWa",loginSvg:"ATp0h_XKuxATbVGYlvng",UsernotAvaliable:"JVuatc6KXxZoAhdbbzWf",separatorcontent:"hWVJsyUh6XPGoRTTFMnn",inputfielderror:"WG7qDk4pKxv8osuQAPDB"}}}]);
//# sourceMappingURL=254.bbc13ba6d1a9eb6fc91f.js.map