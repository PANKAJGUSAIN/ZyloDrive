"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[644],{644:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var n=a(540),s=a(364),o=a(181),l=a(83),r=a(848);const i=()=>{const{changeData:e}=(0,n.useContext)(s.R),t=sessionStorage.getItem("zylotoken"),a=(0,o.Zp)(),i=(0,o.zy)(),[u,h]=(0,n.useState)(!0);return(0,n.useEffect)((()=>{null===t?(a("/login"),h(!1)):l.A.post("https://zylo-drive.vercel.app/users/profile",{},{headers:{Authorization:`Bearer ${t}`}}).then((t=>{const n={email:t.data.email,fullname:t.data.fullname};e(n),"/login"===i.pathname||"/signup"===i.pathname?a("/home"):a(i.pathname),h(!1)})).catch((e=>{sessionStorage.removeItem("zylotoken"),a("/login"),h(!1)}))}),[t]),(0,r.jsx)(r.Fragment,{children:u?"Loading......":(0,r.jsx)(o.sv,{})})}}}]);
//# sourceMappingURL=644.6320d675192454d6b5c6.js.map