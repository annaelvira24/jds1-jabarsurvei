import $ from "jquery";
import autosize from 'autosize';
import React, { Component, createRef } from "react";
import ModalPopUp from '../components/ModalPopUp.js'
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
      idAdmin : undefined,
      surveyTitle : undefined,
      description : undefined,
      status : '',
      headingText : '',
      surveyLink : ''
    }

    constructor(){
      super();
      this.state.cookie = getUser();
      this.state.idAdmin = JSON.parse(atob(this.state.cookie))[0].id_admin;
      this.handleSaveForm = this.handleSaveForm.bind(this);
      this.getSurveyTitle = this.getSurveyTitle.bind(this);
    }

    ModalRef = (obj) => { 
      this.showModal = obj && obj.handleShow 
    }

    getSurveyTitle(){
      http.get('http://localhost:5000/api/fBuilder/getTitleById/' + this.state.idSurvey)
      .then(res =>
        this.setState({
          surveyTitle : res.data[0].survey_title,
          description : res.data[0].decription
        })
      );
    }

    onSurveyClick = () => {
      this.showModal();
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
        this.getSurveyTitle();
      }
 
      $(this.fbBuilder.current).formBuilder({
        formData: formDataTemp,
        disabledActionButtons: ['clear','save'], 
        disableFields: ['autocomplete','button', 'hidden'],
        disabledAttrs: ['name', 'access', 'className', 'value', 'maxlength', 'step', 'placeholder', 'subtype', 'rows'],
        typeUserDisabledAttrs: {
          'checkbox-group': [
            'toggle',
            'inline'
          ]
        },
        inputSets: [
            {
              label: 'Alamat',
              name: 'alamat',
              showHeader: true, 
              fields: [
                  {
                    type: 'text',
                    label: 'Provinsi',
                    className: 'form-control'
                  },
                  {
                    type: 'text',
                    label: 'Kota/Kabupaten',
                    className: 'form-control'
                  },
                  {
                    type: 'text',
                    label: 'Kecamatan',
                    className: 'form-control'
                  },
                  {
                    type: 'text',
                    label: 'Kelurahan',
                    className: 'form-control'
                  },
                  {
                    type: 'text',
                    label: 'Alamat Lengkap',
                    className: 'form-control'
                  }
                ]
            }
        ],
            
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
              'placeholder.value': 'nilai',
              'placeholder.label': 'Label opsi',
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
      document.getElementById('false-msg').innerHTML = "";
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
      const surveyTitle = document.getElementById('title-input').value || "Survey tanpa judul";
      const surveyDescription = document.getElementById('description-input').value;

      http.post('http://localhost:5000/api/listSurvey/create', {
          id_admin : this.state.idAdmin,
          survey_title : surveyTitle,
          decription : surveyDescription,
          status : 'Aktif'
        })
        .then(res=>{
          if(res.status === 200){
            let idSurvey = res.data.data.id_survey;
            this.setState ({ idSurvey : idSurvey }, function() {
              let jsonform = $(this.fbBuilder.current).formBuilder('getData', 'json');
                http.post('http://localhost:5000/api/fBuilder/createform', {
                  id_survey : this.state.idSurvey,
                  details: jsonform
                })
                .then(res => {
                  if(res.status === 200){
                    http.post(`http://localhost:5000/api/surveyLink/createLink`, {
                        id_survey : this.state.idSurvey,
                        id_admin : this.state.idAdmin
                    })
                    .then((res) => {
                      this.setState({
                        status : 'create',
                        headingText : 'Survei Anda berhasil dipublikasikan! Berikut link survei Anda',
                        surveyLink : 'http://localhost:3000/survey/' + res.data
                      })
                      this.onSurveyClick();
                    })
                  }
                })
            });
          }
        })
    }

    handleSaveForm() {
      let surveyTitle = document.getElementById('title-input').value;
      let jsonform = $(this.fbBuilder.current).formBuilder('getData', 'json');
      if(surveyTitle.length == 0 || jsonform == "[]"){
        document.getElementById('false-msg').innerHTML = `Pastikan Anda sudah mengisi judul survey dan menambahkan paling tidak satu pertanyaan`;
      }

      else{
        this.createNewSurvey();
      }
    }

    onInputChangeTitle(event){
      this.setState({surveyTitle: event.target.value});
    }

    onInputChangeDesc(event){
      this.setState({description: event.target.value});
    }
    
    render() {
      return(
        <div id = "form-builder-container">
          <div id = "form-builder-title">
            <div className="form-group">
              <input type="text" id="title-input" className="form-control" placeholder="Judul Survei" value={this.state.surveyTitle} onChange={(e) => this.onInputChangeTitle(e)}/>
              <br/>
              <textarea type="text" rows={1} id="description-input" className="form-control" placeholder="Deskripsi Survei" value={this.state.description} onChange={(e) => this.onInputChangeDesc(e)}/>
            </div>
          </div>

          <div id="form-builder-main">
            <div id="fb-editor-form" ref={this.fbBuilderWrapper}>
              <div id="fb-editor" ref={this.fbBuilder}/>
              <div id="builder-button-container">
                <button id="button-clear" onClick={this.handleClearBuilder.bind(this)} className="btn btn-outline-secondary">Bersihkan</button>
                <button id="button-render" onClick={this.handlePreviewEdit.bind(this)} className="btn t-blue">Tampilan</button>
              </div>
            </div>

            <div id="fb-rendered-form" ref={this.fbRenderWrapper}>
              <div id="fb-rendered" ref={this.fbRender}/>
              <div id="builder-button-container">
                <span id="false-msg" className="input-message"></span> <br/> <br/>
                <button id="button-edit" onClick={this.handlePreviewEdit.bind(this)} className="btn btn-outline-secondary">Edit kembali</button>
                <button id="button-save" onClick={this.handleSaveForm.bind(this)} className="btn t-green">Publikasikan survei</button>
              </div>
            </div>
            
          </div>
          <ModalPopUp 
              ref={this.ModalRef}
              status={this.state.status}
              modalHeading={this.state.headingText}
              link = {this.state.surveyLink}
          />
        </div>
      );
    }
  }
export default FormBuilder;

