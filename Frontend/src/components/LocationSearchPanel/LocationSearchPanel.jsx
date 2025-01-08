import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './LocationSearchPanel.module.scss'

const LocationSearchPanel = () => {
    return (
        <>
            <h4 style={{ padding:"10px 10px"}}>LocationSearchPanel</h4>
            <div className={styles.LocationSearchPanelWrapper}>
                <div className={styles.LocationSearchItem}>
                    <div>
                        <FontAwesomeIcon icon={faLocationDot} style={{color:"var(--text-color)"}} />
                    </div>
                    <p>24B , Near Kapoor's cafe, Sheryians Coding School , Bhopal</p>
                </div>
            </div>
        </>
    )
}

export default LocationSearchPanel