import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 

import RegisterPage from "../views/RegisterPage"

describe('Register Page', () => {
 
    it('has a form', () => {
        const component = ReactTestUtils.renderIntoDocument(<RegisterPage/>);    
        var form = ReactTestUtils.findRenderedDOMComponentWithTag(
        component, 'form'
        );
    });
   
    it('is wrapped inside a register-form class', () => {
        const component = ReactTestUtils.renderIntoDocument(<RegisterPage/>);    
        var node = ReactTestUtils.findRenderedDOMComponentWithClass(
        component, 'register-form'
        );
    });

    it('is a register button', () => {
        const component = ReactTestUtils.renderIntoDocument(<RegisterPage/>);    
        var node = ReactTestUtils.findRenderedDOMComponentWithTag(
        component, 'Button'
        );
    });

  })

