import { createContext, useState } from "react";


const CaptainContext = createContext();

const CaptainProvider = ({ children })=>{

    const [captaindata , setcaptaidata] = useState({});
    
    const changeCaptainData = (newData) => {
        console.log("CaptainData" , newData);
        setcaptaidata(newData);
    }
    return (
        <CaptainContext.Provider value={{ captaindata , changeCaptainData }}>
            {children}
        </CaptainContext.Provider>
    )
}

export { CaptainContext , CaptainProvider };