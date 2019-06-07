import React from 'react';
import { Row } from '../components/layout/row';
import { Avatar } from '../components/graphics/avatar';
import { CenteredColumn } from '../components/layout/centered_column';
import axios from '../react_utils/axios';
import { UserProfile } from '../data/user_profile';
import { ErrorMessage } from '../components/text/error_message';
import { CSSTransition } from "react-transition-group";



export class OtherProfile extends React.Component{

    constructor (props) {
        super(props);
        this.state = { 
            erro: null,
            user: {
                imageUrl: "/assets/images/nerd-avatar.png"
            }
        };
    }

    render(){
        console.log('Rendering OtherProfile with this', this);
        return (
            <React.Fragment>

                <CSSTransition in={this.state.error} timeout={300} classNames="scale" unmountOnExit>
                    <ErrorMessage>{this.state.error}</ErrorMessage>
                </CSSTransition>

                <Row padding={'20px'}>
                    <Avatar
                        height ='300px'
                        width = '300px'
                        imageUrl={this.state.user.imageUrl ||  '/assets/images/nerd-avatar.png'}
                        description="User image"
                    />
                    <CenteredColumn padding={'20px'}>
                        <h2>{`${this.state.user.first || ' '}`}</h2>   

                        <CenteredColumn padding={'20px'}>
                            <p>{`${this.state.user.bio || ' '}`}</p>
                        </CenteredColumn>
                    </CenteredColumn>
                </Row>
            </React.Fragment>

        );
    }

    componentDidMount(){
        // Browser router adds match pramas id to props.
        const userId = this.props.match.params.id;
        console.log("The userId to get other Profile is", userId);

        try {
            axios.post('/api/user', {
                id: userId
            } ).then(res => {
                console.log('The response in Other Profile from component did mount', res);

                if (res.data.currentUser){
                    this.props.history.push("/");
                } else if (!res.data.first) {
                    this.setState({
                        error: "No Such User!"
                    });
                } else {
                    const userProfile =  new UserProfile(res.data);
                    console.log(' The user profile create from the response is', userProfile);
                    this.setState({
                        user: userProfile
                    });
                }
            });
        } catch (e) {
            this.setState({
                error: "Error from the database"
            });
        }
    }
}