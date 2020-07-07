import React from 'react';
import {Link} from 'react-router-dom';
import {db} from './DatabaseContext';
import './styles/EventsPage.css';
const { remoteConfig } = require("firebase");

 class EventsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };

        //this.onFocus = this.onFocus.bind(this);
    }

    registerForEvent(e) {
        return;
    }
    
    componentDidMount() {
        let universitiesRef = db.collection('universities');
        const eventsRef = db.collectionGroup('events').get();
        
        eventsRef.then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({events: [...this.state.events, doc.data()]});
                })
            });  
        console.log(this.state.events);

        

    }
    
    render() {
        return (
                <div className="results-container">
                    <Link to='/create-event'>
                        Create Event
                    </Link>
                    <div className="results-wrapper">
                        <ul>
                            {this.state.events.map(event => (
                                <div className="list-div" id={event.id} onClick={this.onFocus}>
                                    <h2>{event.eventName}</h2><h3> - {event.university}</h3> <br /> 
                                    {event.date} @ {event.time} ({event.length} hrs.)<br /> 
                                    {event.description}
                                    <button className="registerButton" onClick={this.registerForEvent}>RSVP</button>
                                </div>
                            ))}
                        </ul>
                    </div>                    
                </div>
            );
    }
}

export default EventsPage;