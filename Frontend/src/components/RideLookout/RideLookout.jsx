import { forwardRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./RideLookout.module.scss";
import carimg from "../../assets/ZyloCar.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faLocationDot } from "@fortawesome/free-solid-svg-icons";

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

    return (
        <>
            {loading ?
                <>Checking Conditions</> :
                <div className={styles.RideLookupComponentWrapper}>
                    <h3 style={{ padding: "10px 10px 10px 10px", textAlign: "center" }}>Looking for Nearby {selectedVehicle} Drivers</h3>
                    <div className={styles.RideLookupLoading}>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img loading="lazy" className={styles.RideLookupVehicleLoading} src={carimg} alt="Car" />
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
                </div>
            }

        </>
    )
})
export default RideLookout