import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './SignUpForm.css';
import Database from './Database'
const { remoteConfig } = require("firebase");

function SignUpForm() { 
    const db = Database();   

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

    function handleSubmit(event) {
        if (state.firstName && state.lastName && state.email && state.username && state.password) {
            let usersRef = db.connect.collectionGroup('users').where('email', '==', state.email);
            usersRef.get().then(function(doc) {
                if (doc.exists) {
                    alert("Document Exists");
                }
                else {
                    alert("User info is available");
                }
            })
            
        }
        alert('Please fill out all fields.');
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

                    <input id="submit-button" type="submit" value="Create Account" onClick={handleSubmit}/>
                </form>
            </div>
        </div>
    );    
};

export default SignUpForm;
