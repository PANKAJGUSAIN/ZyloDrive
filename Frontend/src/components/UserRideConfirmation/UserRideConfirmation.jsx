import { forwardRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import carimg from "../../assets/ZyloCar.png";
import autoimg from "../../assets/Zylo-Auto.png";
import bikeimg from "../../assets/Zylo-bike.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCashRegister, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";
import styles from "../RideLookout/RideLookout.module.scss";

const UserRideConfirmation = forwardRef(({ }, ref) => {
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
                    <h3 style={{ padding: "10px 10px 10px 10px", textAlign: "center" }}>Confirm {selectedVehicle} Ride ? </h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {selectedVehicle=="Car" && <img loading="lazy" className={styles.RideLookupVehicleLoading} src={carimg} alt="Car" />}
                        {selectedVehicle=="Auto" && <img loading="lazy" className={styles.RideLookupVehicleLoading} src={autoimg} alt="Auto" />}
                        {selectedVehicle=="Bike" && <img loading="lazy" className={styles.RideLookupVehicleLoading} src={bikeimg} alt="Bike" />}
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
                    <Button type="submit" onClick={()=>{navigate('/home/ridelookout' , { state: {vehicle:selectedVehicle , location:selectedLocation} } )}}>Confirm Booking</Button>
                </div>
            }

        </>
    )
})
export default UserRideConfirmation