import React from 'react';
import Nav from './Nav';
import LandingPage from './LandingPage';
import SignUpForm from './SignUpForm';
import EventForm from './EventForm';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <Nav loggedIn={false} />
      <EventForm />
    </div>
  );
}

export default App;
