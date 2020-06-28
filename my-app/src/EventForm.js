import React, { useState } from 'react';
import {db} from './DatabaseContext';
const { remoteConfig } = require("firebase");

//Allows user to create an event with name, date, time, length (in hours), and description fields

function EventForm() {
    const d = new Date();
    let date = d.getMonth() + "-" + d.getDay() + "-" + d.getFullYear();

    const [state, setState] = useState({
        university: "",
        eventName: "",
        date: "MM-DD-YYYY",
        time: "00:00",
        length: "(In hours)",
        description: "Tell others about your event..."
    });

    //Handles updating of input upon typing
    function handleChange(event) {
        setState({...state, 
            [event.target.name]: event.target.value});
        event.preventDefault();
    }

    //Handles submission of event
    function handleSubmit(event) {
        //Prevents default behavior (addition of this call allowed for user docs to be added)
        event.preventDefault();

        //As long as all forms are filled, allows event to be created
        //How to direct to subcollection?
        if (state.university && state.eventName && state.date && state.time && state.length && state.description) {
            db.doc('events/' + state.university).add(state)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
        //Alert for blank fields
        else {
            alert('Please fill out all fields.');
        }
    }

    return (            
        <div className="container">
            {/*&emsp adds tab space before text*/}
            <h1>&emsp;Schedule an Event</h1>
            <div id="wrapper">
                <form>
                <label>College/University: </label>
                    <input type="text" name="university" value={state.university} onChange={handleChange} required/>
                    <br />
                    <label>Event Name: </label>
                    <input type="text" name="eventName" value={state.eventName} onChange={handleChange} required/>
                    <br />
                    <label>Date: </label>
                    <input type="date" name="date" value={state.date} min={date}
                        onChange={handleChange} required/>
                    <br />
                    <label>When does your event start? </label>
                    <input type="time" name="time" value={state.time} onChange={handleChange} required/>
                    <br />
                    <label>Length (Hours): </label>
                    <input type="number" name="length" min="1" value={state.length} onChange={handleChange} required/>
                    <br />
                    <label>Description: </label>
                    <input type="text" name="description" value={state.description} onChange={handleChange} required/>
                    <br />

                    <input id="submit-button" type="button" value="Submit Event" onClick={handleSubmit}/>
                </form>
            </div>
        </div>
    );    
};

export default EventForm;
