import React from 'react';
import {db, firebaseApp} from '../DatabaseContext';
import './EventForm.css';
import SideImage from './images/team-discussion.png';
import { Button, TextField, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { string, number, date, object, boolean } from 'yup';
const { remoteConfig } = require("firebase");


//Allows user to create an event with name, date, time, length (in hours), and description fields

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.displayModal = () => {props.closeModal();}
        
        this.state = {
            university: "",
            eventName: "",
            date: "",
            location: "",
            capacity: 0,
            attendees: 0,
            time: "",
            length: "",
            sports: false,
            music: false,
            theater: false,
            description: ""
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
}

componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            sessionStorage.setItem("user", user.uid);
            console.log(sessionStorage.getItem("user"));

            let userProfile = db.collection("users").doc(user.uid)
            userProfile.get().then(function(doc) 
                {
                    if (doc.exists) {
                        sessionStorage.setItem("university", doc.data().university);
                    } 
                    else { 
                        console.log("No such document found!"); 
                    }
                }).catch(function(error) {console.log("Error getting document:", error);});
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
});

}    

    filterToggle = (event) => {
        let filterName = event.target.name;
        //console.log(sessionStorage.getItem("user"));
        switch (filterName) {
            case 'sports':
                this.setState({...this.state, sports: !this.state.sports});
                //Narrow set
                break;
            case 'music':
                this.setState({...this.state, music: !this.state.music});
                //Narrow set
                break;
            case 'theater':
                this.setState({...this.state, theater: !this.state.theater});
                //Narrow set
                break;
            
        }        
    }

    //Handles submission of event
    handleSubmit() {
        //As long as all forms are filled, allows event to be created
        let errorMessage;

        if (this.state.sports || this.state.music || this.state.theater) {
            console.log("Conditional entered");
            db.collection('universities').doc(this.state.university).collection('events').add(this.state)
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

            this.displayModal();

            //Reset state values
            this.setState({university: "",
                eventName: "",
                date: "",
                location: "",
                capacity: 0,
                attendees: 0,
                time: "",
                length: "",
                sports: false,
                music: false,
                theater: false,
                description: ""
            });

        } else { alert("Please pick an event category"); }
    }

    render() {
        return (
            <Formik initialValues={this.state}
                validationSchema={object({
                    eventName: string().required("Event name is required"),
                    date: date().required("A date is required"),
                    location: string().required("A location is required"),
                    capacity: number().required(),
                    time: string().required("A time is required"),
                    length: number().required("A length (in hours) is required").max(24).min(1),
                    sports: boolean(),
                    music: boolean(),
                    theater: boolean(),
                    description: string().required("A description is required")
                })}
                onSubmit={(values, onSubmitProps) => {
                    this.handleSubmit()
                    onSubmitProps.resetForm()
                    onSubmitProps.setSubmitting(false)}}>
                {({values, errors}) => (
                    <Form>
                        <Box>
                            <Field as={TextField} label="Event Name" fullWidth name="eventName" />
                            <ErrorMessage name="eventName" component="div" /> 
                        </Box>
                        <Box>
                            <FormControlLabel control={
                                <Checkbox checked={this.state.sports} name="sports" color="secondary" onClick={this.filterToggle} />}
                                label="Sports" />
                            <FormControlLabel control={
                                <Checkbox checked={this.state.music} name="music" style={{color: "orange"}} onClick={this.filterToggle} />}
                                label="Music" />
                            <FormControlLabel control={
                                <Checkbox checked={this.state.theater} name="theater" style={{color: "coral"}} onClick={this.filterToggle} />}
                                label="Theater" />
                        </Box>
                        <Box>
                        
                            <Field as={TextField} label="Date" name="date" margin="normal" margin="normal" className="compactField" required />
                                            

                            <Field as={TextField} label="Time" name="time" margin="normal" className="compactField" required/>
                            

                            <Field as={TextField} label="Length" name="length" margin="normal" className="compactField" required/>
                            
                        </Box>

                        <Box>
                            <Field as={TextField} label="Location" name="location" className="compactFieldTwo" required/>
                            

                            <Field as={TextField} label="Event Capacity" name="capacity" className="compactFieldTwo" required/>
                            
                        </Box>
                        
                        <Box>
                            <Field as={TextField} label="Description" fullWidth name="description" required /> 
                            
                        </Box>

                        <Box marginTop={3}>
                            <Button variant="contained" className="submitButton" type="submit" size="large" onClick={() => {
                                this.setState({...this.state,
                                university: sessionStorage.getItem("university"), 
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

                            <Button style={{marginLeft: "16px"}} variant="contained" size="large" type='reset'>Reset</Button>

                        </Box>

                    </Form>
                )}
            </Formik>
        );
    }    
};

export default EventForm;
