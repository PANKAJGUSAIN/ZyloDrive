import React, { useEffect, useState } from 'react';
import style from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faHome, faLocation } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/button';

const Modal = ({ isOpen, onClose, data, closeOnOverlayClick = false  , ignoreData }) => {
    const [rideData, setrideData] = useState([])

    useEffect(() => {
        setrideData(data)
    }, [data])

    if (!isOpen) return null;


    const handleOverlayClick = () => {
        if (closeOnOverlayClick) {

            onClose();
        }
    };

    const handleIgnoreItem = (id) =>{
        if(rideData.length == 1){
            ignoreData(id);
            onClose();
        }
        else{
            ignoreData(id);
        }
         
    }

    return (
        <div className={style['modal-overlay']} onClick={handleOverlayClick}>
            <div className={style['modal-content']} onClick={(e) => e.stopPropagation()}>
                <div  style={{ display:"flex" , justifyContent:"end"}}><FontAwesomeIcon title='Close Popup' tabIndex={0} style={{height:"16px" , width:"16px"}}  icon={faClose} onClick={onClose} /></div>
                {rideData.length > 0 ? data.map((item, index) => (
                    <div key={index} className={style['modal-item']}>
                        <div>
                            <div className={style.userIcon}>
                                <div>
                                   {item.user.fullname.firstname}
                                </div>
                                <h4>2.2km</h4>
                            </div>
                            <div style={{height:"1px" , backgroundColor:"var(--item-border-color)" , width:"100%", margin:"10px 0px", borderRadius:"50%"}}></div>
                            <div style={{  fontSize:"14px", display:"flex" , flexWrap:"wrap", alignItems:"center", gap:"5px",height: "2rem" , padding:"10px 0px" }}>
                                <FontAwesomeIcon icon={faLocation} /> {item.pickup}
                            </div>
                            <div style={{height:"1px" , backgroundColor:"var(--item-border-color)" , width:"100%", margin:"10px 0px", borderRadius:"50%"}}></div>
                            <div style={{ fontSize:"14px", display:"flex" , flexWrap:"wrap", alignItems:"center", gap:"5px", height: "2rem" , padding:"10px 0px" }}>
                            <FontAwesomeIcon icon={faHome} /> {item.destination}
                            </div>
                            <div style={{height:"1px" , backgroundColor:"var(--item-border-color)" , width:"100%", margin:"10px 0px", borderRadius:"50%"}}></div>
                            <div style={{ fontSize:"14px", display:"flex" , flexWrap:"wrap", alignItems:"center", gap:"5px", height: "2rem" , padding:"10px 0px" }}>
                                {`\u20B9 ${item.fare}`}
                            </div>
                            <Button> Accept</Button>
                            <Button onClick={()=>handleIgnoreItem(item._id)} > Ignore</Button>
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
