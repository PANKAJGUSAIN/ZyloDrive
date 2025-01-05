import { useContext, useEffect } from "react"
import { CaptainContext } from "../../Context/CaptainContext"
import { useNavigate } from "react-router-dom"



const CaptainProtectedWrapper = ({children})=>{
    const token = sessionStorage.getItem("zylotoken")
    const navigate = useNavigate()

    useEffect(()=>{
        if(token === null){
            navigate("/captain-login")
        }
        
    },[token])

    return (
        <>
            {children}
        </>
    )
}
export default CaptainProtectedWrapper