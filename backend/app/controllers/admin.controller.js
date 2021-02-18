'use strict';

const Admin = require('../models/admin.model');

exports.findById = function(req, res) {
    Admin.findById(req.params.id, 
    function(err, admin) {  
        if (err)  res.send(err);  
        res.json(admin);
    });
};

exports.login = function(req, res) {
    Admin.login(req,
    function(err, admin) {  
        if (err)  res.send(err);  
        res.json(admin);
    });
};