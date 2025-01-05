import { useContext, useEffect } from "react"
import { UserContext } from "../../Context/UserContext"
import { useNavigate } from "react-router-dom"



const UserProtectedWrapper = ({children})=>{
    const token = sessionStorage.getItem("zylotoken")
    const navigate = useNavigate()

    useEffect(()=>{
        if(token === null){
            navigate("/login")
        }
        
    },[token])

    return (
        <>
            {children}
        </>
    )
}
export default UserProtectedWrapper