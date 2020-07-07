import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/EventForm.css';
import {db} from './DatabaseContext';
import SideImage from './images/Team.png';
const { remoteConfig } = require("firebase");

function LoginForm() {

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    function handleChange(event) {
        setState({...state, 
            [event.target.name]: event.target.value});
        event.preventDefault();
    }

    function onFocus(event) {
        event.target.style.borderColor = "orange";
    }

    function onBlur(event) {
        event.target.style.borderColor = "black";
    }

    function handleSubmit(event) {
        //Prevents default behavior (addition of this call allowed for user docs to be added)
        event.preventDefault();

        //As long as all forms are filled, allows user to be created
        if (state.email && state.password) {
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
        <div className="form-container">
            {/*&emsp adds tab space before text*/}
            <div id="wrapper">
                <div id="formTitle" style={{width: "100%", textAlign: "center"}}>
                    <h1>Log In</h1>
                    <h3>(Welcome back!)</h3>
                </div>
                
                <form>
                <span style={{margin: "40px"}}><img id="sideImage" src={SideImage} alt=""/></span>
                    <label>Email: </label>
                    <input type="text" name="email" value={state.email} onChange={handleChange} onClick={onFocus} onBlur={onBlur}/>
                    <br />
                    <label>Password: </label>
                    <input type="password" name="password" value={state.password} onChange={handleChange} onClick={onFocus} onBlur={onBlur} />
                    <br />

                    <input id="submit-button" class="button" type="button" value="Log In" onClick={handleSubmit}/>
                </form>
            </div>
        </div>
    );    
};

export default LoginForm;
