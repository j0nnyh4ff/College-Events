import React from 'react';
import {Link} from 'react-router-dom';
import {db, firebaseApp} from '../DatabaseContext';
import EventForm from '../EventForm/EventForm';
import { Button, TextField, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import './EventsPage.css';
import firebase from 'firebase';
const { remoteConfig } = require("firebase");

 class EventsPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            events: [],
            modalOpen: false,
            myCampus: false, 
            sports: false, 
            music: false, 
            theater: false
        };
        
        this.filterToggle = this.filterToggle.bind(this);
        this.registerEvent = this.registerForEvent.bind(this);
        this.incrementDoc = this.incrementDoc.bind(this);
    }

    registerForEvent(eventID) {
        //Div containing event information
        let eventDiv = document.getElementById(eventID);
        //Index of event within rendered events
        let eventIndex = this.state.events.findIndex( (e) => (e.id === eventID) );
        //New incremented total of event attendees
        let newAttendees = this.state.events[eventIndex].data.attendees + 1;

        //Increment event attendees within state (to show change to user)
        this.state.events[eventIndex].data.attendees = newAttendees;
        //Update event on page
        eventDiv.innerText = `Open seats: ${Number(this.state.events[eventIndex].data.capacity) - newAttendees}`;

        //Update RSVP button and disable additional registration
        let button = document.getElementById("button-" + eventID);
        button.disabled = true;
        button.style.backgroundColor = "#FFFBFC";
        button.innerText = "Registered";

        //Call incrementDoc to increment event attendees within firebase
        this.incrementDoc(this.state.events[eventIndex]);            
    }

    filterToggle(event) {
        let filterName = event.target.name;
        
        switch (filterName) {
            case 'myCampus':
                this.setState({...this.state, myCampus: !this.state.myCampus});
                break;
            case 'sports':
                this.setState({...this.state, sports: !this.state.sports});
                break;
            case 'music':
                this.setState({...this.state, music: !this.state.music});
                break;
            case 'theater':
                this.setState({...this.state, theater: !this.state.theater});
                break;    
        }        
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
        //Collection of events from all universities
        const eventsRef = db.collectionGroup('events').get();
        //Push event info into state
        eventsRef.then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({...this.state, events: [...this.state.events, {id: doc.id, data: doc.data()}]});
                })
                //console.log(this.state.events);
            }).catch(function(error) {
                console.error("Error getting document: ", error);
            });
        
        //User profile info
        let userProfile = db.collection("users").doc(firebase.auth().currentUser.uid);
        //Store user's university (for create event form) 
        userProfile.get().then(function(doc) 
            {
                if (doc.exists) {
                    sessionStorage.setItem("university", doc.data().university);
                } 
                else { 
                    console.log("No such document found!"); 
                }
            }).catch(function(error) {console.log("Error getting document:", error);});        
    }

    incrementDoc = (updatedDocInfo) => {
        //Firebase universities collection        
        const universitiesRef = firebase.firestore().collection("universities");        
        
        //Firebase event document reference
        let firebaseDoc = universitiesRef.doc(updatedDocInfo.data.university)
                            .collection('events').doc(updatedDocInfo.id);

        //Increment recorded event attendees
        firebaseDoc.update({
            attendees: firebase.firestore.FieldValue.increment(1)
        }).then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

        //User ID
        let userID = firebase.auth().currentUser.uid;
        //Add user to event's guest list
        firebaseDoc.set({
            guestList: firebase.firestore.FieldValue.arrayUnion(userID)
        }, {merge: true}).then(function() {
            console.log("Document successfully updated! x2");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document x2: ", error);
        });
    }
    
    render() {
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

                <Button variant="contained" id="filterEventsButton">Filters</Button>

                <Button id="mobile-logout-button" name="logoutButton" variant="contained" color="primary" 
                            onClick={() => (
                                firebaseApp.auth().signOut() 
                            )}>
                            Log out
                        </Button>
            
                <div className="results-wrapper">
                        {/* Unfiltered list of events */}
                        { !this.state.myCampus && !this.state.sports && !this.state.theater && !this.state.music && this.state.events.map(event => (
                            <div className="list-div" key={event.id}>
                                <h2>{event.data.eventName}</h2><h3> - {event.data.university}</h3> <br /> 
                                {event.data.date} @ {event.data.time} ({event.data.length} hrs.)<br />
                                <span id={event.id}>Open seats: {Number(event.data.capacity) - event.data.attendees}</span> <br /> 
                                {event.data.description}
                                
                                {/*If user is already registered for event*/}                                
                                {event.data.guestList && event.data.guestList.includes(firebase.auth().currentUser.uid) ? 
                                    <Button key={event.id} id={"button-" + event.id} className="registerButton" variant="contained" disabled>
                                        Registered
                                    </Button>
                                    : 
                                    <Button key={event.id} id={"button-" + event.id} className="registerButton" variant="contained" color="primary" onClick={() => (
                                        this.registerForEvent(event.id)
                                    )}>
                                        RSVP
                                    </Button> 
                                }                          
                            </div>
                        ))}

                        {/* Filtered list of events happening only on current user's campus */}
                        { this.state.myCampus && this.state.events.filter(event => (event.data.university === sessionStorage.getItem("university") )).map(event => (
                            <div className="list-div" key={event.id}>
                                <h2>{event.data.eventName}</h2><h3> - {event.data.university}</h3> <br /> 
                                {event.data.date} @ {event.data.time} ({event.data.length} hrs.)<br />
                                <span id={event.id}>Open seats: {Number(event.data.capacity) - event.data.attendees}</span> <br /> 
                                {event.data.description}
                                
                                {/*If user is already registered for event*/}                                
                                {event.data.guestList && event.data.guestList.includes(firebase.auth().currentUser.uid) ? 
                                    <Button key={event.id} id={"button-" + event.id} className="registerButton" variant="contained" disabled>
                                        Registered
                                    </Button>
                                    : 
                                    <Button key={event.id} id={"button-" + event.id} className="registerButton" variant="contained" color="primary" onClick={() => (
                                        this.registerForEvent(event.id)
                                    )}>
                                        RSVP
                                    </Button> 
                                }                          
                            </div>
                        ))}
                        

                        {/* Filtered list of sports events */} 
                        { this.state.sports && this.state.events.filter(event => ( event.data.sports )).map(event => (
                            <div className="list-div" key={event.id}>
                                <h2>{event.data.eventName}</h2><h3> - {event.data.university}</h3> <br /> 
                                {event.data.date} @ {event.data.time} ({event.data.length} hrs.)<br />
                                <span id={event.id}>Open seats: {Number(event.data.capacity) - event.data.attendees}</span> <br /> 
                                {event.data.description}
                                
                                {/*If user is already registered for event*/}                                
                                {event.data.guestList && event.data.guestList.includes(firebase.auth().currentUser.uid) ? 
                                    <Button key={event.id} id={"button-" + event.id} className="registerButton" variant="contained" disabled>
                                        Registered
                                    </Button>
                                    : 
                                    <Button key={event.id} id={"button-" + event.id} className="registerButton" variant="contained" color="primary" onClick={() => (
                                        this.registerForEvent(event.id)
                                    )}>
                                        RSVP
                                    </Button> 
                                }                          
                            </div>
                        ))}
                        

                        {/* Filtered list of music events */}
                        { this.state.music && this.state.events.filter(event => ( event.data.music )).map(event => (
                            <div className="list-div" key={event.id}>
                                <h2>{event.data.eventName}</h2><h3> - {event.data.university}</h3> <br /> 
                                {event.data.date} @ {event.data.time} ({event.data.length} hrs.)<br />
                                <span id={event.id}>Open seats: {Number(event.data.capacity) - event.data.attendees}</span> <br /> 
                                {event.data.description}
                                
                                {/*If user is already registered for event*/}                                
                                {event.data.guestList && event.data.guestList.includes(firebase.auth().currentUser.uid) ? 
                                    <Button key={event.id} id={"button-" + event.id} className="registerButton" variant="contained" disabled>
                                        Registered
                                    </Button>
                                    : 
                                    <Button key={event.id} id={"button-" + event.id} className="registerButton" variant="contained" color="primary" onClick={() => (
                                        this.registerForEvent(event.id)
                                    )}>
                                        RSVP
                                    </Button> 
                                }                          
                            </div>
                        ))}
                        

                        {/* Filtered list of theater events */}
                        { this.state.theater && this.state.events.filter(event => ( event.data.theater )).map(event => (
                            <div className="list-div" key={event.id}>
                                <h2>{event.data.eventName}</h2><h3> - {event.data.university}</h3> <br /> 
                                {event.data.date} @ {event.data.time} ({event.data.length} hrs.)<br />
                                <span id={event.id}>Open seats: {Number(event.data.capacity) - event.data.attendees}</span> <br /> 
                                {event.data.description}
                                
                                {/*If user is already registered for event*/}                                
                                {event.data.guestList && event.data.guestList.includes(firebase.auth().currentUser.uid) ? 
                                    <Button key={event.id} id={"button-" + event.id} className="registerButton" variant="contained" disabled>
                                        Registered
                                    </Button>
                                    : 
                                    <Button key={event.id} id={"button-" + event.id} className="registerButton" variant="contained" color="primary" onClick={() => (
                                        this.registerForEvent(event.id)
                                    )}>
                                        RSVP
                                    </Button> 
                                }                          
                            </div>
                        ))}                            
                    
                </div> {/*End of results wrapper*/}
                {/*Modal for create event form*/}
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