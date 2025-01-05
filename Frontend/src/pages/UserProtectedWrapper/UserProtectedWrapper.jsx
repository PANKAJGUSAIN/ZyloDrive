import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"



const UserProtectedWrapper = ()=>{
    const {changeData} = useContext(UserContext)
    const token = sessionStorage.getItem("zylotoken")
    const navigate = useNavigate()
    const location = useLocation();
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(token === null){
            navigate("/login")
            setLoading(false)
        }else{
            axios.post(`${process.env.REACT_APP_API_URL}/users/profile`,{} ,{
                headers:{
                    Authorization: `Bearer ${token}`
                },
            }).then((response)=>{
                const data = {
                    email:response.data.email,
                    fullname:response.data.fullname,
                }
                changeData(data)
                if(location.pathname === "/login" || location.pathname === "/signup"){
                    navigate("/home")
                }
                else{
                    navigate(location.pathname)
                }
                setLoading(false)
            }).catch((err)=>{
                sessionStorage.removeItem("zylotoken");
                navigate("/login");
                setLoading(false);
                console.log(err)
            })
        }
        
    },[token])

    return (
        <>
            {loading ? "Loading......" : <Outlet/>}
        </>
    )
}
export default UserProtectedWrapper