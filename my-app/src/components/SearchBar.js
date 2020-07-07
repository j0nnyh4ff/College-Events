import React, {useState} from 'react';
import {db} from './DatabaseContext';
import SearchIcon from './images/magnifying-glass.png';
import SearchIconFocus from './images/magnifying-glass-focus.png';
import './styles/SearchBar.css';

function SearchBar() {
    const usersRef = db.collection('users');
    const eventsRef = db.collection('events');
    const universityRef = db.collection('universities');

    const [state, setState] = useState({
        query: '\t Search events, tags, users, and universities...'
    });
    let unchanged = '\t Search events, tags, users, and universities...';
    
    function handleChange(event) {
        if (state.query === unchanged) {
            setState({query: '\t '});
        }
        else {
        setState({query: event.target.value}); 
        }  
        event.preventDefault(); 
    }

    function handleFocus(event) {
        document.getElementById('searchIcon').src = SearchIconFocus;
        if (state.query === unchanged) {
            setState({query: "\t "});
        }
        else {
            return;
        }
    }

    function handleBlur(event) {
        document.getElementById('searchIcon').src = SearchIcon;
        if (state.query.trim()) {
            return;
        }
        setState({query: unchanged});
    }

    function handleSearch(event) {
        if (state.query) {
            const query = state.query.split(" ");
            //Render search results page, props pass a list of results
        }
        else {
            alert("Alert");
        }
        
    }

    return(
        <div id="search-container">
            <input type="image" id="searchIcon" alt="Search" src={SearchIcon} onClick={handleSearch}/>
            
            <input type="text" id="searchBar" 
            value={state.query} 
            onChange={handleChange} onClick={handleFocus} onBlur={handleBlur}/>
        </div>
    );
}

export default SearchBar;