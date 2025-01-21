import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import styles from "./CaptainHome.module.scss";
import { lazy, Suspense, useRef } from "react";
import ZyloDriveCaptainHeader from "../../components/CaptainHeader/CaptainHeader";

const CaptainOverallSummary = lazy(() => import('../../components/CaptainOverallSummary/CaptainOverallSummary'));

const UserHome = () => {
    const navigate = useNavigate();
    const userWrapperRef = useRef(null);



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