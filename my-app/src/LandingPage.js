import React from 'react';
import './LandingPage.css';
import Humaaans from './images/humaaans.png';
import backsplash from './images/schoolhouse-splash.png';

function LandingPage() {
    return(
        <div>
            {/*<div id="truth">Black Lives Matter</div>*/}
            <div id="banner">
                <h1>
                    Share why you love <br/>
                    <u>your school.</u>
                </h1>

                <img id="humaaans" src={Humaaans} alt="image"/>

                <p>
                    Join others in sharing what events are happening on campus. <br />
                    Find events on campuses close to you. <br />
                </p>

                <h2>Check what's trending: </h2>
                <h3>#tag</h3>
                <h3>#tag</h3>
                <h3>#tag</h3>
            </div>
        </div>
    );
}

export default LandingPage;