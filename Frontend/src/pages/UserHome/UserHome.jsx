import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ZyloDriveHeader from "../../components/Header/Header";
import styles from "./UserHome.module.scss";
import { lazy, Suspense, useRef } from "react";

const PickupDropComponent = lazy(() => import('../../components/PickupDropComponent/PickupDropComponent'));
const VehicleSelectComponent = lazy(() => import('../../components/VehicleSelectComponent/VehicleSelectComponent'));


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
                        </Routes>
                    </Suspense>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserHome;