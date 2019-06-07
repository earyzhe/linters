import React from 'react';

export class Column extends React.Component{

    constructor (props) {
        super(props);
        this.style = {
            padding: props.padding,
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: props.alignItems || 'center',
            alignSelf: props.alignSelf || 'center',
            flexWrap: 'wrap',
            alignContent: props.alignContent || 'center',
            width: props.width
        };
    }
    
    render(){
        return (
            <div style={this.style}>
                {this.props.children}
            </div>
        );
    }
}
