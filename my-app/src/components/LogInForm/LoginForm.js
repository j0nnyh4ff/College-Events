import React, { useState } from 'react';
//import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import '../EventForm/EventForm.css';
import {db, firebaseApp} from '../DatabaseContext';
import { Button, TextField, Box } from '@material-ui/core';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { string, object } from 'yup';
const { remoteConfig } = require("firebase");


function LoginForm() {
    const history = useHistory();

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    
    //Search Bar focus animation
    function onFocus(event) {
        event.target.style.borderColor = "orange";
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
            console.log("Sign in function entered");
            firebaseApp.auth().signInWithEmailAndPassword(state.email, state.password).catch(function(error) {
                // Handle Errors here.
                errorCode = error.code;
                errorMessage = error.message;
                // ...
              });
              if (errorCode || errorMessage) {
                console.log(errorCode + ": " + errorMessage);
                return;
                }
                console.log("Sign in function exited");
                
            history.push("/success");
        }
        //Alert for blank fields
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

                    <Button variant="contained" className="submitButton" type="submit" size="large" onClick={() => {
                        setState({email: values.email, password: values.password});
                        logInUser();
                    }}>
                        Submit
                    </Button>

                    <pre>{JSON.stringify(errors, null, 4)}</pre>
                    <pre>{JSON.stringify(values, null, 4)}</pre>
                </Form>
            )}
        </Formik>
        </>
    );   
};

export default LoginForm;
