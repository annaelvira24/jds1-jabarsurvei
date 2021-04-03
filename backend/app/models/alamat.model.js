'use strict';

var dbConn = require('./../config/db.config');

//Call RAJA API

var Alamat = function(alamat){
    this.level = alamat.level;
    this.value = alamat.value;

};

Alamat.getProvinsi = function (token,result) {
    let url_get = "https://x.rajaapi.com/MeP7c5ne" + token +"/m/wilayah/provinsi";

    const axios = require('axios');

    // Make a request for a user with a given ID
    axios.get(url_get)
    .then(function (response) {
        // handle success
        let newProv = []
        // let detail = {
        //     label: "",
        //     value: "",
        //     selected: false
        // }
        for(var i=0; i < response.data.data.length; i++){
            let detail = {
                label: "",
                value: "",
                selected: false
            }
            detail.label = response.data.data[i].name; 
            detail.value = response.data.data[i].id;
            if(i == 0){
                detail.selected = true;
            }
            newProv.push(detail); 
            // console.log(detail.label);
        }
        console.log(newProv);
        response.data.data = newProv;
        result(null, response.data);
        // console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        result(error, null);
        console.log(error);
    });
};




Alamat.getKota = function (token, idProvinsi, result) {
    let url_get = "https://x.rajaapi.com/MeP7c5ne" + token +"/m/wilayah/kabupaten?idpropinsi=" + idProvinsi;

    const axios = require('axios');

    // Make a request for a user with a given ID
    axios.get(url_get)
    .then(function (response) {
        // handle success
        result(null, response.data);
        console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        result(error, null);
        console.log(error);
    });
};

Alamat.getKecamatan = function (token, idKota, result) {
    let url_get = "https://x.rajaapi.com/MeP7c5ne" + token +"/m/wilayah/kecamatan?idkabupaten=" + idKota;

    const axios = require('axios');

    // Make a request for a user with a given ID
    axios.get(url_get)
    .then(function (response) {
        // handle success
        result(null, response.data);
        console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        result(error, null);
        console.log(error);
    });
};

Alamat.getKelurahan = function (token, idKecamatan, result) {
    let url_get = "https://x.rajaapi.com/MeP7c5ne" + token +"/m/wilayah/kelurahan?idkecamatan=" + idKecamatan;

    const axios = require('axios');

    // Make a request for a user with a given ID
    axios.get(url_get)
    .then(function (response) {
        // handle success
        result(null, response.data);
        console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        result(error, null);
        console.log(error);
    });
};

module.exports = Alamat;