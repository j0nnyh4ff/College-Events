import React from 'react';
import {Redirect} from 'react-router-dom';
import EventsPage from '../EventsPage/EventsPage';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        //Redirects user if login status is true (passed from App.js)
        if(!this.props.loggedIn) {
            return (<Redirect to="/"/>);
        }        
        return (
            <div>
                <EventsPage />
            </div>
        );
    }
}

export default Dashboard;