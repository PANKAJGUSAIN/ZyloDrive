import { useNavigate } from "react-router-dom";
import Logo from "../svgs/logo";
import styles from "../Header/Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { CaptainContext } from "../../Context/CaptainContext";
// import Button from "../button/button";

const ZyloDriveCaptainHeader = (props) => {
    const navigate = useNavigate();
    const profileRef = useRef();
    const [logout, setlogout] = useState(false);
    const { captaindata: data } = useContext(CaptainContext)
    const { currentTheme, changeTheme, AvaliableThemes } = useContext(ThemeContext)
    const isCaptainHome = location.pathname === '/ZyloDrive/captain-home';

    const handleProfileView = () => {
        if (profileRef.current) {
            const isActive = profileRef.current.getAttribute('data-userclick') === "true";
            profileRef.current.setAttribute('data-userclick', !isActive);
        }
    }

    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            profileRef.current.setAttribute('data-userclick', 'false');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleProfileView();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className={styles.zyloDriveheader}>
            <div className="logo" style={{ cursor: "pointer" }} onClick={() => navigate('/')}>
                <Logo />
                <p>ZyloDrive</p>

            </div>
            <div
                title="Avaliable Rides"
                onClick={() => {
                    if (isCaptainHome) {
                        props.setOpenModal(true);
                    }
                }} 
                tabIndex={0} 
                style={{ cursor: 'pointer', backgroundColor: "var(--button-background-color)", width: "auto", height: "90%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: "12px", gap: "10px", padding: "0 10px", borderRadius: "8px", fontWeight: "600", color: "var(--button-text-color)" }}
            >
                Find Rides<FontAwesomeIcon icon={faBell} style={{ fill: "red", stroke: "red", color: "red" }} />
            </div>
            <div title="User Profile" tabIndex={0} onKeyDown={handleKeyPress} onClick={() => { handleProfileView() }} className={styles.userIcon}>
                <FontAwesomeIcon icon={faUser} style={{ color: 'var(--background-color)' }} size="lg" />
            </div>
            <div className={styles.profileContainer} data-userclick="false" ref={profileRef}>
                <div className={styles.profileContent}>
                    <p style={{ fontSize: "12px" }}>Hello , {data.fullname.firstname}</p>
                    <div className={styles.line}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label htmlFor="themeSelect" style={{ fontSize: "12px" }}>Theme</label>
                        <select id="themeSelect" name="themeSelect" className={styles.themeSelect} value={currentTheme} onChange={(e) => changeTheme(e.target.value)}>
                            {
                                AvaliableThemes.map((theme, index) => <option key={index} value={theme}>{theme}</option>)
                            }
                        </select>
                    </div>
                    <button className={styles.popupbutton} type="button" onClick={() => { navigate('/captains/logout'); setlogout(!logout) }} disabled={logout} >Logout</button>
                    {/* <Button type="button" onClick={()=>{navigate('/users/logout')}}>Logout</Button> */}
                </div>
            </div>
        </div>
    )
}

export default ZyloDriveCaptainHeader