import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './SignUpForm.css';
import {db} from './DatabaseContext';
const { remoteConfig } = require("firebase");

function SignUpForm() { 
    let createdAccount = false;

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
        //Prevents default behavior (addition of this call allowed for user docs to be added)
        event.preventDefault();

        //As long as all forms are filled, allows user to be created
        if (state.firstName && state.lastName && state.email && state.username && state.password) {
            db.collection('users').add(state)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
        //Alert for blank fields
        else {
            alert('Please fill out all fields.');
        }
    }

    return (            
        <div className="container">
            {/*&emsp adds tab space before text*/}
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

                    <input id="submit-button" type="button" value="Create Account" onClick={handleSubmit}/>
                </form>
            </div>
        </div>
    );    
};

export default SignUpForm;
