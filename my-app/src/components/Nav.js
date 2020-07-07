import React from 'react';
import {Link} from 'react-router-dom';
import Bell from './images/bell.png';
import SearchBar from './SearchBar';
import './styles/Nav.css';

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
                    <Link to="/" id="Logo">
                        <img id="bell" src={Bell} />
                    </Link>
                </div>

                <span>
                    <div id="searchContainer">
                        <SearchBar id="searchBar"/> 
                    </div>
                </span>

                <span id="buttons">
                    <Link to="/login" id="login">
                        Log in
                    </Link>                    
                    
                    <Link to="/sign-up" id="signUp">
                        Sign Up
                    </Link>
                    
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