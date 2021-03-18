import $ from "jquery";
import autosize from 'autosize';
import React, { Component, createRef } from "react";
import http from "../http-common";
import { getUser } from './../util/Common.js';
import 'jquery-ui-sortable';
import './../assets/scss/FormBuilder.scss'

window.jQuery = $;
window.$ = $;

require('formBuilder');
require('formBuilder/dist/form-render.min.js');

var formDataTemp = [];

class FormBuilder extends Component {
    fbBuilder = createRef();
    fbBuilderWrapper = createRef();
    fbRender = createRef();
    fbRenderWrapper = createRef();

    state = {
      cookie: undefined,
      idSurvey : undefined,
      idAdmin : undefined
    }

    constructor(){
      super();
      this.state.cookie = getUser();
      this.state.idAdmin = JSON.parse(atob(this.state.cookie))[0].id_admin;
      this.handleSaveForm = this.handleSaveForm.bind(this);
    }
    
    componentDidMount() {
      const textArea = document.getElementsByTagName('textarea');
      autosize(textArea);

      if (this.props.match)
        this.state.idSurvey = this.props.match.params.id;

      // edit existing survey
      if(this.state.idSurvey !== undefined){
        http.get('http://localhost:5000/api/fBuilder/findById/' + this.state.idSurvey)
        .then(res => {
          for (var i = 0; i<res.data.length; i++){
            formDataTemp.push(JSON.parse(res.data[i].details));
          }
        });
      }
 
      $(this.fbBuilder.current).formBuilder({
        formData: formDataTemp,
        disabledActionButtons: ['clear','save'], 
        disableFields: ['autocomplete','button', 'hidden'],
        disabledAttrs: ['name', 'access', 'className', 'value', 'maxlength', 'step', 'placeholder', 'subtype', 'rows'],
        i18n: {
          override: {
            'en-US': {
              addOption: 'Tambah Opsi +',
              allFieldsRemoved: 'All fields were removed.',
              allowMultipleFiles: 'Perbolehkan pengguna untuk upload banyak file',
              autocomplete: 'Autocomplete',
              button: 'Tombol',
              cannotBeEmpty: 'Tidak boleh kosong',
              checkboxGroup: 'Checkboxes',
              className: 'Class',
              clearAllMessage: 'Are you sure you want to clear all fields?',
              clear: 'Hapus semua',
              close: 'Tutup',
              content: 'Konten',
              copy: 'Salin',
              copyButton: '&#43;',
              copyButtonTooltip: 'Salin',
              dateField: 'Tanggal',
              description: 'Teks Bantuan',
              descriptionField: 'Deskripsi',
              devMode: 'Mode Pengembang',
              editNames: 'Edit Names',
              editorTitle: 'Form Elements',
              editXML: 'Edit XML',
              enableOther: 'Opsi Lainnya',
              enableOtherMsg: 'Perbolehkan pengguna untuk mengisi opsi yang tidak terdaftar',
              fieldNonEditable: 'Field ini tidak bisa di-edit.',
              fieldRemoveWarning: 'Are you sure you want to remove this field?',
              fileUpload: 'Upload File',
              formUpdated: 'Form Diperbaharui',
              getStarted: 'Tarik field dari kanan ke area ini',
              header: 'Header',
              hide: 'Edit',
              hidden: 'Input Tersembunyi',
              inline: 'Inline',
              inlineDesc: 'Tampilkan {type} inline',
              label: 'Pertanyaan',
              labelEmpty: 'Field Label cannot be empty',
              limitRole: 'Batasi akses ke satu atau lebih dari role berikut:',
              mandatory: 'Wajib',
              maxlength: 'Panjang Maksimum',
              min : "Angka Minimum",
              max : "Angka Maksimum",
              minOptionMessage: 'Dibutuhkan setidaknya 2 opsi',
              multipleFiles: 'File Jamak',
              name: 'Nama',
              no: 'Tidak',
              noFieldsToClear: 'Tidak ada field untuk dibersihkan',
              number: 'Angka',
              off: 'Off',
              on: 'On',
              option: 'Pilihan',
              options: 'Pilihan',
              optional: 'Opsional',
              optionLabelPlaceholder: 'Label',
              optionValuePlaceholder: 'Nilai',
              optionEmpty: 'Nilai opsi dibutuhkan',
              other: 'Lainnya',
              paragraph: 'Paragraf',
              placeholder: 'Placeholder',
              'placeholder.value': 'Nilai',
              'placeholder.label': 'Label',
              'placeholder.text': '',
              'placeholder.textarea': '',
              'placeholder.email': 'Isi alamat email anda',
              'placeholder.placeholder': '',
              'placeholder.className': 'space separated classes',
              'placeholder.password': 'Isi kata sandi',
              preview: 'Preview',
              radioGroup: 'Radio Group',
              radio: 'Radio',
              removeMessage: 'Hapus Elemen',
              removeOption: 'Hapus Opsi',
              remove: '&#215;',
              required: 'Wajib diisi',
              richText: 'Rich Text Editor',
              roles: 'Akses',
              rows: 'Baris',
              save: 'Simpan',
              selectOptions: 'Opsi',
              select: 'Select',
              selectColor: 'Pilih Warna',
              selectionsMessage: 'Perbolehkan banyak pilihan',
              size: 'Ukuran',
              'size.xs': 'Sangat Kecil',
              'size.sm': 'Kecil',
              'size.m': 'Sedang',
              'size.lg': 'Besar',
              style: 'Style',
              styles: {
                btn: {
                  default: 'Default',
                  danger: 'Bahaya',
                  info: 'Info',
                  primary: 'Utama',
                  success: 'Sukses',
                  warning: 'Peringatan'
                }
              },
              subtype: 'Tipe',
              text: 'Isian Singkat',
              textArea: 'Isian Panjang',
              toggle: 'Toggle',
              warning: 'Peringatan!',
              value: 'Value',
              viewJSON: 'View JSON',
              viewXML: '&lt;/&gt;',
              yes: 'Ya'
            }
          }
        }
      });
      $(this.fbRenderWrapper.current).toggle();
      $(this.fbRender.current).formRender({
        dataType: 'json',
        formData:  formDataTemp
      });
    }

