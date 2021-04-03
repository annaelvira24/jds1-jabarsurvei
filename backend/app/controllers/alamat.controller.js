'use strict';

const Alamat = require('../models/alamat.model');

exports.getProvinsi = function(req,res){
    Alamat.getProvinsi(req.params.token,
    function(err, alamat) {  
        if (err)  res.send(err);  
        res.json(alamat);
    });
}

exports.getKota = function(req,res) {
    const tok = req.params.token;
    const idProvinsi = req.params.idProvinsi; 
    Alamat.getKota(
        tok, idProvinsi,
        function(err, alamat) {  
            if (err)  res.send(err);  
            res.json(alamat);
        }
    );
};

exports.getKecamatan = function(req,res) {
    const tok = req.params.token;
    const idKota = req.params.idKota; 
    Alamat.getKecamatan(
        tok, idKota,
        function(err, alamat) {  
            if (err)  res.send(err);  
            res.json(alamat);
        }
    );
};

exports.getKelurahan = function(req,res) {
    const tok = req.params.token;
    const idKecamatan = req.params.idKecamatan; 
    Alamat.getKelurahan(
        tok, idKecamatan,
        function(err, alamat) {  
            if (err)  res.send(err);  
            res.json(alamat);
        }
    );
};