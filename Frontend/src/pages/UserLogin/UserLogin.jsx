import styles from "./UserLogin.module.scss"
import Button from "../../components/button/button"
import { Link } from "react-router-dom"
import LogoComponent from "../../components/LogoComponent/LogoComponent"


const UserLogin = () => {
    return (
        <>
            <div className={styles.UserLoginwrapper}>
                <LogoComponent/>
                <div className={styles.loginForm}>
                    <form>
                        <div className={styles.inputfieldContainer}>
                            <label for="zyloDriverUserLogin">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3> What's your email ?</h3>
                                    </div>
                                </div>
                                <input id="zyloDriverUserLogin" className={styles.inputfield} type="email" required placeholder="email@example.com" />
                            </label>
                        </div>
                        <div className={styles.inputfieldContainer}>
                            <label for="zyloDriverUserPassword">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3>Enter Password</h3>
                                    </div>
                                </div>
                                <input id="zyloDriverUserPassword" className={styles.inputfield} type="password" required />
                            </label>
                        </div>
                        <div className={styles.UsernotAvaliable}>
                            Don't have an account ? <Link to="/signup" >Signup</Link>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                    <p className={styles.separatorcontent}>or</p>
                    <Button type="button">Log in As Captain </Button>
                    <div style={{ marginTop: '5px' }} className={styles.UsernotAvaliable}>
                        Want to be a Captain ? <Link to="/signup" >Signup</Link>
                    </div>
                </div>
                {/* <div className={styles.loginImage}>
                    <img className={styles.loginSvg} src="../../../assets/loginSvg.jpg" loading="lazy" alt="logisvg" />
                </div> */}
            </div>
        </>
    )
}

export default UserLogin