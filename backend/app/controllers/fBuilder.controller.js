'use strict';

const FBuilder = require('../models/fBuilder.model');

exports.create = function(req, res) {
    const id_survey = req.body.id_survey;
    const active_status = req.body.status;
    const details = JSON.parse(req.body.details);
    
    for(var i = 0; i < details.length; i++){
        const question = new FBuilder({
            id_survey : id_survey,
            order_number : i,
            section : 1,
            active_status : active_status,
            details : JSON.stringify(details[i])
        });
        FBuilder.create(question, function(err, result) {
            if (err) {
                res.send(err);  
                return;
            } 
        });
    }
    console.log(`Survey ${id_survey} successfully created!`)
    res.status(200).send('OK');
};

exports.findById = function(req, res) {
    FBuilder.findById(req.params.id, 
    function(err, form) {  
        if (err)  res.send(err);  
        res.json(form);
    });
};

exports.getTitleById = function(req, res) {
    FBuilder.getTitleById(req.params.id, 
    function(err, form) {  
        if (err)  res.send(err);
        res.json(form);
    });
};

