import $ from "jquery";
import React, { Component, createRef } from "react";
import ReactDOM from 'react-dom';
import 'jquery-ui-sortable';

window.jQuery = $;
window.$ = $;

require('formBuilder');

const formData = [];

/* 
The order of the imports and requires is very important, especially in the online enviornment.
The two jQuery libraries must be imported using Node's require(), and not ES6 import.
Also, these two requires MUST come after setting the global jQuery and $ symbols.

In my Babel/Webpack project, the type and order of the imports is a little less sensitive.
For my project, the following alternative works:

    import $ from 'jquery';
    import React from 'react';
    import ReactDOM from 'react-dom';
    import 'jquery-ui-sortable';

    window.jQuery = $;
    window.$ = $;

    require('formBuilder');
*/

class FormBuilder extends Component {
    fb = createRef();
    componentDidMount() {
      $(this.fb.current).formBuilder({ formData });
    }
  
    render() {
      return <div id="fb-editor" ref={this.fb} />;
    }
  }
export default FormBuilder;

//ReactDOM.render(<FormBuilder />, document.getElementById("root"));  