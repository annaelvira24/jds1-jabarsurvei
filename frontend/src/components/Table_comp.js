import { Table, Row,FormControl,Button, Container, Form} from 'react-bootstrap';
import { useState } from "react";
import React from 'react';
import '../assets/css/Table_comp.css';
import { useHistory } from "react-router-dom";


const Table_comp = ({ daftar_survey, daftar_coloumn }) => {

    const history = useHistory();

    const routeChange = () =>{ 
        let path = `newPath`; 
        history.push(path);
    };



    return(
        <div className='Table-Container'>
            <Container>
                <Row className="SearchBar-Container">
                    <Form inline>
                        {/* <Form.Control size="sm" type="text" placeholder="Search" /> */}
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button type="submit">Search</Button>
                    </Form>
                </Row>
                <Table hover size="sm" className="List-Table">
                    <thead>
                        <tr>
                        {daftar_coloumn.map((coloumn) => (
                                <th>{coloumn.text}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {daftar_survey.map((survey) => (
                            <tr onClick={routeChange}>
                                <td>{survey.id}</td>
                                <td>{survey.judul}</td>
                                <td>{survey.maker}</td>
                            </tr>
                    ))}
                    </tbody>
                </Table>      
            </Container>
        </div>
        );
  };

export default Table_comp;