import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 

import ResultSummary from "../views/SubmitResultSummary"

describe('ResultSummary', () => {

    it('Header', () => {
        const component = ReactTestUtils.renderIntoDocument(<ResultSummary/>);    
        var thead = ReactTestUtils.findRenderedDOMComponentWithClass(
        component, 'h5'
        );
    });
    it('Header', () => {
        const component = ReactTestUtils.renderIntoDocument(<ResultSummary/>);    
        var thead = ReactTestUtils.scryRenderedDOMComponentsWithTag(
        component, 'buttons'
        );
    });
    

   
  })

