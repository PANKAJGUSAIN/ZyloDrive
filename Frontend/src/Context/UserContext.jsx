import { createContext, useState } from "react";


const UserContext = createContext();

const UserProvider = ({ children })=>{

    const [data , setData] = useState({});
    
    const changeData = (newData) => {
        console.log("newData" , newData);
        setData(newData);
    }
    return (
        <UserContext.Provider value={{ data , changeData }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext , UserProvider };