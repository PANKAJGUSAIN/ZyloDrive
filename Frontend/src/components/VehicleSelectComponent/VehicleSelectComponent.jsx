import { forwardRef, useEffect, useState } from "react"
import styles from "./VehicleSelectComponent.modules.scss"
import carimg from "../../assets/ZyloCar.png"
import autoimg from "../../assets/Zylo-Auto.png"
import bikeimg from "../../assets/Zylo-bike.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

const VehicleSelectComponent = forwardRef(({ handleClick }, ref) => {

    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { location: selectedLocation } = state || {};
    const [userWrapperRef] = ref;
    const [loading, setLoading] = useState(true)

    const handleVehicleSelect = (vehicle) =>{
        navigate('/home/ridelookout' , { state: {vehicle , location:selectedLocation} })
    }

    useEffect(() => {

        console.log('location', selectedLocation)
        if (!selectedLocation) {
            navigate("/home")
        }
        setLoading(false)

    }, [selectedLocation])


    useEffect(() => {
        if (userWrapperRef) {
            userWrapperRef.current.style.bottom = "0";
            userWrapperRef.current.style.height = "80%";
        }
    }, [])

    return (
        <>
            {loading ?
                <>Checking Conditions</> :
                <div className={styles.vehicleSelectComponentWrapper}>
                    <h3 style={{ padding: "10px 10px 10px 10px" }}>Choose a Vehicle</h3>
                    <div className={styles.vehicleContainer} onClick={()=>handleVehicleSelect("Car")}>
                        <img loading="lazy" className={styles.vehicleImage} src={carimg} alt="Car" />
                        <div>
                            <div className={styles.vehicleDetails}>
                                <h5>Uber Go</h5>
                                <FontAwesomeIcon className={styles.vehicleSeatIcon} icon={faUserFriends} style={{ color: "var(--text-color)" }} />
                                <p style={{ fontSize: "clamp(12px, calc(12px + 0.5vw), 16px)" }}>4</p>
                            </div>
                            <div className={styles.vehicleTime}>
                                <div><p>2 mins away 15:03pm </p></div>
                            </div>
                            <div className={styles.vehicleStyle}><p>Affordable, Compact Rides</p></div>
                        </div>
                        <div>
                            <h5 className={styles.vehiclePrice}>$ 83.50</h5>
                        </div>
                    </div>
                    <div className={styles.vehicleContainer} onClick={()=>handleVehicleSelect("Auto")}>
                        <img loading="lazy" className={styles.vehicleImage} src={autoimg} alt="Auto" />
                        <div>
                            <div className={styles.vehicleDetails}>
                                <h5>Uber Auto</h5>
                                <FontAwesomeIcon className={styles.vehicleSeatIcon} icon={faUserFriends} style={{ color: "var(--text-color)" }} />
                                <p style={{ fontSize: "clamp(12px, calc(12px + 0.5vw), 16px)" }}>3</p>
                            </div>
                            <div className={styles.vehicleTime}>
                                <div><p>2 mins away 15:03pm </p></div>
                            </div>
                            <div className={styles.vehicleStyle}><p>Affordable, Compact Rides</p></div>
                        </div>
                        <div>
                            <h5 className={styles.vehiclePrice}>$ 43.50</h5>
                        </div>
                    </div>
                    <div className={styles.vehicleContainer} onClick={()=>handleVehicleSelect("Bike")}>
                        <img loading="lazy" className={styles.vehicleImage} src={bikeimg} alt="Bike" />
                        <div>
                            <div className={styles.vehicleDetails}>
                                <h5>Uber Bike</h5>
                                <FontAwesomeIcon className={styles.vehicleSeatIcon} icon={faUserFriends} style={{ color: "var(--text-color)" }} />
                                <p style={{ fontSize: "clamp(12px, calc(12px + 0.5vw), 16px)" }}>2</p>
                            </div>
                            <div className={styles.vehicleTime}>
                                <div><p>2 mins away 15:03pm </p></div>
                            </div>
                            <div className={styles.vehicleStyle}><p>Affordable, Compact Rides</p></div>
                        </div>
                        <div>
                            <h5 className={styles.vehiclePrice}>$ 23.50</h5>
                        </div>
                    </div>
                </div>
            }

        </>
    )
})

export default VehicleSelectComponent