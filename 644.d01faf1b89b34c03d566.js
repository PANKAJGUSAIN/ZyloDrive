"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[644],{7644:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var n=a(6540),s=a(7364),o=a(181),l=a(1083),r=a(4848);const i=()=>{const{changeData:e}=(0,n.useContext)(s.R),t=sessionStorage.getItem("zylotoken"),a=(0,o.Zp)(),i=(0,o.zy)(),[u,h]=(0,n.useState)(!0);return(0,n.useEffect)((()=>{null===t?(a("/login"),h(!1)):l.A.post("https://zylo-drive.vercel.app/users/profile",{},{headers:{Authorization:`Bearer ${t}`}}).then((t=>{const n={email:t.data.email,fullname:t.data.fullname};e(n),"/login"===i.pathname||"/signup"===i.pathname?a("/home"):a(i.pathname),h(!1)})).catch((e=>{sessionStorage.removeItem("zylotoken"),a("/login"),h(!1)}))}),[t]),(0,r.jsx)(r.Fragment,{children:u?"Loading......":(0,r.jsx)(o.sv,{})})}}}]);
//# sourceMappingURL=644.d01faf1b89b34c03d566.js.map