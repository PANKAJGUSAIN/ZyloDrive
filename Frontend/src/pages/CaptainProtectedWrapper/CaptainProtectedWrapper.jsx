import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { CaptainContext } from "../../Context/CaptainContext"



const CaptainProtectedWrapper = ()=>{
    const {changeCaptainData} = useContext(CaptainContext)
    const token = sessionStorage.getItem("zylotoken")
    const[loading , setLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        if(token === null){
            navigate("/captain-login")
            setLoading(false)
        }else{
            axios.post(`${process.env.REACT_APP_API_URL}/captains/profile`,{} ,{
                headers:{
                    Authorization: `Bearer ${token}`
                },
            }).then((response)=>{
                const data = {
                    _id:response.data._id,
                    email:response.data.email,
                    fullname:response.data.fullname,
                    status:response.data.status,
                    vehicle:response.data.vehicle,
                }
                changeCaptainData(data)
                if(location.pathname === "/captain-login" || location.pathname === "/captain-signup"){
                    navigate("/captain-home")
                }
                else{
                    navigate(location.pathname)
                }
                setLoading(false)
            }).catch((err)=>{
                sessionStorage.removeItem("zylotoken");
                navigate("/captain-login");
                setLoading(false);
                console.log(err)
            })
        }
        
    },[token])

    return (
        <>  
            {loading ? <>Loading.....</>: <Outlet/>}
        </>
    )
}
export default CaptainProtectedWrapper