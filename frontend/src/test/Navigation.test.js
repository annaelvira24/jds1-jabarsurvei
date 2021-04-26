import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 

import Navigation from "../components/Navigation"

describe('Navigation Component', () => {

    it('has a Nav Tag', () => {
        const component = ReactTestUtils.renderIntoDocument(<Navigation/>);    
        var navbar = ReactTestUtils.findRenderedDOMComponentWithTag(
        component, 'Nav'
        );
    });

    it('has an img navbar brand', () => {
        const component = ReactTestUtils.renderIntoDocument(<Navigation/>);    
        var navbar = ReactTestUtils.findRenderedDOMComponentWithTag(
        component, 'img'
        );
    });
 })

