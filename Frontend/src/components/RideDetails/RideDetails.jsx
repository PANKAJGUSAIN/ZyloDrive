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
    const { vehicle: selectedVehicle, location: selectedLocation , data } = state || {};
    const [userWrapperRef] = ref;
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        console.log('location', selectedVehicle , selectedLocation , data)
        if (!selectedVehicle && !selectedLocation && !data) {
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
                                {selectedVehicle == "car" && <img loading="lazy" className={style.RideLookupVehicleLoading} src={carimg} alt="Car" />}
                                {selectedVehicle == "auto" && <img loading="lazy" className={style.RideLookupVehicleLoading} src={autoimg} alt="Auto" />}
                                {selectedVehicle == "motorcycle" && <img loading="lazy" className={style.RideLookupVehicleLoading} src={bikeimg} alt="Bike" />}
                            </div>
                            <div>
                                <h5 style={{ paddingBottom: '5px' }}>{data?.captain.fullname?.firstname+" "+ data.captain.fullname?.lastname}</h5>
                                <h4 style={{ paddingBottom: '5px' }}>{data?.captain.plate}</h4>
                                <p style={{ paddingBottom: '10px', fontSize: "12px" }}>Maruti suski Alto</p>
                                <h2>OTP : {data?.otp}</h2>
                            </div>
                        </div>
                        <div className={styles.RideLookupline}>
                        </div>
                        <div className={styles.ridelocationdetials}>
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: "var(--text-color)" }} />
                            <h5>{data?.pickup}</h5>
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
                            <h5>{`\u20B9${data?.fare}`}</h5>
                        </div>

                    </div>
            }
        </>
    )
})

export default RideDetails