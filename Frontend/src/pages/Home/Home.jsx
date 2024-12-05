import Button from '../../components/button/button';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';

const Home = () =>{
    const navigate = useNavigate()
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

export default Home

