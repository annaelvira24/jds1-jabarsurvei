import { faCheck, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import "./../assets/css/SubmitFeedback.css";

class SubmitFeedback extends Component {
    state = {
        prevLink: undefined
    }

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        window.location.href = "/";
    }

    componentDidMount() {
        if (this.props.match)
            this.state.prevLink = this.props.match.params.link
    }

    render(){
        return (
            <div id="feedback-container">
                <Container id="feedback-box">
                    <Row id="feedback-message">
                        <Col sm="auto">
                            <FontAwesomeIcon color="#5AAB4E" size='9x' icon={faCheck}></FontAwesomeIcon>
                        </Col>
                        <Col sm={7} id="feedback-text">
                            <h1>Jawaban Anda sudah terkirim!</h1>
                        </Col>
                    </Row>
                    <Row id="feedback-button">
                        <Button className="t-green" onClick={this.handleClick}>Kembali ke beranda</Button>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default SubmitFeedback;