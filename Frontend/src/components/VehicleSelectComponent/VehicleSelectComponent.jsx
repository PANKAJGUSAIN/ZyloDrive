import { forwardRef, useEffect } from "react"
import styles from "./VehicleSelectComponent.modules.scss"
import carimg from "../../assets/ZyloCar.png"
import autoimg from "../../assets/Zylo-Auto.png"
import bikeimg from "../../assets/Zylo-bike.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

const VehicleSelectComponent = forwardRef(({ handleClick }, ref) => {
    const [userWrapperRef] = ref;
    useEffect(() => {
        if (userWrapperRef) {
            userWrapperRef.current.style.bottom = "0";
            userWrapperRef.current.style.height = "100%";
        }
    }, [])

    return (
        <>
            <div className={styles.vehicleSelectComponentWrapper}>
                <h3 style={{ padding: "10px 10px 10px 10px" }}>Choose a Vehicle</h3>
                <div className={styles.vehicleContainer}>
                    <img loading="lazy" className={styles.vehicleImage} src={carimg} alt="Car" />
                    <div>
                        <div className={styles.vehicleDetails}>
                            <h5>Uber Go</h5>
                            <FontAwesomeIcon className={styles.vehicleSeatIcon} icon={faUserFriends} style={{ color: "var(--text-color)" }} /> 4
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
                <div className={styles.vehicleContainer}>
                    <img  loading="lazy" className={styles.vehicleImage} src={autoimg} alt="Auto" />
                    <div>
                        <div className={styles.vehicleDetails}>
                            <h5>Uber Go</h5>
                            <FontAwesomeIcon icon={faUserFriends} style={{ color: "var(--text-color)" }} /> 3
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
                <div className={styles.vehicleContainer}>
                    <img loading="lazy" className={styles.vehicleImage} src={bikeimg} alt="Bike" />
                    <div>
                        <div className={styles.vehicleDetails}>
                            <h5>Uber Go</h5>
                            <FontAwesomeIcon icon={faUserFriends} style={{ color: "var(--text-color)" }} /> 1
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
        </>
    )
})

export default VehicleSelectComponent