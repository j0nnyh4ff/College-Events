import React from 'react';
import Bell from './images/bell.png';
import SearchBar from './SearchBar';
import './Nav.css';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.loggedIn = props.loggedIn;
    }

    render() {
        //If user is not logged in
        if (!this.loggedIn) {
        return(
            <div id="container">
                <style> {/*Importing Open Sans*/}
                    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
                </style> 

                <div id="logoDiv">
                    <h1 id="logo">Schoolhouse</h1>
                    <img id="bell" src={Bell} alt="Bell"/>
                </div>

                <span>
                    <div id="searchContainer">
                        <SearchBar id="searchBar"/> 
                    </div>
                </span>

                <span id="buttons">
                    <button id="login">Log in</button>
                    <button id="signUp">Sign Up</button>
                </span>
            </div>
        );
    }   //User is logged in
        else {
            return(
            <div>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Search</a>
            </div>
        );
        }

    }
}

export default Nav;