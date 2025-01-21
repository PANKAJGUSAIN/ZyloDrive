import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef, useContext, useEffect, useRef, useState } from "react"
import { CaptainContext } from "../../Context/CaptainContext"
import { faGauge } from "@fortawesome/free-solid-svg-icons"
import { faClock, faNoteSticky } from "@fortawesome/free-regular-svg-icons"

const CaptainOverallSummary = forwardRef(({ }, ref) => {

    const { captaindata: data } = useContext(CaptainContext);
    const [userWrapperRef] = ref;
    const arrowref = useRef(null);


    const toggleIsMaxed = () => {
        if (arrowref.current) {
            console.log('here')
            const ismaxed = arrowref.current.dataset.ismaxed === 'true';
            arrowref.current.dataset.ismaxed = ismaxed ? 'false' : 'true';
            userWrapperRef.current.style.height = ismaxed ? "10%" : "100%";
        }
    };


    return (
        <>
            <div style={{ padding: "2px" }}>
                <div data-ismaxed="false" ref={arrowref} tabIndex={0} role="move-up" style={{ cursor:"pointer" , height:"5px", width:"50%" , position:"absolute", left:"25%", background:"var(--item-border-hover-color)" , borderRadius:"2px"}} onClick={toggleIsMaxed}></div>
                <div style={{ display: 'flex', alignItems: "center", gap: "10px", padding: "10px" , justifyContent:"space-between" }}>
                    <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="captain" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                    <h3>{data.fullname.firstname}</h3>
                    </div>
                    <div>
                        <h3>$245.32</h3>
                        <h5>Earned</h5>
                    </div>
                </div>
                <div style={{ width: "100%", height: "auto", display: "flex", alignItems: "center", justifyContent:"space-evenly", gap:"5px", flexWrap:"wrap" , borderRadius:"8px" }}>
                    <div style={{ display:"flex" , width:"45%", flexDirection:"column", alignItems:"center", gap:"2px", padding:"10px" , backgroundColor: "#E77F00" , flexGrow:"1" , borderRadius:"8px"}}>
                        <FontAwesomeIcon icon={faGauge} />
                        <p style={{fontWeight:"600"}}>10.2</p>
                        <h5>Hours Online</h5>
                    </div>
                    <div style={{ display:"flex" , width:"45%", flexDirection:"column", alignItems:"center", gap:"2px", padding:"10px" , backgroundColor: "#E77F00" , flexGrow:"1" , borderRadius:"8px"}}>
                        <FontAwesomeIcon icon={faClock} />
                        <p style={{fontWeight:"600"}}>10.2</p>
                        <h5>Hours Online</h5>
                    </div>
                    <div style={{ display:"flex" , width:"45%", flexDirection:"column", alignItems:"center", gap:"2px", padding:"10px" , backgroundColor: "#E77F00" , flexGrow:"1" , borderRadius:"8px"}}>
                        <FontAwesomeIcon icon={faNoteSticky} />
                        <p style={{fontWeight:"600"}}>10.2</p>
                        <h5>Hours Online</h5>
                    </div>
                </div>
            </div>
        </>
    )
})
export default CaptainOverallSummary