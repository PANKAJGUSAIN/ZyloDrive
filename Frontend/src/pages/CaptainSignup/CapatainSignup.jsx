import styles from "../UserLogin/UserLogin.module.scss";
import Button from "../../components/button/button";
import { Link, useNavigate } from "react-router-dom";
import LogoComponent from "../../components/LogoComponent/LogoComponent";
import { useContext, useState } from "react";
import axios from 'axios';
import { CaptainContext } from "../../Context/CaptainContext";

const CaptainSignup = () => {

    const { changeData } = useContext(CaptainContext);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [loading, setloading] = useState(false);
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');

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

    const validatevehiclePlate = (vehiclePlate) => {
        const re = /^[a-zA-Z0-9-]+$/;
        return re.test(vehiclePlate);
    };

    const validateVehicleColor = (vehicleColor) => {
        const re = /^[a-zA-Z\s]+$/;
        return re.test(vehicleColor);
    };

    const validateVehicleCapacity = (vehicleCapacity) => {  
        const re = /^[0-9]+$/;
        return re.test(vehicleCapacity);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};

        if (!firstName) {
            errors.firstName = "First name is required";
        } else if (!validateName(firstName)) {
            errors.firstName = "First name cannot contain special characters";
        } else if (firstName.length > 40) {
            errors.firstName = "First name cannot be more than 40 characters";
        }

        if (lastName.length > 0) {
            if (!validateName(lastName)) {
                errors.lastName = "Last name cannot contain special characters";
            }
        } else if (lastName > 40) {
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

        if (!vehiclePlate) {
            errors.VehiclePlate = "Vehicle Plate is required";
        } else if (!validatevehiclePlate(vehiclePlate)) {
            errors.VehiclePlate = "Vehicle Plate cannot contain special characters";
        }
        else if (vehiclePlate.length > 10) {
            errors.VehiclePlate = "Vehicle Plate cannot be more than 10 characters";
        }

        if (!vehicleColor) {
            errors.VehicleColor = "Vehicle Color is required";
        } else if (!validateVehicleColor(vehicleColor)) {
            errors.VehicleColor = "Vehicle Color cannot contain special characters";
        }
        else if (vehicleColor.length > 20) {
            errors.VehicleColor = "Vehicle Color cannot be more than 20 characters";
        }

        if (vehicleType.length === 0) {
            errors.VehicleType = "Vehicle Type is required";
        }else if(vehicleType !== "car" && vehicleType !== "motorcycle" && vehicleType !== "auto"){
            errors.VehicleType = "Please select a vaild vehicle type";
        }else if (vehicleType.length > 20) {
            errors.VehicleType = "Vehicle Type cannot be more than 20 characters";
        }

        if (!vehicleCapacity) {
            errors.VehicleCapacity = "Vehicle Capacity is required";
        } else if (!validateVehicleCapacity(vehicleCapacity)) {
            errors.VehicleCapacity = "Vehicle Capacity cannot contain special characters";
        }
        else if (vehicleCapacity.length > 5) {
            errors.VehicleCapacity = "Vehicle Capacity cannot be more than 2 characters";
        }


        setError(errors);

        if (Object.keys(errors).length === 0) {
            setloading(true);
            console.log(firstName, lastName, email, password , vehiclePlate, vehicleColor, vehicleType, vehicleCapacity);
            // Proceed with form submission

            const data = {
                "fullname": {
                    "firstname": firstName,
                    "lastname": lastName,
                },
                "email": email,
                "password": password,
                "vehicle": {
                    "color": vehicleColor,
                    "plate": vehiclePlate,
                    "capacity": vehicleCapacity,
                    "vehicleType": vehicleType,
                }
            }

            // API call to register user
            axios.post(`${process.env.REACT_APP_API_URL}/captains/register`, data)
                .then(response => {
                    console.log("response", response);
                    delete data.password;
                    changeData(data);
                    setloading(false);
                    sessionStorage.setItem('zylotoken', response.data.token);
                    navigate('/home');
                })
                .catch((error) => {
                    if (error.status === 400) {
                        alert(error.response.data.message);
                    }
                    console.log("error", error);
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
                                        <h3>First Name <sup style={{ color: "red" }}>*</sup></h3>
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
                                        <h3 title="required field" >Email id <sup style={{ color: "red" }}>*</sup></h3>
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
                                        <h3 title="required field" >Enter Password <sup style={{ color: "red" }}>*</sup> </h3>
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
                        <div className={styles.inputfieldContainer}>
                            <label htmlFor="zyloDriverVehiclePlate">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3 title="required field" >Vehicle Plate Number <sup style={{ color: "red" }}>*</sup> </h3>
                                    </div>
                                </div>
                                <input
                                    id="zyloDriverVehiclePlate"
                                    className={styles.inputfield}
                                    style={error.VehiclePlate ? { border: "2px solid red" } : {}}
                                    type="text"
                                    value={vehiclePlate}
                                    onChange={(e) => setVehiclePlate(e.target.value)}
                                    required
                                    placeholder="vehicle plate number (eg : QA XX XXX )"
                                />
                            </label>
                            {error.VehiclePlate && <div className={styles.inputfielderror}>{error.VehiclePlate}</div>}
                        </div>
                        <div className={styles.multipleinputfieldwrapper}>
                            <div className={styles.inputfieldContainer}>
                                <label htmlFor="zyloDriverVehicleColor">
                                    <div className={styles.inputfieldLabelContainer}>
                                        <div>
                                            <h3 title="required field" >Vehicle Color <sup style={{ color: "red" }}>*</sup> </h3>
                                        </div>
                                    </div>
                                    <input
                                        id="zyloDriverVehicleColor"
                                        className={styles.inputfield}
                                        type="text"
                                        style={error.VehicleColor ? { border: "2px solid red" } : {}}
                                        value={vehicleColor}
                                        onChange={(e) => setVehicleColor(e.target.value)}
                                        required
                                        placeholder="vehicle color (eg : Blue )"
                                    />
                                </label>
                                {error.VehicleColor && <div className={styles.inputfielderror}>{error.VehicleColor}</div>}
                            </div>
                            <div className={styles.inputfieldContainer}>
                                <label htmlFor="zyloDriverVehicleType">
                                    <div className={styles.inputfieldLabelContainer}>
                                        <div>
                                            <h3 title="required field" >Vehicle Type <sup style={{ color: "red" }}>*</sup> </h3>
                                        </div>
                                    </div>
                                    <select
                                        id="zyloDriverVehicleType"
                                        className={styles.inputfield}
                                        value={vehicleType}
                                        style={error.VehicleType ? { border: "2px solid red" } : {}}
                                        onChange={(e) => setVehicleType(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Vehicle Type</option>
                                        <option value="car">Car</option>
                                        <option value="motorcycle">Motorcycle</option>
                                        <option value="auto">Auto</option>
                                    </select>
                                </label>
                                {error.VehicleType && <div className={styles.inputfielderror}>{error.VehicleType}</div>}
                            </div>
                        </div>
                        <div className={styles.inputfieldContainer}>
                            <label htmlFor="zyloDriverVehicleCapacity">
                                <div className={styles.inputfieldLabelContainer}>
                                    <div>
                                        <h3 title="required field" >Vehicle Capacity <sup style={{ color: "red" }}>*</sup> </h3>
                                    </div>
                                </div>
                                <input
                                    id="zyloDriverVehicleCapacity"
                                    className={styles.inputfield}
                                    style={error.VehicleCapacity ? { border: "2px solid red" } : {}}
                                    type="text"
                                    value={vehicleCapacity}
                                    onChange={(e) => setVehicleCapacity(e.target.value)}
                                    required
                                    placeholder="vehicle capacity (eg : 4 )"
                                />
                            </label>
                            {error.VehicleCapacity && <div className={styles.inputfielderror}>{error.VehicleCapacity}</div>}
                        </div>
                        <div className={styles.UsernotAvaliable}>
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                        <Button type="submit" disabled={loading}>{loading ? "Creating Account..." : "Create Account"}</Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CaptainSignup