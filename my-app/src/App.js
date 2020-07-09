import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import SignUpForm from './components/SignUpForm/SignUpForm';
import EventForm from './components/EventForm/EventForm';
import EventsPage from './components/EventsPage/EventsPage';
import LoginForm from './components/LogInForm/LoginForm';
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
