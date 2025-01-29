import { forwardRef, useEffect, useState } from "react"
import styles from "./VehicleSelectComponent.modules.scss"
import carimg from "../../assets/ZyloCar.png"
import autoimg from "../../assets/Zylo-Auto.png"
import bikeimg from "../../assets/Zylo-bike.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { far } from "@fortawesome/free-regular-svg-icons"

const VehicleSelectComponent = forwardRef(({ handleClick }, ref) => {

    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { pickup, destination } = state || {};
    const [userWrapperRef] = ref;
    const [loading, setLoading] = useState(true)
    const [fares, setFares] = useState({})


    const handleVehicleSelect = (vehicle, pickup, destination) => {
        navigate('/home/rideconfirm', {
            state:
            {
                vehicle,
                location: { pickup, destination },
                fare: fares[vehicle]
            }
        }
        )
    }

    useEffect(() => {

        console.log('location', pickup, destination)
        if (!pickup && !destination) {
            navigate("/home")
        }
        else {
            fetch(`${process.env.REACT_APP_API_URL}/rides/fare?pickup=${pickup}&destination=${destination}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer ${sessionStorage.getItem('zylotoken')}`
                    }
                }).then(res => res.json()).then(data => {
                    setLoading(false)
                    setFares(data)
                    console.log(data)
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [pickup, destination])


    useEffect(() => {
        if (userWrapperRef) {
            userWrapperRef.current.style.bottom = "0";
            userWrapperRef.current.style.height = "80%";
        }
    }, [])

    return (
        <>
            {loading ?
                <>Fetching Details</> :
                <div  role="select" aria-labelledby="select vehicle" className={styles.vehicleSelectComponentWrapper}>
                    <h3 style={{ padding: "10px 10px 10px 10px" }}>Choose a Vehicle</h3>
                    <div role="selectitem" aria-labelledby="select car as vehicle" tabIndex={0} className={styles.vehicleContainer} onKeyDown={(e)=>{ if (e.key === 'Enter' || e.key ==='Space'){handleVehicleSelect("car", pickup, destination)}  }} onClick={() => handleVehicleSelect("car", pickup, destination)}>
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
                            <h5 className={styles.vehiclePrice}>{`\u20B9 ${fares.car}`}</h5>
                        </div>
                    </div>
                    <div  role="selectitem" aria-labelledby="select auto as vehicle" tabIndex={0} className={styles.vehicleContainer} onKeyDown={(e)=>{ if (e.key === 'Enter' || e.key ==='Space'){handleVehicleSelect("auto", pickup, destination)}  }}  onClick={() => handleVehicleSelect("auto", pickup, destination)}>
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
                            <h5 className={styles.vehiclePrice}>{`\u20B9 ${fares.auto}`}</h5>
                        </div>
                    </div>
                    <div  role="selectitem" aria-labelledby="select motorcycle as vehicle" tabIndex={0} className={styles.vehicleContainer} onKeyDown={(e)=>{ if (e.key === 'Enter' || e.key ==='Space'){handleVehicleSelect("motorcycle", pickup, destination)}  }}  onClick={() => handleVehicleSelect("motorcycle", pickup, destination)}>
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
                            <h5 className={styles.vehiclePrice}>{`\u20B9 ${fares.motorcycle}`}</h5>
                        </div>
                    </div>
                </div>
            }

        </>
    )
})

export default VehicleSelectComponent