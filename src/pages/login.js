import React from 'react';
import axios from '../react_utils/axios';
import db from '../react_utils/ids';
import routes from '../react_utils/react_routes';

// Components
import { TextField } from '../components/inputs/textfield';
import { CenteredColumn } from '../components/layout/centered_column';
import { ErrorMessage } from '../components/text/error_message';
import { Link } from 'react-router-dom';

export class Login extends React.Component{

    constructor (props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    render(){
        return (
            <React.Fragment>
                {this.state.error && <ErrorMessage>{this.state.error}</ErrorMessage>}
                <CenteredColumn>
                    <TextField inputType="email" label="Email" id={db.email} handleChange={this.handleChange} required/>
                    <TextField inputType="password" label="Password" id={db.password} handleChange={this.handleChange} required/>
                    <button onClick={() => this.submit()}>Login</button>
                </CenteredColumn>
                <Link className='link-button' to={routes.home}>Click here to sign up!</Link>
            </React.Fragment>
        );
    }

    handleChange({ target }) {
        console.log('Handling text change with name: ', target.name, ' with Value: ', target.value );
        this.setState({
            [target.name]: target.value
        });
    }

    
    submit(){
        console.log('Login button pressed');
        console.log(this.state);
        axios.post(routes.login, {
            email: this.state.email,
            password: this.state.password,
        }).then((response) => {
            console.log('The Login got a response of', response);
            if (response.data.error){
                console.log('Logging Error');
                this.setState({
                    error: response.data.error,
                });
            } else {
                location.replace('/');
            }
        }).catch((e) =>{
            console.log('The error came from the Axios call: ', e);
            console.log('This in catch is :', this);
            this.setState({
                error: 'There was an Error from the server. Check your details.'
            });
        });
    }
}