import React from 'react';
import Nav from './Nav';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <Nav loggedIn={false}/>
      <LandingPage />
    </div>
  );
}

export default App;
