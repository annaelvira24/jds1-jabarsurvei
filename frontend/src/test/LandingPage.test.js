import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 

import LandingPage from "../views/LandingPage"

describe('Landing Page', () => {

    it('Upper-header contain Carausel_dash', () => {
        const component = ReactTestUtils.renderIntoDocument(<LandingPage/>);    
        var node = ReactTestUtils.findRenderedDOMComponentWithClass(
        component, 'Upper-header'
        );
    });

    it('Addition-header loaded', () => {
        const component = ReactTestUtils.renderIntoDocument(<LandingPage/>);    
        var node = ReactTestUtils.findRenderedDOMComponentWithClass(
        component, 'Addition-header'
        );
    });
    it('Loaded Survey-Container', () => {
        const component = ReactTestUtils.renderIntoDocument(<LandingPage/>);    
        var node = ReactTestUtils.findRenderedDOMComponentWithClass(
        component, 'Survey-Container'
        );
    });
   
  })

