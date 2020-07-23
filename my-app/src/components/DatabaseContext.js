
import * as firebase from 'firebase/app';
import "firebase/firestore";

const firebaseApp = firebase.initializeApp(
    {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: "schoolhouse-32d57",
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
        appId: process.env.REACT_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID
    });

    const db = firebaseApp.firestore();
    
    


export {db, firebaseApp};

