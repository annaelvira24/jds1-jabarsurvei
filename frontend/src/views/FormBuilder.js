import $ from "jquery";
import React, { Component, createRef } from "react";
import ReactDOM from 'react-dom';
import 'jquery-ui-sortable';

window.jQuery = $;
window.$ = $;

require('formBuilder');
require('formBuilder/dist/form-render.min.js');

const formData = [];

/* fbOptions = {
      onSave: function() {
        $fbEditor.toggle();
        $formContainer.toggle();
        $('form', $formContainer).formRender({
          formData: formBuilder.formData
        });
      }
    } */
class FormBuilder extends Component {
    fbBuilder = createRef();
    fbBuilderWrapper = createRef();
    fbRender = createRef();
    fbRenderWrapper = createRef();
    
    componentDidMount() {
      $(this.fbBuilder.current).formBuilder({ formData , disabledActionButtons: ['data','clear','save']});
      $(this.fbRenderWrapper.current).toggle();
      $(this.fbRender.current).formRender({
      dataType: 'json',
      formData: $(this.fbBuilder.current).formBuilder('getData', 'json')
      });
    }
    handlePreviewEdit() {
      $(this.fbBuilderWrapper.current).toggle();
      $(this.fbRenderWrapper.current).toggle();
      $(this.fbRender.current).formRender({
      dataType: 'json',
      formData: $(this.fbBuilder.current).formBuilder('getData', 'json')
      });
    }
    handleClearBuilder() {
     $(this.fbBuilder.current).formBuilder('clearFields')
    }
    
    render() {
      return(
        <div>
          <div id="fb-editor-form" ref={this.fbBuilderWrapper}>
            <div id="fb-editor" ref={this.fbBuilder}>

            </div>
            <button id="render" onClick={this.handleClearBuilder.bind(this)}>Bersihkan</button>
            <button id="clear" onClick={this.handlePreviewEdit.bind(this)}>Tampilan</button>
          </div>
          <div id="fb-rendered-form" ref={this.fbRenderWrapper}>
            <div id="fb-rendered" ref={this.fbRender}>

            </div>
            <button id="render" onClick={this.handlePreviewEdit.bind(this)}>Edit kembali</button>
            <button id="render" onClick={this.handlePreviewEdit.bind(this)}>Simpan (WIP)</button>
          </div>
        </div>
      );
    }
  }
export default FormBuilder;
