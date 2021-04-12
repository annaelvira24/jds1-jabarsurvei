'use strict';

const FBuilder = require('../models/fBuilder.model');

exports.create = function(req, res) {
    const id_survey = req.body.id_survey;
    const details = JSON.parse(req.body.details);
    
    for(var i = 0; i < details.length; i++){
        if(details[i].type == "checkbox-group" || details[i].type == "select" || details[i].type == "radio-group"){
            for (var j = 0; j < details[i].values.length; j++){
                details[i].values[j].value = details[i].values[j].label; 
            }
        }
        const question = new FBuilder({
            id_survey : id_survey,
            order_number : i,
            section : 1,
            details : JSON.stringify(details[i], null, "")
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

