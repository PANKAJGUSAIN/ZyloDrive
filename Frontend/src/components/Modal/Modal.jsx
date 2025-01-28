import React, { useContext, useEffect, useState } from 'react';
import style from './Modal.module.scss';
import styles from "../RideLookout/RideLookout.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faClose, faHome, faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/button';
import { CaptainContext } from '../../Context/CaptainContext';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, data, closeOnOverlayClick = false, ignoreData }) => {
    const navigate = useNavigate()
    const [rideData, setrideData] = useState([])
    const { captaindata } = useContext(CaptainContext);
    const [disabled, setisDisabled] = useState(false)

    useEffect(() => {
        setrideData(data)
    }, [data])

    if (!isOpen) return null;


    const handleOverlayClick = () => {
        if (closeOnOverlayClick) {

            onClose();
        }
    };

    const handleIgnoreItem = (id) => {
        if (rideData.length == 1) {
            ignoreData(id);
            onClose();
        }
        else {
            ignoreData(id);
        }

    }

    const handleRideAccept = async (id) => {
        setisDisabled(true)
        const result = await fetch(`${process.env.REACT_APP_API_URL}/rides/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Add this line
                Authorization: `Bearer ${sessionStorage.getItem('zylotoken')}`,
            },
            body: JSON.stringify({ rideId: id, captainId: captaindata._id })
        })
        const response = await result.json();
        onClose();
        ignoreData(id);
        setisDisabled(false);
        navigate('/captain-home/confirm-Ride', { state: { data: response } })
        console.log(response);
    }

    return (
        <div className={style['modal-overlay']} onClick={handleOverlayClick}>
            <div className={style['modal-content']} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: "flex", justifyContent: "end" }}><FontAwesomeIcon title='Close Popup' tabIndex={0} style={{ height: "16px", width: "16px" }} icon={faClose} onClick={onClose} /></div>
                {rideData.length > 0 ? data.map((item, index) => (
                    <div key={index} className={style['modal-item']}>
                        <div>
                            <div className={style.userIcon}>
                                <h4>
                                    {item.user.fullname.firstname}
                                </h4>
                                <h4>2.2km</h4>
                            </div>
                            <div className={styles.ridelocationdetials}>
                                <FontAwesomeIcon icon={faLocationDot} style={{ color: "var(--text-color)" }} />
                                <h5>{item?.pickup}</h5>
                            </div>
                            <div className={styles.RideLookupline}>
                            </div>
                            <div className={styles.ridelocationdetials}>
                                <FontAwesomeIcon icon={faBox} style={{ color: "var(--text-color)" }} />
                                <h5>{item?.destination}</h5>
                            </div>
                            <div className={styles.RideLookupline}></div>

                            <div className={styles.ridelocationdetials} >
                                <h5>{`\u20B9 ${item.fare}`}</h5>
                            </div>
                            <Button style={{ backgroundColor: "Green" }} onClick={() => handleRideAccept(item._id)} disabled={disabled}>{disabled ? "Accepting.." : "Accept"}</Button>
                            <Button style={{ backgroundColor: "Red" }} onClick={() => handleIgnoreItem(item._id)} > Ignore</Button>
                        </div>
                    </div>
                )) :
                    <div className={style.pulseContainer}>
                        <span>Looking For Rides</span>
                        <div className={style.pulseDots}>
                            <div className={style.pulseDot}></div>
                            <div className={style.pulseDot}></div>
                            <div className={style.pulseDot}></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};


export default Modal;
