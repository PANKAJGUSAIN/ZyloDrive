import { useLocation, useNavigate } from "react-router-dom";
import ZyloDriveHeader from "../../components/Header/Header";
import userridingstyles from "../UserHome/UserHome.module.scss";
import style from "../../components/RideDetails/RideDetails.module.scss";
import styles from "../../components/RideLookout/RideLookout.module.scss";
import ridingStyles from "../UserRiding/UserRiding.module.scss";
import captainRiding from "./CaptainRiding.module.scss";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/button/button";
import { faArrowAltCircleDown, faRegistered } from "@fortawesome/free-regular-svg-icons";
import ZyloDriveCaptainHeader from "../../components/CaptainHeader/CaptainHeader";
import { faBox, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const CaptainRiding = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userWrapperRef = useRef(null);
    const { state } = location;
    const { data } = state || {};
    const downArrowRef = useRef(null);
    // const locationContainerref = useRef(null);
    console.log("data", data)

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
                    userWrapperRef.current.style.height = "20%";
                    userWrapperRef.current.setAttribute('data-isfull', "false");
                } else {
                    userWrapperRef.current.setAttribute('data-isfull', "true");
                }
                // locationContainerref.current.style.display = "none";
            }
        }
    }

    const handleRideComplete = async () => {
        const result = await fetch(`${process.env.REACT_APP_API_URL}/rides/end-ride`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('zylotoken')}`
            },
            body: JSON.stringify({ rideId: data._id })
        })
        const response = await result.json();
        console.log("response");
    }

    useEffect(() => {
        window.addEventListener('resize', resetcss);
        return () => {
            window.removeEventListener('resize', resetcss);
        };
    }, []);

    useEffect(() => {
        if (!data) {
            navigate('/captain-home')
        }
    }, [])

    return (
        <div className={userridingstyles.UserHomeWrapper}>
            <ZyloDriveCaptainHeader />
            <div className={userridingstyles.UserMainWrapper}>
                <div className={userridingstyles.UserMapWrapper} >
                    <h1>Welcome to Captains Home</h1>
                </div>
                <div data-isfull={false} ref={userWrapperRef} className={captainRiding.CaptainLocationWrapper}>
                    <div className={captainRiding.Captainarrow} onClick={handleDownMovement} ref={downArrowRef}>
                        <FontAwesomeIcon className={ridingStyles.downArrow} icon={faArrowAltCircleDown} style={{ color: "var(--textcolor)" }} />
                    </div>
                    <div className={style.RideDetailsComponentWrapper}>
                        <Button type="button" style={{ backgroundColor: "green",marginBottom:"10px"}} onClick={() => { handleRideComplete() }}>Complete Ride</Button>
                        <div style={{ width: "100%" }} className={styles.RideLookupline}>
                        </div>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="captain" style={{ width: "40px", height: "40px", borderRadius: "50%" , padding:"10px" }} />
                            <h5>{data?.user.fullname?.firstname + " "+data?.user.fullname?.lastname}</h5>
                        </div>
                        <div style={{ width: "100%" }} className={styles.RideLookupline}>
                        </div>
                        <div style={{ width: "100%" }} className={styles.ridelocationdetials}>
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: "var(--text-color)" }} />
                            <h5>{data?.pickup}</h5>
                        </div>
                        <div style={{ width: "100%" }} className={styles.RideLookupline}>
                        </div>
                        <div style={{ width: "100%" }} className={styles.ridelocationdetials}>
                            <FontAwesomeIcon icon={faBox} style={{ color: "var(--text-color)" }} />
                            <h5>{data?.destination}</h5>
                        </div>
                        <div style={{ width: "100%" }} className={styles.RideLookupline}>
                        </div>
                        <div style={{ width: "100%" }} className={styles.ridelocationdetials}>
                            <FontAwesomeIcon icon={faRegistered} style={{ color: "var(--text-color)" }} />
                            <h5>{data?.fare}</h5>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CaptainRiding