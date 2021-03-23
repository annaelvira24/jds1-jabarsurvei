import { Table, Row, FormControl, Button, Container, Form} from 'react-bootstrap';
import { createRef, useState } from "react";
import React from 'react';
import '../assets/css/Table_comp.css';
import { useHistory, useRef } from "react-router-dom";


const Table_admin = ({ daftar_survey, daftar_coloumn, onSearch }) => {

    const history = useHistory();

    const routeChange = () =>{ 
        let path = `newPath`; 
        history.push(path);
    };

    const handleGenLink = (e, idSurvey) =>{
        e.preventDefault();
        console.log(idSurvey);
    };

    return(
        <div className='Table-Container'>
            <Container className='Table2-Container'>
                <Row className="SearchBar-Container">
                    <SearchBar on_search={ onSearch }/>
                </Row>
                <Table striped responsive="sm" hover size="sm" className="List-Table">
                        <thead>
                            <tr style = {{width: '100px'}}>
                            {daftar_coloumn.map((coloumn) => (
                                <th className = 'table-header'>{coloumn.text}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                            {daftar_survey.map((survey, index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td onClick={routeChange}>{survey.survey_title}</td>
                                    <td>{survey.decription}</td>
                                    {(survey.randomLink !== null)
                                        && (<td><button className = "btn btn-primary btn-sm" >Lihat Link</button></td>
                                    )}
                                    {(survey.randomLink == null)
                                        && (<td><button className = "btn btn-primary btn-sm" onClick = {(e) => handleGenLink(e,survey.id_survey)}>Buat Link</button></td>
                                    )}

                                    <td><button className = "btn btn-primary btn-sm" onClick = "handleGenLink">Edit</button></td>
                                    <td><button className = "btn btn-danger btn-sm">Hapus</button></td>
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
        e.preventDefault();
        const query = searchRef.current.value;
        console.log(query);
        on_search(query);
    }

    return (
        <Form inline onSubmit={ search }>
            {/* <Form.Control size="sm" type="text" placeholder="Search" /> */}
            <FormControl placeholder = "Pencarian" type="text" className="mr-sm-2" ref={ searchRef } />
            <Button type="submit">Cari</Button>
        </Form>
    )
};

export default Table_admin;