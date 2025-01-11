import { forwardRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./RideDetails.module.scss";
import styles from "../RideLookout/RideLookout.module.scss";
import carimg from "../../assets/ZyloCar.png";
import autoimg from "../../assets/Zylo-Auto.png";
import bikeimg from "../../assets/Zylo-bike.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCashRegister, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const RideDetails = forwardRef(({ }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
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
            {
                loading ?
                    <>Checking Conditions</>
                    : <div className={style.RideDetailsComponentWrapper}>
                        <div className={style.RideDetials}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flexStart" }}>
                                {selectedVehicle == "Car" && <img loading="lazy" className={style.RideLookupVehicleLoading} src={carimg} alt="Car" />}
                                {selectedVehicle == "Auto" && <img loading="lazy" className={style.RideLookupVehicleLoading} src={autoimg} alt="Auto" />}
                                {selectedVehicle == "Bike" && <img loading="lazy" className={style.RideLookupVehicleLoading} src={bikeimg} alt="Bike" />}
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

export default RideDetails