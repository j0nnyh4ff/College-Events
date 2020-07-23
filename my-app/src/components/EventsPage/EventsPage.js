import React from 'react';
import {Link} from 'react-router-dom';
import {db} from '../DatabaseContext';
import EventForm from '../EventForm/EventForm';
import { Button, TextField, Box } from '@material-ui/core';
import './EventsPage.css';
const { remoteConfig } = require("firebase");

 class EventsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            modalOpen: false
        };  
    }

    registerForEvent(e) {
        return;
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
        console.log("IT WORKED");
    };
     
    componentDidMount() {
        let universitiesRef = db.collection('universities');
        const eventsRef = db.collectionGroup('events').get();
        
        eventsRef.then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({...this.state, events: [...this.state.events, doc.data()]});
                })
            }).catch(function(error) {
                console.error("Error adding document: ", error);
            });
              
        console.log(this.state.events);

    }
    
    render() {
        return (
                <div className="results-container">
                    <Button id="createEventButton" onClick={this.displayModal}>
                        +
                    </Button>
                
                    <div className="results-wrapper">
                        <ul>
                            {this.state.events.map(event => (
                                <div className="list-div" id={event.id} onClick={this.onFocus}>
                                    <h2>{event.eventName}</h2><h3> - {event.university}</h3> <br /> 
                                    {event.date} @ {event.time} ({event.length} hrs.)<br /> 
                                    {event.description}
                                    <Button className="registerButton" variant="contained" color="primary" onClick={this.registerForEvent}>RSVP</Button>
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div id="createEventModal">
                        <div id="createEventModalContent">
                        <h1 id="formTitle">Create an Event</h1>
                            <EventForm />
                        </div>
                    </div>                    
                </div>
            );
    }
}

export default EventsPage;