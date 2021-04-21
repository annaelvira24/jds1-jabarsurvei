import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 

import LoginPage from "../views/LoginPage"

describe('Login Page', () => {
 
    it('has a form', () => {
        const component = ReactTestUtils.renderIntoDocument(<LoginPage/>);    
        var form = ReactTestUtils.findRenderedDOMComponentWithTag(
        component, 'form'
        );
    });
   
    it('is wrapped inside a login-form class', () => {
        const component = ReactTestUtils.renderIntoDocument(<LoginPage/>);    
        var node = ReactTestUtils.findRenderedDOMComponentWithClass(
        component, 'login-form'
        );
    });
  })

