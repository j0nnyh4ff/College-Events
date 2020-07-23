import React from 'react';
import './SignUpPage.css';
import SignUpForm from '../SignUpForm/SignUpForm';
import SideImage from '../SignUpForm/images/create-account-img.png';

function SignUpPage() {

    return(

        <div id="modal" className="signUpModal">        
            <div id="modalContent" className="modalContent">
            <div style={{textAlign: "center"}}><h1 id="formTitle">Create an Account</h1></div>
            
                <SignUpForm/>
            
            </div>    
        </div>
    );
}

export default SignUpPage;