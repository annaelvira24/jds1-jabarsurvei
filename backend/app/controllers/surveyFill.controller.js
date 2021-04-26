'use strict';

const SurveyFill = require('../models/surveyFill.model');

exports.getSurvey = function(req, res) {
    SurveyFill.getSurvey(req.params.link, 
    function(err, form) { 
        if (err)  res.send(err);  
        res.json(form);
    });
};