import styles from "../UserLogin/UserLogin.module.scss"
import Button from "../../components/button/button"
import { Link, useNavigate } from "react-router-dom"
import LogoComponent from "../../components/LogoComponent/LogoComponent"
import { useEffect, useState } from "react"
import axios from "axios"


const CaptainLogin = () => {

    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


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
        let errors = {};

        if (userEmail.length <= 0) {
            errors.email = "Email is required";
        } else if (userEmail.length > 100) {
            errors.email = "Email cannot be more than 100 characters";
        } else if (!validateEmail(userEmail)) {
            errors.email = "Invalid Email";
        }

        if (userPassword.length <= 0) {
            errors.password = "Password is required";
        } else if (!validatePassword(userPassword)) {
            errors.password = "Password must be at least 6 characters";
        }

        setError(errors);

        if (Object.keys(errors).length === 0) {
            console.log(userEmail, userPassword);
            // Proceed with form submission
            const data = { email: userEmail, password: userPassword };
            setLoading(true);
            axios.post(`${process.env.REACT_APP_API_URL}/captains/login`, data)
                .then(response => response.data)
                .then(data => {
                    console.log(data);
                    changeData({
                        token: data.token,
                        email: data.user.email,
                        fullname: {
                            firstname: data.user.fullname.firstname,
                            lastname: data.user.fullname.lastname
                        }
                    });
                    sessionStorage.setItem('zylotoken', data.token);
                    navigate('/home');
                })
                .catch(error => {
                    if (error.status === 400) {
                        alert(error.response.data.message);
                    }
                    console.log("error", error);
                })
                .finally(() => {
                    navigate('/home');
                    setLoading(false);
                })
        }
};

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
                                    <h3> What's our Captain's email ? </h3>
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
                        Don't have an account ? <Link to="/captain-signup" >Signup</Link>
                    </div>
                    <Button type="submit" disabled={loading}>{loading? " Signing In... " : "Submit" }</Button>
                </form>
                <p className={styles.separatorcontent}>or</p>
                <Button type="button" onClick={() => { navigate("/login") }}>Log in As User </Button>
                <div style={{ marginTop: '5px' }} className={styles.UsernotAvaliable}>
                    Create an user Account ? <Link to="/signup" >Signup</Link>
                </div>
            </div>
            {/* <div className={styles.loginImage}>
                    <img className={styles.loginSvg} src="../../../assets/loginSvg.jpg" loading="lazy" alt="logisvg" />
                </div> */}
        </div>
    </>
)
}

export default CaptainLogin