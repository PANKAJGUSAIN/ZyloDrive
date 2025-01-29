import { useLocation, useNavigate } from "react-router-dom";
import ZyloDriveHeader from "../../components/Header/Header";
import userridingstyles from "../UserHome/UserHome.module.scss";
import style from "../../components/RideDetails/RideDetails.module.scss";
import styles from "../../components/RideLookout/RideLookout.module.scss";
import ridingStyles from "./UserRiding.module.scss";
import carimg from "../../assets/ZyloCar.png";
import autoimg from "../../assets/Zylo-Auto.png";
import bikeimg from "../../assets/Zylo-bike.png";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCashRegister, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button/button";
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";
import { SocketContext } from "../../Context/SocketContext";

const UserRiding = () => {
    const navigate = useNavigate();
    const userWrapperRef = useRef(null);
    const location = useLocation();
    const { state } = location;
    const { vehicle: selectedVehicle, location: selectedLocation, data } = state || {};
    const downArrowRef = useRef(null);
    const { socket } = useContext(SocketContext);
    const [loading, setLoading] = useState(true)
    // const locationContainerref = useRef(null);

    const resetcss = () => {
        if (window.innerWidth > 961) {
            userWrapperRef.current.style.bottom = "";
            userWrapperRef.current.style.height = "";
            downArrowRef.current.style.display = "none";
            // locationContainerref.current.style.display = "";
        }
        else {
            downArrowRef.current.style.display = "block";
        }
    }

    const handleDownMovement = () => {
        if (window.innerWidth < 961) {
            if (userWrapperRef.current) {
                userWrapperRef.current.style.bottom = "";
                userWrapperRef.current.style.height = "100%";
                downArrowRef.current.style.display = "";
                if (userWrapperRef.current.getAttribute('data-isfull') === "true") {
                    userWrapperRef.current.style.height = "15%";
                    userWrapperRef.current.setAttribute('data-isfull', "false");
                } else {
                    userWrapperRef.current.setAttribute('data-isfull', "true");
                }
                // locationContainerref.current.style.display = "none";
            }
        }
    }

    useEffect(() => {
        if (!selectedVehicle || !selectedLocation || !data) {
            navigate("/home")
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        window.addEventListener('resize', resetcss);
        const handleRideComplete = (data) => {
            navigate('/');
            console.log('RideEnded', data);
        }
        socket.on('ride-ended', handleRideComplete)
        return () => {
            window.removeEventListener('resize', resetcss);
            socket.off('ride-ended', handleRideComplete)
        };
    }, []);

    return (
        <>
            {
                loading ?
                    <>loading content</> :
                    <div className={userridingstyles.UserHomeWrapper}>
                        <ZyloDriveHeader />
                        <div className={userridingstyles.UserMainWrapper}>
                            <div className={userridingstyles.UserMapWrapper} >
                                <h1>Welcome to User Home</h1>
                            </div>
                            <div style={{ display: "flex", alignItems: "end", justifyContent: "end" }} data-isfull={false} ref={userWrapperRef} className={userridingstyles.UserLocationWrapper}>
                                <div onClick={handleDownMovement} ref={downArrowRef}>
                                    <FontAwesomeIcon className={ridingStyles.downArrow} icon={faArrowAltCircleDown} style={{ color: "var(--textcolor)" }} />
                                </div>
                                <div className={style.RideDetailsComponentWrapper}>
                                    <div className={style.RideDetials}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flexStart" }}>
                                            {selectedVehicle == "car" && <img loading="lazy" className={style.RideLookupVehicleLoading} src={carimg} alt="Car" />}
                                            {selectedVehicle == "auto" && <img loading="lazy" className={style.RideLookupVehicleLoading} src={autoimg} alt="Auto" />}
                                            {selectedVehicle == "motorcycle" && <img loading="lazy" className={style.RideLookupVehicleLoading} src={bikeimg} alt="Bike" />}
                                        </div>
                                        <div>
                                            <h5 style={{ paddingBottom: '5px' }}>Sarthak</h5>
                                            <h4 style={{ paddingBottom: '5px' }}>MP04 AB 1234</h4>
                                            <p style={{ paddingBottom: '10px', fontSize: "12px" }}>Maruti suski Alto</p>
                                        </div>
                                    </div>
                                    <div className={styles.RideLookupline}>
                                    </div>
                                    <div className={styles.ridelocationdetials}>
                                        <FontAwesomeIcon icon={faBox} style={{ color: "var(--text-color)" }} />
                                        <h5>{data?.destination}</h5>
                                    </div>
                                    <div className={styles.RideLookupline}>
                                    </div>
                                    <div className={styles.ridelocationdetials}>
                                        <FontAwesomeIcon icon={faCashRegister} style={{ color: "var(--text-color)" }} />
                                        <h5>{`\u20B9 ${data?.fare}`}</h5>
                                    </div>
                                    <div className={styles.RideLookupline}>
                                    </div>
                                    <Button type="button">Make A Payment</Button>

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default UserRiding