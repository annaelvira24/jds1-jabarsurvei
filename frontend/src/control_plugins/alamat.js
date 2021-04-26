import control from 'formBuilder/src/js/control'
import $ from 'jquery'
import filter from "formBuilder/src/js/dom"
import http from "../http-common"

if (!window.fbControls) window.fbControls = []
window.fbControls.push(function (controlClass) {
  class controlAlamat extends controlClass {
    static get definition(){
      return {
        i18n: {
          'default': 'Alamat',
        },
        icon: "⚑",
        mi18n: {
          requireValidOption: 'requireValidOption',
        },
      }
    }

    build() {
      console.log("Building...")
      const { values, type, ...data } = this.config

      var prov_options = null
      this.token = null

      http.get('https://x.rajaapi.com/poe')
      .then(res => {
        this.token = res.data.token
        console.log("Token acquired!")
        var token_input = $(`#${data.id}-token`)
        if (token_input) token_input.html(this.token)

        http.get('/api/alamat/Provinsi/' + this.token)
        .then(res => {
          const id_prov = res.data.data[0].value
          prov_options = res.data.data.map(el => {
            return this.markup("option", el.label, { value: el.value })
          })

          const prov_select = $(`#${data.id}-input-provinsi`)
          if (prov_select) {
            prov_select.append(prov_options)
          }

          var url = '/api/alamat/Kota/' + this.token + '/'+ id_prov
          http.get(url)
            .then(res => {
              const id_kota = res.data.data[0].value
              const kota_options = res.data.data.map(el => {
                return this.markup("option", el.label, { value: el.value })
              })

              $(`#${data.id}-input-kota`).append(kota_options)

              var url = '/api/alamat/Kecamatan/' + this.token + '/'+ id_kota
              http.get(url)
                .then(res => {
                  const id_kecamatan = res.data.data[0].value
                  const kecamatan_options = res.data.data.map(el => {
                    return this.markup("option", el.label, { value: el.value })
                  })

                  $(`#${data.id}-input-kecamatan`).append(kecamatan_options)

                  var url = '/api/alamat/Kelurahan/' + this.token + '/'+ id_kecamatan
                  http.get(url)
                    .then(res => {
                      const kelurahan_options = res.data.data.map(el => {
                        return this.markup("option", el.label, { value: el.value })
                      })

                      $(`#${data.id}-input-kelurahan`).append(kelurahan_options)
                    })
                })
            })
        })
      })
      
      const test = [
        this.markup('input', data.id, {
          type: 'hidden'
        }),
        this.markup('input', this.token, {
          type: 'hidden',
          id: `${data.id}-token`
        }),
        this.markup('p', 'Provinsi'),
        this.markup('select', prov_options, {
          id: `${data.id}-input-provinsi`,
          events: {
            change: this.handleProvinsiChange
          },
          className: 'form-control',
        }),
        this.markup('p', 'Kota/Kabupaten'),
        this.markup('select', null, {
          id: `${data.id}-input-kota`,
          events: {
            change: this.handleKotaChange
          },
          className: 'form-control',
        }),
        this.markup('p', 'Kecamatan'),
        this.markup('select', null, {
          id: `${data.id}-input-kecamatan`,
          events: {
            change: this.handleKecamatanChange
          },
          className: 'form-control'
        }),
        this.markup('p', 'Kelurahan'),
        this.markup('select', null, {
          id: `${data.id}-input-kelurahan`,
          className: 'form-control',
        }),
        this.markup('p', 'Alamat Lengkap', {
          className: 'form-builder-alamat'
        }),
        this.markup('textarea', null, {
          id: `${data.id}-input-lengkap`,
          className: 'form-control',
        }),
        this.markup('p')
      ]
      return test
    }

    handleProvinsiChange(evt){
      const id_field = evt.target.parentElement.firstChild.nextSibling
      const id = id_field.textContent
      const token = id_field.nextSibling.textContent

      var kota = $(`#${id}-input-kota`)
      var kecamatan = $(`#${id}-input-kecamatan`)
      var kelurahan = $(`#${id}-input-kelurahan`)

      const id_prov = evt.target.value

      kota.empty()
      kecamatan.empty()
      kelurahan.empty()

      var url = '/api/alamat/Kota/' + token + '/'+ id_prov
      http.get(url)
        .then(res => {
          const kota_options = res.data.data.map(el => {
            return `<option value=${el.value}>${el.label}</option>`
          })
          kota.append(kota_options)
        })
    }

    handleKotaChange(evt){
      const id_field = evt.target.parentElement.firstChild.nextSibling
      const id = id_field.textContent
      const token = id_field.nextSibling.textContent

      var kecamatan = $(`#${id}-input-kecamatan`)
      var kelurahan = $(`#${id}-input-kelurahan`)

      const id_kota = evt.target.value
      kecamatan.empty()
      kelurahan.empty()

      console.log(id_kota)
      console.log(token)

      var url = '/api/alamat/Kecamatan/' + token + '/'+ id_kota
      http.get(url)
        .then(res => {
          const kecamatan_options = res.data.data.map(el => {
            return `<option value=${el.value}>${el.label}</option>`
          })
          console.log(kecamatan_options)
          kecamatan.append(kecamatan_options)
        })
    }

    handleKecamatanChange(evt){
      console.log("Kecamatan changed")
      const id_field = evt.target.parentElement.firstChild.nextSibling
      const id = id_field.textContent
      const token = id_field.nextSibling.textContent

      var kelurahan = $(`#${id}-input-kelurahan`)

      const id_kecamatan = evt.target.value
      kelurahan.empty()

      console.log(id_kecamatan)
      console.log(token)

      var url = '/api/alamat/Kelurahan/' + token + '/'+ id_kecamatan
      http.get(url)
        .then(res => {
          const kelurahan_options = res.data.data.map(el => {
            return `<option value=${el.value}>${el.label}</option>`
          })
          console.log(kelurahan_options)
          kelurahan.append(kelurahan_options)
        })
    }
    
    onRender(){
      console.log("Rendering...")
      console.log(this.config)
    }
  }

  controlClass.register('alamat', controlAlamat);
  return controlAlamat
});