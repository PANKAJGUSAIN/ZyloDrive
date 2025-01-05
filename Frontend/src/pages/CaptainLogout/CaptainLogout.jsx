import axios from "axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const UserLogout = () =>{

    const navigate = useNavigate();
    useEffect(()=>{
        const token = sessionStorage.getItem("zylotoken");
        if(token === null){
            navigate("/captain-login");
        }
        else{
            axios.get(`${process.env.REACT_APP_API_URL}/captains/logout`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(response =>{
                console.log("response",response);  
                navigate("/");
            }).catch(err=>{
                console.log(err);
            }).finally(()=>{
                sessionStorage.removeItem("zylotoken");
                navigate("/");
            })
        }
        
    },[])

    return(
        <>
            <h1>You are being logged out ....</h1>
        </>
    )
}

export default UserLogout