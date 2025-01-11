import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ZyloDriveHeader from "../../components/Header/Header";
import styles from "./UserHome.module.scss";
import { lazy, Suspense, useRef } from "react";

const PickupDropComponent = lazy(() => import('../../components/PickupDropComponent/PickupDropComponent'));
const VehicleSelectComponent = lazy(() => import('../../components/VehicleSelectComponent/VehicleSelectComponent'));
const RideLookout = lazy(() => import('../../components/RideLookout/RideLookout'));
const UserRideConfirmation = lazy(() => import('../../components/UserRideConfirmation/UserRideConfirmation'));
const RideDetails = lazy(() => import('../../components/RideDetails/RideDetails'));

const UserHome = () => {
    const navigate = useNavigate();
    const userWrapperRef = useRef(null);



    return (
        <div className={styles.UserHomeWrapper}>
            <ZyloDriveHeader />
            <div className={styles.UserMainWrapper}>
                <div className={styles.UserMapWrapper} >
                    <h1>Welcome to User Home</h1>
                </div>
                <div ref={userWrapperRef} className={styles.UserLocationWrapper}>
                    <Suspense fallback={<>Loading subComponents....</>}>
                        <Routes>
                            <Route path="/" element={<PickupDropComponent ref={[userWrapperRef]} />} />
                            <Route path="/findride" element={<VehicleSelectComponent ref={[userWrapperRef]} />} />
                            <Route path="/rideconfirm" element={<UserRideConfirmation ref={[userWrapperRef]} />} />
                            <Route path="/ridelookout" element={<RideLookout ref={[userWrapperRef]} />} />
                            <Route path="/ridedetails" element={<RideDetails ref={[userWrapperRef]} />} />
                        </Routes>
                    </Suspense>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserHome;