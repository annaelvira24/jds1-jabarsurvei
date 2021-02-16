import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';

function Question(props){
    return (
        <Container className="p-4 question w-100" id={"question-"+props.qno}>
            <Form.Control type="text" placeholder={"Question "+props.qno}/>
            <Form.Control type="text" placeholder="Short Answer"/>
        </Container>
    );
}

function Section(props){
    const [questions, setQuestions] = useState([<Question qno={1}/>]);

    const addQuestion = () => {
        setQuestions(questions.concat(<Question qno={ questions.length+1 }/>));
    }
    return (
        <Container className="my-3 py-4 border border-secondary rounded" id={"section-"+props.secno}>
            <Container className="pb-4">
                <Form.Control type="text" placeholder={"Section "+props.secno}/>
                <Form.Control as="textarea" rows={1} type="text" placeholder="Section description"/>
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
        <Container>
            <Form>
                <Container className="p-4 border border-secondary rounded">
                    <Form.Control type="text" placeholder="Title" size="lg" className="my-1"/>
                    <Form.Control as="textarea" rows={1} placeholder="Description" className="my-1"/>
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