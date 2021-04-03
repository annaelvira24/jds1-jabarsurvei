const express = require('express');

const router = express.Router();

const alamatController = require('../controllers/alamat.controller');


router.get('/Provinsi/:token', alamatController.getProvinsi);
router.get('/Kota/:token/:idProvinsi', alamatController.getKota);
router.get('/Kecamatan/:token/:idKota', alamatController.getKecamatan);
router.get('/Kelurahan/:token/:idKecamatan', alamatController.getKelurahan);


module.exports = router;