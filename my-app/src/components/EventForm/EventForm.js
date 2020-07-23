import React, { useState } from 'react';
import {db} from '../DatabaseContext';
import './EventForm.css';
import SideImage from './images/team-discussion.png';
import { Button, TextField, Box } from '@material-ui/core';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { string, number, date, object } from 'yup';
const { remoteConfig } = require("firebase");


//Allows user to create an event with name, date, time, length (in hours), and description fields

function EventForm() {    

    const [state, setState] = useState({
        university: "",
        eventName: "",
        date: "",
        location: "",
        time: "",
        length: "",
        description: ""
    });

    //Sends write request to firebase to post event
    function createEvent(values) {
        return;
    }

    //Handles submission of event
    function handleSubmit() {
        let errorMessage;
        //As long as all forms are filled, allows event to be created

        if (state.university) {
            console.log(state);
            db.collection('universities').doc(state.university).collection('events').add(state)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                errorMessage = "Error adding document: " + error;
            });
            if (errorMessage) {
                alert(errorMessage);
                return;
            }

            console.log("Event submitted successfully!");

            //Reset state values
            setState({university: "",
                eventName: "",
                date: "",
                location: "",
                time: "",
                length: "",
                description: ""}
            );

        }
        
        //Alert for blank fields
        
        //Prevents default behavior (addition of this call allowed for user docs to be added)
        
    }

    return (
        <Formik initialValues={state}
            validationSchema={object({
                university: string().required("University is a required field"),
                eventName: string().required("Event name is required"),
                date: date().required("A date is required"),
                location: string().required("A location is required"),
                capacity: number().required(),
                time: string().required("A time is required"),
                length: number().required("A length (in hours) is required").max(24).min(1),
                description: string().required("A description is required")
            })}
            onSubmit={handleSubmit}>
            {({values, errors}) => (
                <Form>
                    <Box>
                        <Field as={TextField} label="University" fullWidth name="university" />
                        <ErrorMessage name="university" component="div" /> 
                    </Box>
                    <Box>
                        <Field as={TextField} label="Event Name" fullWidth name="eventName" />
                        <ErrorMessage name="eventName" component="div" /> 
                    </Box>
                    <Box>
                    
                        <Field as={TextField} label="Date" name="date" margin="normal" margin="normal" className="compactField" required/>
                                           

                        <Field as={TextField} label="Time" name="time" margin="normal" className="compactField" required/>
                        

                        <Field as={TextField} label="Length" name="length" margin="normal" className="compactField" required/>
                        
                    </Box>

                    <Box>
                        <Field as={TextField} label="Location" name="location" className="compactFieldTwo" required/>
                        

                        <Field as={TextField} label="Event Capacity" name="capacity" className="compactFieldTwo" required/>
                        
                    </Box>
                    
                    <Box></Box>
                    
                    <Box>
                        <Field as={TextField} label="Description" fullWidth name="description" /> 
                        <ErrorMessage name="description" component="div" />
                    </Box>

                    <Button variant="contained" className="submitButton" type="submit" size="large" onClick={() => {
                        setState({...state, 
                        university: values.university, 
                        eventName: values.eventName,
                        date: values.date,
                        location: values.location,
                        capacity: values.capacity,
                        time: values.time,
                        length: values.length,
                        description: values.description});
                    }}>
                        Submit
                    </Button>

                </Form>
            )}


        </Formik>
    );    
};

export default EventForm;
