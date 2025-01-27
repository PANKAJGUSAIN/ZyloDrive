import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef, useContext, useEffect, useRef, useState } from "react"
import { CaptainContext } from "../../Context/CaptainContext"
import styles from "../../pages/CaptainHome/CaptainHome.module.scss"
import style from "../RideLookout/RideLookout.module.scss"
import inputstyles from '../../pages/UserLogin/UserLogin.module.scss'
import { useLocation, useNavigate } from "react-router-dom"
import { faBox, faCashRegister, faLocationDot, faWarning } from "@fortawesome/free-solid-svg-icons"
import Button from "../button/button"

const CaptainRideConfirm = forwardRef(({ }, ref) => {

    const { captaindata: data } = useContext(CaptainContext);
    const navigate = useNavigate();
    const userWrapperRef = useRef(null)
    const arrowref = useRef(null);
    const optref = useRef(null);
    const location = useLocation();
    const { data: responseData } = location.state || {};
    const [enteredOtp, setenteredOtp] = useState('')
    const [errors , seterrors] = useState('')
    const [isAccept , setisAccept] = useState(false)
    console.log("response", responseData);

    useEffect(() => {
        if (!responseData) {
            navigate('/captain-home')
        }
    }, [responseData])



    const toggleIsMaxed = () => {
        if (arrowref.current) {
            console.log('here')
            const ismaxed = arrowref.current.dataset.ismaxed === 'true';
            arrowref.current.dataset.ismaxed = ismaxed ? 'false' : 'true';
            userWrapperRef.current.style.height = ismaxed ? "5%" : "100%";
        }
    };

    const handleOTPconfirmation = async(e) =>{
        e.preventDefault();
        if(!enteredOtp || enteredOtp.length > 6 || enteredOtp.length < 6 ){
            optref.current.focus();
            seterrors('Invalid OTP!');
        }     
        else{
            seterrors('');
            setisAccept(true);
            const result = await fetch(`${process.env.REACT_APP_API_URL}/rides/start-ride?rideId=${responseData._id}&otp=${enteredOtp}`,{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${sessionStorage.getItem('zylotoken')}`
                }
            })
            const response = await result.json();
            console.log(response);
            setisAccept(false);
        }
    }


    return (
        <>
            <div ref={userWrapperRef} style={{ minHeight: "25%" , overflow:'scroll'}} className={styles.UserLocationWrapper}>
                <div style={{ padding: "2px" }}>
                    <div title="expand" data-ismaxed="false" ref={arrowref} tabIndex={0} role="move-up" style={{ cursor: "pointer", height: "5px", width: "20%", position: "absolute", left: "40%", background: "var(--item-border-hover-color)", borderRadius: "2px" }} onClick={toggleIsMaxed}></div>
                    <div style={{ display: 'flex', alignItems: "center", gap: "10px", padding: "10px", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="captain" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                            <h3>{responseData?.user.fullname?.firstname + " " + responseData?.user.fullname?.lastname}</h3>
                        </div>
                    </div>
                    <div style={{ width: "100%", height: "auto", display: "flex", alignItems: "center", justifyContent: "space-evenly", gap: "5px", flexWrap: "wrap", borderRadius: "8px" }}>
                        <div style={{ width: "100%" }} className={style.ridelocationdetials}>
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: "var(--text-color)" }} />
                            <h5>{responseData?.pickup}</h5>
                        </div>
                        <div style={{ width: "100%" }} className={style.RideLookupline}>
                        </div>
                        <div style={{ width: "100%" }} className={style.ridelocationdetials}>
                            <FontAwesomeIcon icon={faBox} style={{ color: "var(--text-color)" }} />
                            <h5>{responseData?.destination}</h5>
                        </div>
                        <div className={style.RideLookupline}>
                        </div>
                        <div style={{ width: "100%" }} className={style.ridelocationdetials}>
                            <FontAwesomeIcon icon={faCashRegister} style={{ color: "var(--text-color)" }} />
                            <h5>{`\u20B9${responseData?.fare}`}</h5>
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                            <form style={{ width: "100%" }} noValidate>
                                <div className={inputstyles.inputfieldContainer}>
                                {errors.length>0 ? <p style={{fontSize:"14px" , color:"red" , fontWeight:"700"}}><FontAwesomeIcon  icon={faWarning} color="red" style={{marginRight:"10px"}} />{errors}</p> :""}
                                    <label htmlFor="zyloDriverotpconfirmation">
                                        <input id="zyloDriverotpconfirmation"
                                            data-name="confirmotp"
                                            name="confirmotp"
                                            ref={optref}
                                            className={inputstyles.inputfield}
                                            value={enteredOtp}
                                            onChange={(e) => setenteredOtp(e.target.value)}
                                            style={ errors.length>0 ? { "border": "2px solid red" } : {}}
                                            placeholder="Enter OTP"
                                            maxLength="6"
                                            pattern="\d{6}"
                                            type="text" required />
                                    </label>
                                </div>
                                <Button type="submit" disabled={isAccept} style={{ backgroundColor: "Green" }} onClick={handleOTPconfirmation}>{isAccept? "Confirming.." :"Confirm"}</Button>
                                <Button type="button" style={{ backgroundColor: "Red" }} onClick={()=>navigate('/captain-home')}>Reject</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})
export default CaptainRideConfirm