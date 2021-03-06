import { React, createRef, Component } from "react";
import { Row, InputGroup, FormControl, Button, Container, Form} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/Table_comp.css';

class Table_comp extends Component {
    constructor(props){
        super(props);
    }

    cellLink (cell, row){
        return (<div><a id="surveyLink" href={"/survey/"+row.randomlink}>{cell}</a></div>);
    }

    render(){
        return(
            <div className='Table-Container'>
                <Container className='Table2-Container'>
                    <Row className="SearchBar-Container">
                        <SearchBar on_search={ this.props.onSearch }/>
                    </Row>
                    <div className="table-container">
                        <div className="table-survey">
                            <BootstrapTable data={this.props.daftar_survey} striped hover>
                                <TableHeaderColumn isKey dataField="id_survey" width="5%">Id</TableHeaderColumn>
                                <TableHeaderColumn dataField='survey_title' dataFormat={this.cellLink} width="30%">Judul Survei</TableHeaderColumn>
                                <TableHeaderColumn dataField="username" width="15%">Pembuat Survei</TableHeaderColumn>
                                <TableHeaderColumn dataField='decription' width="50%">Deskripsi Survei</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
};

const SearchBar = ({on_search}) => {
    const searchRef = createRef();

    const search = (e) => {
        e.preventDefault()
        const query = searchRef.current.value
        on_search(query)
    }

    return (
        <Form id="searchbar-form" onSubmit={ search }>
            <InputGroup>
                    <FormControl id="searchBar" placeholder="Pencarian..." type="text" ref={ searchRef } />
                    <InputGroup.Append>
                        <Button className="t-blue" type="submit"><FontAwesomeIcon icon = {faSearch}/></Button>
                    </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}

export default Table_comp;