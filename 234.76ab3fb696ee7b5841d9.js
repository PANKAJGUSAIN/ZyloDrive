"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[234],{7234:(e,s,i)=>{i.r(s),i.d(s,{default:()=>u});var o=i(6540),t=i(181),a=i(1831),n=i(865),l=i(8187),c=i(982),r=i(6188),d=i(3404),p=i(9009),h=i(4848);const u=(0,o.forwardRef)(((e,s)=>{let{}=e;const i=(0,t.zy)(),u=(0,t.Zp)(),{state:x}=i,{vehicle:m,location:g,fare:j}=x||{},[y]=s,[k,f]=(0,o.useState)(!0),[L,R]=(0,o.useState)(!1);(0,o.useEffect)((()=>{m||g?.pickup||g?.destination||u("/home"),f(!1)}),[m,g]),(0,o.useEffect)((()=>{y&&(y.current.style.bottom="0",y.current.style.height="100%")}),[]);return(0,h.jsx)(h.Fragment,{children:k?(0,h.jsx)(h.Fragment,{children:"Checking Conditions"}):(0,h.jsxs)("div",{className:p.A.RideLookupComponentWrapper,children:[(0,h.jsxs)("h3",{style:{padding:"10px 10px 10px 10px",textAlign:"center"},children:["Confirm ",m," Ride ? "]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:["car"==m&&(0,h.jsx)("img",{loading:"lazy",className:p.A.RideLookupVehicleLoading,src:a,alt:"Car"}),"auto"==m&&(0,h.jsx)("img",{loading:"lazy",className:p.A.RideLookupVehicleLoading,src:n,alt:"Auto"}),"motorcycle"==m&&(0,h.jsx)("img",{loading:"lazy",className:p.A.RideLookupVehicleLoading,src:l,alt:"Bike"})]}),(0,h.jsx)("div",{className:p.A.RideLookupline}),(0,h.jsxs)("div",{className:p.A.ridelocationdetials,children:[(0,h.jsx)(c.g,{icon:r.gKm,style:{color:"var(--text-color)"}}),(0,h.jsx)("h5",{children:g?.pickup})]}),(0,h.jsx)("div",{className:p.A.RideLookupline}),(0,h.jsxs)("div",{className:p.A.ridelocationdetials,children:[(0,h.jsx)(c.g,{icon:r.THi,style:{color:"var(--text-color)"}}),(0,h.jsx)("h5",{children:g?.destination})]}),(0,h.jsx)("div",{className:p.A.RideLookupline}),(0,h.jsxs)("div",{className:p.A.ridelocationdetials,children:[(0,h.jsx)(c.g,{icon:r.E_u,style:{color:"var(--text-color)"}}),(0,h.jsx)("h5",{children:`₹ ${j}`})]}),(0,h.jsx)(d.A,{type:"submit",disabled:L,onClick:()=>{(async()=>{R(!0);try{const e=await fetch("http://localhost:3000/rides/create",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${sessionStorage.getItem("zylotoken")}`},body:JSON.stringify({vehicleType:m,pickup:g.pickup,destination:g.destination})});if(!e.ok){const s=await e.json();throw new Error(`Error ${e.status}: ${s.message||e.statusText}`)}{const s=await e.json();u("/home/ridelookout",{state:{vehicle:m,location:g,data:s}})}}catch(e){}finally{R(!1)}})()},children:L?"Creating Ride ...":"Confirm Booking"})]})})}))},3404:(e,s,i)=>{i.d(s,{A:()=>n});const o="zr69Ky4MwXAl2OyUo0Bm",t="hPF7HRfQ5XbXiRO317jI";var a=i(4848);const n=e=>{const{type:s,children:i,...n}=e;return(0,a.jsx)("div",{className:`${o}`,children:(0,a.jsx)("button",{className:t,type:s,...n,children:i})})}},9009:(e,s,i)=>{i.d(s,{A:()=>o});const o={RideLookupComponentWrapper:"x4C3LaQrpBX8OT7Az2_Q",RideLookupLoading:"kwYq5mbVmpTo4k_18pwO",loading:"oyFhbS2vuRRWTamj2boU",RideLookupVehicleLoading:"FxyMBQhip_gUxIe8Cuql",pulse:"BjdnhFedcd2HsFO7q9dh",RideLookupline:"NZT54oimBP_70xzlfhQL",ridelocationdetials:"LRNNaqs98sFl4o0W6i7r"}},865:(e,s,i)=>{e.exports=i.p+"assets/f38aec80e5652abafda6.png"},8187:(e,s,i)=>{e.exports=i.p+"assets/69ba42d6015f8bd05319.png"},1831:(e,s,i)=>{e.exports=i.p+"assets/3bc685818b209deb6f98.png"}}]);
//# sourceMappingURL=234.76ab3fb696ee7b5841d9.js.map