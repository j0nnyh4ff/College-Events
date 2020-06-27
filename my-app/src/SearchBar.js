import React, {useState} from 'react';
import SearchIcon from './images/magnifying-glass.png';
import SearchIconFocus from './images/magnifying-glass-focus.png';
import './SearchBar.css';

function SearchBar() {
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
    }

    function handleBlur(event) {
        document.getElementById('searchIcon').src = SearchIcon;
    }

    //handleSearch()

    return(
        <div id="container">
            <input type="image" id="searchIcon" alt="Search" src={SearchIcon}
            />
            
            <input type="text" id="searchBar" 
            value={state.query} 
            onChange={handleChange} onClick={handleFocus} onBlur={handleBlur}/>
        </div>
    );
}

export default SearchBar;