    handlePreviewEdit() {
      $(this.fbBuilderWrapper.current).toggle();
      $(this.fbRenderWrapper.current).toggle();
      $(this.fbRender.current).formRender({
      dataType: 'json',
      formData:  $(this.fbBuilder.current).formBuilder('getData', 'json')
      });

    }

    handleClearBuilder() {
      console.log('formData', $(this.fbBuilder.current).formBuilder('getData', 'json'));
      console.log('formData', formDataTemp);

     $(this.fbBuilder.current).formBuilder('clearFields')
    }

    createNewSurvey(){
      const surveyTitle = document.getElementById('title-input').value;
      const surveyDescription = document.getElementById('description-input').value;

      http.post('http://localhost:5000/api/listSurvey/create', {
          id_admin : this.state.idAdmin,
          survey_title : surveyTitle,
          decription : surveyDescription
        })
        .then(res=>{
          if(res.status === 200){
            let idSurvey = res.data.data.id_survey;
            this.setState ({ idSurvey : idSurvey }, function() {
              let jsonform = $(this.fbBuilder.current).formBuilder('getData', 'json');
                http.post('http://localhost:5000/api/fBuilder/createform', {
                  id_survey : this.state.idSurvey,
                  status : true,
                  details: jsonform
                })
                .then(res => {
                  if(res.status === 200){
                    // pass
                  }
                })
            });
            window.location.href="/dashboard";
          }
        })
    }

    handleSaveForm() {
      // if this is a create mode
      if(this.state.idSurvey === undefined){
        this.createNewSurvey();
      }
      //TODO: edit mode
     
    }
    
    render() {
      return(
        <div id = "form-builder-container">
          <div id = "form-builder-title">
            <div className="form-group">
              <input type="text" id="title-input" className="form-control" placeholder="Judul Survei"/>
              <br/>
              <textarea type="text" rows={1} id="description-input" className="form-control" placeholder="Deskripsi Survei"/>
            </div>
          </div>

          <div id="form-builder-main">
            <div id="fb-editor-form" ref={this.fbBuilderWrapper}>
              <div id="fb-editor" ref={this.fbBuilder}/>
              <div id="builder-button-container">
                <button id="button-clear" onClick={this.handleClearBuilder.bind(this)} className="btn btn-outline-secondary">Bersihkan</button>
                <button id="button-render" onClick={this.handlePreviewEdit.bind(this)} className="btn">Tampilan</button>
              </div>
            </div>

            <div id="fb-rendered-form" ref={this.fbRenderWrapper}>
              <div id="fb-rendered" ref={this.fbRender}/>
              <div id="builder-button-container">
                <button id="button-edit" onClick={this.handlePreviewEdit.bind(this)} className="btn btn-outline-secondary">Edit kembali</button>
                <button id="button-save" onClick={this.handleSaveForm.bind(this)} className="btn btn-outline-success">Simpan sebagai draft</button>
              </div>
            </div>
            
          </div>
        </div>
      );
    }
  }
export default FormBuilder;

