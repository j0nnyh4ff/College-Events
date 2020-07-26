import React from 'react';
import { Button, TextField, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { string, object } from 'yup';
import {firebaseApp, db} from '../DatabaseContext';
import Checkmark from './images/checkmark.jpg';
import firebase from 'firebase';
import './ResetPasswordPage.css';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: ""};
        this.auth = firebaseApp.auth();

        this.sendEmail = this.sendEmail.bind(this);
    }

    sendEmail() {
        var errorMessage;

            this.auth.sendPasswordResetEmail(this.state.email).then(function() {
                // Email sent.
                console.log("Email sent to: " + this.state.email);
                    
                }).catch(function(error) {
                    errorMessage = error;
                });
                if (errorMessage) {
                    alert(errorMessage);
                    return;
                }

            document.getElementById("formDiv").style.visibility = "hidden";
            document.getElementById("successDiv").style.visibility ="visible";        
    }

    componentWillUnmount() {
        document.getElementById("formDiv").style.visibility = "visible";
        document.getElementById("successDiv").style.visibility ="hidden";
    }

    render() {
        return(
        <div id="pageDiv">
            <div id="modalDiv">
                <div id="formDiv">
                    <Formik id="form" initialValues={this.state} 
                        validationSchema={object({
                            email: string().required("Email must be a valid email").email()
                        })}
                        onSubmit={this.sendEmail}>
                            {({values, errors}) => (
                            <Form>
                                
                                <h2>Reset Password</h2>
                                
                                <Box marginBottom={4} marginTop={2}>   
                                    <h5>Enter your account email</h5>                         
                                    <Field as={TextField} className="formField" type="email" label="Email" name="email" fullWidth/>
                                    
                                </Box>
                                
                                <Button id="resetPasswordButton" variant="contained" className="submitButton" type="submit" size="large" onClick={() => {
                                    this.setState({email: values.email});
                                    
                                    }}>
                                    Reset Password
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </div>
                <div id="successDiv">
                    <img id="checkmark" src={Checkmark} />
                    <div>
                        <h2>Check your inbox.</h2>
                        <h4>We've sent an email to reset your password.</h4>
                    </div>
                </div>
            </div>
            
        </div>);
    }
}

export default ResetPasswordPage;