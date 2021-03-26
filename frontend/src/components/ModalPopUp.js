import { React, useState, Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../assets/css/Table_comp.css';

class ModalPopUp extends Component{
    constructor(props, context){
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false
        }
    }

    handleCopy(e, link){
        e.preventDefault();
        navigator.clipboard.writeText(link);
    };

    handleShow(){
        this.setState({ show: true })
    };

    handleClose(){
        this.setState({ show: false })
        // window.location.reload(false);
    };

    render(){
        return(
            <Modal centered show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modalHeading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.link}</Modal.Body>
                <Modal.Footer>
                    <button variant="success" onClick={(e) => this.handleCopy(e, this.props.link)}>
                        Salin Link
                    </button>
                    <button variant="success" onClick={this.handleClose}>
                        Tutup
                    </button>
                </Modal.Footer>
            </Modal>
        );
    };
};

export default ModalPopUp;
