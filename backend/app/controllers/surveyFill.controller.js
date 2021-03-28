'use strict';

const SurveyFill = require('../models/SurveyFill.model');

exports.getDescription = function(req, res) {
    SurveyFill.getDescription(req.params.id, 
    function(err, form) {  
        if (err)  res.send(err);  
        res.json(form);
    });
};

exports.findById = function(req, res) {
    SurveyFill.findById(req.params.id, 
    function(err, form) {  
        if (err)  res.send(err);  
        res.json(form);
    });
};

