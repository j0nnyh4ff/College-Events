import React, { useState } from 'react';
//import ReactDOM from 'react-dom';
import { Link, Redirect } from "react-router-dom";
import '../EventForm/EventForm.css';
import {db, firebaseApp} from '../DatabaseContext';
import { Button, TextField, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { string, object } from 'yup';
import firebase from 'firebase';
const { remoteConfig } = require("firebase");


class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            rememberMe: false
        };
    }

    rememberToggle = () => {
        this.setState({...this.state, rememberMe: !this.state.rememberMe});      
    }

    //Log in user
    logInUser = (values) => {   
        //Variables to hold any errors
        var errorCode;
        var errorMessage; 

        //No gatekeeping needed because of formik validation handling
            
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            errorCode = error.code;
            errorMessage = error.message;
            });

        //Catch and alert user to error
        if (errorCode || errorMessage) {
            alert(errorCode + ": " + errorMessage);
            return;
        }
        
        //Call displayModal to close log in modal and redirect to user dashboard
        this.props.displayModal();
        return(<Redirect to="/dashboard" />);
        
    }

    componentWillUnmount() {           
        if (this.state.rememberMe) {
            //Remember user login by setting authentication state persistence to local storage
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(function() {
                    return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + ": " + errorMessage);
                });

        } else {
            //Set user to be cleared upon tab closed by setting authentication state persistence to session
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then(function() {
                    // Existing and future Auth states are now persisted in the current
                    // session only. Closing the window would clear any existing state even
                    // if a user forgets to sign out.
                    // ...
                    // New sign-in will be persisted with session persistence.
                    return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + ": " + errorMessage);
                });
        }
    }

render() {
    return ( 
    <div style={{height: "100%", width: "100%", padding: "0px"}}>      
        <Formik initialValues={this.state} 
            validationSchema={object({
                email: string().required("Email must be a valid email").email(),
                password: string().required()
            })}
            onSubmit={(values) => {
                this.logInUser(values);
            }}>
                {({values, errors}) => (
                <Form>
                    
                    <h1 id="formTitle">Log in</h1>
                    
                    <Box marginBottom={3}>                            
                        <Field as={TextField} className="formField" fullWidth margin="normal" type="email" label="Email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </Box>
                     
                        <Box marginBottom={4}>                   
                            <Field as={TextField} className="formField" fullWidth margin="normal" type="password" label="Password" name="password" />
                            <ErrorMessage name="password" component="div" />
                        </Box>
                    

                    <Box>
                        {/*'Remember Me' checkbox*/}
                        <FormControlLabel control={
                            <Checkbox checked={this.state.rememberMe} name="checkedB" color="primary" onClick={this.rememberToggle} />}
                        label="Remember Me" />

                        <Link to="/reset-password" onClick={this.props.displayModalFunc}>Forgot password?</Link>
                    </Box>

                    <Button variant="contained" className="submitButton" type="submit" size="large" onClick={() => {
                        this.setState({email: values.email, password: values.password});
                    }}>
                        Submit
                    </Button>

                </Form>
            )}
        </Formik>
        </div>
        
    ); 
    }  
}

export default LoginForm;
