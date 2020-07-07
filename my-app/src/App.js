import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav';
import LandingPage from './components/LandingPage';
import SignUpForm from './components/SignUpForm';
import EventForm from './components/EventForm';
import EventsPage from './components/EventsPage';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Nav loggedIn={false} />
        <Route path="/sign-up" exact component={SignUpForm} />
        <Route path="/" exact component={LandingPage} />
        <Route path="/events-page" exact component={EventsPage} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/create-event" exact component={EventForm} />

        


      </div>
    </Router>
  );
}

export default App;
