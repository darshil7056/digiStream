import React, { useState } from "react";
import './register.css';
import ReactDOM from "react-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate= useNavigate()   
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = async (event) => {
        // Prevent page reload
        event.preventDefault();
      
        var { uname, pass } = document.forms[0];
        console.log(uname.value, pass.value);
        try {
          const response = await axios.post('http://192.168.2.18:3000/api/register', {
            email: uname.value,
            password: pass.value
          });
          if (response.data.success == true) {
            // Login successful, navigate to the desired route
            navigate('/'); // Replace '/dashboard' with your desired route
          } else {
            // Login failed, display the error message
            window.alert(response.data.message ? response.data.message: "Server Error");
            console.log(response.data.message);
          }
          // Handle the response from the server
          console.log(response.data); // or do something else with the response
        } catch (error) {
          // Handle any errors that occurred during the request
          console.error(error);
        }
      };
      
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email </label>
                    <input type="email" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="signin">Register Here</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}

export default Register;