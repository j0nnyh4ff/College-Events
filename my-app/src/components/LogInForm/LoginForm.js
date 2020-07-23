import React, { useState } from 'react';
//import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import '../EventForm/EventForm.css';
import {db, firebaseApp} from '../DatabaseContext';
import { Button, TextField, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { string, object } from 'yup';
const { remoteConfig } = require("firebase");


function LoginForm(props) {
    const displayModal = () => (props.displayModalFunc());
    const updateLogin = () => (props.updateLoginStatus());
    const history = useHistory();
    let index = 0;

    const [state, setState] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    
    //Search Bar focus animation
    function onFocus(event) {
        event.target.style.borderColor = "orange";
    }

    function rememberToggle() {
            setState({...state, rememberMe: !state.rememberMe});       
    }

    //Search Bar blur animation
    function onBlur(event) {
        event.target.style.borderColor = "black";
    }

    //Log in user
    function logInUser() {       

        //As long as all forms are filled, allows user to send login request
        var errorCode;
        var errorMessage; 

        if (state.email && state.password) {
            
            firebaseApp.auth().signInWithEmailAndPassword(state.email, state.password).catch(function(error) {
                // Handle Errors here.
                errorCode = error.code;
                errorMessage = error.message;
                // ...
              });
              if (errorCode || errorMessage) {
                alert(errorCode + ": " + errorMessage);
                return;
                }

            if (state.rememberMe) {
                localStorage.setItem('user', JSON.stringify(firebaseApp.auth().currentUser));
                localStorage.setItem('loginStatus', true);
            } else {
                sessionStorage.setItem('user', JSON.stringify(firebaseApp.auth().currentUser));
                sessionStorage.setItem('loginStatus', true);
            }

            displayModal();
            updateLogin();
            history.push("/dashboard");
            
            
        }
    }

    return ( 
        <>           
        <Formik initialValues={state} 
            validationSchema={object({
                email: string().required("Email must be a valid email").email(),
                password: string().required()
            })}
            onSubmit={logInUser}>
                {({values, errors}) => (
                <Form>
                    
                    <h1 id="formTitle">Log in</h1>
                    
                    <Box marginBottom={2}>                            
                        <Field as={TextField} className="formField" fullWidth margin="normal" type="email" label="Email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </Box>
                    <div> 
                        <Box marginBottom={2}>                   
                            <Field as={TextField} className="formField" fullWidth margin="normal" type="password" label="Password" name="password" />
                            <ErrorMessage name="password" component="div" />
                        </Box>
                    </div>

                    <Box>
                        {/*Add 'Remember Me' checkbox*/}
                        <FormControlLabel control={
                            <Checkbox checked={state.rememberMe} name="checkedB" color="primary" onClick={rememberToggle} />}
                        label="Remember Me" />
                    </Box>

                    <Button variant="contained" className="submitButton" type="submit" size="large" onClick={() => {
                        setState({email: values.email, password: values.password});
                    }}>
                        Submit
                    </Button>

                </Form>
            )}
        </Formik>
        </>
    );   
};

export default LoginForm;
