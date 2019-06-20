import React from 'react';
import { Redirect } from 'react-router-dom';

// COMPONENTS
import { Row } from '../layout/row';
import { Column } from '../layout/column';
import { Avatar } from '../graphics/avatar';
import { CSSTransition } from "react-transition-group";

export class MessageTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showMessage: false
        };
        this.textStyle = {
            textAlign: 'start'
        };
    }

    componentDidMount() {
        this.setState({
            showMessage: true
        });
    }
    componentDidUpdate(){
        if (this.state.showMessage) {
            this.props.updated();
        }
    }

    render() {

        if (this.state.user) {
            return <Redirect to={`/other-user/${this.state.user}`} />;
        } else {
            const message = this.props.message;
            return (
                <CSSTransition
                    key={message.user_id}
                    in={this.state.showMessage}
                    timeout={{ enter: 300, exit: 300 }}
                    classNames="scale"
                    onExited={() => this.renderNext(history)}
                    unmountOnExit>
                    <Row 
                        minHeight={'80px'}
                        padding='20px'>
                        <Avatar
                            imageUrl={message.pic_url}
                            boxShadow='5px 5px 10px -5px rgba(0,0,0,0.75)'
                            height='60px'
                            width='60px'
                            onClick={() => this.setState({
                                user: message.user_id
                            })} />

                        <Column
                            borderRadius='20px'
                            padding='20px 30px'
                            placeContent={'start start'}
                            alignItems={'start'}
                            boxShadow='5px 5px 10px -5px rgba(0,0,0,0.75)'>
                            <Row
                                width='calc(100% - 60px)'
                                placeContent='center flex-start'
                            > 
                                <h3 style={{ textAlign: 'start' }}>{message.name || message.first}</h3> 
                                <h5 style={{margin:'0px 20px'}}>{new Date(message.created_at).toLocaleString()}</h5>
                            </Row>
                            <p>{message.message} </p>
                        </Column>
                    </Row>
                </CSSTransition>
            );
        }
    }
}