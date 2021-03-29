'use strict';

const SurveyFill = require('../models/SurveyFill.model');

exports.getSurvey = function(req, res) {
    SurveyFill.getSurvey(req.params.link, 
    function(err, form) { 
        if (err)  res.send(err);  
        res.json(form);
    });
};

exports.getResult = function(req, res) {
    SurveyFill.getResult(req.params.id, 
    function(err, form) {  
        if (err)  res.send(err);  
        res.json(form);
    });
};

