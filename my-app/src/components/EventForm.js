import React, { useState } from 'react';
import {db} from './DatabaseContext';
import './styles/EventForm.css';
import SideImage from './images/team-discussion.png';
import BackdropImage from './images/concert.jpg';
const { remoteConfig } = require("firebase");


//Allows user to create an event with name, date, time, length (in hours), and description fields

function EventForm() {
    const d = new Date();
    let date = d.getMonth() + "-" + d.getDay() + "-" + d.getFullYear();

    const [state, setState] = useState({
        university: "",
        eventName: "",
        date: "MM-DD-YYYY",
        location: "",
        time: "00:00",
        length: "",
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
        const unchanged = "Tell others about your event...";
        //As long as all forms are filled, allows event to be created
        //How to direct to subcollection?
        if (state.university && state.eventName && state.date && state.time && 
            state.length && state.description && state.description !== unchanged) 
        {           
            db.collection('universities').doc(state.university).collection('events').add(state)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

            alert("Event submitted successfully!");
        }
        //Alert for blank fields
        else {
            alert('Please fill out all fields.');
        }
        //Prevents default behavior (addition of this call allowed for user docs to be added)
        event.preventDefault();
    }

    return (            
        <div className="form-container">
            {/*&emsp adds tab space before text*/}
            <div id="wrapper">

                <div style={{width: "100%", textAlign: "center"}}>
                    <h1 className="formTitle">&emsp;Schedule an Event</h1>
                </div>

                <form>
                    <span><img id="sideImage" src={SideImage} alt=""/></span>
                    <label>College/University: </label>
                    <input type="text" name="university" value={state.university} onChange={handleChange} required/>
                    <br />
                    <label>Event Name: </label>
                    <input type="text" name="eventName" value={state.eventName} onChange={handleChange} required/>
                    <br />
                    <label>Date: </label>
                    <input type="date" name="date" value={state.date} min={date}
                        onChange={handleChange} style={{border: "none"}}required/>
                    <br />
                    <label>Location: </label>
                    <input type="text" name="location" value={state.location} onChange={handleChange} required/>
                    <br />
                    <label>When does your event start? </label>
                    <input type="time" name="time" value={state.time} onChange={handleChange} required/>
                    <br />
                    <label>Length (Hours): </label>
                    <input type="number" name="length" min="1" value={state.length} onChange={handleChange} required/>
                    <br />
                    <label>Description: </label>
                    <textarea name="description" rows="2" columns="30" value={state.description} onChange={handleChange} required/>
                    <br />

                    <input id="submit-button" type="button" value="Submit Event" onClick={handleSubmit}/>
                    
                </form>
            </div>
        </div>
    );    
};

export default EventForm;
