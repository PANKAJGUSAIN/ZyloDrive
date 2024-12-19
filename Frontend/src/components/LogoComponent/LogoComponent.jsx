import { useNavigate } from "react-router-dom";
import Logo from "../svgs/logo"

const LogoComponent = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="logo" style={{ cursor:"pointer" }} onClick={() => navigate('/')}>
                <Logo />
                <p>ZyloDrive</p>
            </div>
        </>
    )
}

export default LogoComponent