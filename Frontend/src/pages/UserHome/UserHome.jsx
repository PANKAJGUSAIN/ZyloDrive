import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ZyloDriveHeader from "../../components/Header/Header";
import styles from "./UserHome.module.scss";
import { useEffect, useRef, useState } from "react";
import PickupDropComponent from "../../components/PickupDropComponent/PickupDropComponent";


const UserHome = () => {
    const navigate = useNavigate();
    const userWrapperRef = useRef(null);
    const downArrowRef = useRef(null);
    const pickupRef = useRef(null);
    const dropRef = useRef(null);
    const locationContainerref = useRef(null);


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

    useEffect(() => {
        window.addEventListener('resize', resetcss);
        return () => {
            window.removeEventListener('resize', resetcss);
        };
    }, []);


    return (
        <div className={styles.UserHomeWrapper}>
            <ZyloDriveHeader />
            <div className={styles.UserMainWrapper}>
                <div className={styles.UserMapWrapper} >
                    <h1>Welcome to User Home</h1>
                </div>
                <div ref={userWrapperRef} className={styles.UserLocationWrapper}>
                <Routes>
                    <Route path="/" element={<PickupDropComponent ref={[downArrowRef, pickupRef, dropRef, locationContainerref]} handleDownMovement={handleDownMovement} handleClick={handleClick} />} />
                    <Route path="/findride" element={<> RIDES </>} />
                </Routes>
                <Outlet /> 
                </div>
            </div>
        </div>
    )
}

export default UserHome;