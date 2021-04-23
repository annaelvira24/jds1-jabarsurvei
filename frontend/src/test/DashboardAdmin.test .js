import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 

import DashboardAdmin from "../views/DashboardAdmin"

describe('Dashboard Admon', () => {

    it('Header1', () => {
        const component = ReactTestUtils.renderIntoDocument(<DashboardAdmin/>);    
        var thead = ReactTestUtils.findRenderedDOMComponentWithTag(
        component, 'h1'
        );
    });
    
    it('Header2', () => {
        const component = ReactTestUtils.renderIntoDocument(<DashboardAdmin/>);    
        var thead = ReactTestUtils.findRenderedDOMComponentWithTag(
        component, 'h1'
        );
    });

    it('Survey-Container loaded', () => {
        const component = ReactTestUtils.renderIntoDocument(<DashboardAdmin/>);    
        var node = ReactTestUtils.findRenderedDOMComponentWithClass(
        component, 'Survey-Container'
        );
    });

   
  })

