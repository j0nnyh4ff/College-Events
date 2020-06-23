import React, { useState } from 'react';
import './SignUpForm.css';
const { remoteConfig } = require("firebase");

function SignUpForm() {    

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    });


    function handleChange(event) {
        setState({...state, 
            [event.target.name]: event.target.value});
        event.preventDefault();
    }

    function handleSubmit() {
        return;
    }


    return (            
        <div className="container">
            <h1>&emsp;Create an Account</h1>
            <div id="wrapper">
                <form>
                    <label>First Name: </label>
                    <input type="text" name="firstName" value={state.firstName} onChange={handleChange} />
                    <br />
                    <label>Last Name: </label>
                    <input type="text" name="lastName" value={state.lastName} onChange={handleChange} />
                    <br />
                    <label>Email: </label>
                    <input type="text" name="email" value={state.email} onChange={handleChange} />
                    <br />
                    <label>Username: </label>
                    <input type="text" name="username" value={state.username} onChange={handleChange} />
                    <br />
                    <label>Password: </label>
                    <input type="password" name="password" value={state.password} onChange={handleChange} />
                    <br />

                    <input id="submit-button" type="submit" value="Create Account" />
                </form>
            </div>
        </div>
    );    
};

export default SignUpForm;
