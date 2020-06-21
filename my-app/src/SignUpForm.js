import React from 'react';
import './SignUpForm.css';
const { remoteConfig } = require("firebase");

export class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        //Methods
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);

        this.fields = [
            {field: 'First Name', value: 'First Name'},
            {field: 'Last Name', value: 'Last Name'},
            {field: 'Email', value: 'Email'},
            {field: 'Username', value: 'Username'},
            {field: 'Password', value: 'Password'}];
        this.state = this.fields.map(f => (
            <input type="text" value={f.value} onChange={this.handleChange} />
        ));    
    }

    handleChange(event) {
        this.setState.field({value: event.target.value});
        event.preventDefault();
    }


    render() {
        return (            
            <div className="container">
                <form>
                    {this.state}
                    <input type="submit" value="Click me" />
                </form>
            </div>
        );
    }
};

export default SignUpForm;
