import React from 'react';
import './App.css';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.className = props.className;
        //Array of objects with an abbreviation and link url
        this.navLinks = props.navLinks.map(nav => (
                        <a href={nav.url} className='link'>{nav.text}</a>));
    }
    render() {
        return(
            <div className={this.className}>
                {this.navLinks}
            </div>
        );
    }
}

export default Nav;