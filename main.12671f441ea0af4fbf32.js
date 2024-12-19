"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[792],{687:(e,s,a)=>{var r=a(540),l=a(338),i=a(181);const t="zr69Ky4MwXAl2OyUo0Bm",n="hPF7HRfQ5XbXiRO317jI";var d=a(848);const c=e=>{const{type:s,children:a,...r}=e;return(0,d.jsx)("div",{className:`${t}`,children:(0,d.jsx)("button",{className:n,type:s,...r,children:a})})},o="BhuKYQMbo6CDs5TEOQpu",h="CPZcmLCrvqJ7ShXfbLhX",m="BL0KrJp8mLK3w7zYyTKW",x=(0,r.createContext)(),j=e=>{let{children:s}=e;const[a,l]=(0,r.useState)((()=>{const e=localStorage.getItem("theme");if(e)return e;return window.matchMedia("(prefers-color-scheme: dark)").matches?"Dark":"Light"}));(0,r.useEffect)((()=>{localStorage.setItem("theme",a),document.body.setAttribute("data-theme",a)}),[a]),(0,r.useEffect)((()=>{const e=()=>{const e=localStorage.getItem("theme");e&&e!==a&&l(e)};return window.addEventListener("storage",e),()=>{window.removeEventListener("storage",e)}}),[a]);return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(x.Provider,{value:{currentTheme:a,changeTheme:e=>{l(e)},AvaliableThemes:["Light , Dark  , HightContrast"]},children:s})})},u=()=>{const e=(0,i.Zp)(),{currentTheme:s,changeTheme:a,AvaliableThemes:l}=(0,r.useContext)(x);return(0,d.jsxs)("div",{className:o,children:[(0,d.jsx)("div",{className:h}),(0,d.jsxs)("div",{className:m,children:[(0,d.jsx)("div",{children:"Get started with ZyloDrive"}),(0,d.jsx)(c,{type:"button",onClick:()=>e("/login"),children:"Continue"})]})]})},v="Ilr2sDTxcX6iN4oEhfPK",p="FGp0hyWKrGXQiF1JdGTG",g="qEfPOULVv1zTG4_yyTrB",N="qAEQVS1yl72RbrDYtolZ",y="VU3diMWWYxG9wxC3MHwJ",w="JVuatc6KXxZoAhdbbzWf",b="hWVJsyUh6XPGoRTTFMnn",f="WG7qDk4pKxv8osuQAPDB",S=()=>(0,d.jsxs)("svg",{version:"1.1",id:"Uploaded to svgrepo.com",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"40px",height:"40px",viewBox:"0 0 32 32",xmlSpace:"preserve",children:[(0,d.jsx)("style",{type:"text/css",children:"\n        .afiado_een { fill: #0B1719; }\n      "}),(0,d.jsx)("path",{className:"afiado_een",d:"M24,12V4H8v8H4v12h4v4h4v-4h8v4h4v-4h4V12H24z M12,20H8v-4h4V20z M12,12V8h8v4H12z M24,20h-4v-4h4V20z"})]}),D=()=>{const e=(0,i.Zp)();return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:"logo",style:{cursor:"pointer"},onClick:()=>e("/"),children:[(0,d.jsx)(S,{}),(0,d.jsx)("p",{children:"ZyloDrive"})]})})},C=()=>{const e=(0,i.Zp)(),[s,a]=(0,r.useState)(""),[l,t]=(0,r.useState)(""),[n,o]=(0,r.useState)(null);return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:v,children:[(0,d.jsx)(D,{}),(0,d.jsxs)("div",{className:p,children:[(0,d.jsxs)("form",{onSubmit:e=>{e.preventDefault();let a={};s.length<=0?a.email="Email is required":s.length>100?a.email="Email cannot be more than 100 characters":/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).toLowerCase())||(a.email="Invalid Email"),l.length<=0?a.password="Password is required":l.length>6||(a.password="Password must be at least 6 characters"),o(a),Object.keys(a).length},noValidate:!0,children:[(0,d.jsxs)("div",{className:g,children:[(0,d.jsxs)("label",{for:"zyloDriverUserLogin",children:[(0,d.jsx)("div",{className:N,children:(0,d.jsx)("div",{children:(0,d.jsx)("h3",{children:" What's your email ? "})})}),(0,d.jsx)("input",{id:"zyloDriverUserLogin",className:y,style:n&&n.email?{border:"2px solid red"}:{},type:"email",value:s,onChange:e=>a(e.target.value),required:!0,placeholder:"email@example.com"})]}),n&&n.email&&(0,d.jsx)("div",{className:f,children:n.email})]}),(0,d.jsxs)("div",{className:g,children:[(0,d.jsxs)("label",{for:"zyloDriverUserPassword",children:[(0,d.jsx)("div",{className:N,children:(0,d.jsx)("div",{children:(0,d.jsx)("h3",{children:"Enter Password"})})}),(0,d.jsx)("input",{id:"zyloDriverUserPassword",className:y,value:l,onChange:e=>t(e.target.value),style:n&&n.password?{border:"2px solid red"}:{},type:"password",required:!0})]}),n&&n.password&&(0,d.jsx)("div",{className:f,children:n.password})]}),(0,d.jsxs)("div",{className:w,children:["Don't have an account ? ",(0,d.jsx)(i.N_,{to:"/signup",children:"Signup"})]}),(0,d.jsx)(c,{type:"submit",children:"Submit"})]}),(0,d.jsx)("p",{className:b,children:"or"}),(0,d.jsx)(c,{style:{backgroundColor:"#59463B"},type:"button",onClick:()=>{e("/captain-login")},children:"Log in As Captain "}),(0,d.jsxs)("div",{style:{marginTop:"8px"},className:w,children:["Want to be a Captain ? ",(0,d.jsx)(i.N_,{to:"/signup",children:"Signup"})]})]})]})})},q=()=>{const[e,s]=(0,r.useState)(""),[a,l]=(0,r.useState)(""),[t,n]=(0,r.useState)(""),[o,h]=(0,r.useState)(""),[m,x]=(0,r.useState)({}),j=e=>/^[a-zA-Z\s]+$/.test(e);return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:v,children:[(0,d.jsx)(D,{}),(0,d.jsx)("div",{className:p,children:(0,d.jsxs)("form",{onSubmit:s=>{s.preventDefault();let r={};e?j(e)?e.length>40&&(r.firstName="First name cannot be more than 40 characters"):r.firstName="First name cannot contain special characters":r.firstName="First name is required",a.length>0?j(a)||(r.lastName="Last name cannot contain special characters"):a>40&&(r.lastName="Last name cannot be more than 40 characters"),t?(e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e).toLowerCase()))(t)?t.length>100&&(r.email="email cannot be more than 40 characters"):r.email="Invalid Email":r.email="Email is required",o?(e=>e.length>=6)(o)||(r.password="Password must be at least 6 characters"):r.password="Password is required",x(r),Object.keys(r).length},noValidate:!0,children:[(0,d.jsxs)("div",{className:g,children:[(0,d.jsxs)("label",{htmlFor:"zyloDriverFirstName",children:[(0,d.jsx)("div",{className:N,children:(0,d.jsx)("div",{title:"required field",children:(0,d.jsxs)("h3",{children:["First Name ",(0,d.jsx)("sup",{style:{color:"red"},children:"*"})]})})}),(0,d.jsx)("input",{id:"zyloDriverFirstName",className:y,style:m.firstName?{border:"2px solid red"}:{},type:"text",value:e,onChange:e=>s(e.target.value),required:!0,placeholder:"First Name"})]}),m.firstName&&(0,d.jsx)("div",{className:f,children:m.firstName})]}),(0,d.jsxs)("div",{className:g,children:[(0,d.jsxs)("label",{htmlFor:"zyloDriverLastName",children:[(0,d.jsx)("div",{className:N,children:(0,d.jsx)("div",{children:(0,d.jsx)("h3",{children:"Last Name"})})}),(0,d.jsx)("input",{id:"zyloDriverLastName",className:y,style:m.lastName?{border:"2px solid red"}:{},type:"text",value:a,onChange:e=>l(e.target.value),required:!0,placeholder:"Last Name"})]}),m.lastName&&(0,d.jsx)("div",{className:f,children:m.lastName})]}),(0,d.jsxs)("div",{className:g,children:[(0,d.jsxs)("label",{htmlFor:"zyloDriverUserEmail",children:[(0,d.jsx)("div",{className:N,children:(0,d.jsx)("div",{children:(0,d.jsxs)("h3",{title:"required field",children:["Email id ",(0,d.jsx)("sup",{style:{color:"red"},children:"*"})]})})}),(0,d.jsx)("input",{id:"zyloDriverUserEmail",className:y,style:m.email?{border:"2px solid red"}:{},type:"email",value:t,onChange:e=>n(e.target.value),required:!0,placeholder:"email@example.com"})]}),m.email&&(0,d.jsx)("div",{className:f,children:m.email})]}),(0,d.jsxs)("div",{className:g,children:[(0,d.jsxs)("label",{htmlFor:"zyloDriverUserPassword",children:[(0,d.jsx)("div",{className:N,children:(0,d.jsx)("div",{children:(0,d.jsxs)("h3",{title:"required field",children:["Enter Password ",(0,d.jsx)("sup",{style:{color:"red"},children:"*"})," "]})})}),(0,d.jsx)("input",{id:"zyloDriverUserPassword",className:y,value:o,onChange:e=>h(e.target.value),style:m.password?{border:"2px solid red"}:{},type:"password",required:!0})]}),m.password&&(0,d.jsx)("div",{className:f,children:m.password})]}),(0,d.jsxs)("div",{className:w,children:["Already have an account? ",(0,d.jsx)(i.N_,{to:"/login",children:"Login"})]}),(0,d.jsx)(c,{type:"submit",children:"Submit"})]})})]})})},z=()=>{const e=(0,i.Zp)(),[s,a]=(0,r.useState)(""),[l,t]=(0,r.useState)(""),[n,o]=(0,r.useState)(null);return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:v,children:[(0,d.jsx)(D,{}),(0,d.jsxs)("div",{className:p,children:[(0,d.jsxs)("form",{onSubmit:e=>{e.preventDefault();let a={};s.length<=0?a.email="Email is required":s.length>100?a.email="Email cannot be more than 100 characters":/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).toLowerCase())||(a.email="Invalid Email"),l.length<=0?a.password="Password is required":l.length>6||(a.password="Password must be at least 6 characters"),o(a),Object.keys(a).length},noValidate:!0,children:[(0,d.jsxs)("div",{className:g,children:[(0,d.jsxs)("label",{for:"zyloDriverUserLogin",children:[(0,d.jsx)("div",{className:N,children:(0,d.jsx)("div",{children:(0,d.jsx)("h3",{children:" What's your email ? "})})}),(0,d.jsx)("input",{id:"zyloDriverUserLogin",className:y,style:n&&n.email?{border:"2px solid red"}:{},type:"email",value:s,onChange:e=>a(e.target.value),required:!0,placeholder:"email@example.com"})]}),n&&n.email&&(0,d.jsx)("div",{className:f,children:n.email})]}),(0,d.jsxs)("div",{className:g,children:[(0,d.jsxs)("label",{for:"zyloDriverUserPassword",children:[(0,d.jsx)("div",{className:N,children:(0,d.jsx)("div",{children:(0,d.jsx)("h3",{children:"Enter Password"})})}),(0,d.jsx)("input",{id:"zyloDriverUserPassword",className:y,value:l,onChange:e=>t(e.target.value),style:n&&n.password?{border:"2px solid red"}:{},type:"password",required:!0})]}),n&&n.password&&(0,d.jsx)("div",{className:f,children:n.password})]}),(0,d.jsxs)("div",{className:w,children:["Don't have an account ? ",(0,d.jsx)(i.N_,{to:"/captain-signup",children:"Signup"})]}),(0,d.jsx)(c,{type:"submit",children:"Submit"})]}),(0,d.jsx)("p",{className:b,children:"or"}),(0,d.jsx)(c,{type:"button",onClick:()=>{e("/login")},children:"Log in As User "}),(0,d.jsxs)("div",{style:{marginTop:"5px"},className:w,children:["Create an user Account ? ",(0,d.jsx)(i.N_,{to:"/signup",children:"Signup"})]})]})]})})},L=()=>(0,d.jsx)(d.Fragment,{children:"CaptainSignup"}),E=()=>(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(i.BV,{children:[(0,d.jsx)(i.qh,{path:"/",element:(0,d.jsx)(u,{})}),(0,d.jsx)(i.qh,{path:"/login",element:(0,d.jsx)(C,{})}),(0,d.jsx)(i.qh,{path:"/signup",element:(0,d.jsx)(q,{})}),(0,d.jsx)(i.qh,{path:"/captain-login",element:(0,d.jsx)(z,{})}),(0,d.jsx)(i.qh,{path:"/captain-signup",element:(0,d.jsx)(L,{})})]})});l.createRoot(document.getElementById("root")).render((0,d.jsx)(r.StrictMode,{children:(0,d.jsx)(i.Kd,{basename:"/ZyloDrive",children:(0,d.jsx)(j,{children:(0,d.jsx)(E,{})})})}))}},e=>{e.O(0,[539],(()=>{return s=687,e(e.s=s);var s}));e.O()}]);
//# sourceMappingURL=main.12671f441ea0af4fbf32.js.map