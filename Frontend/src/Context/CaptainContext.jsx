import { createContext, useState } from "react";


const CaptainContext = createContext();

const CaptainProvider = ({ children })=>{

    const [data , setData] = useState({});
    
    const changeData = (newData) => {
        console.log("newData" , newData);
        setData(newData);
    }
    return (
        <CaptainContext.Provider value={{ data , changeData }}>
            {children}
        </CaptainContext.Provider>
    )
}

export { CaptainContext , CaptainProvider };