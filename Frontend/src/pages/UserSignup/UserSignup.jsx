import styles from "../UserLogin/UserLogin.module.scss"
import Button from "../../components/button/button"
import { Link } from "react-router-dom"
import LogoComponent from "../../components/LogoComponent/LogoComponent"

const UserSignup = () => {
    return (
        <>
            <div className={styles.UserLoginwrapper}>
                <LogoComponent/>
                <div className={styles.loginForm}>
                    <form>
                        <div className={styles.inputfieldContainer}>
                            <label for="zyloDriverUserFirstName">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3> First name  </h3>
                                    </div>
                                </div>
                                <input id="zyloDriverUserFirstName" className={styles.inputfield} type="text" required />
                            </label>
                        </div>
                        <div className={styles.inputfieldContainer}>
                            <label for="zyloDriverUserLastName">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3> Last name </h3>
                                    </div>
                                </div>
                                <input id="zyloDriverUserLastName" className={styles.inputfield} type="text" />
                            </label>
                        </div>
                        <div className={styles.inputfieldContainer}>
                            <label for="zyloDriverUserLogin">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3> Email </h3>
                                    </div>
                                </div>
                                <input id="zyloDriverUserLogin" className={styles.inputfield} type="email" required placeholder="email@example.com" />
                            </label>
                        </div>
                        <div className={styles.inputfieldContainer}>
                            <label for="zyloDriverUserPassword">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3>Password</h3>
                                    </div>
                                </div>
                                <input id="zyloDriverUserPassword" className={styles.inputfield} type="password" required />
                            </label>
                        </div>
                        <div className={styles.UsernotAvaliable}>
                            Have an account ? <Link to="/login" >Login</Link>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
                {/* <div className={styles.loginImage}>
                    <img className={styles.loginSvg} src="../../../assets/Signup.jpg" loading="lazy" alt="logisvg" />
                </div> */}
            </div>
        </>
    )
}

export default UserSignup