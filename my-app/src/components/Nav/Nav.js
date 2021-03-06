import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Bell from './images/bell.png';
import SearchBar from '../SearchBar/SearchBar';
import LoginForm from '../LogInForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import ProfileAvi from './images/profile-avi.png';
import {firebaseApp} from '../DatabaseContext';
import './Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { Button, TextField, Box } from '@material-ui/core';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Object, String} from 'yup';
import firebase from 'firebase';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        const status = localStorage.getItem('loginStatus'); 
        //this.history; 
        this.state = {
            modalOpen: false
        };      
    }

    //Log out user
    logOutUser = () => {
        localStorage.setItem('loginStatus', 'false');
        localStorage.setItem('user', null);
        firebaseApp.auth().signOut();    
    }

    displayModal = () => {        

        let modal = document.getElementById("modal");

        //Set Modal visibility
        if (!this.state.modalOpen) {  
            this.setState({...this.state, modalOpen: true});
            modal.style.visibility = "visible";

        } else {
            this.setState({...this.state, modalOpen: false});
            modal.style.visibility = "hidden";
        }         
    }

    render() {
        //If user is not logged in
        if (!this.props.loggedIn) {
        return(
            <div id="nav">
                <style> {/*Importing Open Sans*/}
                    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
                </style> 

                <div id="logoDiv">
                    <Link to="/" id="Logo" id="titleBanner">
                        
                        <img id="bell" src={Bell} alt="Home"/>
                        <span><h3 id="titleBanner">Schoolhouse</h3></span>
                        
                    </Link>
                </div>

                <span>
                    <div id="linkContainer">
                        <Link className="link" to="/about" >About</Link>
                        <Link className="link" to="/developers">Developers</Link>
                        <Link className="link" to="/terms-policies">Terms & Policies</Link>
                    </div>
                </span>

                {/*Log in and sign up buttons*/}
                <span id="buttons">
                    <Button id="loginButton" name="loginButton" onClick={this.displayModal}>
                        Log in
                    </Button>                    
                    
                    <Link to="/sign-up" id="signUp">
                        <Button id="signUpButton" name="signupButton" variant="contained" color="primary">
                            Sign Up
                        </Button>
                    </Link>                   
                </span>

                
                <div id="modal" className="modal">
                    <div id="modalContent" className="modalContent">
                        <span id="exit" onClick={this.displayModal}>X&emsp;</span>
                        <LoginForm  displayModalFunc={this.displayModal}/>
                    </div>    
                </div>
                
                
            </div>
        );
    } else { //User is logged in
            return(
                <div id="nav" style={{backgroundColor: "#0624c3"}}>
                <style> {/*Importing Open Sans*/}
                    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
                </style> 

                <div id="loggedInDiv">
                    <Link to="/dashboard" id="Logo">
                        <FontAwesomeIcon id="loggedInBell" icon={faSchool} />
                        {/*<img id="loggedInBell" src={Bell} alt="Home"/>*/}
                       
                        
                    </Link>
                </div>

                <span>
                    <div id="searchContainer">
                        <SearchBar />
                    </div>
                    
                </span>

                {/*Log in and sign up buttons*/}                  
                <span id="buttons">
                    <Link to="/dashboard"><img id="profileIcon" src={ProfileAvi} alt="Profile Settings"/></Link>
                    <Link to="/" id="logout">
                        <Button id="logoutButton" name="logoutButton" variant="contained" color="primary" 
                            onClick={this.logOutUser}>
                            Log out
                        </Button>
                    </Link>                   
                </span>
                
                
            </div>
        );
        }

    }
}

export default Nav;