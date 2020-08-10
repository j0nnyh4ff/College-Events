import React from 'react';
import LoginForm from '../LogInForm/LoginForm';
import './LandingPage.css';
import People from './images/clip-1.png';
import desktopBacksplash from './images/studentsPage.png';
import mobileBacksplash from './images/graduation.png'; 
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { Redirect, Link } from 'react-router-dom';

class LandingPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        };
    }

    displayModal = (event) => {        
        let modal = document.getElementById("mobile-modal");

        if (this.state.modalOpen) {
            this.setState({modalOpen: false});
            modal.style.visibility = "hidden";
            modal.style.height = "0px";
        } else {
            this.setState({modalOpen: true});
            modal.style.visibility = "visible";
            modal.style.height = "80vh";
        }     
    }

    render() {
        //Redirects user if login status is true (passed from App.js)
        if(this.props.loggedIn) {
            return (<Redirect to="/dashboard"/>);
        }

        return(
                <div id="banner">
                    <img id="desktop-backsplash" src={desktopBacksplash} />
                    <img id="mobile-backsplash" src={mobileBacksplash} />
                    

                    <div id="desktop-message-overlay">                        
                        <h1 id="title-tag">Share why you love <u>your school.</u></h1> <br/>                        
                       <div style={{padding: "24px"}}>
                            Join others in sharing what events are <br/> happening on <u>your campus</u> <br />
                            and find events on campuses <u>close to you.</u> <br />
                        </div>
                    </div>
                    
                    
                    <div id="mobile-message-overlay">
                        <FontAwesomeIcon id="schoolhouseIcon" icon={faSchool} />
                        <h1 id="title-tag">Schoolhouse</h1> 

                            Share why you love <u>your school.</u> <br />                               
                        
                            Join others in sharing what events are <br/> happening on <u>your campus</u> <br />
                            and find events on campuses <u>close to you.</u> <br />
                        <div id="buttonDiv"></div>
                            <div id="logInDiv" onClick={this.displayModal}>Log In</div>
                            <div id="signUpDiv"><center><Link to="/sign-up" id="signUpLink">Sign Up</Link></center></div>
                        
                        <img id="humaaans" src={People} alt=""/>
                    </div>

                    <div id="mobile-modal" className="mobile-modal">
                        <div id="modalContent" className="mobile-modal-content">
                            <span id="exit" onClick={this.displayModal}>X&emsp;</span>
                            <LoginForm  displayModalFunc={this.displayModal}/>
                        </div>    
                    </div>

                    

                </div>
            
        );
    }
}

export default LandingPage;