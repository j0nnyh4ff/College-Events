import React from 'react';
import './styles/LandingPage.css';
import People from './images/clip-1.png';
import backsplash from './images/pencils.jpg';

function LandingPage() {
    return(
        <div>
            <div id="banner">
                <img id="backsplash" src={backsplash} />
                <div id="landing-overlay">
                    <h1>
                        Share why you love <br/>
                        <u>your school.</u>
                    </h1>

                    <p>
                        Join others in sharing what events are happening on campus. <br />
                        Find events on campuses close to you. <br />
                    </p>
                    <img id="humaaans" src={People} />

                </div>
                

                

                <h2>Check what's trending: </h2>
                <h3>#tag</h3>
                <h3>#tag</h3>
                <h3>#tag</h3>
            </div>
        </div>
    );
}

export default LandingPage;