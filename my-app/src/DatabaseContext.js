import React, {useState, createContext} from 'react';
import * as firebase from 'firebase/app';
import "firebase/firestore";

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyBX_45hKNaSafp6qHO2RNupnxkM1yaua_E",
        authDomain: "schoolhouse-32d57.firebaseapp.com",
        databaseURL: "https://schoolhouse-32d57.firebaseio.com",
        projectId: "schoolhouse-32d57",
        storageBucket: "schoolhouse-32d57.appspot.com",
        messagingSenderId: "1024625488418",
        appId: "1:1024625488418:web:7493c12b6311e9e364d07b",
        measurementId: "G-TGE4PDSS3K"
    });

    const db = firebaseApp.firestore();


export {db};
