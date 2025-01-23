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
    const { vehicle: selectedVehicle, location:selectedLocation , fare } = state || {};
    const [userWrapperRef] = ref;
    const [loading, setLoading] = useState(true)
    const [rideCreating , setRideCreating] = useState(false)

    useEffect(() => {

        console.log('location', state)
        if (!selectedVehicle && !selectedLocation?.pickup && !selectedLocation?.destination) {
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


    const handleRideCreation = async() => {
        setRideCreating(true)
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/rides/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('zylotoken')}`
                },
                body: JSON.stringify({
                    vehicleType: selectedVehicle,
                    pickup:selectedLocation.pickup,
                    destination:selectedLocation.destination
                })
            })
    
            if (!response.ok) {
                // Handle HTTP errors
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
            } 
            else{
                const data = await response.json()
                console.log(data)
                navigate("/home/ridelookout", {state:{vehicle:selectedVehicle, location:selectedLocation , data}})
            }
        }
        catch(error){
            console.log(error)
        }finally{
            setRideCreating(false)
        }
        
    }


    return (
        <>
            {loading ?
                <>Checking Conditions</> :
                <div className={styles.RideLookupComponentWrapper}>
                    <h3 style={{ padding: "10px 10px 10px 10px", textAlign: "center" }}>Confirm {selectedVehicle} Ride ? </h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {selectedVehicle=="car" && <img loading="lazy" className={styles.RideLookupVehicleLoading} src={carimg} alt="Car" />}
                        {selectedVehicle=="auto" && <img loading="lazy" className={styles.RideLookupVehicleLoading} src={autoimg} alt="Auto" />}
                        {selectedVehicle=="motorcycle" && <img loading="lazy" className={styles.RideLookupVehicleLoading} src={bikeimg} alt="Bike" />}
                    </div>
                    <div className={styles.RideLookupline}>
                    </div>
                    <div className={styles.ridelocationdetials}>
                        <FontAwesomeIcon icon={faLocationDot} style={{ color: "var(--text-color)" }} />
                        <h5>{selectedLocation?.pickup}</h5>
                    </div>
                    <div className={styles.RideLookupline}>
                    </div>
                    <div className={styles.ridelocationdetials}>
                        <FontAwesomeIcon icon={faBox} style={{ color: "var(--text-color)" }} />
                        <h5>{selectedLocation?.destination}</h5>
                    </div>
                    <div className={styles.RideLookupline}>
                    </div>
                    <div className={styles.ridelocationdetials}>
                        <FontAwesomeIcon icon={faCashRegister} style={{ color: "var(--text-color)" }} />
                        <h5>{`\u20B9 ${fare}`}</h5>
                    </div>
                    <Button type="submit" disabled={rideCreating} onClick={()=>{handleRideCreation()}}>{rideCreating ? "Creating Ride ..." :"Confirm Booking"}</Button>
                </div>
            }

        </>
    )
})
export default UserRideConfirmation