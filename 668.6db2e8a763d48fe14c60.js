"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[668],{9668:(e,s,o)=>{o.r(s),o.d(s,{default:()=>x});var i=o(6540),a=o(181),t=o(9009),n=o(1831),d=o(865),l=o(8187),c=o(982),r=o(6188),p=o(3590),u=o(4848);const x=(0,i.forwardRef)(((e,s)=>{let{}=e;const o=(0,a.zy)(),x=(0,a.Zp)(),{state:h}=o,{vehicle:g,location:m,data:f}=h||{},[j]=s,{socket:k,sendMessage:L,recieveMessage:v}=(0,i.useContext)(p.d),[y,R]=(0,i.useState)(!0);return(0,i.useEffect)((()=>{g||m||f||x("/home"),R(!1)}),[g,m]),(0,i.useEffect)((()=>{j&&(j.current.style.bottom="0",j.current.style.height="100%")}),[]),(0,i.useEffect)((()=>{const e=e=>{window.confirm("you are going back cancelling the ride");e.preventDefault()};return window.addEventListener("popstate",e),()=>{window.removeEventListener("popstate",e)}}),[x]),(0,i.useEffect)((()=>{const e=e=>{x("/home/ridedetails",{state:{vehicle:g,location:m,data:e}})};return k.on("ride_confirmed",e),()=>{k.off("ride_confirmed",e)}}),[]),(0,u.jsx)(u.Fragment,{children:y?(0,u.jsx)(u.Fragment,{children:"Checking Conditions"}):(0,u.jsxs)("div",{className:t.A.RideLookupComponentWrapper,children:[(0,u.jsxs)("h3",{style:{padding:"10px 10px 10px 10px",textAlign:"center"},children:["Looking for Nearby ",g," Drivers"]}),(0,u.jsx)("div",{className:t.A.RideLookupLoading}),(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:["car"==g&&(0,u.jsx)("img",{loading:"lazy",className:t.A.RideLookupVehicleLoading,src:n,alt:"Car"}),"auto"==g&&(0,u.jsx)("img",{loading:"lazy",className:t.A.RideLookupVehicleLoading,src:d,alt:"Auto"}),"motorcycle"==g&&(0,u.jsx)("img",{loading:"lazy",className:t.A.RideLookupVehicleLoading,src:l,alt:"Bike"})]}),(0,u.jsx)("div",{className:t.A.RideLookupline}),(0,u.jsxs)("div",{className:t.A.ridelocationdetials,children:[(0,u.jsx)(c.g,{icon:r.gKm,style:{color:"var(--text-color)"}}),(0,u.jsx)("h5",{children:f?.pickup})]}),(0,u.jsx)("div",{className:t.A.RideLookupline}),(0,u.jsxs)("div",{className:t.A.ridelocationdetials,children:[(0,u.jsx)(c.g,{icon:r.THi,style:{color:"var(--text-color)"}}),(0,u.jsx)("h5",{children:f?.destination})]}),(0,u.jsx)("div",{className:t.A.RideLookupline}),(0,u.jsxs)("div",{className:t.A.ridelocationdetials,children:[(0,u.jsx)(c.g,{icon:r.E_u,style:{color:"var(--text-color)"}}),(0,u.jsx)("h5",{children:` ${f?.fare}`})]})]})})}))},9009:(e,s,o)=>{o.d(s,{A:()=>i});const i={RideLookupComponentWrapper:"x4C3LaQrpBX8OT7Az2_Q",RideLookupLoading:"kwYq5mbVmpTo4k_18pwO",loading:"oyFhbS2vuRRWTamj2boU",RideLookupVehicleLoading:"FxyMBQhip_gUxIe8Cuql",pulse:"BjdnhFedcd2HsFO7q9dh",RideLookupline:"NZT54oimBP_70xzlfhQL",ridelocationdetials:"LRNNaqs98sFl4o0W6i7r"}},865:(e,s,o)=>{e.exports=o.p+"assets/f38aec80e5652abafda6.png"},8187:(e,s,o)=>{e.exports=o.p+"assets/69ba42d6015f8bd05319.png"},1831:(e,s,o)=>{e.exports=o.p+"assets/3bc685818b209deb6f98.png"}}]);
//# sourceMappingURL=668.6db2e8a763d48fe14c60.js.map