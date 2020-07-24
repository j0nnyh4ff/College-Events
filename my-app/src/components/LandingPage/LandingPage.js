import React from 'react';
import './LandingPage.css';
import People from './images/clip-1.png';
import backsplash from './images/pencils.jpg'; 
import firebase from 'firebase';

class LandingPage extends React.Component{

    componentWillMount() {
        console.log("componentWillMount called");
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                //Redirect user
                this.props.history.push('/dashboard');
            }
        })
    }

    render() {
    return(
        <div style={{margin: "0px", padding: "0px"}}>
            <div id="banner">
                <img id="backsplash" src={backsplash} alt=""/>
                <div id="landing-overlay">
                    <h1 id="landingTag">
                        Share why you love <br/>
                        <u>your school.</u>
                    </h1>

                    <p>
                        Join others in sharing what events are happening on campus. <br />
                        Find events on campuses close to you. <br />
                    </p>
                    <img id="humaaans" src={People} alt=""/>

                </div>
            </div>
        </div>
    );
    }
}

export default LandingPage;