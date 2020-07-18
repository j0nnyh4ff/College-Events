import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Bell from './images/bell.png';
import SearchBar from '../SearchBar/SearchBar';
import LoginForm from '../LogInForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import {db, firebaseApp} from '../DatabaseContext';
import './Nav.css';
import { Button, TextField, Box } from '@material-ui/core';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Object, String} from 'yup';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        //this.history; 
        this.state = {
            
            modalOpen: false
        };

            
        
    }

    displayModal = (event) => {
        //Prevents null getElementById compilation error
        if (event.target) {
            let modal = document.getElementById("modal");
                
            //Set Modal visibility
            if (!this.state.modalOpen) {                

                    this.setState({...this.state, modalOpen: true});
                    modal.style.visibility = "visible"; 
            }
            else {

                this.setState({...this.state, modalOpen: false});
                modal.style.visibility = "hidden";
            }       
        }
    }

    //Log in user
    logInUser = (values) => {
        //this.history = useHistory();

        //As long as all forms are filled, allows user to send login request
        var errorCode;
        var errorMessage;
        
        if (values.email && values.password) {

        
        firebaseApp.auth().signInWithEmailAndPassword(values.email, values.password).catch(function(error) {
            // Handle Errors here.
            errorCode = error.code;
            errorMessage = error.message;
            // ...
            });
            if (errorCode || errorMessage) {
            console.log(errorCode);
            console.log(errorMessage);
            return;
            }
            alert("Successful login!");
        }
        //this.history.push("/success");
    }

    render() {
        //If user is not logged in
        if (true) {
        return(
            <div id="container">
                <style> {/*Importing Open Sans*/}
                    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
                </style> 

                <div id="logoDiv">
                    <Link to="/" id="Logo">
                        
                        <img id="bell" src={Bell} alt="Home"/>
                        <span><h3 id="titleBanner">Schoolhouse</h3></span>
                        
                    </Link>
                </div>

                <span>
                    <div id="linkContainer">
                        <Link className="link">About</Link>
                        <Link className="link">Developers</Link>
                        <Link className="link">Terms & Policies</Link>
                    </div>
                </span>

                {/*Log in and sign up buttons*/}
                <span id="buttons">
                    <Button id="loginButton" name="loginButton" onClick={this.displayModal}>
                        Log in
                    </Button>                    
                    
                    <Link to="/sign-up" id="signUp">
                        <Button id="signUpButton" name="signupButton" variant="contained" color="primary" onClick={this.displayModal}>
                            Sign Up
                        </Button> 
                    </Link> 
                    
                </span>

                <div id="modal" className="modal">
                    <div id="modalContent" className="modalContent">
                        <span id="exit" onClick={this.displayModal}>X&emsp;</span>
                        <LoginForm />
                    </div>
                </div>
            </div>
        );
    }   //User is logged in
        else {
            return(
            <div>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Search</a>
            </div>
        );
        }

    }
}

export default Nav;