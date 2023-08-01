import React, { useState } from "react";
import './loginscreen.css';
import ReactDOM from "react-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate= useNavigate()   
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
            username: "user1",
            password: "pass1"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = async(event) => {
       
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];
        console.log("hi",uname.value)
        try {
            const response = await axios.get('http://localhost:3000/api/login', {
              params: {
                email: uname.value,
                password: pass.value
              }
            });
            console.log(uname,pass)
          // Handle the response from the server
    if (response.data.success == true) {
        // Login successful, navigate to the desired route
        navigate('/'); // Replace '/dashboard' with your desired route
      } else {
        // Login failed, display the error message
        window.alert("Invalid Username or Password");
        console.log(response.data.message);
      }
            // Handle the response from the server
            console.log(response.data.success); // or do something else with the response
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
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="signin">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}

export default Login;