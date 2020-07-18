import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../EventForm/EventForm.css';
import {db, firebaseApp} from '../DatabaseContext';
import { Button, TextField, Box } from '@material-ui/core';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { string, object } from 'yup';
import SideImage from './images/create-account-img.png';
const { remoteConfig } = require("firebase");

function SignUpForm() {

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        university: "",
        email: "",
        password: ""
    });

    function createAccount(event) {
        //Prevents default behavior (addition of this call allowed for user docs to be added)
        event.preventDefault();

        //As long as all forms are filled, allows user to be created
        if (state.firstName && state.lastName && state.university && state.email && state.username && state.password) {
            firebaseApp.auth().createUserWithEmailAndPassword(state.email, state.password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode + ": " + errorMessage);
                // ...
              });
              console.log("Account Submitted");
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
                <div style={{width: "100%", textAlign: "center"}}>
                    <h1 className="formTitle">&emsp;Create an Account</h1>
                </div>
                
                <Formik initialValues={state}
                    validationSchema={object({
                        firstName: string().required("First name is a required field"),
                        lastName: string().required("Last name is a required field"),
                        university: string().required("College/University is a required field"),
                        email: string().required("Email is a required field").email(),
                        password: string().required("Password is a required field").min(8)                        
                    })}
                    onSubmit={createAccount}>
                    {({values, errors}) => (
                        
                        <Form >
                            <h1 id="formTitle">Create an Account</h1>

                            <Box marginBottom={2} marginLeft={3}>                            
                                <Field as={TextField} className="formField"  margin="normal" label="First Name" name="firstName" />
                                <ErrorMessage name="firstName" component="div" />
                            </Box>
                            <Box marginBottom={2} marginLeft={3}>                            
                                <Field as={TextField} className="formField"  margin="normal" label="Last Name" name="lastName" />
                                <ErrorMessage name="lastName" component="div" />
                            </Box>
                            <Box marginBottom={2} marginLeft={3}>                            
                                <Field as={TextField} className="formField"  margin="normal" label="College/University" name="university" />
                                <ErrorMessage name="university" component="div" />
                            </Box>
                            <Box marginBottom={2} marginLeft={3}>                            
                                <Field as={TextField} className="formField"  margin="normal" type="email" label="Email" name="email" />
                                <ErrorMessage name="email" component="div" />
                            </Box>
                            <Box marginBottom={2} marginLeft={3}>                            
                                <Field as={TextField} className="formField"  margin="normal" label="Password" name="password" />
                                <ErrorMessage name="password" component="div" />
                            </Box>

                            <Button variant="contained" className="submitButton" type="submit" size="large">Submit</Button>
                            
                            <img id="sideImage" src={SideImage} />
                        </Form>
                        
                    )}

                </Formik>
                
            
            
            </div>
        </div>
    );    
};

export default SignUpForm;
