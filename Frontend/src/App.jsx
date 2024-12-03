import { useState } from "react";

const App = () =>{
    const [counter , setcounter] = useState(0);
    return (
        <>
            HELLO
            <button onClick={()=>{setcounter(counter+1)}}>{counter}</button>
        </>
    )
}

export default App;