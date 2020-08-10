import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import '../EventForm/EventForm.css';
import {db, firebaseApp} from '../DatabaseContext';
import Nav from '../Nav/Nav';
import { Button, TextField, Box } from '@material-ui/core';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { string, object } from 'yup';
import SideImage from './images/create-account-img.png';
const { remoteConfig } = require("firebase");

function SignUpForm() {
    const status = localStorage.getItem('loginStatus');
    const history = useHistory();
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        university: "",
        email: "",
        password: ""
    });

    function createAccount() {
        //Prevents default behavior (addition of this call allowed for user docs to be added)
        
        var errorCode = "";
        var errorMessage = "";
        //As long as all forms are filled, allows user to be created
           
            firebaseApp.auth().createUserWithEmailAndPassword(state.email, state.password).catch(function(error) {
                // Handle Errors here.
                if (error) {
                    errorCode = error.code;
                    errorMessage = error.message;
                    alert(errorCode + ": " + errorMessage);
                }
                // ...
              });
              if (errorCode) {
                alert(errorCode + ": " + errorMessage);
                return;
              }

              firebaseApp.auth().signInWithEmailAndPassword(state.email, state.password).catch(function(error) {
                // Handle Errors here.
                if (error) {
                    errorCode = error.code;
                    errorMessage = error.message;
                    console.log(errorCode + ": " + errorMessage);
                }
                // ...
              });
              if (errorCode) {
                console.log(errorCode + ": " + errorMessage);
                alert(errorCode + ": " + errorMessage);
                return;
              }
              
              //console.log(firebaseApp.auth().currentUser.uid);

              //Add write to firestore in user collection to store other info
              db.collection('users').doc(String(firebaseApp.auth().currentUser.uid)).set({
                firstName: state.firstName,
                lastName: state.lastName,
                university: state.university,
                email: state.email
              }).then(function() {
                  console.log("Document created successfully");
              }).catch(function(error) {
                  console.error("Error writing document: ", error);
              });

              localStorage.setItem('loginStatus', 'true');
              console.log("create user exited");
              
              history.push("/dashboard");
    }

    return (  
        <div style={{height: "100%", width: "100%", padding: "0px"}}>       
            <Formik initialValues={state}
                validationSchema={object({
                    firstName: string().required(),
                    lastName: string().required("Last name is a required field"),
                    university: string().required("College/University is a required field"),
                    email: string().required("Email is a required field").email(),
                    password: string().required("Password is a required field").min(8)                        
                })}
                onSubmit={createAccount}>
                {({values, errors}) => (
                    
                    <Form style={{textAlign: "left", textAlign: "center"}}>
                        
                        <Box marginBottom={1} marginLeft={2}>                            
                            <Field as={TextField} className="formField"  fullWidth margin="normal" label="First Name" name="firstName" required/>
                            {/*<ErrorMessage name="firstName" component="div" />*/}
                        </Box>
                        <Box marginBottom={1} marginLeft={2}>                            
                            <Field as={TextField} className="formField"  fullWidth margin="normal" label="Last Name" name="lastName" required/>
                            {/*<ErrorMessage name="lastName" component="div" />*/}
                        </Box>
                        <Box marginBottom={1} marginLeft={2}>                            
                            <Field as={TextField} className="formField" fullWidth margin="normal" label="College/University" name="university" required/>
                            {/*<ErrorMessage name="university" component="div" />*/}
                        </Box>
                        <Box marginBottom={1} marginLeft={2}>                            
                            <Field as={TextField} className="formField"  fullWidth margin="normal" type="email" label="Email" name="email" required/>
                            {/*<ErrorMessage name="email" component="div" />*/}
                        </Box>
                        <Box marginBottom={2} marginLeft={2}>                            
                            <Field as={TextField} type="password" className="formField" fullWidth margin="normal" label="Password" name="password" required/>
                            {/*<ErrorMessage name="password" component="div" />*/}
                        </Box>
                        <Box marginBottom={2}>
                            <Button variant="contained" className="submitButton" type="submit" size="large" onClick={() => {
                                setState({ 
                                firstName: values.firstName, 
                                lastName: values.lastName, 
                                university: values.university, 
                                email: values.email, 
                                password: values. password});
                            }}>
                            Create Account</Button>
                        </Box>
                        
                        
                    </Form>  
                    
                )}

            </Formik>
        </div>
    );    
};

export default SignUpForm;
