import { useNavigate } from "react-router-dom";
import Logo from "../svgs/logo";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const ZyloDriveHeader = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.zyloDriveheader}>
            <div className="logo" style={{ cursor: "pointer" }} onClick={() => navigate('/')}>
                <Logo />
                <p>ZyloDrive</p>
            </div>
            <div className={styles.userIcon}>            
                <FontAwesomeIcon icon={faUser} style={{ color: 'var(--text-color)' }} size="lg"/>
            </div>
        </div>
    )
}

export default ZyloDriveHeader