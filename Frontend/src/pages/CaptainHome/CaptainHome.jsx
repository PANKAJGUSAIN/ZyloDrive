import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import styles from "./CaptainHome.module.scss";
import { lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import ZyloDriveCaptainHeader from "../../components/CaptainHeader/CaptainHeader";
import { CaptainContext } from "../../Context/CaptainContext";
import { SocketContext } from "../../Context/SocketContext";
import Modal from "../../components/Modal/Modal";


const CaptainOverallSummary = lazy(() => import('../../components/CaptainOverallSummary/CaptainOverallSummary'));
const CaptainRideConfirm = lazy(()=> import('../../components/CaptainRideConfirm/CaptainRideConfirm'));

const UserHome = () => {
    const navigate = useNavigate();
    const userWrapperRef = useRef(null);
    const { captaindata: data } = useContext(CaptainContext);
    const { socket, sendMessage, recieveMessage } = useContext(SocketContext);
    const [newRides, setNewRides] = useState([]);
    const [openModal, setOpenModal] = useState(false);

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
        console.log('dataaa', data)
        sendMessage("join", { userType: "captain", userId: data._id });

        // Set up the interval to update location every 10 seconds
        const interval = setInterval(() => {
            updateLocation();
        }, 10000);
        // Initial location update
        updateLocation();

        const handleNewRide = (data) => {
            console.log("newRide", data);
            setNewRides((prev) => [...prev, data]);
        };

        socket.on('new-ride', handleNewRide)

        // Clean up the interval on component unmount
        return () => {

        clearInterval(interval);
        socket.off('new-ride', handleNewRide);
        }

    }, [])

    const ignoredData = (id) => {
        setNewRides((prev) => prev.filter(ride => ride._id !== id));
    }




    return (
        <div className={styles.CaptainHomeWrapper}>
            <ZyloDriveCaptainHeader setOpenModal={setOpenModal} />
            <Modal
                isOpen={openModal}
                onClose={() => { setOpenModal(false)}}
                ignoreData={ignoredData}
                data={newRides || []}
                closeOnOverlayClick={false}
            />
            <div className={styles.CaptainMainWrapper}>
                <div className={styles.CaptainMapWrapper} >
                    <h1>Welcome to Captain {JSON.stringify(openModal)}</h1>
                </div>
                <Suspense fallback={<>Loading subComponents....</>}>
                    <Routes>
                        <Route path="/" element={<CaptainOverallSummary />} />
                        <Route path="/confirm-Ride" element={<CaptainRideConfirm/>}/>
                    </Routes>
                </Suspense>
                <Outlet />
            </div>
        </div>
    )
}

export default UserHome;