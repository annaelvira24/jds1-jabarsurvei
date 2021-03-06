import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, Jumbotron } from 'react-bootstrap';
import './../assets/css/CreateSurvey.css';

function ShortAnswer() {
    return (
        <Form.Control id="form-survey" type="text" placeholder="Answer" />
    )
}

function LongAnswer() {
    return (
        <Form.Control id="form-survey" type="text" as="textarea" placeholder="Answer" />
    )
}

function MultipleChoice() {
    return (
        <h1>Choice</h1>
    )
}

function MultipleSelect() {
    return (
        <h1>Select</h1>
    )
}

function Question(props){
    const [qType, setQType] = useState("Short Answer");
    const [TagName, setTagName] = useState(ShortAnswer);

    const handleChange = (event) => {
        let val = event.target.value;
        setQType(qTypes[val].title);
        setTagName(qTypes[val].comp)
    };

    const qTypes = {
        "sa": {
            "title":"Short Answer",
            "comp":ShortAnswer
        },
        "la": {
            "title":"Long Answer",
            "comp":LongAnswer
        },
        "mc": {
            "title":"Multiple Choice",
            "comp":MultipleChoice
        },
        "ms": {
            "title":"Multiple Select",
            "comp":MultipleSelect
        }
    }

    return (
        <Container className="my-4 p-4 w-100 bg-white rounded box-shadow-container" id={"question-"+props.qno}>
            <Row>
                <Col>
                    <Form.Control id="form-survey" type="text" placeholder={"Question "+props.qno}/>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Control as="select" onChange={handleChange}>
                            <option value="sa">Short Answer</option>
                            <option value="la">Long Answer</option>
                            { /*<option value="mc">Multiple Choice</option>
                            <option value="ms">Multiple Select</option>*/ }
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            
            {TagName}
        </Container>
    );
}

function Section(props){
    const [questions, setQuestions] = useState([<Question qno={1}/>]);

    const addQuestion = () => {
        setQuestions(questions.concat(<Question qno={ questions.length+1 } secno={ props.secno } />));
    }
    return (
        <Container className="my-3 p-3 rounded box-shadow-container" id={"section-"+props.secno}>
            <Container  id = "box-shadow-survey">
                <Form.Control id="form-survey" type="text" placeholder={"Section "+props.secno} size="lg"/>
                <Form.Control id="form-survey" as="textarea" rows={1} type="text" placeholder="Section description"/>
            </Container>
            {questions}
            <Button type="button" variant="secondary" onClick={addQuestion}>+ Add Question</Button>
        </Container>
    )
}

function CreateSurvey(){
    const [sections, setSections] = useState([<Section secno={1}/>]);

    const addSection = () => {
        setSections(sections.concat(<Section secno={ sections.length+1 }/>));
    }
    return (
        <Container className="my-3 p-3">
            <Jumbotron className="bg-t-green text-white">
                <h3>Create Survey</h3>
            </Jumbotron>
            <Form>
                <Container className="p-4 rounded box-shadow-container">
                    <Form.Control id="form-survey" type="text" placeholder="Title" size="lg" className="my-1"/>
                    <Form.Control id="form-survey" as="textarea" rows={1} placeholder="Description" className="my-1"/>
                </Container>
                { sections }
                <Button type="button" variant="secondary" onClick={ addSection }>+ Add Section</Button>
            </Form>
            <Row className="justify-content-center mt-2">
                <Row className="justify-content-between">
                    <Button type="button" className="mx-1">Save</Button>
                    <Button type="button" className="mx-1">Generate Link</Button>
                </Row> 
            </Row>
        </Container>
    );
}

export default CreateSurvey;