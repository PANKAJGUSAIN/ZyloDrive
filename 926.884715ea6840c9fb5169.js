"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[926],{8926:(a,e,t)=>{t.r(e),t.d(e,{default:()=>c});var n=t(1083),s=t(6540),i=t(181),o=t(5677),l=t(4848);const c=()=>{const{changeCaptainData:a}=(0,s.useContext)(o.S),e=sessionStorage.getItem("zylotoken"),[t,c]=(0,s.useState)(!0),r=(0,i.Zp)(),p=(0,i.zy)();return(0,s.useEffect)((()=>{null===e?(r("/captain-login"),c(!1)):n.A.post("https://zylo-drive.vercel.app/captains/profile",{},{headers:{Authorization:`Bearer ${e}`}}).then((e=>{const t={_id:e.data._id,email:e.data.email,fullname:e.data.fullname,status:e.data.status,vehicle:e.data.vehicle};a(t),"/captain-login"===p.pathname||"/captain-signup"===p.pathname?r("/captain-home"):r(p.pathname),c(!1)})).catch((a=>{sessionStorage.removeItem("zylotoken"),r("/captain-login"),c(!1)}))}),[e]),(0,l.jsx)(l.Fragment,{children:t?(0,l.jsx)(l.Fragment,{children:"Loading....."}):(0,l.jsx)(i.sv,{})})}}}]);
//# sourceMappingURL=926.884715ea6840c9fb5169.js.map