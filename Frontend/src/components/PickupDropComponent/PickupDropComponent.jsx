import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LocationSearchPanel from "../LocationSearchPanel/LocationSearchPanel"
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons"
import styles from "../../pages/UserHome/UserHome.module.scss"
import inputstyles from '../../pages/UserLogin/UserLogin.module.scss'
import { forwardRef, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const PickupDropComponent = forwardRef(({ }, ref) => {

    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [userWrapperRef] = ref;
    const downArrowRef = useRef(null);
    const pickupRef = useRef(null);
    const dropRef = useRef(null);
    const locationContainerref = useRef(null);
    const navigate = useNavigate()


    const resetcss = () => {
        if (window.innerWidth > 961) {
            userWrapperRef.current.style.bottom = "";
            userWrapperRef.current.style.height = "";
            downArrowRef.current.style.display = "";
            locationContainerref.current.style.display = "";
        }
    }

    const handleClick = () => {
        if (window.innerWidth < 961) {
            if (userWrapperRef.current) {
                userWrapperRef.current.style.bottom = "0";
                userWrapperRef.current.style.height = "100%";
                downArrowRef.current.style.display = "block";
                locationContainerref.current.style.display = "block";
                userWrapperRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll container into view
            }
        }
        else {
            if (userWrapperRef.current) {
                userWrapperRef.current.style.bottom = "";
                userWrapperRef.current.style.height = "";
                downArrowRef.current.style.display = "";
                locationContainerref.current.style.display = "block";
            }
        }
    }

    const handleDownMovement = () => {
        if (window.innerWidth < 961) {
            if (userWrapperRef.current) {
                userWrapperRef.current.style.bottom = "";
                userWrapperRef.current.style.height = "";
                downArrowRef.current.style.display = "";
                locationContainerref.current.style.display = "none";
            }
        }
    }

    const handleLocationSelect = (location) =>{
        console.log('locationvalue' , location)
        navigate('findride', { state: { location } });
    }

    useEffect(() => {
        window.addEventListener('resize', resetcss);
        return () => {
            window.removeEventListener('resize', resetcss);
        };
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", padding: "0 10px" }}>
                <h4>Find a trip</h4>
                <div onClick={handleDownMovement} className={styles.UserHomeDownArrow} ref={downArrowRef}>
                    <FontAwesomeIcon icon={faArrowAltCircleDown} style={{ color: "var(--textcolor)" }} />
                </div>
            </div>
            <form noValidate>
                <div className={inputstyles.inputfieldContainer}>
                    <label htmlFor="zyloDriverPickuplocation">
                        <input id="zyloDriverPickuplocation"
                            ref={pickupRef}
                            onClick={() => handleClick(pickupRef)}
                            className={inputstyles.inputfield}
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            style={false ? { "border": "2px solid red" } : {}}
                            placeholder="Pickup Location"
                            type="text" required />
                    </label>
                </div>
                <div className={inputstyles.inputfieldContainer}>
                    <label htmlFor="zyloDriverDroplocation">
                        <input id="zyloDriverDroplocation"
                            ref={dropRef}
                            onClick={() => handleClick(dropRef)}
                            className={inputstyles.inputfield}
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            style={false ? { "border": "2px solid red" } : {}}
                            placeholder="Drop Location"
                            type="text" required />
                    </label>
                </div>
            </form>
            <div className={styles.locationsearchwrapper} ref={locationContainerref}  >
                <LocationSearchPanel  handleLocationSelect={handleLocationSelect}/>
            </div>
        </>
    )
})
export default PickupDropComponent