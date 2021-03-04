'use strict';

const FBuilder = require('../models/fBuilder.model');

exports.createForm = function(req, res) {
    FBuilder.createForm(req, function(err, formBuilder) {
        console.log("control")
        if (err) {
            res.send(err);  
        } 
        else{
            res.status(200).json(formBuilder);
        }
        return;
    });
};
