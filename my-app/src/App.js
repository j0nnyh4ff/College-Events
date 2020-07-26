import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import EventsPage from './components/EventsPage/EventsPage';
import LoginForm from './components/LogInForm/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import About from './components/About/About';
import Developers from './components/Developers/Developers';
import TermsPolicies from './components/TermsPolicies/TermsPolicies';
import createHistory from 'history/createBrowserHistory';
import ResetPasswordPage from './components/ResetPasswordPage/ResetPasswordPage';
import './App.css';

function App() {
  const history = createHistory();
  return (
    <Router history={history}>
      <div className="wrapper">
        <Nav onSuccess={() => {
          this.setState({ loggedIn: true });
          }} 
        />
        <Route path="/sign-up" exact component={SignUpPage} />
        <Route path="/" exact component={LandingPage} />
        <Route path="/events-page" exact component={EventsPage} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/reset-password" exact component={ResetPasswordPage} />
        <Route path="/about" exact component={About} />
        <Route path="/developers" exact component={Developers} />
        <Route path="/terms-policies" exact component={TermsPolicies} />
      </div>
    </Router>
  );
}

export default App;
