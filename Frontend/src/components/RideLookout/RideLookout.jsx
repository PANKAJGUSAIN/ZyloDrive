import { forwardRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./RideLookout.module.scss";
import carimg from "../../assets/ZyloCar.png";
import autoimg from "../../assets/Zylo-Auto.png";
import bikeimg from "../../assets/Zylo-bike.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCashRegister, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const RideLookout = forwardRef(({ }, ref) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { vehicle: selectedVehicle, location: selectedLocation } = state || {};
    const [userWrapperRef] = ref;
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        console.log('location', state)
        if (!selectedVehicle && !selectedLocation) {
            navigate("/home")
        }
        setLoading(false)

    }, [selectedVehicle, selectedLocation])


    useEffect(() => {
        if (userWrapperRef) {
            userWrapperRef.current.style.bottom = "0";
            userWrapperRef.current.style.height = "100%";
        }
    }, [])


    useEffect(() => {
        // window.history.pushState(null, null, window.location.pathname);
        const handlePopState = (event) => {
           const result = window.confirm("you are going back cancelling the ride");
           event.preventDefault();
        //    console.log("user going back" , result);
        //    window.history.pushState(null, null, window.location.pathname);
        //    window.history.pushState(null, null, window.location.pathname);
        };

        // Listen for changes in the location
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };

    }, [navigate]);

    useEffect(()=>{
        const timer = setTimeout(() => {
            navigate('/home/ridedetails', { state: { vehicle: selectedVehicle, location: selectedLocation } })
        }, 2000);
        return () => {
            clearTimeout(timer);
        }
    },[])



    return (
        <>
            {loading ?
                <>Checking Conditions</> :
                <div className={styles.RideLookupComponentWrapper}>
                    <h3 style={{ padding: "10px 10px 10px 10px", textAlign: "center" }}>Looking for Nearby {selectedVehicle} Drivers</h3>
                    <div className={styles.RideLookupLoading}>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {selectedVehicle == "Car" && <img loading="lazy" className={styles.RideLookupVehicleLoading} src={carimg} alt="Car" />}
                        {selectedVehicle == "Auto" && <img loading="lazy" className={styles.RideLookupVehicleLoading} src={autoimg} alt="Auto" />}
                        {selectedVehicle == "Bike" && <img loading="lazy" className={styles.RideLookupVehicleLoading} src={bikeimg} alt="Bike" />}
                    </div>
                    <div className={styles.RideLookupline}>
                    </div>
                    <div className={styles.ridelocationdetials}>
                        <FontAwesomeIcon icon={faLocationDot} style={{ color: "var(--text-color)" }} />
                        <h5>{selectedLocation}</h5>
                    </div>
                    <div className={styles.RideLookupline}>
                    </div>
                    <div className={styles.ridelocationdetials}>
                        <FontAwesomeIcon icon={faBox} style={{ color: "var(--text-color)" }} />
                        <h5>{selectedLocation}</h5>
                    </div>
                    <div className={styles.RideLookupline}>
                    </div>
                    <div className={styles.ridelocationdetials}>
                        <FontAwesomeIcon icon={faCashRegister} style={{ color: "var(--text-color)" }} />
                        <h5>$123.34</h5>
                    </div>
                </div>
            }

        </>
    )
})
export default RideLookout