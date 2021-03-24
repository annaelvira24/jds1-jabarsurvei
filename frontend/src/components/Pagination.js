import React, {Component, GetDerivedStateFromProps} from 'react'
import { Container, Pagination } from 'react-bootstrap'

class PaginationButton extends Component {
    constructor(props){
        super(props);
        
        this.state = {items: []}
    };

    static getDerivedStateFromProps(next, prev) {
        const margin = next.pageMargin || 1
        const currentPage = next.currentPage

        var items = []
        const beginBound = 1+margin
        const endBound = next.totalPage-margin

        if (next.totalPage > 0){
            if (endBound > beginBound) {
                for (var i = 1; i <= beginBound; i++){
                    items.push(
                        <Pagination.Item key={i} active={i === currentPage} onClick={(event) => {next.onPageClick(event)}}>
                            {i}
                        </Pagination.Item>
                    )
                }
                if (endBound > beginBound+1) items.push(<Pagination.Ellipsis></Pagination.Ellipsis>)
                for (var i = endBound; i <= next.totalPage; i++){
                    items.push(
                        <Pagination.Item key={i} active={i === currentPage} onClick={(event) => {next.onPageClick(event)}}>
                            {i}
                        </Pagination.Item>
                    )
                }
            } else {
                for (var i = 1; i <= next.totalPage; i++){
                    items.push(
                        <Pagination.Item key={i} active={i === currentPage} onClick={(event) => {next.onPageClick(event)}}>
                            {i}
                        </Pagination.Item>
                    )
                }
            }                        
        }
        return {...next, items}
    }

    render() {
        return (
            <Container>
                <Pagination>
                    <Pagination.Prev onClick={(event) => {this.props.onPageClick(event)}}></Pagination.Prev>
                    {this.state.items}
                    <Pagination.Next onClick={(event) => {this.props.onPageClick(event)}}></Pagination.Next>
                </Pagination>
            </Container>
        )
    }
} 

export default PaginationButton;