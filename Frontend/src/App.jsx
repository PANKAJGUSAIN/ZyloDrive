import { Route, Routes } from "react-router-dom";
import './index.scss'
import Start from "./pages/Start/Start";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserSignup from "./pages/UserSignup/UserSignup";
import Captainlogin from "./pages/CaptainLogin/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup/CapatainSignup";
import UserProtectedWrapper from "./pages/UserProtectedWrapper/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout/UserLogout";

const App = () =>{
    return (
        <>
            <Routes>
                <Route path='/' element={<Start/>}/>
                <Route path='/login' element={<UserLogin/>}/>
                <Route path='/signup' element={<UserSignup/>}/>
                <Route path='/captain-login' element={<Captainlogin/>}/>
                <Route path='/captain-signup' element={<CaptainSignup/>}/>
                <Route path="/home" element={<UserProtectedWrapper><>Hello</></UserProtectedWrapper>}/>
                <Route path="/users/logout" element={<UserProtectedWrapper><UserLogout/></UserProtectedWrapper>}/>
            </Routes>
        </>
    )
}

export default App;