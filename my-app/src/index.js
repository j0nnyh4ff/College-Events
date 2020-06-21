import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';
import "firebase/firestore";

import Nav from './Nav';
import SignUpForm from './SignUpForm';

const firebaseConfig = {
  apiKey: "AIzaSyBX_45hKNaSafp6qHO2RNupnxkM1yaua_E",
  authDomain: "schoolhouse-32d57.firebaseapp.com",
  databaseURL: "https://schoolhouse-32d57.firebaseio.com",
  projectId: "schoolhouse-32d57",
  storageBucket: "schoolhouse-32d57.appspot.com",
  messagingSenderId: "1024625488418",
  appId: "1:1024625488418:web:7493c12b6311e9e364d07b",
  measurementId: "G-TGE4PDSS3K"
};

firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <SignUpForm />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
