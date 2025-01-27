import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import styles from "./CaptainHome.module.scss";
import { lazy, Suspense, useContext, useEffect, useRef } from "react";
import ZyloDriveCaptainHeader from "../../components/CaptainHeader/CaptainHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { CaptainContext } from "../../Context/CaptainContext";
import { SocketContext } from "../../Context/SocketContext";

const CaptainOverallSummary = lazy(() => import('../../components/CaptainOverallSummary/CaptainOverallSummary'));

const UserHome = () => {
    const navigate = useNavigate();
    const userWrapperRef = useRef(null);
    const { captaindata: data } = useContext(CaptainContext);
    const { socket , sendMessage, recieveMessage } = useContext(SocketContext);

    // code to fetch captains location 

    const updateLocation = () => {
        console.log('updating location');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                sendMessage('update-location-captain',
                    {
                        userId: data._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }
                );
            }, (error) => {
                console.log(error);
            })
        }
    }


    useEffect(() => {
        sendMessage("join", { userType: "captain", userId: data._id });

        // Set up the interval to update location every 10 seconds
        const interval = setInterval(() => {
            updateLocation();
        }, 10000);
        // Initial location update
        updateLocation();

        socket.on('new-ride' , (data)=>{
            console.log("newRide", data);
        })

        // Clean up the interval on component unmount
        return () => clearInterval(interval);

    }, [])




    return (
        <div className={styles.CaptainHomeWrapper}>
            <ZyloDriveCaptainHeader />
            <div className={styles.CaptainMainWrapper}>
                <div className={styles.CaptainMapWrapper} >
                    <h1>Welcome to Captain Home</h1>
                </div>
                <div ref={userWrapperRef} className={styles.UserLocationWrapper}>
                    <Suspense fallback={<>Loading subComponents....</>}>
                        <Routes>
                            <Route path="/" element={<CaptainOverallSummary ref={[userWrapperRef]} />} />
                        </Routes>
                    </Suspense>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserHome;