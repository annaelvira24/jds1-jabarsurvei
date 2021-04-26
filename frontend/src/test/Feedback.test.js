import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 

import Feedback from "../views/SubmitFeedback"

describe('Submit Feedback', () => {

    it('Header', () => {
        const component = ReactTestUtils.renderIntoDocument(<Feedback/>);    
        var thead = ReactTestUtils.findRenderedDOMComponentWithTag(
        component, 'h5'
        );
    });
    it('P loaded', () => {
        const component = ReactTestUtils.renderIntoDocument(<Feedback/>);    
        var thead = ReactTestUtils.scryRenderedDOMComponentsWithTag(
        component, 'p'
        );
    });
    it('Hyperlink loaded', () => {
        const component = ReactTestUtils.renderIntoDocument(<Feedback/>);    
        var thead = ReactTestUtils.scryRenderedDOMComponentsWithTag(
        component, 'a'
        );
    });
    it('Br loaded', () => {
        const component = ReactTestUtils.renderIntoDocument(<Feedback/>);    
        var thead = ReactTestUtils.scryRenderedDOMComponentsWithTag(
        component, 'br'
        );
    });
    

   
  })

