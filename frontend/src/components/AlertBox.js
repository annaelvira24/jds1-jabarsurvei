import { React, Component } from 'react';
import { Alert } from 'react-bootstrap';

class AlertBox extends Component{
    constructor(props, context){
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false
        }
    }

    handleShow(){
        this.setState({ show: true })
    };

    handleClose(){
        this.setState({ show: false });
    };

    render(){
        return(
            <Alert show = {this.state.show} variant="danger" onClose={() => this.handleClose()} dismissible>
                {this.props.text}
            </Alert>
        );
    };
};

export default AlertBox;
