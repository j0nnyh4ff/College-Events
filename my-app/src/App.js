import React from 'react';
import { DatabaseContext } from './DatabaseContext';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    
    <div className="App">
      <DatabaseContext.Provider>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </DatabaseContext.Provider>
    </div>
  );
}

export default App;
