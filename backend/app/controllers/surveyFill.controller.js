'use strict';

const SurveyFill = require('../models/SurveyFill.model');

exports.getSurvey = function(req, res) {
    SurveyFill.getSurvey(req.params.id, 
    function(err, form) {  
        if (err)  res.send(err);  
        res.json(form);
    });
};

