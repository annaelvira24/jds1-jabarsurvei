import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 

import Footer from "../components/Footer"

describe('Footer Component', () => {

    it('it wrapped inside footer-container class', () => {
        const component = ReactTestUtils.renderIntoDocument(<Footer/>);    
        var footer = ReactTestUtils.findRenderedDOMComponentWithClass(
        component, 'footer-container'
        );
    });
 })

