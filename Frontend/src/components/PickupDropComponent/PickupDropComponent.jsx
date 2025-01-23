import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LocationSearchPanel from "../LocationSearchPanel/LocationSearchPanel"
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons"
import styles from "../../pages/UserHome/UserHome.module.scss"
import inputstyles from '../../pages/UserLogin/UserLogin.module.scss'
import { forwardRef, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../button/button"



const PickupDropComponent = forwardRef(({ }, ref) => {

    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [suggestedlocation, setSuggestedLocation] = useState([]);
    const [inputActive, setInputActive] = useState('');
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

    const handleClick = (ref) => {
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

        // using ref to change the active input field 
        if (ref.current.dataset.name === "pickup") {
            ref.current.dataset.isactive = "true";
            dropRef.current.dataset.isactive = "false";
        } else {
            ref.current.dataset.isactive = "true";
            pickupRef.current.dataset.isactive = "false";
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

    const handleLocationSelect = (location) => {
        if (inputActive === 'pickup') {
            setPickup(location.description);
            pickupRef.current.focus();
        } else {
            setDestination(location.description);
            dropRef.current.focus();
        }
        // if( pickup && destination){
        //     navigate('findride', { state: { pickup, destination } });
        // }
        
    }

    useEffect(() => {
        window.addEventListener('resize', resetcss);
        return () => {
            window.removeEventListener('resize', resetcss);
        };
    }, []);


    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, wait);

        };
    };

    //you are ensuring that the same instance of the function is used across re-renders
    const handleSearch = useRef(debounce((value) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const token = sessionStorage.getItem('zylotoken');

        if (!apiUrl) {
            console.error('API URL is not set in environment variables');
            return;
        }

        if (!token) {
            console.error('User token is not available in localStorage');
            return;
        }

        fetch(`${apiUrl}/maps/get-suggestions?address=${value}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setSuggestedLocation(data);
                console.log('data', data);
            })
            .catch(err => {
                console.error('Error fetching suggestions:', err);
            });
    }, 300));


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'pickup') {
            setPickup(value);
            setInputActive('pickup');
        } else if (name === 'destination') {
            setDestination(value);
            setInputActive('destination');
        }
        if (value.length > 2) {
            handleSearch.current(value);
        }

    };

    const FindRide = () => {
        if (pickup && destination) {
            navigate('findride', { state: { pickup, destination } });
        }
    }


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
                            data-name="pickup"
                            name="pickup"
                            data-isactive="false"
                            onClick={() => handleClick(pickupRef)}
                            className={inputstyles.inputfield}
                            value={pickup}
                            onChange={handleInputChange}
                            style={false ? { "border": "2px solid red" } : {}}
                            placeholder="Pickup Location"
                            type="text" required />
                    </label>
                </div>
                <div className={inputstyles.inputfieldContainer}>
                    <label htmlFor="zyloDriverDroplocation">
                        <input id="zyloDriverDroplocation"
                            data-name="drop"
                            name="destination"
                            ref={dropRef}
                            data-isactive="false"
                            onClick={() => handleClick(dropRef)}
                            className={inputstyles.inputfield}
                            value={destination}
                            onChange={handleInputChange}
                            style={false ? { "border": "2px solid red" } : {}}
                            placeholder="Drop Location"
                            type="text" required />
                    </label>
                </div>
                <Button type="button" onClick={FindRide} >Find Ride</Button>
            </form>
            <div className={styles.locationsearchwrapper} ref={locationContainerref}  >
                <LocationSearchPanel suggestedlocation={suggestedlocation} handleLocationSelect={handleLocationSelect} />
            </div>
        </>
    )
})
export default PickupDropComponent