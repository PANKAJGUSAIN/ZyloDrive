import { useContext } from 'react';
import Button from '../../components/button/button';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../Context/ThemeContext';

const Start = () =>{
    const navigate = useNavigate();
    const {currentTheme, changeTheme, AvaliableThemes} = useContext(ThemeContext);
    return(
    <div className={styles.homeContainer}>
        <div className={styles.homeImage}>
        </div>
        <div className={styles.homeGetStarted}>
            <div>
                Get started with ZyloDrive
            </div>
            <Button type='button' onClick={()=>navigate('/login')}>
                Continue
            </Button>
        </div>
    </div>
    )
}

export default Start

