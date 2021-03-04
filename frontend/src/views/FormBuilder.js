import $ from "jquery";
import React, { Component, createRef } from "react";
import http from "../http-common";
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
      $(this.fbBuilder.current).formBuilder({ formData , disabledActionButtons: ['clear','save'], disableFields: ['autocomplete','button'],
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
            copy: 'Salin Ke Clipboard',
            copyButton: '&#43;',
            copyButtonTooltip: 'Salin',
            dateField: 'Pilih Tanggal',
            description: 'Teks Bantuan',
            descriptionField: 'Deskripsi',
            devMode: 'Mode Pengembang',
            editNames: 'Edit Names',
            editorTitle: 'Form Elements',
            editXML: 'Edit XML',
            enableOther: 'Aktifkan &quot;Lain-Lain&quot;',
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
            label: 'Label',
            labelEmpty: 'Field Label cannot be empty',
            limitRole: 'Batasi akses ke satu atau lebih dari role berikut:',
            mandatory: 'Wajib',
            maxlength: 'Panjang Maksimum',
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
            other: 'Lain-lain',
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
            required: 'Dibutuhkan',
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
            text: 'Text Field',
            textArea: 'Text Area',
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
    handleSaveForm() {
      /* 
      TODO
      SEND FORM, MOVE PARSER TO BACKEND
       */
      var jsonform = $(this.fbBuilder.current).formBuilder('getData', 'json')
      http.post('http://localhost:5000/api/admin/createform', jsonform)
    }
    
    render() {
      return(
        <div id="formBuilderMain">
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
            <button id="save" onClick={this.handleSaveForm.bind(this)}>Simpan (WIP)</button>
          </div>
        </div>
      );
    }
  }
export default FormBuilder;

