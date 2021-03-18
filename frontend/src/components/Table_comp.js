import { Table, Row, FormControl, Button, Container, Form} from 'react-bootstrap';
import { createRef, useState } from "react";
import React from 'react';
import '../assets/css/Table_comp.css';
import { useHistory, useRef } from "react-router-dom";


const Table_comp = ({ daftar_survey, daftar_coloumn, onSearch }) => {
    const history = useHistory();

    const routeChange = () =>{ 
        let path = `newPath`; 
        history.push(path);
    };

    return(
        <div className='Table-Container'>
            <Container className='Table2-Container'>
                <Row className="SearchBar-Container">
                    <SearchBar on_search={ onSearch }/>
                </Row>
                <Table striped hover size="sm" className="List-Table">
                    <thead >
                        <tr >
                        {daftar_coloumn.map((coloumn) => (
                                <th className = 'table-header'>{coloumn.text}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {daftar_survey.map((survey) => (
                            <tr onClick={routeChange}>
                                <td>{survey.id_survey}</td>
                                <td>{survey.survey_title}</td>
                                <td>{survey.username}</td>
                                <td>{survey.decription}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>      
            </Container>
        </div>
        );
  };

const SearchBar = ({on_search}) => {
    const searchRef = createRef();

    const search = (e) => {
        e.preventDefault()
        const query = searchRef.current.value
        console.log(query)
        on_search(query)
    }

    return (
        <Form inline onSubmit={ search }>
            {/* <Form.Control size="sm" type="text" placeholder="Search" /> */}
            <FormControl type="text" className="mr-sm-2" ref={ searchRef } />
            <Button type="submit">Cari</Button>
        </Form>
    )
}

export default Table_comp;