import styles from "./UserLogin.module.scss"
import Button from "../../components/button/button"
import { Link } from "react-router-dom"
import LogoComponent from "../../components/LogoComponent/LogoComponent"
import { useEffect, useState } from "react"


const UserLogin = () => {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState(null);


    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };


    const validatePassword = (password) => {
        console.log(password.length)
        return password.length > 6;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userEmail.length <= 0) {
            setError(prev => (
                {
                    ...prev,
                    "email": "Email is required"
                }
            ))
        }
        if (userPassword.length <= 0) {
            setError(prev => (
                {
                    ...prev,
                    "password": "Password is required"
                }
            ))
        }
        if (userEmail.length > 0) {
            if (validateEmail(userEmail)) {
                setError(prev => {
                    const { email, ...rest } = prev;
                    return rest;
                });
            } else {
                setError(prev => ({
                    ...prev,
                    email: "Invalid Email"
                }));
            }
        }
        if (userPassword.length > 0) {
            if (validatePassword(userPassword)) {
                setError(prev => {
                    const { password, ...rest } = prev;
                    return rest;
                });
            } else {
                setError(prev => ({
                    ...prev,
                    password: "Password must be at least 6 characters"
                }));
            }
        }

    }

    return (
        <>
            <div className={styles.UserLoginwrapper}>
                <LogoComponent />
                <div className={styles.loginForm}>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className={styles.inputfieldContainer}>
                            <label for="zyloDriverUserLogin">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3> What's your email ?</h3>
                                    </div>
                                </div>
                                <input id="zyloDriverUserLogin"
                                    className={styles.inputfield}
                                    style={error && error.email ? { "border": "2px solid red" } : {}}
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    required
                                    placeholder="email@example.com" />
                            </label>
                            {error && error.email && <div className={styles.inputfielderror}>{error.email}</div>}
                        </div>
                        <div className={styles.inputfieldContainer}>
                            <label for="zyloDriverUserPassword">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3>Enter Password</h3>
                                    </div>
                                </div>
                                <input id="zyloDriverUserPassword"
                                    className={styles.inputfield}
                                    value={userPassword}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                    style={error && error.password ? { "border": "2px solid red" } : {}}
                                    type="password" required />
                            </label>
                            {error && error.password && <div className={styles.inputfielderror}>{error.password}</div>}
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