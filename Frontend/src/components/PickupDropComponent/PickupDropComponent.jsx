import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LocationSearchPanel from "../LocationSearchPanel/LocationSearchPanel"
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons"
import styles from "../../pages/UserHome/UserHome.module.scss"
import inputstyles from '../../pages/UserLogin/UserLogin.module.scss'
import { forwardRef, useState } from "react"

const PickupDropComponent = forwardRef(({ handleDownMovement, handleClick }, ref) => {

    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [downArrowRef , pickupRef , dropRef , locationContainerref] = ref ;

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
                <LocationSearchPanel />
            </div>
        </>
    )
})
export default PickupDropComponent