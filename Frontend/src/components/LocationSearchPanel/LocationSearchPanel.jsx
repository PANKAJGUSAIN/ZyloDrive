import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './LocationSearchPanel.module.scss'

const LocationSearchPanel = ({handleLocationSelect}) => {

    const locations = [
        "24B , Near Kapoor's cafe, Sheryians Coding School , Bhopal",
        "24B , Near Kapoor's cafe, Sheryians Coding School , Bhopal",
        "24B , Near Kapoor's cafe, Sheryians Coding School , Bhopal",
        "24B , Near Kapoor's cafe, Sheryians Coding School , Bhopal",
        "24B , Near Kapoor's cafe, Sheryians Coding School , Bhopal",
    ]
    return (
        <>
            <h4 style={{ padding: "10px 10px" }}>LocationSearchPanel</h4>
            <div className={styles.LocationSearchPanelWrapper}>

                {
                    locations.map((location,index) => {
                        return (
                            <div key={index} className={styles.LocationSearchItem} onClick={()=>{ handleLocationSelect(location) }}>
                                <div>
                                    <FontAwesomeIcon icon={faLocationDot} style={{ color: "var(--text-color)" }} />
                                </div>
                                <p>{location}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default LocationSearchPanel