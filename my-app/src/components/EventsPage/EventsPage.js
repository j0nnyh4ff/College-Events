import React from 'react';
import {Link} from 'react-router-dom';
import {db, firebaseApp} from '../DatabaseContext';
import EventForm from '../EventForm/EventForm';
import { Button, TextField, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import './EventsPage.css';
const { remoteConfig } = require("firebase");

 class EventsPage extends React.Component {
    constructor(props) {
        super(props);

        this.universitiesRef = db.collection('universities');

        this.state = {
            events: [],
            modalOpen: false,
            myCampus: false, 
            sports: false, 
            music: false, 
            theater: false
        }; 
        
        this.filterToggle = this.filterToggle.bind(this);
    }

    registerForEvent(eventID) {
        console.log("registerForEvent called with eventID: " + eventID);
        if (eventID) {
            let collec = db.collectionGroup('events').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.id === eventID) {
                        doc.update({attendees: db.FieldValue.increment(1)})
                    }
                })
            }).catch((error) => {console.log(error)});
            alert("Successfully registered for event!");

            
        }
        return;
    }

    filterToggle(event) {
        let filterName = event.target.name;
        
        switch (filterName) {
            case 'myCampus':
                this.setState({...this.state, myCampus: !this.state.myCampus});
                
                break;
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

    filterEvents(eventType) {
        let filteredEvents = []

        for (let e in this.state.events) {
            if (e.category === eventType) {
                filteredEvents.push(e);
            }
        }

        this.setState({...this.state, events: filteredEvents});
    }

    displayModal = () => {
        let modal = document.getElementById("createEventModal");

        if (this.state.modalOpen) {
            this.setState({...this.state, modalOpen: false});
            modal.style.visibility = "hidden";
        }
        else {
            this.setState({...this.state, modalOpen: true});
            modal.style.visibility = "visible";
        }
    };
     
    componentDidMount() {
        console.log("componentDidMount called");
        

        let universitiesRef = db.collection('universities');
        const eventsRef = db.collectionGroup('events').get();
        
        eventsRef.then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({...this.state, events: [...this.state.events, {id: doc.id, data: doc.data()}]});
                })
                console.log(this.state.events);
            }).catch(function(error) {
                console.error("Error getting document: ", error);
            });

        
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
    
    render() {
        console.log("render called");
        return (
                <div className="results-container">
                    <Button id="createEventButton" onClick={this.displayModal}>
                        +
                    </Button>

                    <div id="eventFilterDiv">
                        <h2>Filter Events</h2>
                        
                        <div id="filters">
                            <FormControlLabel control={
                                <Checkbox checked={this.state.myCampus} name="myCampus" color="primary" onClick={this.filterToggle} />}
                            label="My Campus" />
                            <FormControlLabel control={
                                <Checkbox checked={this.state.sports} name="sports" color="secondary" onClick={this.filterToggle} />}
                            label="Sports" />
                            <FormControlLabel control={
                                <Checkbox checked={this.state.music} name="music" style={{color: "orange"}} onClick={this.filterToggle} />}
                            label="Music" />
                            <FormControlLabel control={
                                <Checkbox checked={this.state.theater} name="theater" style={{color: "coral"}} onClick={this.filterToggle} />}
                            label="Theater" />
                        </div>

                    </div>
                
                    <div className="results-wrapper">

                            {/* Unfiltered list of events */}
                            { !this.state.myCampus && !this.state.sports && !this.state.theater && !this.state.music && this.state.events.map(event => (
                                <div className="list-div" key={event.id} name={event.id} onClick={this.onFocus}>
                                    <h2>{event.data.eventName}</h2><h3> - {event.data.university}</h3> <br /> 
                                    {event.data.date} @ {event.data.time} ({event.data.length} hrs.)<br />
                                    {event.data.attendees || "0"} / {event.data.capacity} <br /> 
                                    {event.data.description}
                                    <Button key={event.id} name={event.id} className="registerButton" variant="contained" color="primary" onClick={() => (
                                        this.registerForEvent(event.id)
                                    )}>RSVP</Button>
                                </div>
                            ))}

                            {/* Filtered list of events happening only on current user's campus */}
                            { this.state.myCampus && this.state.events.filter(event => (event.data.university === sessionStorage.getItem("university") )).map(event => (
                                <div className="list-div" key={event.id} name={event.id} onClick={this.onFocus}>
                                    <h2>{event.data.eventName}</h2><h3> - {event.data.university}</h3> <br /> 
                                    {event.data.date} @ {event.data.time} ({event.data.length} hrs.)<br />
                                    {event.data.attendees || "0"} / {event.data.capacity} <br /> 
                                    {event.data.description}
                                    <Button key={event.id} className="registerButton" variant="contained" color="primary" onClick={() => (
                                        this.registerForEvent(event.id)
                                    )}>RSVP</Button>
                                </div>
                            ))}
                            

                            {/* Filtered list of sports events */} 
                            { this.state.sports && this.state.events.filter(event => ( event.data.sports )).map(event => (
                                <div className="list-div" key={event.id} name={event.id} onClick={this.onFocus}>
                                    <h2>{event.data.eventName}</h2><h3> - {event.data.university}</h3> <br /> 
                                    {event.data.date} @ {event.data.time} ({event.data.length} hrs.)<br />
                                    {event.data.attendees || "0"} / {event.data.capacity} <br /> 
                                    {event.data.description}
                                    <Button key={event.id} className="registerButton" variant="contained" color="primary" onClick={() => (
                                        this.registerForEvent(event.id)
                                    )}>RSVP</Button>
                                </div>
                            ))}
                            

                            {/* Filtered list of music events */}
                            { this.state.music && this.state.events.filter(event => ( event.data.music )).map(event => (
                                <div className="list-div" key={event.id} id={event.id} onClick={this.onFocus}>
                                    <h2>{event.data.eventName}</h2><h3> - {event.data.university}</h3> <br /> 
                                    {event.data.date} @ {event.data.time} ({event.data.length} hrs.)<br />
                                    {event.data.attendees || "0"} / {event.data.capacity} <br /> 
                                    {event.data.description}
                                    <Button key={event.id} className="registerButton" variant="contained" color="primary" onClick={() => (
                                        this.registerForEvent(event.id)
                                    )}>RSVP</Button>
                                </div>
                            ))}
                            

                            {/* Filtered list of theater events */}
                            { this.state.theater && this.state.events.filter(event => ( event.data.theater )).map(event => (
                                <div className="list-div" key={event.id} id={event.id} onClick={this.onFocus}>
                                    <h2>{event.data.eventName}</h2><h3> - {event.data.university}</h3> <br /> 
                                    {event.data.date} @ {event.data.time} ({event.data.length} hrs.)<br />
                                    {event.data.attendees || "0"} / {event.data.capacity} <br /> 
                                    {event.data.description}
                                    <Button key={event.id} className="registerButton" variant="contained" color="primary" onClick={() => (
                                        this.registerForEvent(event.id)
                                    )}>RSVP</Button>
                                </div>
                            ))}


                            
                        
                    </div>
                    <div id="createEventModal">
                        <div id="createEventModalContent">
                        <h1 id="formTitle">Create an Event</h1>
                            <EventForm closeModal={this.displayModal} />
                        </div>
                    </div>                    
                </div>
            );
    }
}

export default EventsPage;