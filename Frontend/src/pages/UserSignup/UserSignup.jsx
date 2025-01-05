import styles from "../UserLogin/UserLogin.module.scss";
import Button from "../../components/button/button";
import { Link, useNavigate } from "react-router-dom";
import LogoComponent from "../../components/LogoComponent/LogoComponent";
import { useContext, useState } from "react";
import axios from 'axios';
import { UserContext } from "../../Context/UserContext";

const UserSignup = () => {
    const { changeData } = useContext(UserContext);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [loading , setloading] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validateName = (name) => {
        const re = /^[a-zA-Z\s]+$/;
        return re.test(name);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        let errors = {};

        if (!firstName) {
            errors.firstName = "First name is required";
        }else if (!validateName(firstName)) {
            errors.firstName = "First name cannot contain special characters";
        }else if (firstName.length > 40) {
            errors.firstName = "First name cannot be more than 40 characters";
        }

        if (lastName.length > 0 ) {
            if (!validateName(lastName)) {
                errors.lastName = "Last name cannot contain special characters";
            }
        }else if (lastName > 40) {
            errors.lastName = "Last name cannot be more than 40 characters";
        }

        if (!email) {
            errors.email = "Email is required";
        } else if (!validateEmail(email)) {
            errors.email = "Invalid Email";
        } else if (email.length > 100) {
            errors.email = "email cannot be more than 40 characters";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (!validatePassword(password)) {
            errors.password = "Password must be at least 6 characters";
        }

        setError(errors);

        if (Object.keys(errors).length === 0) {
            setloading(true);
            console.log(firstName, lastName, email, password);
            // Proceed with form submission

            const data = {
                "fullname":{
                    "firstname":firstName,
                    "lastname":lastName,
                },
                "email":email,
                "password":password
                }

            // API call to register user
            axios.post(`${process.env.REACT_APP_API_URL}/users/register` , data)
            .then(response => {
                console.log("response" , response);
                delete data.password;
                changeData(data);
                setloading(false);
                sessionStorage.setItem('zylotoken', response.data.token);
                navigate('/home');
            })
            .catch((error)=>{
                if(error.status === 400){
                    alert(error.response.data.message);
                }
                console.log("error" , error);
                setloading(false);
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
                            <label htmlFor="zyloDriverFirstName">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div title="required field">
                                        <h3>First Name <sup style={{color:"red"}}>*</sup></h3>
                                    </div>
                                </div>
                                <input
                                    id="zyloDriverFirstName"
                                    className={styles.inputfield}
                                    style={error.firstName ? { border: "2px solid red" } : {}}
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    placeholder="First Name"
                                />
                            </label>
                            {error.firstName && <div className={styles.inputfielderror}>{error.firstName}</div>}
                        </div>
                        <div className={styles.inputfieldContainer}>
                            <label htmlFor="zyloDriverLastName">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3>Last Name</h3>
                                    </div>
                                </div>
                                <input
                                    id="zyloDriverLastName"
                                    className={styles.inputfield}
                                    style={error.lastName ? { border: "2px solid red" } : {}}
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    placeholder="Last Name"
                                />
                            </label>
                            {error.lastName && <div className={styles.inputfielderror}>{error.lastName}</div>}
                        </div>
                        <div className={styles.inputfieldContainer}>
                            <label htmlFor="zyloDriverUserEmail">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3 title="required field" >Email id <sup style={{color:"red"}}>*</sup></h3>
                                    </div>
                                </div>
                                <input
                                    id="zyloDriverUserEmail"
                                    className={styles.inputfield}
                                    style={error.email ? { border: "2px solid red" } : {}}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="email@example.com"
                                />
                            </label>
                            {error.email && <div className={styles.inputfielderror}>{error.email}</div>}
                        </div>
                        <div className={styles.inputfieldContainer}>
                            <label htmlFor="zyloDriverUserPassword">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3 title="required field" >Enter Password <sup  style={{color:"red"}}>*</sup> </h3>
                                    </div>
                                </div>
                                <input
                                    id="zyloDriverUserPassword"
                                    className={styles.inputfield}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={error.password ? { border: "2px solid red" } : {}}
                                    type="password"
                                    required
                                />
                            </label>
                            {error.password && <div className={styles.inputfielderror}>{error.password}</div>}
                        </div>
                        <div className={styles.UsernotAvaliable}>
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                        <Button type="submit" disabled={loading}>{ loading ?  "Creating Account..." : "Create Account" }</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserSignup;