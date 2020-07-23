import React from 'react';
import EventsPage from '../EventsPage/EventsPage';

function HomePage() {
    localStorage.setItem('loginStatus', 'true');
    return (
        <div>
            <EventsPage />
        </div>
    );
}

export default HomePage;