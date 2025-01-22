import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './LocationSearchPanel.module.scss'
import { useEffect, useState } from "react"

const LocationSearchPanel = ({suggestedlocation , handleLocationSelect}) => {

    const [locations , setLocations] = useState([])

    useEffect(()=>{
        setLocations(suggestedlocation)
    },[suggestedlocation])

    return (
        <>
            <h4 style={{ padding: "10px 10px" }}>LocationSearchPanel</h4>
            <div role="list" aria-label="Location search results" className={styles.LocationSearchPanelWrapper}>

                {
                    locations.map((location,index) => {
                        return (
                            <div 
                                key={index} 
                                role="listitem"
                                tabIndex={0}
                                aria-label={`Location: ${location.description}`}
                                className={styles.LocationSearchItem}
                                onClick={()=>{ handleLocationSelect(location) }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleLocationSelect(location);
                                    }
                                }}>
                                <div>
                                    <FontAwesomeIcon icon={faLocationDot} style={{ color: "var(--text-color)" }} />
                                </div>
                                <p>{location.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default LocationSearchPanel